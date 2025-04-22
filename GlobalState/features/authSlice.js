import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: 1,
      owner: "Ihtisham Saeed",
      movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
      interestRate: 1.2,
      pin: 1111,
    },
  },

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = {};
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
