

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { api } from "../../Config/Api";
// import { Product } from "../../tpyes/ProductType"; // Ensure your Product type is correctly defined

// // Define the request type for product creation
// interface CreateProductRequest {
//   name: string;
//   price: number;
//   images: string[];
//   category: string[];
//   description: string;
//   color?: string[];
//   size?: string[];
//   stock?: number;
//   brand?: string;
//   // Add more fields if necessary
// }

// // ✅ Fetch seller products with safe error message
// export const fetchSellerProducts = createAsyncThunk<Product[], string>(
//   "sellerProduct/fetchAll",
//   async (jwt, { rejectWithValue }) => {
//     try {
//       const response = await api.get<Product[]>(`/seller/products/all`, {
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//         },
//       });
//       console.log("Fetched seller products:", response.data);
//       return response.data;
//     } catch (error: any) {
//       console.error("Error fetching seller products:", error);

//       const message =
//         error?.response?.data?.message ||
//         error?.message ||
//         "Error fetching seller products";

//       return rejectWithValue(message);
//     }
//   }
// );

// // ✅ Create product with safe error message
// export const createProduct = createAsyncThunk<
//   Product,
//   { request: CreateProductRequest; jwt: string | null }
// >("sellerProduct/create", async ({ request, jwt }, { rejectWithValue }) => {
//   try {
//     const response = await api.post<Product>(`/seller/products`, request, {
//       headers: {
//         Authorization: `Bearer ${jwt}`,
//       },
//     });
//     console.log("Product created:", response.data);
//     return response.data;
//   } catch (error: any) {
//     console.error("Error creating product:", error);

//     const message =
//       error?.response?.data?.message ||
//       error?.message ||
//       "Error creating product";

//     return rejectWithValue(message);
//   }
// });











// // Define initial state
// interface SellerProductState {
//   products: Product[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: SellerProductState = {
//   products: [],
//   loading: false,
//   error: null,
// };

// // Slice definition
// const sellerProductSlice = createSlice({
//   name: "sellerProduct",
//   initialState,
//   reducers: {
//     resetProducts: (state) => {
//       state.products = [];
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch products
//       .addCase(fetchSellerProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchSellerProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchSellerProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       // Create product
//       .addCase(createProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createProduct.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products.push(action.payload);
//         state.error = null;
//       })
//       .addCase(createProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// // Export reducer and actions
// export const { resetProducts } = sellerProductSlice.actions;
// export default sellerProductSlice.reducer;

// // Selectors
// export const selectSellerProducts = (state: any) => state.sellerProduct.products;
// export const selectSellerLoading = (state: any) => state.sellerProduct.loading;
// export const selectSellerError = (state: any) => state.sellerProduct.error;









import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";
import { Product } from "../../tpyes/ProductType";

// ---------- Types ----------

interface CreateProductRequest {
  name: string;
  price: number;
  images: string[];
  category: string[];
  description: string;
  color?: string[];
  size?: string[];
  stock?: number;
  brand?: string;
}

interface SellerProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// ---------- Initial State ----------

const initialState: SellerProductState = {
  products: [],
  loading: false,
  error: null,
};

// ---------- Thunks ----------

// ✅ 1. Fetch all seller products
export const fetchSellerProducts = createAsyncThunk<Product[], string>(
  "sellerProduct/fetchAll",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get<Product[]>(`/seller/products/all`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Error fetching seller products";
      return rejectWithValue(message);
    }
  }
);

// ✅ 2. Create new product
export const createProduct = createAsyncThunk<
  Product,
  { request: CreateProductRequest; jwt: string | null },
  { rejectValue: string }
>("sellerProduct/create", async ({ request, jwt }, { rejectWithValue }) => {
  try {
    const response = await api.post<Product>(`/seller/products`, request, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("Product created:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error creating product:", error);
    const message =
      error?.response?.data?.message || error?.message || "Error creating product";
    return rejectWithValue(message);
  }
});

// ✅ 3. Update existing product
export const updateSellerProduct = createAsyncThunk<
  Product,
  { productId: number | string; product: Partial<Product>; jwt: string | null },
  { rejectValue: string }
>("sellerProduct/update", async ({ productId, product, jwt }, { rejectWithValue }) => {
  try {
    const response = await api.put<Product>(
      `/seller/products/${productId}`,
      product,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error?.message || "Error updating product";
    return rejectWithValue(message);
  }
});

// ✅ 4. Delete product
export const deleteSellerProduct = createAsyncThunk<
  number, // productId
  { productId: number; jwt: string | null },
  { rejectValue: string }
>("sellerProduct/delete", async ({ productId, jwt }, { rejectWithValue }) => {
  try {
    await api.delete(`/seller/products/${productId}/delete`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return productId;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error?.message || "Error deleting product";
    return rejectWithValue(message);
  }
});


// ---------- Slice ----------

const sellerProductSlice = createSlice({
  name: "sellerProduct",
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.products = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Product
      .addCase(updateSellerProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSellerProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        state.products = state.products.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p
        );
        state.error = null;
      })
      .addCase(updateSellerProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Product
      .addCase(deleteSellerProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSellerProduct.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload;
        state.products = state.products.filter((p) => p.id !== deletedId);
        state.error = null;
      })
      .addCase(deleteSellerProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// ---------- Exports ----------

export const { resetProducts } = sellerProductSlice.actions;
export default sellerProductSlice.reducer;

// ---------- Selectors ----------

export const selectSellerProducts = (state: any) => state.sellerProduct.products;
export const selectSellerLoading = (state: any) => state.sellerProduct.loading;
export const selectSellerError = (state: any) => state.sellerProduct.error;
