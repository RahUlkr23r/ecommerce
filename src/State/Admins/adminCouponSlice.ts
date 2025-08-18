import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Coupon } from '../../tpyes/CouponType';
import axios from 'axios';

const BASE_URL = 'https://ecommerce-lrjs.onrender.com/admin/coupons';

// ✅ Helper: Get JWT from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('jwt');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// 📦 Async Thunks

// 1. Fetch all coupons
export const fetchAllCoupons = createAsyncThunk(
  'adminCoupons/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/all`, getAuthHeader());
      return response.data as Coupon[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch coupons');
    }
  }
);

// 2. Create a coupon
export const createCoupon = createAsyncThunk(
  'adminCoupons/create',
  async (coupon: Omit<Coupon, 'id'>, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/admin/create`, coupon, getAuthHeader());
      return response.data as Coupon;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create coupon');
    }
  }
);

// 3. Delete a coupon by ID
export const deleteCoupon = createAsyncThunk(
  'adminCoupons/delete',
  async ({ couponId, token }: { couponId: number; token: string }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/admin/delete/${couponId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("coupon created",res.data);
      return couponId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete coupon');
    }
  }
);

// 🧾 State type
interface AdminCouponState {
  coupons: Coupon[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminCouponState = {
  coupons: [],
  loading: false,
  error: null,
};

// 🧩 Slice
const adminCouponSlice = createSlice({
  name: 'adminCoupons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCoupons.fulfilled, (state, action: PayloadAction<Coupon[]>) => {
        state.coupons = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCoupon.fulfilled, (state, action: PayloadAction<Coupon>) => {
        // ✅ Fix: Ensure coupons is always an array
        if (!Array.isArray(state.coupons)) {
          state.coupons = [];
        }
        state.coupons.push(action.payload);
        state.loading = false;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCoupon.fulfilled, (state, action: PayloadAction<number>) => {
        state.coupons = state.coupons.filter(c => c.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminCouponSlice.reducer;
