import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    count: "10",
    url: {},
    genre: {},
  },
  reducers: {
    getApiConfig: (state, action) => {
      state.url = action.payload;
    },
    getGenre: (state, action) => {
      state.genre = action.payload;
    },
  },
});

export default homeSlice.reducer;
export const { getApiConfig, getGenre } = homeSlice.actions;
