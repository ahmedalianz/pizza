import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const extrasFees = 0;
      action.payload.extras.map((extra) => (extrasFees += extra.price));
      state.cart.push({
        productDetails: action.payload.product,
        quantity: action.payload.quantity,
        extras: action.payload.extras,
        price: action.payload.price,
        total: extrasFees + action.payload.price * action.payload.quantity,
      });
      state.quantity += 1;
      state.total +=
        action.payload.price * action.payload.quantity + extrasFees;
    },
    removeFromCart: (state, action) => {},
    clearCart: (state) => {
      state.cart = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
