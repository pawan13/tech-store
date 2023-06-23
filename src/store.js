import { configureStore } from "@reduxjs/toolkit";
import adminInfo from "./pages/user/userSlice";

export const store = configureStore({
  reducer: {
     adminInfo: adminInfo,
  },
});
