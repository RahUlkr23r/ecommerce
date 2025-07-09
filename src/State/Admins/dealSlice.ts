import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Deals, DealsState } from '../../tpyes/dealType';

const BASE_URL = 'http://localhost:8989/admin/deals';

// 🔐 Get Authorization header
const getAuthHeader = () => {
  const token = localStorage.getItem('jwt');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
};

// ✅ Async Thunks

// Fetch all deals
export const fetchAllDeals = createAsyncThunk(
  'deals/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/all`, getAuthHeader());
      return response.data as Deals[];
    } catch (error: any) {
      console.error("Error fetching deals:", error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch deals');
    }
  }
);

// Create a deal
export const createDeal = createAsyncThunk(
  'deals/create',
  async (deal: Deals, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}`, deal, getAuthHeader());
      console.log("Deal created successfully:", response.data);
      return response.data as Deals;
    } catch (error: any) {
      console.error("Error creating deal:", error);
      return rejectWithValue(error.response?.data?.message || 'Failed to create deal');
    }
  }
);

// Update a deal
export const updateDeal = createAsyncThunk(
  'deals/update',
  async ({ id, deal }: { id: number; deal: Deals }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${BASE_URL}/${id}`, deal, getAuthHeader());
      return response.data as Deals;
    } catch (error: any) {
      console.error("Error updating deal:", error);
      return rejectWithValue(error.response?.data?.message || 'Failed to update deal');
    }
  }
);

// Delete a deal
export const deleteDeal = createAsyncThunk<number, number>(
  'deals/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`, getAuthHeader());
      return id;
    } catch (error: any) {
      console.error("Error deleting deal:", error);
      return rejectWithValue(error.response?.data?.message || 'Failed to delete deal');
    }
  }
);

// 🧾 Initial State
const initialState: DealsState = {
  deals: [],
  loading: false,
  error: null,
  dealCreated: false,
  dealUpdated: false,
};

// 🧠 Slice
const dealSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    resetDealStatus(state) {
      state.dealCreated = false;
      state.dealUpdated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // 🔽 Fetch All
      .addCase(fetchAllDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDeals.fulfilled, (state, action: PayloadAction<Deals[]>) => {
        state.deals = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ➕ Create
      .addCase(createDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.dealCreated = false;
      })
      .addCase(createDeal.fulfilled, (state, action: PayloadAction<Deals>) => {
        state.deals.push(action.payload);
        state.loading = false;
        state.dealCreated = true;
      })
      .addCase(createDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.dealCreated = false;
      })

      // 🔁 Update
      .addCase(updateDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.dealUpdated = false;
      })
      .addCase(updateDeal.fulfilled, (state, action: PayloadAction<Deals>) => {
        const index = state.deals.findIndex(deal => deal.id === action.payload.id);
        if (index !== -1) {
          state.deals[index] = action.payload;
        }
        state.loading = false;
        state.dealUpdated = true;
      })
      .addCase(updateDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.dealUpdated = false;
      })

      // ❌ Delete
      .addCase(deleteDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDeal.fulfilled, (state, action: PayloadAction<number>) => {
        state.deals = state.deals.filter(deal => deal.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

// ✅ Export reducer and actions
export const { resetDealStatus } = dealSlice.actions;
export default dealSlice.reducer;
