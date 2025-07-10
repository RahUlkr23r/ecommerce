import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppDispatch, useAppSelector } from "../../State/Store";
import { paymentSuccess } from "../../State/Customers/OrderSlice";
import { deleteCartItem } from "../../State/Customers/CartSlice"; // ✅ Imported

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { orderId } = useParams();
 const {cart}=useAppSelector(Store=>Store.cart)
  const getQueryParam = (key: string) => {
    const query = new URLSearchParams(location.search);
    return query.get(key);
  };

  useEffect(() => {
    const paymentId = getQueryParam("razorpay_payment_id");
    const paymentLinkId = getQueryParam("razorpay_payment_link_id");

    if (paymentId && paymentLinkId) {
      dispatch(
        paymentSuccess({
          jwt: localStorage.getItem("jwt") || "",
          paymentId,
          paymentLinkId,
        })
      );

      // If you want to clear the entire cart, you might want to dispatch a clearCart action instead.
      // If you want to delete a specific item, you need to have the cart item id available.
      // Example for clearing the entire cart (if such an action exists):
      // dispatch(clearCart());

      // If you want to delete a specific item, make sure to have the item id.
      // For demonstration, we'll comment this out as 'item' and 'cartItemId' are undefined here.
      // If you want to delete all items, you need to dispatch deleteCartItem for each cart item ID
      if (cart?.cartItems && Array.isArray(cart.cartItems)) {
        cart.cartItems.forEach(item => {
          dispatch(deleteCartItem({
            jwt: localStorage.getItem("jwt") || "",
            cartItemId: item.id // assuming each cart item has an 'id' property of type number
          }));
        });
      }

      // Remove or update this line based on your actual cart clearing logic.
    }
  }, [orderId, location.search, dispatch]);

  return (
    <Box
      sx={{
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4f0fb 100%)',
        p: 2
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
          gap: 3
        }}
      >
        <CheckCircleIcon 
          sx={{ 
            fontSize: 80, 
            color: 'success.main',
            mb: 2
          }} 
        />

        <Typography variant="h4" component="h1" fontWeight="bold" color="text.primary">
          Payment Successful!
        </Typography>

        <Typography variant="h6" color="text.secondary">
          Your order #{orderId} has been confirmed
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
            borderRadius: 2
          }}
        >
          Continue Shopping
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentSuccess;
