import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import request from "helpers/request";
import { IPost } from "types";

export const getPostList = createAsyncThunk(
  "posts/getPostList",
  async (userId?: number | null) => {
    const response = await request.get("/posts", { params: { userId } });
    return response.data;
  }
);

export const getPostDetail = createAsyncThunk(
  "posts/getPostDetail",
  async (id: number) => {
    const response = await request.get(`/posts/${id}`);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: number) => {
    await request.delete(`/posts/${id}`);
    return id;
  }
);

interface InitialStateType {
  postList: IPost[];
  postDetail: IPost;
  loading: boolean;
}

const initialState: InitialStateType = {
  postList: [],
  postDetail: {
    title: "",
    body: "",
    id: 0,
    userId: 0
  },
  loading: true
};

const postsSlice = createSlice({
  name: "posts",
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
    // get post detail
    [getPostDetail.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getPostDetail.fulfilled.toString()]: (
      state,
      action: PayloadAction<IPost>
    ) => {
      state.loading = false;
      state.postDetail = action.payload;
    },
    [getPostDetail.rejected.toString()]: (state) => {
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
