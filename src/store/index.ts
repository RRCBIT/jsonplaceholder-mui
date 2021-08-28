import { configureStore } from "@reduxjs/toolkit";

import routerParamsSlice from "./router-params.slice";

export const store = configureStore({
  reducer: {
    routerParams: routerParamsSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
