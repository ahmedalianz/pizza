import admin from "./admin";
import cart from "./cart";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: { cart, admin },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
