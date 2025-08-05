import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthReady: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Login: (state, { payload }) => {
      state.user = payload;
    },
    Logout: (state) => {
      state.user = null;
    },
    authReady: (state) => {
      state.isAuthReady = true;
    },
  },
});

export const { Login, Logout, authReady } = userSlice.actions;
export default userSlice.reducer;
