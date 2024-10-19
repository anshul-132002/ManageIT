import { configureStore } from "@reduxjs/toolkit";
import Userslice from "../Features/Userslice";

export const store = configureStore({
  reducer: {
    app: Userslice,
  },
});
