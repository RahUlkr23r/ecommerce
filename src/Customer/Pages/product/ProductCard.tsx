// import './ProductCard.css'
// import React from 'react'

// const images = [
//   "https://img.freepik.com/free-psd/blonde-girl-black-t-shirt-white-background-mock-up_1142-53191.jpg?w=740",
//   "https://img.freepik.com/free-psd/young-asian-woman-wearing-blank-black-t-shirt-isolated-white-background_1142-53176.jpg?w=740",
//   "https://img.freepik.com/free-psd/blonde-girl-black-t-shirt-isolated-white-background_1142-61395.jpg?w=740",
//   "https://img.freepik.com/free-psd/asian-woman-wearing-blank-white-t-shirt-isolated-white-background_1142-53870.jpg?w=740"
// ];

// const ProductCard = () => {
//   return (
//     <div className='group px-8 relative'>
//       <div className='card'>
//         <img className='card-media object-top' src={images[0]} alt='Front View' />
//         <img className='card-media object-top' src={images[1]} alt='Hover View' />
//         <img className='card-media object-top' src={images[3]} alt='Front View' />

//       </div>
//     </div>
//   );
// }

// export default ProductCard;

// import React, { useState, useEffect } from 'react';
// import { FiHeart, FiStar } from 'react-icons/fi';
// import './ProductCard.css';

// const ProductCard = () => {
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   const images = [
//     "https://img.freepik.com/free-psd/blonde-girl-black-t-shirt-white-background-mock-up_1142-53191.jpg?w=740",
//     "https://img.freepik.com/free-psd/young-asian-woman-wearing-blank-black-t-shirt-isolated-white-background_1142-53176.jpg?w=740",
//     "https://img.freepik.com/free-psd/blonde-girl-black-t-shirt-isolated-white-background_1142-61395.jpg?w=740",
//     "https://img.freepik.com/free-psd/asian-woman-wearing-blank-white-t-shirt-isolated-white-background_1142-53870.jpg?w=740"
//   ];

//   const product = {
//     title: 'Premium Cotton T-Shirt',
//     price: 1299,
//     originalPrice: 1999,
//     discount: 35,
//     rating: 4.5,
//     reviews: 128,
//     colors: ['black', 'navy', 'white'],
//     sizes: ['S', 'M', 'L', 'XL'],
//     isNew: true
//   };

//   // Auto-rotate images when hovered
//   useEffect(() => {
//     let interval: ReturnType<typeof setInterval>;
    
//     if (isHovered) {
//       interval = setInterval(() => {
//         setCurrentImageIndex(prev => (prev + 1) % images.length);
//       }, 1000); // Change image every 3 seconds
//     }
    
//     return () => clearInterval(interval);
//   }, [isHovered, images.length]);

//   return (
//     <div
//       className="product-card group"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => {
//         setIsHovered(false);
//         setCurrentImageIndex(0); // Reset to first image when mouse leaves
//       }}
//     >
//       {/* Badges */}
//       <div className="badges-container">
//         {product.isNew && <span className="new-badge">New</span>}
//         {product.discount && <span className="discount-badge">-{product.discount}%</span>}
//       </div>

//       {/* Wishlist Button */}
//       <button
//         className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
//         onClick={() => setIsWishlisted(!isWishlisted)}
//         aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
//       >
//         <FiHeart />
//       </button>

//       {/* Image Gallery with Smooth Transitions */}
//       <div className="image-gallery">
//         {images.map((image, index) => (
//           <div
//             key={index}
//             className={`image-container ${index === currentImageIndex ? 'active' : ''}`}
//             style={{ backgroundImage: `url(${image})` }}
//           />
//         ))}
        
//         {/* Navigation Dots */}
//         <div className="image-nav-dots">
//           {images.map((_, index) => (
//             <button
//               key={index}
//               className={`nav-dot ${index === currentImageIndex ? 'active' : ''}`}
//               onClick={() => setCurrentImageIndex(index)}
//               aria-label={`View image ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Product Info */}
//       <div className="product-info">
//         <h3 className="product-title">{product.title}</h3>

//         {/* Rating */}
//         <div className="rating-container">
//           <div className="stars">
//             {[...Array(5)].map((_, i) => (
//               <FiStar key={i} className={i < Math.floor(product.rating) ? 'filled' : ''} />
//             ))}
//           </div>
//           <span className="review-count">({product.reviews})</span>
//         </div>

//         {/* Color Options */}
//         <div className="color-options">
//           {product.colors.map((color, i) => (
//             <button
//               key={i}
//               className="color-option"
//               style={{ backgroundColor: color }}
//               aria-label={`Color option ${color}`}
//             />
//           ))}
//         </div>

//         {/* Price */}
//         <div className="price-container">
//           <span className="current-price">₹{product.price.toLocaleString()}</span>
//           <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;


















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
