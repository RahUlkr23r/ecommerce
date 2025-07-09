import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

// --- Error Type ---
interface RejectedError {
  message: string;
  status?: number;
}

// --- Response Data Type ---
export interface SellerReport {
  cancelledOrders: number;
  netEarnings: number;
  totalEarning: number;
  totalOrders: number;
  totalRefunds: number;
  totalSales: number;
  totalTax: number;
  totalTransactions: number;
  sellerId: number;
}

// --- Async Thunk to fetch seller report ---
export const fetchSellerReport = createAsyncThunk<
  SellerReport,                // ✅ success return type
  string,                      // ✅ JWT token
  { rejectValue: RejectedError } // ✅ error type
>(
  "seller/fetchSellerReport",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/report", {
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

// --- Slice State ---
interface SellerReportState {
  report: SellerReport | null;
  loading: boolean;
  error: RejectedError | null;
}

// --- Initial State ---
const initialState: SellerReportState = {
  report: null,
  loading: false,
  error: null,
};

// --- Seller Report Slice ---
const sellerReportSlice = createSlice({
  name: "sellerReport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchSellerReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: "Something went wrong" };
      });
  },
});

export default sellerReportSlice.reducer;
