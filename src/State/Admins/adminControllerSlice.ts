// src/State/Admins/adminControllerSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Seller } from '../../tpyes/Sellertype';

export type AccountStatus = "PENDING_VERIFICATION" | "VERIFIED" | "REJECTED";

interface SellerState {
  sellers: Seller[];
  loading: boolean;
  error: string | null;
}

const initialState: SellerState = {
  sellers: [],
  loading: false,
  error: null,
};

const BASE_URL = 'https://ecommerce-lrjs.onrender.com';

const getAuthHeader = () => {
  const token = localStorage.getItem('jwt');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
};

// ✅ Fixed: added status query to URL
export const fetchAllSellers = createAsyncThunk<
  Seller[],
  AccountStatus | undefined,
  { rejectValue: string }
>('admin/fetchAllSellers', async (status, { rejectWithValue }) => {
  try {
    const query = status ? `?status=${status}` : '';
    const response = await axios.get(`${BASE_URL}/sellers/all${query}`, getAuthHeader());
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch sellers');
  }
});

export const updateSellerStatus = createAsyncThunk<
  Seller,
  { id: number; status: AccountStatus },
  { rejectValue: string }
>('admin/updateSellerStatus', async ({ id, status }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/admin/seller/${id}/status/${status}`,
      {},
      getAuthHeader()
    );
   
    return response.data;
  } catch (err: any) {
 
    return rejectWithValue(err.response?.data?.message || 'Failed to update seller status');
  }
});

const adminSellerSlice = createSlice({
  name: 'adminSellers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSellers.fulfilled, (state, action: PayloadAction<Seller[]>) => {
        state.sellers = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      .addCase(updateSellerStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSellerStatus.fulfilled, (state, action: PayloadAction<Seller>) => {
        const index = state.sellers.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.sellers[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateSellerStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update seller status';
      });
  },
});

export default adminSellerSlice.reducer;
