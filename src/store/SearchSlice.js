import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYmFjNjE1OTRlMDA2NjIyYzFiMTNjOGYyNmMyOWIwMCIsInN1YiI6IjY2MDMzNWM2Yjg0Y2RkMDE3ZGY3YTMwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yrI-XA-OKBDxZ1GFTP_uQuyExmcPObxC6VmGJvjz4hU";

export const getResults = createAsyncThunk(
  "search/getResults",
  async function ({ s, pageNum }) {
    // Destructure the arguments as an object
    const data = await axios.get(
      `https://api.themoviedb.org/3/search/multi?query=${s}&page=${pageNum}`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
          accept: "application/json",
        },
      }
    );
    return data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResults.fulfilled, function (state, action) {
        state.results = action.payload.data.results;
        state.loading = false;
      })
      .addCase(getResults.pending, function (state) {
        state.loading = true;
      });
  },
});

export default searchSlice.reducer;
