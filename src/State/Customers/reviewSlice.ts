import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { api } from "../../Config/Api";
import { Review } from "../../tpyes/reviewType";

interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
};

// ✅ Fetch all reviews by product ID
export const fetchReviewsByProductId = createAsyncThunk<Review[], number>(
  "reviews/fetchByProductId",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/reviews/product/${productId}`);
  
      return response.data;
    } catch (error: any) {

      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createReview = createAsyncThunk<
  Review,
  {jwt:string, productId: number; reviewText: string; reviewRating: number },
  { rejectValue: string }
>(
  "reviews/create",
  async ({ productId, reviewText, reviewRating }, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt"); // ✅ Read from localStorage
      if (!jwt) throw new Error("Unauthorized: No token");

      const response = await api.post(
        `/reviews/product/${productId}/create`,
        { reviewText, reviewRating },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
 
      return response.data;
    } catch (error: any) {

      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Update a review
export const updateReview = createAsyncThunk<
  Review,
  { reviewId: number; reviewText: string; reviewRating: number },
  { rejectValue: string }
>(
  "reviews/update",
  async ({ reviewId, reviewText, reviewRating }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) throw new Error("Missing JWT");

      const response = await api.put(
        `/reviews/review/${reviewId}/update`,
        { reviewText, reviewRating },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteReview = createAsyncThunk<
  number,  // reviewId
  number,
  { rejectValue: string }
>("reviews/delete", async (reviewId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwt");
    if (!token) throw new Error("Missing JWT");

    await api.delete(`/reviews/review/${reviewId}/delete`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
    return reviewId;
  } catch (error: any) {

    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// ✅ Review Slice
const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearReviews(state) {
      state.reviews = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsByProductId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsByProductId.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsByProductId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })

      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(
          (r) => r.id === action.payload.id
        );
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })

      .addCase(deleteReview.fulfilled, (state, action) => {
        // assuming delete returns productId
        state.reviews = state.reviews.filter(
          (r) => r.product.id !== action.payload
        );
      });
      
  },
});

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
