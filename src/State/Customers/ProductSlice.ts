import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";
import { Product } from "../../tpyes/ProductType";

const API_URL = "/products";

interface FetchProductsParams {
  categoryId?: string;
  pageNumber?: number;
  pageSize?: number;
  [key: string]: any;
}

interface ProductsResponse {
  content: Product[];
  totalPages: number;
}

// ✅ Fetch product by ID
export const fetchProductById = createAsyncThunk<Product, string>(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${productId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Fetch products by category ID
export const fetchProductsByCategory = createAsyncThunk<ProductsResponse, string>(
  "products/fetchByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/category/${categoryId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const searchProduct = createAsyncThunk<Product[], string>(
  "products/searchProduct",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get<Product[]>(`/products/search`, {
        params: { q: query }, // 👈 Correct key is 'q' not 'query'
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// ✅ Fetch all products (paginated + filters)
export const fetchAllProducts = createAsyncThunk<ProductsResponse, FetchProductsParams>(
  "products/fetchAllProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL, {
        params: {
          pageNumber: params.pageNumber || 0,
          pageSize: params.pageSize || 10,
          ...params,
        },
      });
      console.log("fetching all the product ", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching all products:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ State definition
interface ProductState {
  product: Product | null;
  products: Product[];
  categoryProducts: Product[];
  totalPages: number;
  loading: boolean;
  error: string | null;
  searchResults: Product[];
}

const initialState: ProductState = {
  product: null,
  products: [],
  categoryProducts: [],
  totalPages: 1,
  loading: false,
  error: null,
  searchResults: [],
};

// ✅ Slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
      state.totalPages = 1;
    },
    clearCategoryProducts: (state) => {
      state.categoryProducts = [];
    },
    clearProduct: (state) => {
      state.product = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ fetchProductsByCategory
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProducts = action.payload.content;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ searchProduct
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
        // Optionally reset totalPages or leave as is, since searchProduct returns only Product[]
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ fetchAllProducts
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.content;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// ✅ Export actions
export const {
  clearProducts,
  clearCategoryProducts,
  clearProduct,
  clearSearchResults,
  clearError,
} = productSlice.actions;

// ✅ Export reducer
export default productSlice.reducer;
