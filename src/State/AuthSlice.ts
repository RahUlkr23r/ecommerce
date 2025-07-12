import { createAsyncThunk } from "@reduxjs/toolkit";
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
      
      console.log("seller created",response.data)
      } catch (error: any) {
          comsole.log("seller login err",error)
        return rejectWithValue(error.response?.data || "Error sending OTP");
      }
    }
  );
  

  export const signin = createAsyncThunk<any, any>(
    "auth/signin",
    async (loginRequest, { rejectWithValue }) => {
      try {
        const response = await api.post("/sellers/login", loginRequest); // just pass loginRequest directly

        const jwt=response.data.jwt;
        localStorage.setItem("jwt",jwt)
          console.log("login  seller",response.data)
        return response.data; // ✅ return the data so it can be used in reducers
      } catch (error: any) {
          console.log("loginerror",error)
        return rejectWithValue(error.response?.data || "Login failed");
      }
    }
  );
  export const logout=createAsyncThunk<any, any>("/auth/logout",
      async(navigate, {  }) => {
        try {
          localStorage.clear()
      
          navigate("/")
        } catch (error) {
         
          
        }
        
      }
    );
