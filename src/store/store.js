import { configureStore } from "@reduxjs/toolkit";
import HomeSlice from "./HomeSlice";
import SearchSlice from "./SearchSlice";

const myStore = configureStore({
  reducer: {
    home: HomeSlice,
    search: SearchSlice,
  },
});

export default myStore;
