import { Divider, Typography, Box, useTheme } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../../State/Store';

interface PricingCartProps {
  subtotal: number;
  discount: number;
  shipping: number;
  platformFee?: number;
  totalSavings?: number;
}

const PricingCart: React.FC<PricingCartProps> = ({
  subtotal = 0,
  discount = 0,
  shipping = 0,
  platformFee = 0,
  totalSavings = 0,
}) => {
  const theme = useTheme();
  const { cart } = useAppSelector((state) => state.cart);

  const total = subtotal - discount + shipping + platformFee;
  const itemCount = cart?.cartItems?.length || 0;

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        p: 3,
        backgroundColor: 'background.paper',
        boxShadow: theme.shadows[1],
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
        PRICE DETAILS
      </Typography>

      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2" color="text.secondary">
          Price ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </Typography>
        <Typography variant="body2">₹{subtotal.toFixed(2)}</Typography>
      </Box>

      {discount > 0 && (
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Discount
          </Typography>
          <Typography variant="body2" color="success.main">
            - ₹{discount.toFixed(2)}
          </Typography>
        </Box>
      )}

      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2" color="text.secondary">
          Delivery Charges
        </Typography>
        <Typography
          variant="body2"
          color={shipping > 0 ? 'text.secondary' : 'success.main'}
        >
          {shipping > 0 ? `₹${shipping.toFixed(2)}` : 'FREE'}
        </Typography>
      </Box>

      {platformFee > 0 && (
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Platform Fee
          </Typography>
          <Typography variant="body2">₹{platformFee.toFixed(2)}</Typography>
        </Box>
      )}

      {totalSavings > 0 && (
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Total Savings
          </Typography>
          <Typography variant="body2" color="success.main">
            ₹{totalSavings.toFixed(2)}
          </Typography>
        </Box>
      )}

      <Divider sx={{ my: 1 }} />

      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" fontWeight={600}>
          Total Amount
        </Typography>
        <Typography variant="subtitle1" fontWeight={600}>
          ₹{total.toFixed(2)}
        </Typography>
      </Box>

      {subtotal > 0 && subtotal < 499 && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          *Add ₹{(499 - subtotal).toFixed(2)} more to get FREE delivery
        </Typography>
      )}
    </Box>
  );
};

export default PricingCart;
