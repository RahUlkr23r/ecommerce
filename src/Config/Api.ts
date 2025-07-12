import axios from "axios";

export const API_URL = "https://ecommerce-1-fwgt.onrender.com";


export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },



});

