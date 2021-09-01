import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import request from "helpers/request";
import { ITodo } from "types";

export const getTodoList = createAsyncThunk(
  "todos/getTodoList",
  async (params: { userId?: number | null; status?: boolean }) => {
    const response = await request.get("/todos", {
      params: { userId: params.userId, completed: params.status }
    });
    return response.data;
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (params: { id: number; body: ITodo }) => {
    const response = await request.put(`/todos/${params.id}`, {
      body: params.body
    });
    return response.data.body;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number) => {
    await request.delete(`/todos/${id}`);
    return id;
  }
);

interface InitialStateType {
  todoList: ITodo[];
  updatedTodo: ITodo;
  loading: boolean;
}

const initialState: InitialStateType = {
  todoList: [],
  updatedTodo: {
    id: 0,
    completed: false,
    title: "",
    userId: 0
  },
  loading: true
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    // get post list
    [getTodoList.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getTodoList.fulfilled.toString()]: (
      state,
      action: PayloadAction<ITodo[]>
    ) => {
      state.loading = false;
      state.todoList = [...action.payload];
    },
    [getTodoList.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // update post
    [updateTodo.pending.toString()]: (state) => {
      state.loading = true;
    },
    [updateTodo.fulfilled.toString()]: (
      state,
      action: PayloadAction<ITodo>
    ) => {
      state.loading = false;
      const newTodoList = state.todoList.filter(
        (post: ITodo) => post.id !== action.payload.id
      );
      state.todoList = [action.payload, ...newTodoList];
    },
    [updateTodo.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // delete album
    [deleteTodo.pending.toString()]: (state) => {
      state.loading = true;
    },
    [deleteTodo.fulfilled.toString()]: (
      state,
      action: PayloadAction<number>
    ) => {
      const newTodoList = state.todoList.filter(
        (post: ITodo) => post.id !== action.payload
      );
      state.loading = false;
      state.todoList = [...newTodoList];
    },
    [deleteTodo.rejected.toString()]: (state) => {
      state.loading = false;
    }
  }
});

export default todosSlice.reducer;
