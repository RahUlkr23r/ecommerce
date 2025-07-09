import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HomeCategory, HomeData } from "../../tpyes/HomeCategoryType";
import { api } from "../../Config/Api";

// ✅ Fetch home page data
export const fetchHomePageData = createAsyncThunk<HomeData>(
    'home/fetchHomePageData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<HomeData>('/home-page');
            console.log("the fetch data",response.data)
            return response.data;
          
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch home page data');
        }
    }
);


export const createHomecategories = createAsyncThunk<HomeData, HomeCategory[]>(
    'home/createHomeCategories',
    async (homeCategories, { rejectWithValue }) => {
        try {
            const response = await api.post<HomeData>('/home/categories', homeCategories);
            console.log("categories data",response.data)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create home categories');
        }
    }
);
// Define the initial state for the home slice
interface HomeState {
homeCategories:HomeCategory[];
  loading: boolean;
  error: string | null;
  homePageData: HomeData | null;
}

const initialState: HomeState = {
  loading: false,
  homeCategories:[],
  error: null,
  homePageData: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    clearHomeError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomePageData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomePageData.fulfilled, (state, action) => {
        state.loading = false;
        state.homePageData = action.payload;
      })
      .addCase(fetchHomePageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createHomecategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHomecategories.fulfilled, (state, action) => {
        state.loading = false;
        state.homePageData = action.payload;
      })
      .addCase(createHomecategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearHomeError } = homeSlice.actions;
export default homeSlice.reducer;