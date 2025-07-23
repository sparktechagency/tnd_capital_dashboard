import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  userInfo: null,
  // Add more user-related state if needed
  collapsed: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.userInfo = null;
    },
    setCollapsed: (state, action) => {
      state.collapsed = action.payload
    }
  },
});

export const { setAccessToken, setUserInfo, clearAuth, setCollapsed } = authSlice.actions;
export const selectToken = (state: { auth: { accessToken: string } }) =>
  state.auth.accessToken;
export const selectUser = (state: { auth: { userInfo: unknown } }) =>
  state.auth.userInfo;
export default authSlice.reducer;
