import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    offset: 0,
  },
  reducers: {
    nextPage(state) {
      state.offset += 10;
    },
    prevPage(state) {
      if (state.offset >= 10) {
        state.offset -= 10;
      }
    },
    resetPage(state){
      state.offset = 0;
    }
  }
})

export const { nextPage, prevPage, resetPage } = paginationSlice.actions;
export default paginationSlice.reducer;