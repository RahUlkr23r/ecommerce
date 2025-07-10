
import React from 'react';
import { useAppDispatch } from '../../../State/Store';
import { removeFromWishlist } from '../../../State/Customers/WishlistSlice';
import { Product } from '../../../tpyes/ProductType';
import { Favorite } from '@mui/icons-material';
import { Tooltip, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface WishlistCardProps {
  item: Product;
  onClick?: () => void; // Optional for opening quick view
}

const WishlistCard = ({ item, onClick }: WishlistCardProps) => {
  const dispatch = useAppDispatch();

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeFromWishlist({ productId: item.id }));
  };
 const navigate = useNavigate();
  return (
    <div 
      onClick={onClick}
      className="relative w-full max-w-xs bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 hover:border-gray-200"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex gap-2">
        {item.discountPercent > 0 && (
          <span className="text-xs font-bold bg-red-500 text-white px-2 py-1 rounded-full">
            {item.discountPercent}% OFF
          </span>
        )}
        {item.isNew && (
          <span className="text-xs font-bold bg-blue-500 text-white px-2 py-1 rounded-full">
            NEW
          </span>
        )}
      </div>

      {/* Product Image */}
      <div className="relative w-full aspect-[4/3] bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={item.images?.[0] || '/placeholder.png'}
          alt={item.title || 'Wishlist Item'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.png';
          }}
        />

        {/* Quick View Button */}
        <button
          onClick={() => navigate(`/product-details/${item.category}/${item.title}/${item.id}`)}
          className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
        >
          <span className="bg-white text-sm font-medium py-2 px-4 rounded-full shadow-md">
            Quick View
          </span>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <Tooltip title={item.title} placement="top" arrow>
            <h3 className="text-md font-semibold text-gray-900 line-clamp-1 flex-1">
              {item.title}
            </h3>
          </Tooltip>

          {/* Remove From Wishlist */}
          <button
            onClick={handleRemove}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors ml-2"
            aria-label="Remove from wishlist"
          >
            <Favorite className="text-red-500" fontSize="small" />
          </button>
        </div>

        {item.rating && (
          <div className="flex items-center gap-1">
            <Rating
              value={item.rating}
              precision={0.5}
              readOnly
              size="small"
            />
            <span className="text-xs text-gray-500">{item.rating}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ₹{item.sellingPrice.toFixed(2)}
          </span>
          {item.discountPercent > 0 && (
            <span className="text-sm text-gray-500 line-through">
              ₹{(item.sellingPrice / (1 - item.discountPercent / 100)).toFixed(2)}
            </span>
          )}
        </div>

        {item.description && (
          <Tooltip title={item.description} placement="top" arrow>
            <p className="text-xs text-gray-500 line-clamp-2">
              {item.description}
            </p>
          </Tooltip>
        )}

       
      </div>
    </div>
  );
};

export default WishlistCard;
