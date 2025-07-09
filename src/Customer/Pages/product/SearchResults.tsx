import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { searchProduct, clearSearchResults } from '../../../State/Customers/ProductSlice';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import ProductCard from '../product/ProductCard'; // Adjust path as per your structure

const SearchResults = () => {
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();
  const query = params.get('q') || '';

  const { searchResults, loading, error } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (query) {
      dispatch(searchProduct(query));
    }

    return () => {
      dispatch(clearSearchResults());
    };
  }, [dispatch, query]);

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (searchResults.length === 0) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography>No products found for: "{query}"</Typography>
      </Box>
    );
  }

  return (
    <Box px={{ xs: 2, sm: 4, md: 8 }} py={5}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Search Results for: "<span style={{ color: '#00927c' }}>{query}</span>"
      </Typography>

      <Grid container spacing={3}>
        {searchResults.map((product) => {
          // Ensure required properties exist, provide defaults if missing
          const safeProduct = {
            id: String(product.id),
            title: product.title ?? '',
            price: product.mrpPrice ?? 0,
            sellingPrice: product.sellingPrice ?? 0,
            originalPrice: product.sellingPrice ?? 0,
            discount: product.discountPercent ?? 0,
            rating: product.rating ?? 0,
            reviews: Array.isArray(product.reviews) ? product.reviews.length : (typeof product.reviews === 'number' ? product.reviews : 0),
            colors: product.colors ?? [],
            sizes: product.sizes ?? [],
            isNew: product.isNew ?? false,
            images: product.images ?? [],
            category: { categoryId: String(product.category?.id ?? '') },
          };
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={safeProduct.id}>
              <ProductCard product={safeProduct} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SearchResults;
