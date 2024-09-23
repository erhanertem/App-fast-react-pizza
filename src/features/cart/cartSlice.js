import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    // {
    //   pizzaId: 12,
    //   name: "Mediterranean",
    //   quantity: 2,
    //   unitPrice: 16,
    //   totalPrice: 32,
    // },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // Payload -> newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // Payload -> pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // Payload -> pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action) {
      // Payload -> pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// COMPLEX RTK STORE USESELECTOR READ FUNCTIONS KEPT HERE - convention is to start these functions with get
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((acc, currItem) => acc + currItem.quantity, 0);
export const getTotalCartPrice = (state) =>
  state.cart.cart
    .reduce((acc, currItem) => acc + currItem.totalPrice, 0)
    .toFixed(2);
