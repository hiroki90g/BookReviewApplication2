import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

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
  },
});

const checkAuth = () => async (dispatch) => {
  const token = localStorage.getItem('authToken');
  if (!token) return dispatch(removeAuth());
  
  try {
    const responseGetUser = await axios.get(
      `${import.meta.env.VITE_API_URL}/users`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
    });
    
    dispatch(setAuth({
      token,
      userName: responseGetUser.data.userName,
      iconUrl: responseGetUser.data.iconUrl,
    }));
    
  } catch (err) {
    console.error("Token validation failed", err);
    dispatch(removeAuth());
  }
};

export const { setAuth, removeAuth} = userSlice.actions;
export default userSlice.reducer;
export { checkAuth };