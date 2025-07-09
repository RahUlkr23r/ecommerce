// import { Add, LocalShipping, ProductionQuantityLimits, Remove, Shield, Star, Wallet, WorkspacePremium } from '@mui/icons-material';
// import { Button, Divider, IconButton } from '@mui/material';
// import { teal } from '@mui/material/colors';
// import React, { useState } from 'react';


// const ProductDetail = () => {
//   const [quantity, setQuantity] = useState(1);
//   return (
//     <div className="px-5 lg:px-20 pt-10">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//         <section className="flex flex-col lg:flex-row gap-5">
//           {/* Thumbnail Images */}
//           <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
//             {[1, 2, 3, 4].map((item, index) => (
//               <img
//                 key={index}
//                 src="https://img.freepik.com/free-psd/blonde-girl-black-t-shirt-white-background-mock-up_1142-53191.jpg?w=740"
//                 alt={`Product thumbnail ${index + 1}`}
//                 className="rounded-md w-full  w-[50px] cursor-pointer"
//               />
//             ))}
//           </div>

//           {/* Main Image */}
//           <div className="w-full lg:w-[85%]">
//             <img
//               className="w-full rounded-md"
//               src="https://img.freepik.com/free-psd/blonde-girl-black-t-shirt-white-background-mock-up_1142-53191.jpg?w=740"
//               alt="Main product"
//             />
//           </div>
//         </section>
//         <section>
// <h1 className='font-bold text-lg text-teal-600'>
//   JuhiCollection
// </h1>
// <p className='text-gray-500 font-semibold'>women T-Shirt</p>
// <div className='flex justy-between item-center  py-3 border w-[160px] px-3 mt-5'>
//   <div className='flex gap-1 item-center'>
//     <span>4</span>
//    <Star sx={{color:teal[500],fontSize:"16px"}}></Star>

//   </div>
// <Divider orientation='vertical' flexItem/>
// <span> 566 Ratings</span>

// </div>
// <div> 
//   <div className="price flex items-center gap-3 text-2xl">
//     <span className="font-sans text-gray-800">
//       ₹ 400
//     </span>
//     <span className="line-through text-red-400">
//       ₹ 999
//     </span>
//     <span className="text-teal-600 font-semibold">
//       60% OFF
//     </span>
//   </div>
//   <p className="text-sm text-green-600 mt-1">
//     Inclusive of all taxes. Free Shipping above ₹ 499
//   </p>
// </div>
// <div className='mt-7 space-y-3'>
//   <div className='flex items-center gap-4'>
//     <Shield  sx={{color:teal[500]}}/>
//     <p>Authentic & Quality Assured</p>
//   </div>
//   <div className='flex items-center gap-4'>
//     <WorkspacePremium  sx={{color:teal[900]}}/>
//     <p>100% money back guarantes</p>
//   </div>
//   <div className='flex items-center gap-4'>
//     <LocalShipping  sx={{color:teal[800]}}/>
//     <p>Free Shipping & returns</p>
//   </div>
//   <div className='flex items-center gap-4'>
//     < Wallet sx={{color:teal[700]}}/>
//     <p>Pay on delivery might be available</p>
//   </div>

// </div>
// <div className="mt-7 space-y-3">
//   <h1 className="text-sm font-semibold text-gray-700">QUANTITY</h1>
  
//   <div className="flex items-center w-fit gap-4 border rounded-xl px-3 py-1 shadow-sm bg-white">
//     <IconButton
//       size="small"
//       disabled={quantity === 1}
//       onClick={() => setQuantity(quantity - 1)}
//       className="!text-teal-600 disabled:!text-gray-300 transition-all"
//     >
//       <Remove />
//     </IconButton>

//     <span className="text-lg font-semibold text-gray-800 min-w-[24px] text-center">
//       {quantity}
//     </span>

//     <IconButton
//       size="small"
//       disabled={quantity === 10}
//       onClick={() => setQuantity(quantity + 1)}
//       className="!text-teal-600 transition-all hover:scale-110"
//     >
//       <Add />
//     </IconButton>
//   </div>
// </div>


//         </section>
//       </div>
    
//     </div>
//   );
// };

// export default ProductDetail;
// import React, { useState, useEffect } from 'react';
// import {
//   Add,
//   Favorite,
//   FavoriteBorder,
//   LocalShipping,
//   Remove,
//   Shield,
//   Star,
//   StarBorder,
//   Wallet,
//   WorkspacePremium,
//   ShoppingCart,
//   Share,
//   CheckCircle,
//   ExpandMore,
//   ArrowBack,
//   ArrowForward,
//   Close
// } from '@mui/icons-material';
// import { 
//   Button, 
//   Divider, 
//   IconButton, 
//   Chip, 
//   Tabs, 
//   Tab, 
//   Box, 
//   Rating, 
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Snackbar,
//   Alert,
//   Typography,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Tooltip,
//   CircularProgress
// } from '@mui/material';
// import { teal, grey, red } from '@mui/material/colors';
// import Zoom from 'react-medium-image-zoom';
// import 'react-medium-image-zoom/dist/styles.css';

