import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "../../tpyes/CartType"; // Typo in "types"
import { api } from "../../Config/Api"; // Missing closing quote
import { CouponState } from "../../tpyes/CouponType";


export const applyCoupon = createAsyncThunk<
  Cart,
  { apply: string; code: string; orderValue: number; jwt: string },
  { rejectValue: string }
>(
  "coupon/applyCoupon",
  async ({ apply, code, orderValue, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/admin/coupons/apply`,
        null,
        {
          params: { apply,  code, orderValue },
          headers: { Authorization: `Bearer ${jwt}` },
        }
      ); 
      return response.data;
    } catch (error: any) {
    
      return rejectWithValue(error.response?.data?.message || "Coupon application failed");
    }
  }
);

const initialState: CouponState = {
    coupons: [],
    cart: null,
    loading: false,
    error: null,
    couponCreated: false,
    couponApplied: false,
  };
  
  const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(applyCoupon.pending, (state) => {
          state.loading = true;
          state.couponApplied = false;
          state.error = null;
        })
        .addCase(applyCoupon.fulfilled, (state, action) => {
          state.loading = false;
          state.cart = action.payload;
          if (action.meta.arg.apply === "true") {
            state.couponApplied = true;
          }
        })
        .addCase(applyCoupon.rejected, (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to apply coupon";
          state.couponApplied = false;
        });
    },
  });
  
  export default couponSlice.reducer;