import { createSlice } from "@reduxjs/toolkit";

type User = {
  id: string;
  email: string;
  username: string;
  displayName: string;
};

type AuthState = {
  isAuthenticated: boolean;
  accessToken: string | undefined;
  user: User | undefined;
};

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: undefined,
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = undefined;
      state.user = undefined;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
