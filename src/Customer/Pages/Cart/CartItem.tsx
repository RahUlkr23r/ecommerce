import { Remove, Add, Close } from '@mui/icons-material';
import {
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Chip,
  Tooltip,
  Box,
  Typography,
  Avatar
} from '@mui/material';
import React from 'react';
import type { CartItem as CartItemType } from '../../../tpyes/CartType';
import { useAppDispatch } from '../../../State/Store';
import { updateCartItem, deleteCartItem } from '../../../State/Customers/CartSlice';
import { useNavigate } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
  onRemove?: () => void;
  onQuantityChange?: (newQuantity: number) => void;
}

const getStockStatus = (quantity: number): 'in-stock' | 'low-stock' | 'out-of-stock' => {
  if (quantity === 0) return 'out-of-stock';
  if (quantity < 10) return 'low-stock';
  return 'in-stock';
};

const stockStatusColor: Record<'in-stock' | 'low-stock' | 'out-of-stock', 'success' | 'warning' | 'error'> = {
  'in-stock': 'success',
  'low-stock': 'warning',
  'out-of-stock': 'error'
};

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onQuantityChange }) => {
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [localQuantity, setLocalQuantity] = React.useState(item.quantity);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const stockStatus = getStockStatus(item.product.quantity);
  const maxQuantity = item.product.quantity;

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= maxQuantity) {
      try {
        setIsUpdating(true);
        setError(null);
        setLocalQuantity(newQuantity);

        const jwt = localStorage.getItem('jwt');
        if (!jwt) throw new Error('Please login to update cart');

        await dispatch(
          updateCartItem({
            jwt,
            cartItemId: item.id,
            cartItem: {
              quantity: newQuantity,
              sizes: item.sizes,
              colors: item.colors ?? undefined
            }
          })
        ).unwrap();

        onQuantityChange?.(newQuantity);
      } catch (err: any) {
        console.error('Update failed:', err);
        setError(err.message || 'Failed to update quantity');
        setLocalQuantity(item.quantity);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleRemoveItem = async () => {
    try {
      setIsUpdating(true);
      const jwt = localStorage.getItem('jwt');
      if (!jwt) throw new Error('Please login to remove item');

      await dispatch(deleteCartItem({ jwt, cartItemId: item.id })).unwrap();
      onRemove?.();
    } catch (err: any) {
      console.error('Delete failed:', err);
      setError(err.message || 'Failed to remove item');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        mb: 2,
        p: 2,
        position: 'relative',
        '&:hover': { boxShadow: 1 },
        transition: 'all 0.2s ease-in-out'
      }}
    >
      <Tooltip title="Remove item">
        <IconButton
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'grey.500',
            '&:hover': {
              color: 'error.main',
              backgroundColor: 'error.light'
            }
          }}
          onClick={handleRemoveItem}
          disabled={isUpdating}
        >
          {isUpdating ? <CircularProgress size={20} /> : <Close />}
        </IconButton>
      </Tooltip>

      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 1 }}>
          {error}
        </Typography>
      )}

      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
        {/* Product Image */}
        <Box
          sx={{
            width: { xs: '100%', sm: 120 },
            height: { xs: 160, sm: 120 },
            flexShrink: 0,
            borderRadius: 1,
            overflow: 'hidden'
          }}
        >
          <img
            onClick={() =>
              navigate(`/product-details/${item.product.category}/${item.product.title}/${item.product.id}`)
            }
            src={item.product.images[0]}
            alt={item.product.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
          />
        </Box>

        <Box flexGrow={1}>
          <Typography variant="h6" fontWeight={500} noWrap>
            {item.product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {item.product.brand || item.product.seller?.sellerName}
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={1} sx={{ mb: 1 }}>
            {item.sizes && <Chip label={`Size: ${item.sizes}`} size="small" variant="outlined" />}
            {item.colors && (
              <Box display="flex" alignItems="center" gap={1}>
                <Chip label={`Color: ${item.colors}`} size="small" variant="outlined" />
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: item.colors,
                    border: '1px solid #e0e0e0'
                  }}
                />
              </Box>
            )}
            <Chip label={`Qty: ${localQuantity}`} size="small" variant="outlined" />
          </Box>

          <Chip
            label={stockStatus}
            size="small"
            color={stockStatusColor[stockStatus]}
            variant="outlined"
            sx={{ mb: 1 }}
          />
        </Box>

        {/* Quantity & Price */}
        <Box
          display="flex"
          flexDirection={{ xs: 'row', sm: 'column' }}
          justifyContent="space-between"
          alignItems={{ xs: 'center', sm: 'flex-end' }}
        >
          <Box textAlign={{ sm: 'right' }}>
            <Typography variant="h6" fontWeight={600}>
              ₹{(item.product.sellingPrice * localQuantity).toFixed(2)}
            </Typography>
            {item.product.mrpPrice > item.product.sellingPrice && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                ₹{item.product.mrpPrice.toFixed(2)}
              </Typography>
            )}
          </Box>

          <Box display="flex" alignItems="center" gap={1} mt={{ xs: 0, sm: 1 }}>
            <Tooltip title="Decrease quantity">
              <span>
                <IconButton
                  size="small"
                  disabled={localQuantity <= 1 || isUpdating}
                  onClick={() => handleUpdateQuantity(localQuantity - 1)}
                >
                  <Remove />
                </IconButton>
              </span>
            </Tooltip>

            <Typography
              variant="body1"
              sx={{
                width: 40,
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                py: 0.5
              }}
            >
              {localQuantity}
            </Typography>

            <Tooltip title="Increase quantity">
              <span>
                <IconButton
                  size="small"
                  disabled={localQuantity >= maxQuantity || isUpdating}
                  onClick={() => handleUpdateQuantity(localQuantity + 1)}
                >
                  <Add />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {isSmallScreen && (
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Sold by: {item.product.seller?.sellerName}
          </Typography>
          {item.product.isNew && <Chip label="New" size="small" color="primary" />}
        </Box>
      )}
    </Box>
  );
};

export default CartItem;
