import { configureStore } from "@reduxjs/toolkit";
import { myApi } from "./api";
import numberSlice from "./slices/numberSlice";

export const store = configureStore({
  reducer: {
    [myApi.reducerPath]: myApi.reducer,
    number: numberSlice,
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(myApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;