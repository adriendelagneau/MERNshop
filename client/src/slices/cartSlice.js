import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify'

const initialState = {
  cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  cartTotalQuantity: localStorage.getItem("cartItems") ? (JSON.parse(localStorage.getItem("cartItems"))).length : 0,
  cartTotalAmount: 0
}


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id && item.size === action.payload.size)
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity = action.payload.quantity + state.cartItems[itemIndex].quantity
        toast.success(`${action.payload.title} rajouter `)
      } else {
        state.cartTotalQuantity++
        state.cartItems.push(action.payload)
        toast.success(`${action.payload.title} added to cart`)
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },

    getTotals(state, action) {
      let total = 0;
      state.cartItems.forEach(item => {
        total += (item.price * item.quantity);
      });
      state.cartTotalAmount = total
    },

    clearCart(state, action) {
      state.cartItems = [];
      state.cartTotalQuantity = 0
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Cart cleared");
    },

    removeFromCart(state, action) {
      const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id && item.size === action.payload.size)
      const nextCart = state.cartItems.filter(x => x !== state.cartItems[itemIndex])
      state.cartItems = nextCart
      state.cartTotalQuantity--
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.info(`${action.payload.title} remove from cart`)
    },

    increaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id && item.size === action.payload.size)
      state.cartItems[itemIndex].quantity++
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.info(`${action.payload.title} increase from cart`);
    },

    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id && item.size === action.payload.size)
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity--
      }else {
        const nextCart = state.cartItems.filter(x => x !== state.cartItems[itemIndex])
        state.cartItems = nextCart
        state.cartTotalQuantity--
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },

  }
})

export const {
  addToCart,
  decreaseCart,
  removeFromCart,
  getTotals,
  clearCart,
  increaseCart
} = cartSlice.actions

export default cartSlice.reducer