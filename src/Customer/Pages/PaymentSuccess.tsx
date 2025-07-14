import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppDispatch, useAppSelector } from "../../State/Store";
import { paymentSuccess } from "../../State/Customers/OrderSlice";
import { deleteCartItem } from "../../State/Customers/CartSlice";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { cart } = useAppSelector((state) => state.cart);

  const getQueryParam = (key: string) => {
    const query = new URLSearchParams(location.search);
    return query.get(key);
  };

  useEffect(() => {
    const paymentId = getQueryParam("razorpay_payment_id");
    const paymentLinkId = getQueryParam("razorpay_payment_link_id");
    const jwt = localStorage.getItem("jwt") || "";

    if (paymentId && paymentLinkId) {
      dispatch(paymentSuccess({ jwt, paymentId, paymentLinkId }));

      if (cart?.cartItems && Array.isArray(cart.cartItems)) {
        cart.cartItems.forEach((item) => {
          dispatch(
            deleteCartItem({
              jwt,
              cartItemId: item.id,
            })
          );
        });
      }
    }
  }, [location.search, dispatch, cart]);

  return (
    <Box
      sx={{
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4f0fb 100%)',
        p: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 3,
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          p: 4,
          width: { xs: '90%', sm: '70%', md: '50%', lg: '35%' },
          maxWidth: '500px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <CheckCircleIcon
          sx={{
            fontSize: 80,
            color: 'success.main',
            mb: 2,
          }}
        />

        <Typography variant="h4" component="h1" fontWeight="bold" color="text.primary">
          Payment Successful!
        </Typography>

        <Typography variant="h6" color="text.secondary">
          Your order has been confirmed
        </Typography>

        <Typography variant="body1" color="text.secondary">
          A confirmation email has been sent to your registered email address
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<ShoppingCartIcon />}
          onClick={() => navigate("/")}
          sx={{
            mt: 2,
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            textTransform: 'none',
            borderRadius: 2,
          }}
        >
          Continue Shopping
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentSuccess;
