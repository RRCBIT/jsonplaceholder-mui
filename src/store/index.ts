import { configureStore } from "@reduxjs/toolkit";

import routerParamsSlice from "./router-params.slice";
import usersSlice from "./users.slice";
import authSlice from "./auth.slices";
import postsSlice from "./posts.slices";

export const store = configureStore({
  reducer: {
    routerParams: routerParamsSlice,
    users: usersSlice,
    auth: authSlice,
    posts: postsSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
