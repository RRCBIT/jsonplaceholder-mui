import { configureStore } from "@reduxjs/toolkit";

import routerParamsSlice from "./router-params.slice";
import usersSlice from "./users.slice";
import authSlice from "./auth.slices";
import postsSlice from "./posts.slices";
import commentsSlice from "./comments.slice";
import albumsSlice from "./albums.slice";
import todosSlice from "./todos.slice";

export const store = configureStore({
  reducer: {
    routerParams: routerParamsSlice,
    users: usersSlice,
    auth: authSlice,
    posts: postsSlice,
    comments: commentsSlice,
    albums: albumsSlice,
    todos: todosSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
