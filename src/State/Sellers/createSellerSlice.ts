import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
 import { Seller } from '../../tpyes/Sellertype';


interface SellerState {
  seller: Seller | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: SellerState = {
  seller: null,
  loading: false,
  error: null,
  success: false,
};

// 🔄 Async thunk to create seller
export const createSeller = createAsyncThunk(
  'seller/createSeller',
  async (sellerData: Seller, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://ecommerce-1-fwgt.onrender.com/sellers/create-seller', sellerData);
   
      return response.data;
      
    } catch (error: any) {
     
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create seller'
      );
    }
  }
);

const createSellerSlice = createSlice({
  name: 'createSeller',
  initialState,
  reducers: {
    resetSellerState: (state) => {
      state.seller = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.seller = action.payload;
        state.success = true;
      })
      .addCase(createSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetSellerState } = createSellerSlice.actions;

export default createSellerSlice.reducer;
