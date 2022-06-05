import React from 'react';
//import ReactDOM from "react-dom/client";
import App from './App';

import { Provider } from 'react-redux'
import { configureStore } from "@reduxjs/toolkit"

import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/authSlice'
import productReducer from './slices/singleProductSlice'

import {  Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);



const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY)


const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
});


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Provider>
  </React.StrictMode>,

);