// const ProductDetail = () => {
//   // State management
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [wishlisted, setWishlisted] = useState(false);
//   const [tabValue, setTabValue] = useState(0);
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);
//   const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);

//   // Product data
//   const productImages = [
//     "https://img.freepik.com/free-psd/blonde-girl-black-t-shirt-white-background-mock-up_1142-53191.jpg",
//     "https://img.freepik.com/free-photo/smiling-young-pretty-girl-wearing-headphones-neck-doing-peace-sign_141793-117122.jpg",
//     "https://img.freepik.com/free-photo/pleased-young-pretty-woman-looking-front-doing-peace-sign-isolated-olive-green-wall_141793-109830.jpg",
//     "https://img.freepik.com/free-photo/pleased-young-pretty-girl-looking-side-pointing-up-isolated-orange-wall_141793-112458.jpg"
//   ];

//   const availableColors = [
//     { name: 'Black', value: '#000000', image: productImages[0] },
//     { name: 'White', value: '#FFFFFF', image: productImages[1] },
//     { name: 'Red', value: '#FF0000', image: productImages[2] },
//     { name: 'Blue', value: '#0000FF', image: productImages[3] },
//   ];

//   const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

//   const productDetails = {
//     brand: "JuhiCollection",
//     title: "Women's Premium Cotton T-Shirt",
//     price: 400,
//     originalPrice: 999,
//     discount: 60,
//     rating: 4.2,
//     ratingsCount: 566,
//     reviews: [
//       {
//         rating: 5,
//         comment: "Great quality! Very soft material and fits perfectly.",
//         author: "Sneha",
//         date: "2 days ago",
//         verified: true
//       },
//       {
//         rating: 4,
//         comment: "Good fabric but the color is slightly different than shown.",
//         author: "Priya",
//         date: "1 week ago",
//         verified: false
//       }
//     ],
//     description: "This women's t-shirt offers premium cotton fabric with a stylish fit and lasting comfort.",
//     features: [
//       "100% Premium Cotton - Soft and breathable",
//       "Machine Washable - Easy care",
//       "Regular Fit - Comfortable for all-day wear"
//     ],
//     sizeGuide: {
//       title: "Women's T-Shirt Size Guide (in inches)",
//       measurements: [
//         { size: 'XS', chest: '32-34', length: '24' },
//         { size: 'S', chest: '34-36', length: '25' },
//         { size: 'M', chest: '36-38', length: '26' },
//         { size: 'L', chest: '38-40', length: '27' },
//         { size: 'XL', chest: '40-42', length: '28' },
//         { size: 'XXL', chest: '42-44', length: '29' }
//       ],
//       note: "Measure around the fullest part of your chest."
//     },
//     deliveryInfo: [
//       { icon: <LocalShipping />, text: "Free delivery on orders over ₹499" },
//       { icon: <CheckCircle />, text: "Usually delivered in 3-5 working days" }
//     ]
//   };

//   // Event handlers
//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue);
//   };

//   const handleAddToCart = () => {
//     if (!selectedSize) {
//       setSnackbarMessage('Please select a size first');
//       setSnackbarOpen(true);
//       return;
//     }
//     if (!selectedColor) {
//       setSnackbarMessage('Please select a color first');
//       setSnackbarOpen(true);
//       return;
//     }
    
//     setIsAddingToCart(true);
//     setTimeout(() => {
//       const colorName = availableColors.find(c => c.value === selectedColor)?.name || selectedColor;
//       setSnackbarMessage(`Added ${quantity} ${productDetails.title} (Size: ${selectedSize}, Color: ${colorName}) to cart`);
//       setSnackbarOpen(true);
//       setIsAddingToCart(false);
//     }, 1000);
//   };

//   const handleWishlist = () => {
//     setWishlisted(!wishlisted);
//     setSnackbarMessage(wishlisted ? 'Removed from wishlist' : 'Added to wishlist');
//     setSnackbarOpen(true);
//   };

//   const handleAccordionChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
//     setExpandedAccordion(isExpanded ? panel : null);
//   };

//   const handleColorSelect = (color: string, index: number) => {
//     setSelectedColor(color);
//     setSelectedImage(index % productImages.length);
//   };

