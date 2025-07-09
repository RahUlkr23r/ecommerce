// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Wishlist, WishlistState } from '../../tpyes/WishlistType';
// import { api } from '../../Config/Api';

// // Initial state
// const initialState: WishlistState = {
//   wishlist: null,
//   loading: false,
//   error: null,
// };

// // ✅ Fetch wishlist
// export const getWishlistByUserId = createAsyncThunk(
//   "wishlist/getWishlistByUserId",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('jwt');
//       const response = await api.get('/api/wishlist', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//      console.log("Wishlist data:", response.data);

//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error?.response?.data?.message || "Failed to fetch wishlist"
//       );
//     }
//   }
// );

// // ✅ Add product to wishlist
// export const addToWishlist = createAsyncThunk<Wishlist, { productId: number }, { rejectValue: string }>(
//   "wishlist/addToWishlist",
//   async ({ productId }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('jwt');
//       const response = await api.post(`api/wishlist/add-product/${productId}`, null, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//        console.log("added to  wishlist:", response.data);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error?.response?.data?.message || "Failed to add to wishlist"
//       );
//     }
//   }
// );

// // ✅ Wishlist slice
// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState,
//   reducers: {
//     resetWithState: (state) => {
//       state.wishlist = null;
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder

//       // 🔄 Fetch wishlist
//       .addCase(getWishlistByUserId.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getWishlistByUserId.fulfilled, (state, action) => {
//         state.loading = false;
//         state.wishlist = action.payload;
//       })
//       .addCase(getWishlistByUserId.rejected, (state, action) => {
//         state.loading = false;
//         state.error = (action.payload as string) || "Failed to load wishlist";
//       })

//       // ➕ Add to wishlist
//       .addCase(addToWishlist.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addToWishlist.fulfilled, (state, action: PayloadAction<Wishlist>) => {
//         state.loading = false;
//         state.wishlist = action.payload;
//       })
//       .addCase(addToWishlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to add to wishlist";
//       });
//   },
// });

// export const { resetWithState } = wishlistSlice.actions;
// export default wishlistSlice.reducer;





import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Wishlist, WishlistState } from '../../tpyes/WishlistType';
import { api } from '../../Config/Api';

// ✅ Initial state
const initialState: WishlistState = {
  wishlist: null,
  loading: false,
  error: null,
};

// ✅ Fetch wishlist
export const getWishlistByUserId = createAsyncThunk(
  'wishlist/getWishlistByUserId',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await api.get('/api/wishlist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Wishlist data:', response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to fetch wishlist'
      );
    }
  }
);

// ✅ Add product to wishlist
export const addToWishlist = createAsyncThunk<
  Wishlist,
  { productId: number },
  { rejectValue: string }
>(
  'wishlist/addToWishlist',
  async ({ productId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await api.post(
        `api/wishlist/add-product/${productId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Added to wishlist:', response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to add to wishlist'
      );
    }
  }
);

// ✅ Remove product from wishlist
export const removeFromWishlist = createAsyncThunk<
  Wishlist,
  { productId: number },
  { rejectValue: string }
>(
  'wishlist/removeFromWishlist',
  async ({ productId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await api.get(
        `/api/wishlist/remove?productId=${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Removed from wishlist:', response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to remove from wishlist'
      );
    }
  }
);

// ✅ Wishlist slice
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    resetWithState: (state) => {
      state.wishlist = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔄 Get wishlist
      .addCase(getWishlistByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishlistByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(getWishlistByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to load wishlist';
      })

      // ➕ Add to wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action: PayloadAction<Wishlist>) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add to wishlist';
      })

      // ➖ Remove from wishlist
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action: PayloadAction<Wishlist>) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to remove from wishlist';
      });
  },
});

export const { resetWithState } = wishlistSlice.actions;
export default wishlistSlice.reducer;

// ✅ Export thunks

