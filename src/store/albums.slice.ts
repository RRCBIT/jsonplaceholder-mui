import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import request from "helpers/request";
import { IAlbum, IPhoto } from "types";

export const getAlbumList = createAsyncThunk(
  "albums/getAlbumList",
  async (userId?: number | null) => {
    const response = await request.get("/albums", { params: { userId } });
    return response.data;
  }
);

export const getAlbumDetail = createAsyncThunk(
  "albums/getAlbumDetail",
  async (id: number) => {
    const response = await request.get(`/albums/${id}`);
    return response.data;
  }
);

export const getPhotosByAlbum = createAsyncThunk(
  "albums/getPhotosByAlbum",
  async (id: number) => {
    const response = await request.get(`/albums/${id}/photos`);
    return response.data;
  }
);

export const deleteAlbum = createAsyncThunk(
  "albums/deleteAlbum",
  async (id: number) => {
    await request.delete(`/albums/${id}`);
    return id;
  }
);

interface InitialStateType {
  albumList: IAlbum[];
  photosByAlbum: IPhoto[];
  albumDetail: IAlbum;
  loading: boolean;
}

const initialState: InitialStateType = {
  albumList: [],
  photosByAlbum: [],
  albumDetail: {
    title: "",
    id: 0,
    userId: 0
  },
  loading: true
};

const albumsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    // get post list
    [getAlbumList.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getAlbumList.fulfilled.toString()]: (
      state,
      action: PayloadAction<IAlbum[]>
    ) => {
      state.loading = false;
      state.albumList = [...action.payload];
    },
    [getAlbumList.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // get aldum detail
    [getAlbumDetail.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getAlbumDetail.fulfilled.toString()]: (
      state,
      action: PayloadAction<IAlbum>
    ) => {
      state.loading = false;
      state.albumDetail = action.payload;
    },
    [getAlbumDetail.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // get photos by album
    [getPhotosByAlbum.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getPhotosByAlbum.fulfilled.toString()]: (
      state,
      action: PayloadAction<IPhoto[]>
    ) => {
      state.loading = false;
      state.photosByAlbum = action.payload;
    },
    [getPhotosByAlbum.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // delete album
    [deleteAlbum.pending.toString()]: (state) => {
      state.loading = true;
    },
    [deleteAlbum.fulfilled.toString()]: (
      state,
      action: PayloadAction<number>
    ) => {
      const newAlbumList = state.albumList.filter(
        (post: IAlbum) => post.id !== action.payload
      );
      state.loading = false;
      state.albumList = [...newAlbumList];
    },
    [deleteAlbum.rejected.toString()]: (state) => {
      state.loading = false;
    }
  }
});

export default albumsSlice.reducer;