//   return (
//     <div className="px-4 lg:px-16 pt-8 pb-12 max-w-7xl mx-auto">
//       {/* Main Product Container - Flex row on desktop */}
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Image Gallery - Left Side */}
//         <div className="lg:w-1/2">
//           <div className="flex flex-col lg:flex-row gap-4">
//             {/* Thumbnails - Vertical on desktop */}
//             <div className="hidden lg:flex flex-col gap-3 w-20">
//               {productImages.map((img, index) => (
//                 <button 
//                   key={index}
//                   onClick={() => setSelectedImage(index)}
//                   className={`rounded-md w-full h-20 overflow-hidden border-2 transition-all duration-200 ${
//                     selectedImage === index ? 'border-teal-500 scale-105' : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   <img
//                     src={img}
//                     alt={`Product thumbnail ${index + 1}`}
//                     className="w-full h-full object-cover hover:opacity-90"
//                   />
//                 </button>
//               ))}
//             </div>

//             {/* Main Image with Zoom */}
//             <div className="relative w-full">
//               <div className="absolute top-3 left-3 flex gap-2 z-10">
//                 <Chip label={`${productDetails.discount}% OFF`} color="success" size="small" className="!font-bold" />
//                 <Chip label="Bestseller" color="primary" size="small" className="!font-bold" />
//               </div>
              
//               <div className="relative rounded-lg overflow-hidden shadow-md">
//                 <Zoom zoomMargin={40}>
//                   <img
//                     className="w-full cursor-zoom-in"
//                     src={productImages[selectedImage]}
//                     alt={productDetails.title}
//                   />
//                 </Zoom>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Details - Right Side */}
//         <div className="lg:w-1/2 lg:pl-8">
//           <h1 className="font-bold text-lg text-teal-600">{productDetails.brand}</h1>
//           <h2 className="text-2xl font-semibold text-gray-800 mt-1">{productDetails.title}</h2>

//           <div className="flex items-center py-2 px-3 border w-fit rounded-full mt-4 gap-3 bg-gray-50">
//             <div className="flex items-center gap-1">
//               <Rating 
//                 value={productDetails.rating} 
//                 precision={0.1} 
//                 readOnly 
//                 size="small" 
//                 emptyIcon={<StarBorder fontSize="inherit" />} 
//               />
//               <span className="ml-1 font-medium">{productDetails.rating.toFixed(1)}</span>
//             </div>
//             <Divider orientation="vertical" flexItem className="!h-5" />
//             <button 
//               onClick={() => setTabValue(2)} 
//               className="text-gray-600 hover:text-teal-600 text-sm"
//             >
//               {productDetails.ratingsCount} Ratings
//             </button>
//           </div>

//           <div className="mt-5">
//             <div className="flex items-center gap-3 flex-wrap">
//               <span className="text-3xl font-bold text-gray-800">₹{productDetails.price}</span>
//               <span className="line-through text-gray-500 text-lg">₹{productDetails.originalPrice}</span>
//               <span className="text-teal-600 font-semibold bg-teal-50 px-2 py-1 rounded text-sm">
//                 {productDetails.discount}% OFF
//               </span>
//             </div>
//             <p className="text-sm text-green-600 mt-1">
//               Inclusive of all taxes | Free Shipping above ₹499
//             </p>
//           </div>

//           {/* Color Selector */}
//           <div className="mt-6 space-y-2">
//             <h3 className="text-sm font-semibold text-gray-700">COLOR: 
//               {selectedColor && (
//                 <span className="ml-2 font-normal">
//                   {availableColors.find(c => c.value === selectedColor)?.name}
//                 </span>
//               )}
//             </h3>
//             <div className="flex flex-wrap gap-3 mt-2">
//               {availableColors.map((color, index) => (
//                 <Tooltip key={color.value} title={color.name} arrow>
//                   <button
//                     className={`w-10 h-10 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
//                       selectedColor === color.value 
//                         ? 'border-teal-500 ring-2 ring-teal-200 scale-110' 
//                         : 'border-gray-200 hover:border-gray-300 hover:scale-105'
//                     }`}
//                     onClick={() => handleColorSelect(color.value, index)}
//                     style={{ backgroundColor: color.value }}
//                   >
//                     {selectedColor === color.value && (
//                       <CheckCircle className="text-white text-opacity-90" fontSize="small" />
//                     )}
//                   </button>
//                 </Tooltip>
//               ))}
//             </div>
//           </div>

