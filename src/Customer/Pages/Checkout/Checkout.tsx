import {
  Box,
  Button,
  Typography,
  CircularProgress,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import { teal } from "@mui/material/colors";
import PricingCart from "../Cart/PricingCart";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchUserCart } from "../../../State/Customers/CartSlice";
import { fetchUserProfile } from "../../../Customer/Pages/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../State/Customers/OrderSlice";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const Checkout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState<"RAZORPAY" | "CASH" | "STRIPE">("RAZORPAY");
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false); // 🔐 NEW

  const { cart, loading: cartLoading, error: cartError } = useAppSelector((state) => state.cart);
  const userAddresses = useAppSelector((state) => state.auth.user?.addresses || []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(fetchUserCart(jwt));
      dispatch(fetchUserProfile({ jwt }));
    }
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const selectedAddress =
    userAddresses.find((addr) => addr.id !== undefined && addr.id === selectedAddressId) || null;

  // Cart Pricing
  const subtotal =
    cart?.cartItems?.reduce(
      (sum, item) => sum + item.product.totalPrice * item.quantity,
      0
    ) || 0;

  const discount = subtotal - (cart?.totalSellingPrice || subtotal);
  const shipping = subtotal > 500 ? 0 : 45;
  const platformFee = 4;

  const totalPayable = (cart?.totalSellingPrice || subtotal) + shipping + platformFee;

  const handleCheckout = () => {
    if (isPlacingOrder) return; // Prevent duplicate clicks
    setIsPlacingOrder(true);

    if (!selectedAddress) {
      alert("Please select a delivery address to proceed.");
      setIsPlacingOrder(false);
      return;
    }

    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      alert("User not authenticated.");
      setIsPlacingOrder(false);
      return;
    }

    if (!cart?.cartItems || cart.cartItems.length === 0) {
      alert("Cart is empty.");
      setIsPlacingOrder(false);
      return;
    }

    dispatch(
      createOrder({
        address: {
          ...selectedAddress,
          pincode: Number(selectedAddress.pincode),
        },
        jwt,
        paymentGateway,
        amount: 0,
      })
    )
      .unwrap()
      .then((res) => {
        if (res.paymentGateway === "RAZORPAY" && res.paymentDetails?.payment_link_url) {
          window.location.href = res.paymentDetails.payment_link_url;
        } else {
          navigate(`/order-processing`);
        }
      })
      .catch(() => {
        alert("Failed to place order. Try again.");
        setIsPlacingOrder(false);
      });
  };

  if (cartLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (cartError) {
    return (
      <Box textAlign="center" py={10}>
        <Typography color="error">{cartError || "An unexpected error occurred."}</Typography>
        <Button variant="contained" sx={{ mt: 2, bgcolor: teal[600] }} onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  }

  if (!cart?.cartItems || cart.cartItems.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Typography variant="h6">Your cart is empty</Typography>
        <Button variant="contained" sx={{ mt: 2, bgcolor: teal[600] }} onClick={() => navigate("/")}>
          Continue Shopping
        </Button>
      </Box>
    );
  }

  const addressesToDisplay = showAllAddresses ? userAddresses : userAddresses.slice(0, 2);

  return (
    <Box
      sx={{
        pt: 4,
        px: { xs: 2, sm: 3, md: 8, lg: 15 },
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: 3,
        }}
      >
        {/* Left Section */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" fontWeight={600}>
              Delivery Address
            </Typography>
            <Button onClick={handleOpen} variant="outlined" size="small">
              Add New Address
            </Button>
          </Box>

          <Box display="flex" flexDirection="column" gap={2}>
            {userAddresses.length > 0 ? (
              <>
                {addressesToDisplay.map((address) => (
                  <AddressCard
                    key={address.id}
                    address={address as Required<typeof address>}
                    selected={selectedAddressId === address.id}
                    onSelect={(id) => setSelectedAddressId(Number(id))}
                  />
                ))}

                {userAddresses.length > 3 && !showAllAddresses && (
                  <Button
                    variant="outlined"
                    sx={{ mt: 2, borderColor: teal[600], color: teal[600] }}
                    onClick={() => setShowAllAddresses(true)}
                  >
                    View All Addresses ({userAddresses.length - 3} more)
                  </Button>
                )}
                {userAddresses.length > 5 && showAllAddresses && (
                  <Button
                    variant="outlined"
                    sx={{ mt: 2, borderColor: teal[600], color: teal[600] }}
                    onClick={() => setShowAllAddresses(false)}
                  >
                    Show Less
                  </Button>
                )}
              </>
            ) : (
              <Typography>No address found. Please add one.</Typography>
            )}
          </Box>

          <Box mt={4}>
            <Typography variant="h6" mb={1}>
              Payment Method
            </Typography>
            <RadioGroup
              row
              value={paymentGateway}
              onChange={(e) => setPaymentGateway(e.target.value as "RAZORPAY" | "STRIPE" | "CASH")}
            >
              <FormControlLabel value="RAZORPAY" control={<Radio />} label="Razorpay" />
              <FormControlLabel value="STRIPE" control={<Radio />} label="Stripe" />
              <FormControlLabel value="CASH" control={<Radio />} label="Cash on Delivery" />
            </RadioGroup>
          </Box>

          <Button
            variant="contained"
            sx={{ mt: 4, mb: 4, bgcolor: teal[600] }}
            onClick={handleCheckout}
            disabled={!selectedAddress || isPlacingOrder}
          >
            {isPlacingOrder ? "Placing Order..." : `Place Order - ₹${totalPayable}`}
          </Button>
        </Box>

        {/* Right Section: Price Summary */}
        <Box>
          <PricingCart
            subtotal={subtotal}
            discount={discount}
            shipping={shipping}
            platformFee={platformFee}
          />
        </Box>
      </Box>

      {/* Address Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <AddressForm onClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
};

export default Checkout;
