import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import request from "helpers/request";
import { IComment } from "types";

export const getCommentList = createAsyncThunk(
  "comments/getCommentList",
  async (postId?: number | null) => {
    const response = await request.get("/comments", { params: { postId } });
    return response.data;
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (id: number) => {
    await request.delete(`/comments/${id}`);
    return id;
  }
);

interface InitialStateType {
  commentList: IComment[];
  loading: boolean;
}

const initialState: InitialStateType = {
  commentList: [],
  loading: true
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    // get post list
    [getCommentList.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getCommentList.fulfilled.toString()]: (
      state,
      action: PayloadAction<IComment[]>
    ) => {
      state.loading = false;
      state.commentList = [...action.payload];
    },
    [getCommentList.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // delete post
    [deleteComment.pending.toString()]: (state) => {
      state.loading = true;
    },
    [deleteComment.fulfilled.toString()]: (
      state,
      action: PayloadAction<number>
    ) => {
      const newcommentList = state.commentList.filter(
        (post: IComment) => post.id !== action.payload
      );
      state.loading = false;
      state.commentList = [...newcommentList];
    },
    [deleteComment.rejected.toString()]: (state) => {
      state.loading = false;
    }
  }
});

export default commentsSlice.reducer;
