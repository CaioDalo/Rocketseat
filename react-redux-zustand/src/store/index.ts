import { configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {}
})

export type RootState = ReturnType<typeof store.getState>
export const userAppSelector: TypedUseSelectorHook<RootState> = useSelector

