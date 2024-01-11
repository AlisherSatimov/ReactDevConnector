import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post-slice",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    likePost(state, action) {
      state.posts.find((post) => post._id === action.payload.postId).likes =
        action.payload.likes;
    },
    unlikePost(state, action) {
      state.posts.find((post) => post._id === action.payload.postId).likes =
        action.payload.likes;
    },
    updateComments(state, action) {
      state.posts.find((post) => post._id === action.payload.postId).comments =
        action.payload.comments;
    },
    deleteComment(state, action) {
      const post = state.posts.find(
        (post) => post._id === action.payload.postId
      );
      if (post) {
        post.comments = post.comments.filter(
          (comment) => comment._id !== action.payload.commentId
        );
      }
    },
    deletePost(state, action) {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
  },
});

const postReducer = postSlice.reducer;

export default postReducer;

export const {
  setPosts,
  likePost,
  unlikePost,
  deletePost,
  updateComments,
  deleteComment,
} = postSlice.actions;
