import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const token = sessionStorage.getItem("token");
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: string | null;
  email: string | null; 
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: "",
  email: ""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<{ token: string; user: string; email: string}>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.email = action.payload.email;;
    },
    login: (state, action: PayloadAction<{ token: string; user: string}>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = "";
      localStorage.removeItem("auth");
      sessionStorage.removeItem("auth");
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { signup, login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
