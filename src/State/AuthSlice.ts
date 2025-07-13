import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../Config/Api";

// Send OTP for login/signup
export const sendLoginSignupOtp = createAsyncThunk(
  "auth/sendLoginSignupOtp",
  async (
    { email, role }: { email: string; role: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/auth/sent/login-signup-otp", {
        email,
        role,
      });

      console.log("OTP sent response:", response.data);
      return response.data; // ✅ return data for reducers
    } catch (error: any) {
      console.log("OTP sending error:", error);
      return rejectWithValue(error.response?.data || "Error sending OTP");
    }
  }
);

// Signin thunk
export const signin = createAsyncThunk<any, any>(
  "auth/signin",
  async (loginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers/login", loginRequest);

      const jwt = response.data.jwt;
      localStorage.setItem("jwt", jwt);

      console.log("Seller login response:", response.data);
      return response.data;
    } catch (error: any) {
      console.log("Login error:", error);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Logout thunk
export const logout = createAsyncThunk(
  "auth/logout",
  async (navigate: () => void) => {
    try {
      localStorage.clear();
      navigate(); // assuming navigate is a callback function like () => navigate("/")
    } catch (error) {
      console.log("Logout error:", error);
    }
  }
);

