import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { api } from "../Config/Api";


export const sendLoginSignupOtp = createAsyncThunk(
    "auth/sendLoginSignupOtp",
    async (
      { email, role }: { email: string; role: string },
      { rejectWithValue }
    ) => {
      try {
        const response = await api.post("/auth/sent/login-signup-otp", {
          email,
          role, // include role here
        });
      
        console.log("response...",response.data)
      } catch (error: any) {
        return rejectWithValue(error.response?.data || "Error sending OTP");
      }
    }
  );
  

  export const signin = createAsyncThunk<any, any>(
    "auth/signin",
    async (loginRequest, { rejectWithValue }) => {
      try {
        const response = await api.post("/sellers/login", loginRequest); // just pass loginRequest directly
        console.log("signin response...", response.data);
        const jwt=response.data.jwt;
        localStorage.setItem("jwt",jwt)
        return response.data; // ✅ return the data so it can be used in reducers
      } catch (error: any) {
        return rejectWithValue(error.response?.data || "Login failed");
      }
    }
  );
  export const logout=createAsyncThunk<any, any>("/auth/logout",
      async(navigate, { rejectWithValue }) => {
        try {
          localStorage.clear()
          console.log("logoutSuccess")
          navigate("/")
        } catch (error) {
          console.log("error",error)
          
        }
        
      }
    );
