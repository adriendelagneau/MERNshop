import axios from "axios";
import Cookies from 'js-cookie'


const TOKEN = Cookies.get("jwt");

export const publicRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const userRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { token: `Bearer ${TOKEN}` },
});