import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WishlistCard from './WishlistCard';
import { Box, Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { getWishlistByUserId } from '../../../State/Customers/WishlistSlice';

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { wishlist } = useAppSelector(store => store.wishlist);
  const { isLoggedIn } = useAppSelector(store => store.auth);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getWishlistByUserId());
    }
  }, [dispatch, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '70vh',
        textAlign: 'center',
        p: 3
      }}>
        <Typography variant="h5" gutterBottom>
          Please login to view your wishlist
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          You need to be logged in to see your saved items.
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/customer/login')}
        >
          Login Now
        </Button>
      </Box>
    );
  }

  if (wishlist?.products?.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '70vh',
        textAlign: 'center',
        p: 3
      }}>
        <Typography variant="h5" gutterBottom>
          Your wishlist is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          You haven't added any items to your wishlist yet.
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/product')}
        >
          Browse Products
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, lg: 5 }, minHeight: '85vh' }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 4 }}>
        My Wishlist
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 3,
        pt: 3
      }}>
        {wishlist?.products?.map((item) => (
          <WishlistCard key={item.id} item={item} />
        ))}
      </Box>
    </Box>
  );
};

export default Wishlist;