import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../../tpyes/Transaction"; // adjust path accordingly
import { api } from "../../Config/Api";

// ✅ 1. Fetch transactions of current seller
export const fetchSellerTransactions = createAsyncThunk<
  Transaction[],
  string,
  { rejectValue: string }
>("transactions/fetchSellerTransactions", async (jwt, { rejectWithValue }) => {
  try {
    const response = await api.get("/api/transactions/seller", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
     
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch seller transactions"
    );
  }
});

// ✅ 2. Fetch all transactions (for admin use-case maybe)
export const fetchAllTransactions = createAsyncThunk<
  Transaction[],
  string,
  { rejectValue: string }
>("transactions/fetchAllTransactions", async (jwt, { rejectWithValue }) => {
  try {
    const response = await api.get<Transaction[]>("/api/transactions/all", {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch all transactions"
    );
  }
});

// 🔰 Transaction state interface
interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

const TransactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 🌀 Seller Transactions
      .addCase(fetchSellerTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.transactions = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellerTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error loading seller transactions";
      })

      // 🌀 All Transactions
      .addCase(fetchAllTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.transactions = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error loading all transactions";
      });
  },
});

export default TransactionSlice.reducer;
