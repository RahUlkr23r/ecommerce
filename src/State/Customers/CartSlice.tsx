import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem } from "../../tpyes/CartType";
import { api } from "../../Config/Api";
import { AxiosResponse } from "axios";
import { sumCartItemMrpPrice, sumCartItemSellingPrice } from "../../Util/sumCartItemMrpPrice";
import { applyCoupon } from "./couponSlice";

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

const API_URL = "/api/cart";

// ✅ Fetch User Cart
export const fetchUserCart = createAsyncThunk<Cart, string>(
  "cart/fetchUserCart",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get<Cart>(API_URL, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user cart");
    }
  }
);

// ✅ Add Item to Cart
interface AddItemRequest {
  productId: number;
  colors?: string;
  sizes?: string;
  quantity: number;
}

export const addItemToCart = createAsyncThunk<Cart, { jwt: string; request: AddItemRequest }>(
  "cart/addItemToCart",
  async ({ jwt, request }, { rejectWithValue }) => {
    try {
      const response = await api.put<Cart>(`${API_URL}/add`, request, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add item to cart");
    }
  }
);

// ✅ Delete Cart Item
export const deleteCartItem = createAsyncThunk<number, { jwt: string; cartItemId: number }>(
  "cart/deleteCartItem",
  async ({ jwt, cartItemId }, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/item/${cartItemId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return cartItemId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete cart item");
    }
  }
);

// ✅ Update Cart Item
interface UpdateCartItemRequest {
  quantity?: number;
  sizes?: string;
  colors?: string;
}

export const updateCartItem = createAsyncThunk<
  { updatedItem: CartItem; cartItemId: number },
  { jwt: string; cartItemId: number; cartItem: UpdateCartItemRequest }
>(
  "cart/updateCartItem",
  async ({ jwt, cartItemId, cartItem }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<CartItem> = await api.put(
        `${API_URL}/item/${cartItemId}`,
        cartItem,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      return { updatedItem: response.data, cartItemId };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update cart item");
    }
  }
);

// 🛒 Cart Slice
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔄 Fetch User Cart
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🟢 Add Item to Cart
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ❌ Delete Cart Item
      .addCase(deleteCartItem.fulfilled, (state, action: PayloadAction<number>) => {
        if (state.cart) {
          state.cart.cartItems = state.cart.cartItems.filter(item => item.id !== action.payload);
          state.cart.totalMrpPrice = sumCartItemMrpPrice(state.cart.cartItems);
          state.cart.totalSellingPrice = sumCartItemSellingPrice(state.cart.cartItems);
        }
      })

      // ✏️ Update Cart Item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const { cartItemId, updatedItem } = action.payload;
        if (state.cart) {
          const index = state.cart.cartItems.findIndex(item => item.id === cartItemId);
          if (index !== -1) {
            state.cart.cartItems[index] = { ...state.cart.cartItems[index], ...updatedItem };
            state.cart.totalMrpPrice = sumCartItemMrpPrice(state.cart.cartItems);
            state.cart.totalSellingPrice = sumCartItemSellingPrice(state.cart.cartItems);
          }
        }
      })

      // 🎫 Apply Coupon
      .addCase(applyCoupon.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// ✅ Export Actions & Reducer
export const { resetCartState } = CartSlice.actions;
export default CartSlice.reducer;

// ✅ Selectors
import { RootState } from "../Store";
export const selectCart = (state: RootState) => state.cart.cart;
export const selectCartItems = (state: RootState) => state.cart.cart?.cartItems || [];
export const selectCartItemCount = (state: RootState) => state.cart.cart?.cartItems?.length || 0;
export const selectCartLoading = (state: RootState) => state.cart.loading;
export const selectCartError = (state: RootState) => state.cart.error;
