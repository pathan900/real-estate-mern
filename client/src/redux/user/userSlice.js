import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    signInFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signInFail, signInStart, signInSuccess } = userSlice.actions;

export default userSlice.reducer;
