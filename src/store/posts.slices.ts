import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import request from "helpers/request";
import { IPost } from "types/post.model";

export const getPostList = createAsyncThunk(
  "posts/getPostList",
  async (userId?: number | null) => {
    const response = await request.get("/posts", { params: { userId } });
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletPost",
  async (id: number) => {
    await request.delete(`/posts/${id}`);
    return id;
  }
);

interface InitialStateType {
  postList: IPost[];
  loading: boolean;
}

const initialState: InitialStateType = {
  postList: [],
  loading: true
};

const postsSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    // get post list
    [getPostList.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getPostList.fulfilled.toString()]: (
      state,
      action: PayloadAction<IPost[]>
    ) => {
      state.loading = false;
      state.postList = [...action.payload];
    },
    [getPostList.rejected.toString()]: (state) => {
      state.loading = false;
    },
    // delete post
    [deletePost.pending.toString()]: (state) => {
      state.loading = true;
    },
    [deletePost.fulfilled.toString()]: (
      state,
      action: PayloadAction<number>
    ) => {
      const newPostList = state.postList.filter(
        (post: IPost) => post.id !== action.payload
      );
      state.loading = false;
      state.postList = [...newPostList];
    },
    [deletePost.rejected.toString()]: (state) => {
      state.loading = false;
    }
  }
});

export default postsSlice.reducer;
