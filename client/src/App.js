import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from './pages/Success';
import Profil from './pages/Profil'

import ScrollToTop from "./components/ScrollToTop";

import "react-toastify/dist/ReactToastify.css";
import './App.css'
import { ToastContainer } from 'react-toastify'



const App = () => {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer 
          position="bottom-left"
          theme="colored"
          fontWeight="700"
      />
      <Routes >
       <Route path="*" element={<Home />}/> 
       <Route path="/" end element={<Home />}/> 
       <Route path="/products/:category" element={<ProductList />}/>
       <Route path="/product/:id" element={<Product />}/>
       <Route path="/cart" element={<Cart />}/>
       <Route path="/success" element={<Success />}/>
       <Route path="/login" element={ <Login/> }/>
       <Route path="/register" element={<Register /> }/>
       <Route path="/profil" element={<Profil />} />
    
      </Routes>
    </BrowserRouter>
  )
  ;
};

export default App;