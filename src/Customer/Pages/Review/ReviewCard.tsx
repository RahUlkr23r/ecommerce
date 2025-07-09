import React, { useState, useEffect } from 'react';
import {
  StarBorder, Delete, Edit
} from '@mui/icons-material';
import {
  Rating,
  Button,
  TextField,
  Avatar,
  Typography,
  Box,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import {
  fetchReviewsByProductId,
  createReview,
  updateReview,
  deleteReview
} from '../../../State/Customers/reviewSlice';
import { Review } from '../../../tpyes/reviewType';

interface ReviewCardProps {
  productId: number;
  currentUserId?: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ productId, currentUserId }) => {
  const dispatch = useAppDispatch();
  const { reviews, loading: reviewsLoading, error: reviewsError } = useAppSelector((state) => state.review);

  const [showAll, setShowAll] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchReviewsByProductId(productId));
  }, [dispatch, productId]);

  const handleReviewSubmit = async () => {
    if (!newReview.comment.trim() || newReview.rating === 0) {
      alert('Please provide a rating and comment.');
      return;
    }

    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      alert('You must be logged in to submit a review.');
      return;
    }

    setIsSubmitting(true);
    try {
    if (editingReviewId) {
  await dispatch(updateReview({
    reviewId: editingReviewId,
    reviewText: newReview.comment,
    reviewRating: newReview.rating,
  })).unwrap();
} else {
        await dispatch(createReview({
          productId,
          reviewText: newReview.comment,
          reviewRating: newReview.rating,
          jwt: '', // Thunk reads JWT internally
        })).unwrap();
      }
      setNewReview({ rating: 0, comment: '' });
      setEditingReviewId(null);
      dispatch(fetchReviewsByProductId(productId));
    } catch (error) {
      console.error("Review submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (reviewId: number) => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      alert("You must be logged in to delete a review.");
      return;
    }
    try {
      await dispatch(deleteReview(reviewId)).unwrap();
      dispatch(fetchReviewsByProductId(productId));
    } catch (error) {
      console.error("Review delete failed:", error);
    }
  };

  const handleEdit = (review: Review) => {
    setNewReview({
      rating: review.rating,
      comment: review.reviewText
    });
    setEditingReviewId(review.id);
  };

  const visibleReviews = showAll ? reviews : reviews.slice(0, 2);
  const productRating = reviews.length
    ? reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length
    : 0;

  if (reviewsLoading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (reviewsError) {
    return (
      <Typography color="error" align="center">
        Error loading reviews: {reviewsError}
      </Typography>
    );
  }

  return (
    <Box sx={{ width: '100%', px: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 4 }}>
        {/* Rating Summary */}
        <Box sx={{ width: { md: '30%' }, bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 1 }}>
          <Box textAlign="center" mb={2}>
            <Typography variant="h3" component="span" fontWeight="bold">
              {productRating.toFixed(1)}
            </Typography>
            <Typography variant="h6" component="span" color="text.secondary"> / 5</Typography>
          </Box>
          <Box display="flex" justifyContent="center" mb={2}>
            <Rating value={productRating} precision={0.1} readOnly size="large" emptyIcon={<StarBorder />} />
          </Box>
          <Typography variant="body2" color="text.secondary" align="center" mb={3}>
            Based on {reviews.length} rating{reviews.length !== 1 && 's'}
          </Typography>
          <Button fullWidth variant="outlined" onClick={() => {
            const form = document.getElementById('review-form');
            if (form) form.scrollIntoView({ behavior: 'smooth' });
          }}>
            Write a Review
          </Button>
        </Box>

        {/* Reviews List */}
        <Box sx={{ width: { md: '70%' } }}>
          <Box display="flex" flexDirection="column" gap={3}>
            {reviews.length === 0 ? (
              <Typography variant="body1" color="text.secondary" align="center">
                No reviews yet.
              </Typography>
            ) : (
              visibleReviews.map((review) => (
                <Box key={review.id} sx={{
                  border: 1, borderColor: 'divider', p: 3, borderRadius: 2,
                  bgcolor: 'background.paper', position: 'relative'
                }}>
                  <Box display="flex" justifyContent="space-between" mb={2} flexWrap="wrap" gap={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar sx={{ width: 32, height: 32 }} />
                      <Typography variant="subtitle2" fontWeight="medium">
                        {review.user?.fullname || 'Anonymous'}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(review.createAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Rating value={review.rating} precision={0.5} readOnly size="small" emptyIcon={<StarBorder />} />
                  <Typography variant="body1" mt={1}>{review.reviewText}</Typography>

                  {currentUserId === review.user?.id && (
                    <Box position="absolute" top={8} right={8} display="flex" gap={0.5}>
                      <IconButton onClick={() => handleEdit(review)} size="small"><Edit fontSize="small" /></IconButton>
                      <IconButton onClick={() => handleDelete(review.id)} size="small" color="error">
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              ))
            )}
            {!showAll && reviews.length > 2 && (
              <Button onClick={() => setShowAll(true)} sx={{ alignSelf: 'flex-start' }}>
                Load More Reviews
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {/* Review Form */}
      <Box sx={{ mt: 6 }} id="review-form">
        <Typography variant="h6" fontWeight="bold" mb={3}>
          {editingReviewId ? 'Edit Your Review' : 'Write a Review'}
        </Typography>
        <Box mb={2}>
          <Typography variant="subtitle2" mb={1}>Your Rating</Typography>
          <Rating
            value={newReview.rating}
            onChange={(_, value) => setNewReview({ ...newReview, rating: value ?? 0 })}
            size="large"
            precision={0.5}
          />
        </Box>
        <TextField
          label="Your Review"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          sx={{ mb: 2 }}
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
        />
        <Box display="flex" justifyContent="flex-end" gap={2}>
          {editingReviewId && (
            <Button variant="outlined" onClick={() => {
              setEditingReviewId(null);
              setNewReview({ rating: 0, comment: '' });
            }}>
              Cancel
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleReviewSubmit}
            disabled={isSubmitting || !newReview.comment.trim() || newReview.rating === 0}
          >
            {isSubmitting ? <CircularProgress size={24} /> : editingReviewId ? 'Update Review' : 'Submit Review'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewCard;
