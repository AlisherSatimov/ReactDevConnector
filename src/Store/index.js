import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./Slices/post";
import userReducer from "./Slices/user";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
});

export default store;
