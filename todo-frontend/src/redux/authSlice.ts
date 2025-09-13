import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const token = sessionStorage.getItem("token");
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: string | null; 
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
