import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from '../features/pagination/paginationSlice';

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
  },
});
