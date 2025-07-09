import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../Config/Api'; // Axios instance
import { HomeCategory } from '../../tpyes/HomeCategoryType';

interface AdminState {
  homeCategories: HomeCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  homeCategories: [],
  loading: false,
  error: null,
};

// ✅ Fetch all home categories (with JWT)
export const fetchAllHomeCategories = createAsyncThunk(
  'admin/fetchAllHomeCategories',
  async (jwt: string, thunkAPI) => {
    try {
      const response = await api.get('/admin/home-category', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

// ✅ Update home category (with JWT)
export const updateHomeCategory = createAsyncThunk(
  'admin/updateHomeCategory',
  async (
    {
      id,
      data,
      jwt,
    }: {
      id: number;
      data: HomeCategory;
      jwt: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await api.patch(`/admin/home-category/${id}`, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update category');
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchAllHomeCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllHomeCategories.fulfilled,
        (state, action: PayloadAction<HomeCategory[]>) => {
          state.homeCategories = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchAllHomeCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE
      .addCase(updateHomeCategory.fulfilled, (state, action: PayloadAction<HomeCategory>) => {
        const index = state.homeCategories.findIndex(
          (cat) => cat.id === action.payload.id
        );
        if (index !== -1) {
          state.homeCategories[index] = action.payload;
        }
      })
      .addCase(updateHomeCategory.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default adminSlice.reducer;
