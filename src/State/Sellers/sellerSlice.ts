import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

// Define a type for serializable error object
interface RejectedError {
  message: string;
  status?: number;
}

// Async thunk to fetch seller profile
export const fetchSellerProfile = createAsyncThunk<
  any, // success return type
  string, // input argument type (JWT string)
  { rejectValue: RejectedError } // error type
>(
  "/sellers/fetchSellerProfile",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
   
      return response.data;
    } catch (error: any) {
     
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

// Seller state type
interface SellerState {
  sellers: any[];
  selectedSeller: any | null;
  profile: any | null;
  report: any | null;
  loading: boolean;
  error: RejectedError | null;
}

// Initial state
const initialState: SellerState = {
  sellers: [],
  selectedSeller: null,
  profile: null,
  report: null,
  loading: false,
  error: null,
};

// Seller slice
const sellerSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || {
          message: "Something went wrong",
        };
      });
  },
});

export default sellerSlice.reducer;
