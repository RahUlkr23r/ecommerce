import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Address } from "../../tpyes/usertype";
import { Order, OrderItems, OrderState } from "../../tpyes/OrderTypes";
import { api } from "../../Config/Api";
import axios from "axios";

const initialState: OrderState = {
  orders: [],
  orderItem: null,
  currentOrder: null,
  paymentOrder: null,
  loading: false,
  error: null,
  orderCanceled: false,
};

const API_URL = "/api/orders";

// ✅ 1. Fetch User Order History
export const fetchUserOrderHistory = createAsyncThunk<
  Order[],
  string,
  { rejectValue: string }
>("order/fetchUserOrderHistory", async (jwt, { rejectWithValue }) => {
  try {
    const response = await api.get<Order[]>(`${API_URL}/user/history`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch user order history"
    );
  }
});

// ✅ 2. Fetch Order By ID
export const fetchOrderById = createAsyncThunk<
  Order,
  { orderId: number; jwt: string },
  { rejectValue: string }
>("order/fetchOrderById", async ({ orderId, jwt }, { rejectWithValue }) => {
  try {
    const response = await api.get<Order>(`${API_URL}/${orderId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch order by ID"
    );
  }
});

// ✅ 3. Fetch Order Item By ID
export const fetchOrderItemById = createAsyncThunk<
  OrderItems,
  { orderItemId: number; jwt: string },
  { rejectValue: string }
>(
  "order/fetchOrderItemById",
  async ({ orderItemId, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get<OrderItems>(`${API_URL}/item/${orderItemId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        "Failed to fetch order item by ID: " +
          (error.response?.data?.message || error.message)
      );
    }
  }
);

// ✅ 4. Create Order
export const createOrder = createAsyncThunk<
  any,
  {
    address: Address;
    jwt: string;
    amount: number;
    paymentGateway?: string;
  },
  { rejectValue: string }
>(
  "order/createOrder",
  async ({ address, jwt, amount, paymentGateway }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://ecommerce-1-fwgt.onrender.com/api/orders/create",
        {
          ...address,
          pincode: Number(address.pincode),
          amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}` },
          params: {
            paymentMethod: paymentGateway ? paymentGateway.toUpperCase() : "RAZORPAY",
          },
        }
      );

      // redirect to payment
      if (response.data.payment_link_url) {
        window.location.href = response.data.payment_link_url;
      } else if (response.data.payment_link_id) {
        window.location.href = response.data.payment_link_id;
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        "Failed to create order: " +
          (error.response?.data?.message || error.message)
      );
    }
  }
);

// ✅ 5. Handle Razorpay Payment Success
export const paymentSuccess = createAsyncThunk<
  any,
  { paymentId: string; jwt: string; paymentLinkId: string },
  { rejectValue: string }
>("order/paymentSuccess", async ({ paymentId, jwt, paymentLinkId }, { rejectWithValue }) => {
  try {
    const response = await api.get(`api/payment/${paymentId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
      params: { paymentLinkId },
    });
    return response.data;
  } catch (error: any) {
    console.error("Payment error:", error.response);
    return rejectWithValue(
      error.response?.data?.message || "Payment verification failed"
    );
  }
});

// ✅ 6. Cancel Order
export const cancelOrder = createAsyncThunk<
  Order,
  { orderId: number; jwt: string },
  { rejectValue: string }
>("order/cancelOrder", async ({ orderId, jwt }, { rejectWithValue }) => {
  try {
    const response = await api.put<Order>(`${API_URL}/${orderId}/cancel`, null, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to cancel order"
    );
  }
});


// ✅ Order Slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    setOrderCanceled: (state, action: PayloadAction<boolean>) => {
      state.orderCanceled = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🟡 Order History
      .addCase(fetchUserOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrderHistory.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // 🟡 Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Order creation failed";
      })

      // 🟡 Fetch Order By ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch order by ID";
      })

      // 🟡 Fetch Order Item
      .addCase(fetchOrderItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderItemById.fulfilled, (state, action) => {
        state.orderItem = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrderItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch order item";
      })

      // 🟡 Cancel Order
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderCanceled = false;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const canceledOrder = action.payload;
        state.loading = false;
        state.orderCanceled = true;
        state.orders = state.orders.map((order) =>
          order.id === canceledOrder.id ? canceledOrder : order
        );
        if (state.currentOrder?.id === canceledOrder.id) {
          state.currentOrder = canceledOrder;
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to cancel order";
        state.orderCanceled = false;
      })

      // 🟢 Payment Success
      .addCase(paymentSuccess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(paymentSuccess.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(paymentSuccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Payment failed";
      });
  },
});

export const { clearOrderError, setOrderCanceled } = orderSlice.actions;
export default orderSlice.reducer;
