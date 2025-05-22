import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    token: null,
    userName: null,
    iconUrl: null, 
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userName = action.payload.userName;
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('userName', action.payload.userName);
      localStorage.setItem('iconUrl', action.payload.iconUrl);
    },
    removeAuth: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userName = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('iconUrl'); 
    },
    checkAuth: (state) => {
      const token = localStorage.getItem('authToken');
      const userName = localStorage.getItem('userName');
      const iconUrl = localStorage.getItem('iconUrl');
      console.log(state);
      if (token && userName) {  // tokenが生きているか、API叩いて判定してログイン済みかみるとよい。認証エラーの場合はトップに戻す
        state.isAuthenticated = true;
        state.token = token;
        state.userName = userName;
        state.iconUrl = iconUrl;
      }
    },
  },
});

export const { setAuth, removeAuth, checkAuth } = userSlice.actions;
export default userSlice.reducer;