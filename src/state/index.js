import { createSlice } from "@reduxjs/toolkit";
// create slice is used to create a redux store

const intialState = {
  mode: "light",
  user: null,
  token: null,
  posts: {},
};

export const autSlice = createSlice({
  name: "auth",
  intialState,
  // reducers are the action that will be invovlved in modifiying to global stat
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // action is the arugement for the function
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setfriends: (state, action) => {
      if (state.user) {
        // if the user exists than we set the friends in the user
        state.user.friends = action.payload.friends;
      } else {
        console.error("User friends non-existend :");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPost = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post;
        return post;
      });

      state.posts = updatedPost;
    },
  },
});


// You need to export the reducer functions to use them in your code
// exporting the function here

export const { setMode, setLogin, setLogout, setfriends, setPost, setPosts } =
  autSlice.actions;


  // remeber there could be only one default export
export default autSlice.reducer;
