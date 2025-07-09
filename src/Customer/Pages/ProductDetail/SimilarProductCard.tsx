import React, { useState, useEffect } from 'react';
import { FiHeart, FiStar } from 'react-icons/fi';
import { Product } from '../../../tpyes/ProductType'; // Adjust path if needed
import '../product/ProductCard.css';
import { useNavigate } from 'react-router-dom';

interface Props {
  product: Product;
}

const SimilarProductCard: React.FC<Props> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = product.images || [];
  const navigate = useNavigate();

  const reviewCount = product.reviews?.length || 0;
  const averageRating = reviewCount
    ? (
        product.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
      ).toFixed(1)
    : '0.0';

  // Auto-rotate images on hover
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  return (
    <div
      onClick={() =>
        navigate(`/product-details/${product.category}/${product.title}/${product.id}`)
      }
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
    >
      {/* Wishlist Button */}
      <button
        className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsWishlisted(!isWishlisted);
        }}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <FiHeart />
      </button>

      {/* Image Gallery */}
      <div className="image-gallery">
        {images.map((image, index) => (
          <div
            key={index}
            className={`image-container ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}

        {/* Dots */}
        <div className="image-nav-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`nav-dot ${index === currentImageIndex ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(index);
              }}
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
              <FiStar
                key={i}
                className={i < Math.floor(Number(averageRating)) ? 'filled' : ''}
              />
            ))}
          </div>
          <span className="review-count">({averageRating} / {reviewCount})</span>
        </div>

        {/* Price */}
        <div className="price-container">
          <span className="current-price">₹{product.sellingPrice.toLocaleString()}</span>
          <span className="original-price">₹{product.mrpPrice.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default SimilarProductCard;
