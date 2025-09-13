import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const savedAuth = JSON.parse(
  localStorage.getItem("auth") || 
  sessionStorage.getItem("auth") ||
  "null"
);

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: savedAuth
    ? { auth: { ...savedAuth, isAuthenticated: true } }
    : undefined, 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;