import axios from "axios";

export const API_URL = "https://ecommerce-lrjs.onrender.com";

// export const API_URL = "http://localhost:8989/";
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },



});

