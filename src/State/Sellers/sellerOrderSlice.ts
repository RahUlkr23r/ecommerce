import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../tpyes/OrderTypes";
import { api } from "../../Config/Api";

// ✅ Fetch All Seller Orders
export const fetchSellerOrders = createAsyncThunk<
  Order[],
  string,
  { rejectValue: string }
>(
  "sellerOrder/fetchSellerOrders",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get<Order[]>("/api/seller/orders", {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch seller orders"
      );
    }
  }
);

// ✅ Update Seller Order Status
export const updateSellerOrderStatus = createAsyncThunk<
  Order,
  { jwt: string; orderId: number; orderStatus: string },
  { rejectValue: string }
>(
  "sellerOrder/updateOrderStatus",
  async ({ jwt, orderId, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await api.patch<Order>(
        `/api/seller/orders/${orderId}/status/${orderStatus}`,
        {},
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update order status"
      );
    }
  }
);

// ✅ Initial State
interface SellerOrderState {
  sellerOrders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: SellerOrderState = {
  sellerOrders: [],
  loading: false,
  error: null,
};

// ✅ Seller Order Slice
const sellerOrderSlice = createSlice({
  name: "sellerOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔄 Fetch Orders
      .addCase(fetchSellerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.sellerOrders = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // 🔄 Update Order Status
      .addCase(updateSellerOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSellerOrderStatus.fulfilled, (state, action: PayloadAction<Order>) => {
        const updatedOrder = action.payload;
        const index = state.sellerOrders.findIndex(order => order.id === updatedOrder.id);
        if (index !== -1) {
          state.sellerOrders[index] = updatedOrder;
        }
        state.loading = false;
      })
      .addCase(updateSellerOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update order";
      });
  },
});

export default sellerOrderSlice.reducer;
