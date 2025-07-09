import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../Config/Api";
import { User } from "../../../tpyes/usertype";
import { NavigateFunction } from "react-router-dom";

// Define response and error types
type AuthResponse = {
  jwt: string;
  user: User;
  message?: string;
};

type KnownError = {
  message: string;
  error?: string;
};

// OTP sending
export const sendLoginSignupOtp = createAsyncThunk<
  { message: string },
  { email: string; role: string },
  { rejectValue: KnownError }
>(
  "auth/sendLoginSignupOtp",
  async ({ email, role }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/sent/login-signup-otp", { email, role });
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || "Error sending OTP"
      });
    }
  }
);

// Login
export const login = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: KnownError }
>(
  "auth/signin",
  async (loginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signing", loginRequest);
      const jwt = response.data.jwt;
      localStorage.setItem("jwt", jwt);
      console.log("login data",response.data)
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || "Login failed"
      });
    }
  }
);

// Signup with proper typing
export const signup = createAsyncThunk<
  AuthResponse,
  { email: string; fullname: string; otp: string; role: string },
  { rejectValue: KnownError }
>(
  "auth/signup",
  async (signupRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signup", signupRequest);
      const { jwt, user } = response.data;
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("user", JSON.stringify(user));
      return { jwt, user };
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || "Signup failed"
      });
    }
  }
);

// Fetch profile
export const fetchUserProfile = createAsyncThunk<
  User,
  { jwt: string },
  { rejectValue: KnownError }
>(
  "auth/fetchUserProfile",
  async ({ jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/user/profile", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("data",response.data)
      return response.data;
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch profile"
      });
    }
  }
);

// Logout
export const userlogout = createAsyncThunk(
  "auth/userlogout",
  async (navigate: NavigateFunction, { dispatch }) => {
    localStorage.clear();
    navigate("/");
    return null;
  }
);

interface AuthState {
  jwt: string | null;
  otpSent: boolean;
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  jwt: localStorage.getItem("jwt") || null,
  otpSent: false,
  isLoggedIn: !!localStorage.getItem("jwt"),
  user: localStorage.getItem("user") 
    ? JSON.parse(localStorage.getItem("user")!) 
    : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // OTP Cases
    builder
      .addCase(sendLoginSignupOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendLoginSignupOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendLoginSignupOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to send OTP";
      });

    // Login Cases
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.jwt = action.payload.jwt;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      });

    // Signup Cases
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.jwt = action.payload.jwt;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Signup failed";
      });

    // Profile Cases
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch profile";
      });

    // Logout Case
    builder.addCase(userlogout.fulfilled, (state) => {
      state.jwt = null;
      state.user = null;
      state.isLoggedIn = false;
      state.otpSent = false;
    });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;












//   {}//



// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { api } from "../../../Config/Api";
// import { User } from "../../../tpyes/usertype";

// export const sendLoginSignupOtp = createAsyncThunk(
//   "auth/sendLoginSignupOtp",
//   async ({ email, role }: { email: string; role: string }, { rejectWithValue }) => {
//     try {
//       const response = await api.post("/auth/sent/login-signup-otp", {
//         email,
//         role,
//       });
//       console.log("OTP sent:", response.data);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Error sending OTP");
//     }
//   }
// );

// export const login = createAsyncThunk<any, any>(
//   "auth/signin",
//   async (loginRequest, { rejectWithValue }) => {
//     try {
//       const response = await api.post("/auth/signing", loginRequest); // just pass loginRequest directly
//       console.log("signin response...", response.data);
//       const jwt=response.data.jwt;
//       localStorage.setItem("jwt",jwt)
//       return response.data; // ✅ return the data so it can be used in reducers
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Login failed");
//     }
//   }
// );

// export const signup = createAsyncThunk(
//   "auth/signup",
//   async (signupRequest, { rejectWithValue }) => {
//     try {
//       const response = await api.post("/auth/signup", signupRequest);
//       const { jwt, user } = response.data;
//       localStorage.setItem("jwt", jwt);
//       localStorage.setItem("user", JSON.stringify(user));
//       return { jwt, user };
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Signup failed");
//     }
//   }
// );

// export const fetchUserProfile = createAsyncThunk(
//   "auth/fetchUserProfile",
//   async ({ jwt }: { jwt: string }, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/api/user/profile", {
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//         },
//       });
//       console.log("✅ User profile response:", response.data);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch user profile");
//     }
//   }
// );

// export const logout = createAsyncThunk("auth/logout", async () => {
//     localStorage.clear();
//     console.log("✅ Logout successful");
//   });

// interface AuthState {
//   jwt: string | null;
//   otpSent: boolean;
//   isLoggedIn: boolean;
//   user: User | null;
//   loading: boolean;
// }

// const initialState: AuthState = {
//   jwt: localStorage.getItem("jwt") || null,
//   otpSent: false,
//   isLoggedIn: !!localStorage.getItem("jwt"),
//   user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
//   loading: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(sendLoginSignupOtp.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(sendLoginSignupOtp.fulfilled, (state) => {
//       state.loading = false;
//       state.otpSent = true;
//     });
//     builder.addCase(sendLoginSignupOtp.rejected, (state, action) => {
//       state.loading = false;
//       console.error("OTP Error:", action.payload);
//     });

//     builder.addCase(login.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(login.fulfilled, (state, action) => {
//       state.jwt = action.payload.jwt;
//       state.user = action.payload.user;
//       state.isLoggedIn = true;
//       state.loading = false;
//     });
//     builder.addCase(login.rejected, (state, action) => {
//       state.loading = false;
//       console.error("Login Error:", action.payload);
//     });

//     builder.addCase(signup.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(signup.fulfilled, (state, action) => {
//       state.jwt = action.payload.jwt;
//       state.user = action.payload.user;
//       state.isLoggedIn = true;
//       state.loading = false;
//     });
//     builder.addCase(signup.rejected, (state, action) => {
//       state.loading = false;
//       console.error("Signup Error:", action.payload);
//     });

//     builder.addCase(fetchUserProfile.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
//       state.user = action.payload;
//       state.isLoggedIn = true;
//       state.loading = false;
//     });
//     builder.addCase(fetchUserProfile.rejected, (state, action) => {
//       state.loading = false;
//       console.error("Profile Error:", action.payload);
//     });

//     builder.addCase(logout.fulfilled, (state) => {
//       state.jwt = null;
//       state.user = null;
//       state.isLoggedIn = false;
//     });
//   },
// });

// export default authSlice.reducer;
