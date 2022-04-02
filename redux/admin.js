import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminProducts: [],
    adminOrders: [],
  },
  reducers: {
    setProductsOrders: (state, action) => {
      state.adminProducts = action.payload.products;
      state.adminOrders = action.payload.orders;
    },
    deleteAdminProduct: (state, action) => {
      const newProducts = state.adminProducts.filter(
        (p) => p._id !== action.payload
      );
      state.adminProducts = newProducts;
    },
    deleteAdminOrder: (state, action) => {
      const newOrders = state.adminOrders.filter(
        (o) => o._id !== action.payload
      );
      state.adminOrders = newOrders;
    },
  },
});

export const { setProductsOrders, deleteAdminProduct, deleteAdminOrder } =
  adminSlice.actions;
export default adminSlice.reducer;
