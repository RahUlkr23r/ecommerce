
import React, { useState, useEffect } from 'react';
import { FiHeart, FiStar } from 'react-icons/fi';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../State/Store';
import { addToWishlist } from '../../../State/Customers/WishlistSlice';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    price: number;
    sellingPrice:number;
    originalPrice: number;
    discount: number;
    rating: number;
    reviews: number;
    colors: string[];
    sizes: string[];
    isNew: boolean;
    images: string[];
    category: {
      categoryId: string;
    };
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
const dispatch = useAppDispatch();
const navigate = useNavigate()
  // Auto-rotate images when hovered
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % product.images.length);
      }, 1000); // Change image every 3 seconds
    }
    
    return () => clearInterval(interval);
  }, [isHovered, product.images.length]);

 const handleWishlist = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.stopPropagation()
   dispatch(addToWishlist({ productId: Number(product.id) || 1 }));
 }


  return (
   <div onClick={() =>
  navigate(`/product-details/${product.category?.categoryId}/${product.title}/${product.id}`)
}
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0); // Reset to first image when mouse leaves
      }}
    >
      {/* Badges */}
      <div className="badges-container">
        {product.isNew && <span className="new-badge">New</span>}
        {product.discount > 0 && <span className="discount-badge">-{product.discount}%</span>}
      </div>

      {/* Wishlist Button */}
      <button
        className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
        onClick={(e) => handleWishlist(e)}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <FiHeart />
      </button>

      {/* Image Gallery with Smooth Transitions */}
      <div className="image-gallery">
        {product.images.map((image, index) => (
          <div
            key={index}
            className={`image-container ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        
        {/* Navigation Dots */}
        <div className="image-nav-dots">
          {product.images.map((_, index) => (
            <button
              key={index}
              className={`nav-dot ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>

        {/* Rating */}
        <div className="rating-container">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className={i < Math.floor(product.rating) ? 'filled' : ''} />
            ))}
          </div>
          <span className="review-count">({product.reviews})</span>
        </div>

        {/* Color Options */}
        <div className="color-options">
          {product.colors.map((colors, i) => (
            <button
              key={i}
              className="color-option"
              style={{ backgroundColor: colors }}
              aria-label={`Color option ${colors}`}
            />
          ))}
        </div>

        {/* Price */}
        <div className="price-container">
          <span className="current-price">₹{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
          )}
            {product.sellingPrice > product.price && (
            <span className="original-price">₹{product.sellingPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
