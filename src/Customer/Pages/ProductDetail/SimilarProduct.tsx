import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../State/Store';
import SimilarProductCard from './SimilarProductCard';
import { CircularProgress, Typography } from '@mui/material';

interface Props {
  categoryId: number;
  productId: number;
}

const SimilarProduct: React.FC<Props> = ({ categoryId, productId }) => {
  const { products, loading, error } = useSelector((state: RootState) => state.product);

  const similarProducts = products
    .filter(p => p.category?.id === categoryId && p.id !== productId)
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" className="p-4">
        {error}
      </Typography>
    );
  }

  if (similarProducts.length === 0) {
    return (
      <Typography align="center" className="p-4">
        No similar products found.
      </Typography>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
   {similarProducts.map((product) => (
  <SimilarProductCard key={product.id} product={product} />
))}
    </div>
  );
};

export default SimilarProduct;
