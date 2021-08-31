import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import request from "helpers/request";
import { IUser } from "types";

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

export const getUserDetail = createAsyncThunk(
  "users/getUserDetail",
  async (id: number) => {
    const response = await request.get(`/users/${id}`);
    return response.data;
  }
);

interface InitialStateType {
  userList: IUser[];
  newUser: IUser | null;
  modifiedUser: IUser | null;
  userDetail: IUser;
  loading: boolean;
}

const initialState: InitialStateType = {
  userList: [],
  newUser: null,
  modifiedUser: null,
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
  reducers: {
    addNewUser: (state, action) => {
      state.newUser = { ...action.payload };
    },
    addUpdatedUser: (state, action) => {
      state.modifiedUser = { ...action.payload };
    }
  },
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
      if (state.newUser) {
        state.userList = [state.newUser, ...action.payload];
        state.loading = false;
        return;
      }
      if (state.modifiedUser) {
        const updatedUserList = state.userList.filter(
          (user: IUser) => user.id !== state.modifiedUser?.id
        );
        state.userList = [state.modifiedUser, ...updatedUserList];
        state.loading = false;
        return;
      }
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
    },

    // get user detail
    [getUserDetail.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getUserDetail.fulfilled.toString()]: (
      state,
      action: PayloadAction<IUser>
    ) => {
      state.loading = false;
      state.userDetail = { ...action.payload };
    },
    [getUserDetail.rejected.toString()]: (state) => {
      state.loading = true;
    }
  }
});

export const { addNewUser, addUpdatedUser } = usersSlice.actions;

export default usersSlice.reducer;
