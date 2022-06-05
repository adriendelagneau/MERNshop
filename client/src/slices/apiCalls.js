import Cookies from 'js-cookie'
import {
  toast
} from 'react-toastify'

import { publicRequest } from '../requestMethods'




// Register user
const register = async (userData) => {
  
  const response = await publicRequest.post( "/auth/register", userData , {withCredentials: true, credentials: 'include'})
  if(response.status === 200){
    toast.info(`un email de verification viens de vous etre envoyer, verifier votre boite mail`)
    
  }
  return response.data
}
// Login user
const login = async (userData) => {
 
  const response = await publicRequest.post( "/auth/login", userData, {withCredentials: true, credentials: 'include'})
  localStorage.setItem('user', JSON.stringify(response.data))
  toast.success("Login success");
  

  return response.data
}
// Logout user
const logout = () => {
  Cookies.remove('jwt')
  localStorage.removeItem('user')
}


//fetch products
const fetchProducts = async (cat) => {
  const res = await publicRequest.get(`/products?category=${cat}`)
  
  localStorage.setItem('products', JSON.stringify(res.data))

  return res.data
}

//fetch product
const fetchProduct = async (id) => {
  const res = await publicRequest.get(`/products/find/${id}`)
  return res.data
}

// post reviews
const postReviews = async (id, bb) => {
  
  
  const res = await publicRequest.put(`/products/reviews/${id}`, bb, {withCredentials: true, credentials: 'include'})
  return res.data
}




const apiCalls = {
  register,
  logout,
  login,
  fetchProduct,
  fetchProducts,
  postReviews
}

export default apiCalls