//           {/* Size Selector */}
//           <div className="mt-6 space-y-2">
//             <div className="flex justify-between items-center">
//               <h3 className="text-sm font-semibold text-gray-700">SIZE: 
//                 {selectedSize && (
//                   <span className="ml-2 font-normal">{selectedSize}</span>
//                 )}
//               </h3>
//               <button 
//                 className="text-sm text-teal-600 hover:underline"
//                 onClick={() => setSizeGuideOpen(true)}
//               >
//                 Size Guide
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-2 mt-2">
//               {availableSizes.map(size => (
//                 <button
//                   key={size}
//                   className={`px-3 py-2 border rounded-md transition-all ${
//                     selectedSize === size 
//                       ? 'border-teal-500 bg-teal-50 text-teal-600 font-medium scale-105' 
//                       : 'border-gray-300 hover:border-teal-300 text-gray-700 hover:scale-105'
//                   }`}
//                   onClick={() => setSelectedSize(size)}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Quantity Selector */}
//           <div className="mt-6 space-y-2">
//             <h3 className="text-sm font-semibold text-gray-700">QUANTITY</h3>
//             <div className="flex items-center w-fit gap-1 border rounded-lg px-2 py-1 shadow-sm bg-white">
//               <IconButton
//                 size="small"
//                 disabled={quantity === 1}
//                 onClick={() => setQuantity(quantity - 1)}
//                 className="!text-teal-600 disabled:!text-gray-300 hover:!bg-teal-50"
//               >
//                 <Remove />
//               </IconButton>
//               <span className="text-lg font-semibold text-gray-800 min-w-[30px] text-center">
//                 {quantity}
//               </span>
//               <IconButton
//                 size="small"
//                 onClick={() => setQuantity(quantity + 1)}
//                 className="!text-teal-600 hover:!bg-teal-50"
//               >
//                 <Add />
//               </IconButton>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="mt-6 flex flex-col gap-3">
//             <Button
//               variant="contained"
//               startIcon={isAddingToCart ? <CircularProgress size={20} color="inherit" /> : <ShoppingCart />}
//               sx={{ 
//                 bgcolor: teal[600], 
//                 '&:hover': { bgcolor: teal[700] },
//                 py: 1.5,
//                 height: '48px'
//               }}
//               onClick={handleAddToCart}
//               disabled={isAddingToCart}
//             >
//               {isAddingToCart ? 'Adding...' : 'Add to Cart'}
//             </Button>
//             <Button 
//               variant="outlined" 
//               color="error"
//               startIcon={wishlisted ? <Favorite /> : <FavoriteBorder />}
//               onClick={handleWishlist}
//               sx={{ 
//                 py: 1.5,
//                 height: '48px',
//                 borderColor: wishlisted ? red[500] : grey[400],
//                 color: wishlisted ? red[500] : grey[800]
//               }}
//             >
//               {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
//             </Button>
//             <Button
//               variant="contained"
//               sx={{ 
//                 bgcolor: 'black', 
//                 '&:hover': { bgcolor: grey[800] },
//                 py: 1.5,
//                 height: '48px'
//               }}
//             >
//               Buy Now
//             </Button>
//           </div>

//           {/* Delivery Info */}
//           <div className="mt-6 space-y-2 text-sm bg-gray-50 p-4 rounded-lg border border-gray-100">
//             {productDetails.deliveryInfo.map((item, index) => (
//               <div key={index} className="flex items-center gap-3">
//                 <span className="text-teal-600">{item.icon}</span>
//                 <span>{item.text}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Product Information Tabs - Below both sections */}
//       <section className="mt-12">
//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <Tabs 
//             value={tabValue} 
//             onChange={handleTabChange} 
//             variant="scrollable"
//             scrollButtons="auto"
//           >
//             <Tab label="Description" />
//             <Tab label="Features" />
//             <Tab label={`Reviews (${productDetails.reviews.length})`} />
//             <Tab label="Shipping & Returns" />
//           </Tabs>
//         </Box>
        
//         {/* Tab content remains the same as previous version */}
//         {/* ... */}
//       </section>

//       {/* Size Guide Dialog */}
//       <Dialog 
//         open={sizeGuideOpen} 
//         onClose={() => setSizeGuideOpen(false)} 
//         maxWidth="sm" 
//         fullWidth
//       >
//         <DialogTitle className="flex justify-between items-center">
//           <span>{productDetails.sizeGuide.title}</span>
//           <IconButton onClick={() => setSizeGuideOpen(false)}>
//             <Close />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           <table className="min-w-full">
//             <thead>
//               <tr className="border-b">
//                 <th className="text-left py-3 px-4">Size</th>
//                 <th className="text-left py-3 px-4">Chest (in)</th>
//                 <th className="text-left py-3 px-4">Length (in)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {productDetails.sizeGuide.measurements.map((row, index) => (
//                 <tr key={index} className={`border-b ${selectedSize === row.size ? 'bg-teal-50' : ''}`}>
//                   <td className="py-3 px-4">{row.size}</td>
//                   <td className="py-3 px-4">{row.chest}</td>
//                   <td className="py-3 px-4">{row.length}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <Typography variant="body2" className="mt-4 text-gray-600">
//             {productDetails.sizeGuide.note}
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button 
//             onClick={() => setSizeGuideOpen(false)} 
//             variant="contained"
//             sx={{ bgcolor: teal[600], '&:hover': { bgcolor: teal[700] } }}
//           >
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar Notifications */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert 
//           onClose={() => setSnackbarOpen(false)} 
//           severity="success" 
//           sx={{ width: '100%' }}
//           icon={<CheckCircle fontSize="inherit" />}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default ProductDetail;



