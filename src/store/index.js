import { configureStore } from "@reduxjs/toolkit";
import layoutSlice from "./reducers/layoutReducer";
import authSlice  from "./reducers/authReducer";

const store = configureStore({
  reducer: {
    layout: layoutSlice,
    auth: authSlice,
  },
});

export default store;
