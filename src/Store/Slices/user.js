import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    setUser(_state, action) {
      return action.payload;
    },
    removeUser() {
      return initialState;
    },
  },
});

const userReducer = userSlice.reducer;

export default userReducer;

export const { setUser, removeUser } = userSlice.actions;
