import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import {  LocalOffer } from '@mui/icons-material';
import { teal } from '@mui/material/colors';
import {
  Button,

  TextField,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import PricingCart from './PricingCart';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import {
  fetchUserCart,
  updateCartItem,
  deleteCartItem,
} from '../../../State/Customers/CartSlice';
import { applyCoupon } from '../../../State/Customers/couponSlice';
import type { CartItem as CartItemType } from '../../../tpyes/CartType';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [couponCode, setCouponCode] = useState('');
  const { cart, loading, error } = useAppSelector((state) => state.cart);
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
  };

  const handleApplyCoupon = async () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      toast.error('You are not logged in');
      return;
    }

    try {
      const orderValue =
        cart?.cartItems?.reduce(
          (sum, item) => sum + item.product.sellingPrice * item.quantity,
          0
        ) || 0;

      await dispatch(
        applyCoupon({
          apply: 'true',
          code: couponCode.trim(),
          orderValue,
          jwt,
        })
      ).unwrap();

      toast.success('🎉 Coupon applied successfully!');
      setCouponCode('');
      dispatch(fetchUserCart(jwt));
    } catch (err: any) {
      toast.error(err || 'Invalid or expired coupon.');
    }
  };

  const handleRemoveCoupon = async () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return;

    try {
    await dispatch(
  applyCoupon({
    apply: 'false',
    code: cart?.couponCode ?? '',
    orderValue: 0,
    jwt,
  })
).unwrap();


      toast.info('❌ Coupon removed.');
      setCouponCode('');
      dispatch(fetchUserCart(jwt));
    } catch (err) {
      toast.error('Failed to remove coupon.');
    }
  };

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      try {
        await dispatch(
          updateCartItem({
            jwt,
            cartItemId: Number(itemId),
            cartItem: { quantity: newQuantity },
          })
        ).unwrap();
        dispatch(fetchUserCart(jwt));
      } catch (err) {
        console.error('Failed to update quantity:', err);
      }
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      try {
        await dispatch(deleteCartItem({ jwt, cartItemId: Number(itemId) })).unwrap();
        dispatch(fetchUserCart(jwt));
      } catch (err) {
        console.error('Failed to remove item:', err);
      }
    }
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt && isLoggedIn) {
      dispatch(fetchUserCart(jwt));
    }
  }, [dispatch, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <Box textAlign="center" py={10} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">Please login to view your cart</Typography>
        <Button variant="contained" sx={{ bgcolor: teal[600], mt: 2 }} onClick={() => navigate('/customer/login')}>
          Login Now
        </Button>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={10}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Typography variant="h6">Your cart is empty</Typography>
        <Button variant="contained" sx={{ mt: 2, bgcolor: teal[600] }} onClick={() => navigate('/product')}>
          Continue Shopping
        </Button>
      </Box>
    );
  }

  const subtotal = cart.cartItems.reduce(
    (sum, item) => sum + item.product.sellingPrice * item.quantity,
    0
  );

  const discount = subtotal - (cart.totalSellingPrice || 0);
  const shipping = subtotal > 499 ? 0 : 45;
  const platformFee = 0;

  return (
    <Box
      sx={{
        pt: 4,
        px: { xs: 2, sm: 3, md: 8, lg: 15 },
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
          gap: 3,
        }}
      >
        {/* Left Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h5" fontWeight={600}>
            Your Cart ({cart.cartItems.length} {cart.cartItems.length === 1 ? 'item' : 'items'})
          </Typography>

          {cart.cartItems.map((item: CartItemType) => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={(newQty) => handleQuantityChange(item.id.toString(), newQty)}
              onRemove={() => handleRemoveItem(item.id.toString())}
            />
          ))}
        </Box>

        {/* Right Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Coupon Section */}
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              p: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <LocalOffer sx={{ color: teal[600] }} />
              <Typography variant="subtitle1">Apply Coupons</Typography>
            </Box>

            {cart?.couponCode ? (
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="body2">
                  Applied Coupon: <strong>{cart.couponCode}</strong>
                </Typography>
                <Button size="small" color="error" onClick={handleRemoveCoupon}>
                  Remove
                </Button>
              </Box>
            ) : (
              <>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={couponCode}
                    onChange={handleChange}
                    placeholder="Enter coupon code"
                  />
                  <Button
                    variant="contained"
                    onClick={handleApplyCoupon}
                    disabled={!couponCode.trim()}
                    sx={{
                      bgcolor: teal[600],
                      '&:hover': { bgcolor: teal[700] },
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              </>
            )}
          </Box>

          {/* Pricing Summary */}
          <PricingCart
            subtotal={subtotal}
            discount={discount}
            shipping={shipping}
            platformFee={platformFee}
          />

          {/* Checkout */}
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate('/checkout')}
            sx={{
              py: 1.5,
              bgcolor: teal[600],
              '&:hover': { bgcolor: teal[700] },
              fontSize: '1rem',
            }}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
