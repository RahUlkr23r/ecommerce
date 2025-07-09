import {
  Box,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
  Pagination,
  PaginationItem,
  CircularProgress,
  Typography,
} from '@mui/material';
import {
  FilterAlt,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchAllProducts } from '../../../State/Customers/ProductSlice';
import { useParams, useSearchParams } from 'react-router-dom';
import FilterSection from './Filter/FilterSection';
import ProductCard from './ProductCard';

const Product = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
  const dispatch = useAppDispatch();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sort, setSort] = useState('relevance');
  const [page, setPage] = useState(1);

  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const { products, totalPages, loading, error } = useAppSelector((state) => state.product);

  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
    setPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const priceRange = searchParams.get("price")?.split("-");
    const minPrice = priceRange?.[0] ? Number(priceRange[0]) : undefined;
    const maxPrice = priceRange?.[1] ? Number(priceRange[1]) : undefined;

    const urlFilters = Object.fromEntries(searchParams.entries());

    const filters = {
      ...urlFilters,
      category,
      pageNumber: page - 1,
      sort,
      minPrice,
      maxPrice,
    };

    dispatch(fetchAllProducts(filters));
  }, [category, page, sort, searchParams, dispatch]);

  const categoryName =
    products[0]?.category?.categoryId ||
    category?.replace (/-/, ' ').toLowerCase() ||
    'Products';

  return (
    <Box className="mt-5 px-4 sm:px-6 lg:px-8">
      <Typography
        variant="h6"
        component="h6"
        className="text-center text-teal-500 pb-5 uppercase text-xl sm:text-l md:text-2xl lg:text-xl"
      >
        {categoryName}
      </Typography>

      <Box className="lg:flex gap-6">
        {/* Desktop Sidebar Filter */}
        {isLarge && (
          <Box component="aside" className="w-full lg:w-1/4">
            <FilterSection />
          </Box>
        )}

        <Box component="main" className="w-full lg:w-3/4 space-y-5">
          {/* Mobile Filter & Sort */}
          {!isLarge && (
            <Box className="flex items-center justify-between mb-4">
              <IconButton
                onClick={() => setDrawerOpen(true)}
                size="large"
                aria-label="Open filters"
              >
                <FilterAlt />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box className="w-72 p-4">
                  <FilterSection />
                </Box>
              </Drawer>

              <FormControl size="small" className="w-2/3">
                <InputLabel id="sort-label">Sort By</InputLabel>
                <Select
                  labelId="sort-label"
                  id="sort-select"
                  value={sort}
                  label="Sort By"
                  onChange={handleSortChange}
                >
                  <MenuItem value="relevance">Relevance</MenuItem>
                  <MenuItem value="price_low">Price: Low to High</MenuItem>
                  <MenuItem value="price_high">Price: High to Low</MenuItem>
                  <MenuItem value="newest">Newest Arrivals</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}

          {/* Desktop Sort */}
          {isLarge && (
            <Box className="flex justify-end mb-4">
              <FormControl size="small" className="w-1/4">
                <InputLabel id="sort-label">Sort By</InputLabel>
                <Select
                  labelId="sort-label"
                  id="sort-select"
                  value={sort}
                  label="Sort By"
                  onChange={handleSortChange}
                >
                  <MenuItem value="relevance">Relevance</MenuItem>
                  <MenuItem value="price_low">Price: Low to High</MenuItem>
                  <MenuItem value="price_high">Price: High to Low</MenuItem>
                  <MenuItem value="newest">Newest Arrivals</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}

          <Divider />

          {/* Product List */}
          {error ? (
            <Typography color="error" className="text-center">
              Error loading products: {error}
            </Typography>
          ) : loading ? (
            <Box className="text-center">
              <CircularProgress />
            </Box>
          ) : products.length === 0 ? (
            <Typography className="text-center">
              No products found. Try adjusting your filters.
            </Typography>
          ) : (
            <>
              <Box className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      id: product.id.toString(),
                      title: product.title,
                      price: product.sellingPrice,
                      sellingPrice: product.sellingPrice,
                      originalPrice: product.mrpPrice,
                      discount:
                        product.discountPercent ??
                        Math.round(
                          ((product.mrpPrice - product.sellingPrice) / product.mrpPrice) * 100
                        ),
                   rating:
  Array.isArray(product.reviews) && product.reviews.length > 0
    ? product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / product.reviews.length
    : 0,
reviews: Array.isArray(product.reviews) ? product.reviews.length : 0,

                      colors: Array.isArray(product.colors) ? product.colors : [],
                      sizes:
                        Array.isArray(product.sizes)
                          ? product.sizes
                          : typeof product.sizes === 'string'
                          ? [product.sizes]
                          : [],
                      isNew: product.isNew ?? false,
                      images: Array.isArray(product.images) ? product.images : [],
                      category: {
                        categoryId:
                          product.category?.id?.toString() ??
                          product.category?.toString() ??
                          'unknown',
                      },
                    }}
                  />
                ))}
              </Box>

              {/* Pagination */}
              {totalPages > 1 && (
                <Box className="flex justify-center mt-6">
                  <Pagination
                    page={page}
                    onChange={handlePageChange}
                    count={totalPages}
                    shape="rounded"
                    color="primary"
                    renderItem={(item) => (
                      <PaginationItem
                        slots={{
                          previous: ArrowBackIcon,
                          next: ArrowForwardIcon,
                        }}
                        {...item}
                      />
                    )}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
