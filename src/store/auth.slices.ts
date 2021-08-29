import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOKEN_NAME } from "constants/configs";

import { loginService } from "services/auth.services";

export const login = createAsyncThunk(
  "auth/login",
  async (params: { email: string; password: string }) => {
    const response = await loginService(params);
    return response;
  }
);

interface InitialStateType {
  token: string;
  loading: boolean;
}

const initialState: InitialStateType = {
  token: "",
  loading: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = "";
      localStorage.removeItem(TOKEN_NAME);
      window.location.href = "/auth";
    }
  },
  extraReducers: {
    [login.pending.toString()]: (state) => {
      state.loading = true;
    },
    [login.fulfilled.toString()]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      localStorage.setItem(TOKEN_NAME, action.payload);
      window.location.href = "/app";
      state.token = action.payload;
    }
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