import React, { useState, useEffect } from 'react';
import {
  Add,
  Favorite,
  FavoriteBorder,
  LocalShipping,
  Remove,
  StarBorder,
  WorkspacePremium,
  ShoppingCart,
  Share,
  CheckCircle,
  ExpandMore,
  ArrowBack,
  ArrowForward,
  Close
} from '@mui/icons-material';
import { 
  Button, 
  Divider, 
  IconButton, 
  Chip, 
  Tabs, 
  Tab, 
  Box, 
  Rating, 
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { teal, grey, red } from '@mui/material/colors';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SimilarProduct from './SimilarProduct';
import Review from '../Review/Review';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { useParams } from 'react-router-dom';
import { fetchProductById ,fetchAllProducts} from '../../../State/Customers/ProductSlice';
import { addItemToCart } from '../../../State/Customers/CartSlice';

const ProductDetail = () => {
  const dispatch = useAppDispatch();
  const { productId } = useParams<{ productId: string }>();

  // State management
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch product data
  const { product, loading: productLoading, error: productError } = useAppSelector(
    (state) => state.product
  );
useEffect(() => {
  dispatch(fetchAllProducts({ pageNumber: 0, pageSize: 100 }) as any);
}, [dispatch]);
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  // Check mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Event handlers
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    if (isMobile) {
      setTimeout(() => {
        document.getElementById('product-info')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
  
    if (!selectedSize && product.sizes?.length > 0) {
      setSnackbarMessage('Please select a size first');
      setSnackbarOpen(true);
      return;
    }
  
    if (!selectedColor && product.colors?.length > 0) {
      setSnackbarMessage('Please select a color first');
      setSnackbarOpen(true);
      return;
    }
  
    setIsAddingToCart(true);
  
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      setSnackbarMessage('Please login to add items to cart');
      setSnackbarOpen(true);
      setIsAddingToCart(false);
      return;
    }
  
    dispatch(addItemToCart({
      jwt,
      request: {
        productId: product.id,
        quantity: quantity, // Using the quantity state
        sizes: selectedSize || undefined, // Changed from "size" to "sizes"
        colors: selectedColor || undefined // Changed from "color" to "colors"
      }
    }))
    .unwrap()
    .then(() => {
      setSnackbarMessage(
        `Added ${product.title} ` +
        `${selectedSize ? `(Size: ${selectedSize}) ` : ''}` +
        `${selectedColor ? `(Color: ${selectedColor}) ` : ''}` +
        `(Qty: ${quantity}) to cart`
      );
      setSnackbarOpen(true);
    })
    .catch((error) => {
      setSnackbarMessage(error.message || "Failed to add item to cart");
      setSnackbarOpen(true);
    })
    .finally(() => {
      setIsAddingToCart(false);
    });
  };
  




  
  const handleWishlist = () => {
    setWishlisted(!wishlisted);
    setSnackbarMessage(wishlisted ? 'Removed from wishlist' : 'Added to wishlist');
    setSnackbarOpen(true);
  };

  const handleAccordionChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedAccordion(isExpanded ? panel : null);
  };

  const handleColorSelect = (color: string, index: number) => {
    setSelectedColor(color);
    setSelectedImage(index % (product?.images?.length || 1));
  };

  const handleQuickBuy = () => {
    handleAddToCart();
    setTimeout(() => {
      setSnackbarMessage('Proceeding to checkout...');
    }, 1500);
  };

  if (productLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (productError || !product) {
    return (
      <Box textAlign="center" py={10}>
        <Typography variant="h6" color="error">
          {productError || 'Product not found'}
        </Typography>
      </Box>
    );
  }

  // Calculate discount percentage if not provided
  const discountPercent = product.discountPercent || 
    (product.mrpPrice && product.sellingPrice 
      ? Math.round(((product.mrpPrice - product.sellingPrice) / product.mrpPrice) * 100)
      : 0);

  return (
    <div className="px-4 lg:px-16 pt-6 pb-12 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-600 mb-6">
        <span className="hover:text-teal-600 cursor-pointer">Home</span>
        <span className="mx-2">/</span>
        <span className="hover:text-teal-600 cursor-pointer">{product.category?.name || 'Category'}</span>
        <span className="mx-2">/</span>
        <span className="hover:text-teal-600 cursor-pointer">{product.category?.name || 'Category'}</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{product.title}</span>
      </div>

      {/* Main Product Container */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Image Gallery */}
        <div className="lg:w-1/2">
          {/* Mobile Thumbnails (Horizontal) */}
          {isMobile && product.images && (
            <div className="flex gap-2 mb-3 pb-2 overflow-x-auto">
              {product.images.map((img: string, index: number) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-teal-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main Image */}
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2 z-10">
              {discountPercent > 0 && (
                <Chip 
                  label={`${discountPercent}% OFF`} 
                  color="success" 
                  size="small"
                  className="!font-bold shadow-sm"
                />
              )}
              {product.isNew && (
                <Chip 
                  label="New" 
                  color="primary" 
                  size="small"
                  className="!font-bold shadow-sm"
                />
              )}
              {product.stockStatus && (
                <Chip
                  label={product.stockStatus.toUpperCase()}
                  size="small"
                  color={
                    product.stockStatus === 'in-stock' ? 'success' :
                    product.stockStatus === 'low-stock' ? 'warning' : 'error'
                  }
                />
              )}
            </div>

            {/* Wishlist & Share */}
            {/* <div className="absolute top-3 right-3 flex gap-2 z-10">
              <Tooltip title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}>
                <IconButton 
                  onClick={handleWishlist}
                  className="bg-white/90 hover:bg-white shadow-md"
                >
                  {wishlisted ? (
                    <Favorite className="text-red-500" />
                  ) : (
                    <FavoriteBorder className="text-gray-600" />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Share this product">
                <IconButton className="bg-white/90 hover:bg-white shadow-md">
                  <Share />
                </IconButton>
              </Tooltip>
            </div> */}

            {/* Zoomable Image */}
            {product.images && product.images.length > 0 && (
              <Zoom zoomMargin={40}>
                <img
                  className="w-full cursor-zoom-in aspect-square object-cover"
                  src={product.images[selectedImage]}
                  alt={product.title}
                />
              </Zoom>
            )}

            {/* Navigation Arrows */}
            {product.images && product.images.length > 1 && (
              <>
                {selectedImage > 0 && (
                  <button 
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
                    onClick={() => setSelectedImage(prev => prev - 1)}
                  >
                    <ArrowBack />
                  </button>
                )}
                {selectedImage < product.images.length - 1 && (
                  <button 
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
                    onClick={() => setSelectedImage(prev => prev + 1)}
                  >
                    <ArrowForward />
                  </button>
                )}
              </>
            )}
          </div>

          {/* Desktop Thumbnails (Vertical) */}
          {!isMobile && product.images && (
            <div className="flex gap-3 mt-3">
              {product.images.map((img: string, index: number) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-1/4 rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-teal-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 lg:pl-6" id="product-info">
          <div className="sticky top-4">
            <h1 className="font-bold text-lg text-teal-600">{product.seller?.businessDetails.bussinessName|| 'Brand'}</h1>
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mt-1">{product.title}</h2>

           {/* Rating */}
<div className="flex items-center py-2 px-3 border w-fit rounded-full mt-4 gap-3 bg-gray-50">
  <div className="flex items-center gap-1">
    <Rating
      value={
        Array.isArray(product.reviews) && product.reviews.length > 0
          ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
          : 0
      }
      precision={0.1}
      readOnly
      size="small"
      emptyIcon={<StarBorder fontSize="inherit" />}
    />
    <span className="ml-1 font-medium">
      {Array.isArray(product.reviews) && product.reviews.length > 0
        ? (
            product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
          ).toFixed(1)
        : '0.0'}
    </span>
  </div>
  <Divider orientation="vertical" flexItem className="!h-5" />
  <button
    onClick={() => setTabValue(1)}
    className="text-gray-600 hover:text-teal-600 text-sm"
  >
    {Array.isArray(product.reviews) ? product.reviews.length : 0} Ratings
  </button>
</div>

            {/* Price */}
            <div className="mt-5">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-3xl font-bold text-gray-800">₹{product.sellingPrice}</span>
                {product.mrpPrice && product.mrpPrice > product.sellingPrice && (
                  <>
                    <span className="line-through text-gray-500 text-lg">₹{product.mrpPrice}</span>
                    {discountPercent > 0 && (
                      <span className="text-teal-600 font-semibold bg-teal-50 px-2 py-1 rounded text-sm">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </>
                )}
              </div>
              <p className="text-sm text-green-600 mt-1">
                Inclusive of all taxes | <span className="font-medium">Free Shipping</span> above ₹499
              </p>
              {product.stockStatus === 'low-stock' && (
                <p className="text-sm text-yellow-600 mt-1">Only a few left in stock!</p>
              )}
            </div>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-gray-700">
                    COLOR: {selectedColor && (
                      <span className="ml-2 font-normal text-gray-900">{selectedColor}</span>
                    )}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3 mt-2">
                  {product.colors.map((color, index) => (
                    <Tooltip key={color} title={color} arrow>
                      <button
                        className={`w-10 h-10 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                          selectedColor === color 
                            ? 'border-teal-500 ring-2 ring-teal-200 scale-110' 
                            : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                        }`}
                        onClick={() => handleColorSelect(color, index)}
                        style={{ backgroundColor: color }}
                      >
                        {selectedColor === color && (
                          <CheckCircle className="text-white text-opacity-90" fontSize="small" />
                        )}
                      </button>
                    </Tooltip>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-gray-700">
                    SIZE: {selectedSize && (
                      <span className="ml-2 font-normal text-gray-900">{selectedSize}</span>
                    )}
                  </h3>
                  {product.sizeGuide && (
                    <button 
                      className="text-sm text-teal-600 hover:underline flex items-center"
                      onClick={() => setSizeGuideOpen(true)}
                    >
                      Size Guide
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`px-3 py-2 border rounded-md transition-all focus:outline-none ${
                        selectedSize === size 
                          ? 'border-teal-500 bg-teal-50 text-teal-600 font-medium scale-105' 
                          : 'border-gray-300 hover:border-teal-300 text-gray-700 hover:scale-105'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-sm text-red-500 mt-1">Please select a size</p>
                )}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mt-6 space-y-2">
              <h3 className="text-sm font-semibold text-gray-700">QUANTITY</h3>
              <div className="flex items-center w-fit gap-1 border rounded-lg px-2 py-1 shadow-sm bg-white">
                <IconButton
                  size="small"
                  disabled={quantity === 1}
                  onClick={() => setQuantity(quantity - 1)}
                  className="!text-teal-600 disabled:!text-gray-300 hover:!bg-teal-50"
                >
                  <Remove />
                </IconButton>
                <span className="text-lg font-semibold text-gray-800 min-w-[30px] text-center">
                  {quantity}
                </span>
                <IconButton
                  size="small"
                  onClick={() => setQuantity(quantity + 1)}
                  className="!text-teal-600 hover:!bg-teal-50"
                >
                  <Add />
                </IconButton>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <Button
                variant="contained"
                startIcon={isAddingToCart ? <CircularProgress size={20} color="inherit" /> : <ShoppingCart />}
                sx={{ 
                  bgcolor: teal[600], 
                  '&:hover': { bgcolor: teal[700] },
                  py: 1.5,
                  height: '48px',
                  fontSize: '0.875rem'
                }}
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.stockStatus === 'out-of-stock'}
              >
                {isAddingToCart ? 'Adding...' : 
                 product.stockStatus === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              {/* <Button 
                variant="outlined" 
                startIcon={wishlisted ? <Favorite /> : <FavoriteBorder />}
                onClick={handleWishlist}
                sx={{ 
                  py: 1.5,
                  height: '48px',
                  fontSize: '0.875rem',
                  borderColor: wishlisted ? red[500] : grey[400],
                  color: wishlisted ? red[500] : grey[800],
                  '&:hover': {
                    borderColor: wishlisted ? red[700] : grey[500],
                    backgroundColor: wishlisted ? red[50] : grey[50]
                  }
                }}
              >
                {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </Button> */}
              {/* <Button
                variant="contained"
                sx={{ 
                  bgcolor: 'black', 
                  '&:hover': { bgcolor: grey[800] },
                  py: 1.5,
                  height: '48px',
                  fontSize: '0.875rem'
                }}
                onClick={handleQuickBuy}
                disabled={product.stockStatus === 'out-of-stock'}
              >
                Buy Now
              </Button> */}
            </div>

            {/* Delivery Info */}
            <div className="mt-6 space-y-3 text-sm bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <LocalShipping className="text-teal-600" />
                <span className="text-gray-700">Free delivery on orders over ₹499</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-teal-600" />
                <span className="text-gray-700">Usually delivered in 3-5 working days</span>
              </div>
              <div className="flex items-center gap-3">
                <WorkspacePremium className="text-teal-600" />
                <span className="text-gray-700">30-day easy returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
      <section className="mt-12 border-t border-gray-200 pt-8">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "fullWidth"}
            scrollButtons="auto"
            allowScrollButtonsMobile
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="Description" />
        <Tab label={`Review ( ${Array.isArray(product.reviews) ? product.reviews.length : 0} )`} />

            <Tab label="Shipping & Returns" />
          </Tabs>
        </Box>

        {/* Description Tab */}
        <div className={`py-6 ${tabValue === 0 ? 'block' : 'hidden'}`}>
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Product Description</h3>
            <p className="text-gray-700 mb-6">{product.description || 'No description available'}</p>
            
            {product.features && product.features.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Key Features</h4>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="text-teal-500 mr-2 mt-0.5" fontSize="small" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Fabric & Care</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="text-teal-500 mr-2 mt-0.5" fontSize="small" />
                      <span className="text-gray-700">100% Premium Cotton</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-teal-500 mr-2 mt-0.5" fontSize="small" />
                      <span className="text-gray-700">Machine wash cold with similar colors</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-teal-500 mr-2 mt-0.5" fontSize="small" />
                      <span className="text-gray-700">Do not bleach</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-teal-500 mr-2 mt-0.5" fontSize="small" />
                      <span className="text-gray-700">Tumble dry low</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-teal-500 mr-2 mt-0.5" fontSize="small" />
                      <span className="text-gray-700">Iron on low heat if needed</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

    <div className={`py-6 ${tabValue === 1 ? 'block' : 'hidden'}`}>
  <Review />
</div>

        {/* Shipping & Returns Tab */}
        <div className={`py-6 ${tabValue === 2 ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Shipping Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <LocalShipping className="text-teal-600 mt-0.5" />
                  <p className="text-gray-700">Free delivery on orders over ₹499</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-teal-600 mt-0.5" />
                  <p className="text-gray-700">Usually delivered in 3-5 working days</p>
                </div>
                <div className="flex items-start gap-3">
                  <WorkspacePremium className="text-teal-600 mt-0.5" />
                  <p className="text-gray-700">30-day easy returns</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Return Policy</h3>
              <Accordion 
                expanded={expandedAccordion === 'returns'} 
                onChange={handleAccordionChange('returns')}
                sx={{ boxShadow: 'none', border: '1px solid #e5e7eb' }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography className="font-medium">How do I return an item?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="text-gray-600">
                    You can initiate a return within 30 days of delivery. Items must be unworn, unwashed, and in original condition with tags attached. Start your return process through your order history.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              
              <Accordion 
                expanded={expandedAccordion === 'refunds'} 
                onChange={handleAccordionChange('refunds')}
                sx={{ boxShadow: 'none', border: '1px solid #e5e7eb' }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography className="font-medium">When will I get my refund?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="text-gray-600">
                    Refunds are processed within 3-5 business days after we receive your return. The refund will be credited to your original payment method and may take additional time to appear in your account.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              
              <Accordion 
                expanded={expandedAccordion === 'exchanges'} 
                onChange={handleAccordionChange('exchanges')}
                sx={{ boxShadow: 'none', border: '1px solid #e5e7eb' }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography className="font-medium">How do exchanges work?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="text-gray-600">
                    We offer free exchanges for size or color. Simply select the exchange option when initiating your return and choose your preferred replacement item.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Products */}
      <div className='text-center mt-4 mb-4 font-bold'>
        <h1>Similar Products</h1>
      </div>
      <div>
       <SimilarProduct
         categoryId={product.category?.id}
         productId={product.id}
       />
      </div>

      {/* Size Guide Dialog */}
      {product.sizeGuide && (
        <Dialog 
          open={sizeGuideOpen} 
          onClose={() => setSizeGuideOpen(false)} 
          maxWidth="sm" 
          fullWidth
          scroll="paper"
        >
          <DialogTitle className="flex justify-between items-center">
            <span>Size Guide</span>
            <IconButton onClick={() => setSizeGuideOpen(false)}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {product.sizeGuide.description && (
              <Typography paragraph>{product.sizeGuide.description}</Typography>
            )}
            
            {product.sizeGuide.measurements && (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Size</th>
                      {Object.keys(product.sizeGuide.measurements).map(key => (
                        <th key={key} className="text-left py-3 px-4 font-medium">{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">Standard</td>
                      {Object.values(product.sizeGuide.measurements).map((value, i) => (
                        <td key={i} className="py-3 px-4">{value}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            
            {product.sizeGuide.image && (
              <img 
                src={product.sizeGuide.image} 
                alt="Size guide" 
                className="mt-4 w-full"
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setSizeGuideOpen(false)} 
              variant="contained"
              sx={{ bgcolor: teal[600], '&:hover': { bgcolor: teal[700] } }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="success" 
          sx={{ width: '100%', boxShadow: 'md' }}
          icon={<CheckCircle fontSize="inherit" />}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductDetail;