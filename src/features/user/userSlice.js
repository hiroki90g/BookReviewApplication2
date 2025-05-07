import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    token: null,
    userName: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userName = action.payload.userName;
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('userName', action.payload.userName);
    },
    removeAuth: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userName = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
    },
    checkAuth: (state) => {
      const token = localStorage.getItem('authToken');
      const userName = localStorage.getItem('userName');
      console.log(state);
      if (token && userName) {
        state.isAuthenticated = true;
        state.token = token;
        state.userName = userName;
      }
    },
  },
});

export const { setAuth, removeAuth, checkAuth } = userSlice.actions;
export default userSlice.reducer;