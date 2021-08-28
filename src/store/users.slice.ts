import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import request from "helpers/request";
import { IUser } from "types/user.model";

export const getUserList = createAsyncThunk("users/getUserList", async () => {
  const response = await request.get("/users");
  return response.data;
});

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number) => {
    await request.delete(`/users/${id}`);
    return id;
  }
);

// export const getUser = createAsyncThunk("users/getUser", async (id: number) => {
//   const response = await getUserDetail(id);
//   return response.data;
// });

interface InitialStateType {
  userList: IUser[];
  userDetail: IUser;
  loading: boolean;
}

const initialState: InitialStateType = {
  userList: [],
  userDetail: {
    id: 0,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: ""
      }
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: ""
    }
  },
  loading: true
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    // get user list
    [getUserList.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getUserList.fulfilled.toString()]: (
      state,
      action: PayloadAction<IUser[]>
    ) => {
      if (!action.payload) return;
      state.userList = [...action.payload];
      state.loading = false;
    },
    [getUserList.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // delete user
    [deleteUser.pending.toString()]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled.toString()]: (state, action) => {
      const newUserList = state.userList.filter(
        (user: IUser) => user.id !== action.payload
      );
      state.loading = false;
      state.userList = [...newUserList];
    },
    [deleteUser.rejected.toString()]: (state) => {
      state.loading = false;
    }

    // get user detail
    // [getUser.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getUser.fulfilled.toString()]: (state, action: PayloadAction<IUser>) => {
    //   state.loading = false;
    //   state.userDetail = { ...action.payload };
    // },
    // [getUser.rejected.toString()]: (state) => {
    //   state.loading = true;
    // }
  }
});

export default usersSlice.reducer;
