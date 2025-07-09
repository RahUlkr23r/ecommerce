
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
  CircularProgress,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '../../../State/Store';
import {
  updateSellerProduct,
  fetchSellerProducts,
  deleteSellerProduct,
} from '../../../State/Sellers/sellerProductSlice';
import { Product } from '../../../tpyes/ProductType';

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ open, onClose, product }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    stock: '',
    description: '',
    quantity: '',
    colors: '',
    sizes: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        quantity: product.quantity?.toString() || '0',
        title: product.title || '',
        price: product.sellingPrice?.toString() || '0',
        stock: product.stockStatus?.toString() || '0',
        description: product.description || '',
        colors: Array.isArray(product.colors) ? product.colors.join(', ') : product.colors || '',
        sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : product.sizes || '',
      });
    }
    setError(null);
    setSuccess(null);
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!product) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const jwt = localStorage.getItem('jwt');
      if (!jwt) {
        throw new Error('Authentication required');
      }

      await dispatch(
        updateSellerProduct({
          productId: product.id,
          product: {
            ...product,
            title: formData.title.trim(),
            colors: formData.colors.split(',').map(c => c.trim()).filter(c => c.length > 0),
            sizes: formData.sizes.split(',').map(s => s.trim()).filter(s => s.length > 0),
            sellingPrice: parseFloat(formData.price) || 0,
            quantity: parseInt(formData.quantity) || 0,
            stockStatus:
              parseInt(formData.stock) > 10
                ? "in-stock"
                : parseInt(formData.stock) > 0
                ? "low-stock"
                : "out-of-stock",
            description: formData.description.trim(),
          },
          jwt,
        })
      ).unwrap();
      
      await dispatch(fetchSellerProducts(jwt));
      setSuccess('Product updated successfully!');
      setTimeout(onClose, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!product) return;
    
    if (!window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const jwt = localStorage.getItem('jwt');
      if (!jwt) {
        throw new Error('Authentication required');
      }

      await dispatch(deleteSellerProduct({ productId: product.id, jwt })).unwrap();
      await dispatch(fetchSellerProducts(jwt));
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Edit Product</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Product Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
              required
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          
          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              label="Price ($)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                inputProps: { min: 0, step: 0.01 }
              }}
            />
          </Grid>
          
          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                inputProps: { min: 0 }
              }}
            />
          </Grid>
          
          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              label="Stock Level"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                inputProps: { min: 0 }
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Colors (comma separated)"
              name="colors"
              value={formData.colors}
              onChange={handleChange}
              margin="normal"
              placeholder="e.g. Red, Blue, Green"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Sizes (comma separated)"
              name="sizes"
              value={formData.sizes}
              onChange={handleChange}
              margin="normal"
              placeholder="e.g. S, M, L, XL"
            />
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDelete}
          startIcon={<DeleteIcon />}
          disabled={isLoading}
        >
          Delete Product
        </Button>
        <Box flexGrow={1} />
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleUpdate}
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductModal;