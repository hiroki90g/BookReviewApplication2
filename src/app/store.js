import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from '../features/pagination/paginationSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    user: userReducer,
  },
});
