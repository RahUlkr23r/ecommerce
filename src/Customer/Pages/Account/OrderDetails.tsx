import {
  Box,
  Button,
  Divider,
  Paper,
  Typography,
  Chip,
  
  useTheme,
  Badge,
  Alert,
  Snackbar
} from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import {
  Payments,
  Store,
  LocationOn,
  Phone,
  CreditScore,
  RateReview,

} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  fetchOrderById,
  fetchOrderItemById,
  cancelOrder,
} from "../../../State/Customers/OrderSlice";

const OrderDetails = () => {

  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { orderId, orderItemId } = useParams();
  const { currentOrder, orderItem, orderCanceled, error } = useAppSelector(
    (store) => store.order
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (orderId && orderItemId) {
      const jwt = localStorage.getItem("jwt") || "";
      dispatch(fetchOrderById({ orderId: Number(orderId), jwt }));
      dispatch(fetchOrderItemById({ orderItemId: Number(orderItemId), jwt }));
    }
  }, [dispatch, orderId, orderItemId]);

  useEffect(() => {
    if (orderCanceled || error) {
      setSnackbarOpen(true);
    }
  }, [orderCanceled, error]);

  const handleCancelOrder = () => {
    if (!orderId) return;
    const jwt = localStorage.getItem("jwt") || "";
    dispatch(cancelOrder({ orderId: Number(orderId), jwt }));
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleWriteReview = () => {
    if (orderItem?.product?.id) {
      navigate(`/review/${orderItem.product.id}/create`);
    }
  };

  // 🧮 Calculate proportional discount
  const {
    itemMrp,
    itemSp,
    itemDiscount,
    finalAmount
  } = useMemo(() => {
    const mrp = orderItem?.product?.mrpPrice ?? 0;
    const sp = orderItem?.product?.sellingPrice ?? 0;
    const quantity = orderItem?.quantity ?? 1;
    const totalSp = sp * quantity;

    const totalDiscount = currentOrder?.discount ?? 0;
    const totalOrderSp = currentOrder?.totalSellingPrice ?? 0;

    const itemShare = totalOrderSp > 0 ? totalSp / totalOrderSp : 0;
    const itemLevelDiscount = itemShare * totalDiscount;
    const finalPrice = totalSp - itemLevelDiscount;

    return {
      itemMrp: mrp * quantity,
      itemSp: totalSp,
      itemDiscount: itemLevelDiscount,
      finalAmount: finalPrice
    };
  }, [orderItem, currentOrder]);
const navigate= useNavigate();
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      {/* Product Overview */}
      <Paper sx={{ p: 3, mb: 3 }} elevation={0}>
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={4}>
          <Box sx={{ width: { xs: "100%", sm: 200 }, display: "flex", justifyContent: "center" }}>
            <Badge
              badgeContent={orderItem?.quantity}
              color="secondary"
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <img
                onClick={() =>
              navigate(`/product-details/${orderItem?.product.category}/${orderItem?.product.title}/${orderItem?.product.id}`)
            }
                style={{
                  width: "100%",
                  maxWidth: 200,
                  height: "auto",
                  borderRadius: 1,
               cursor: 'pointer' ,
                  border: `1px solid ${theme.palette.divider}`,
                }}
                src={orderItem?.product?.images?.[0]}
                alt={orderItem?.product?.title}
              />
            </Badge>
          </Box>

          <Box flexGrow={1}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {orderItem?.product?.title}
            </Typography>
            <Typography variant="body2" fontWeight="bold" color="text.secondary" gutterBottom>
              Order ID: ACVG33N{orderItem?.id}
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Store fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {orderItem?.product?.seller?.businessDetails?.bussinessName}
              </Typography>
            </Box>

            <Typography variant="body2" paragraph>
              {orderItem?.product?.description}
            </Typography>

            <Box display="flex" gap={2} mb={2}>
              <Chip
                label={`Size: ${orderItem?.product.sizes || "N/A"}`}
                size="small"
                variant="outlined"
              />
              <Chip
                label={`Qty: ${orderItem?.quantity}`}
                size="small"
                variant="outlined"
              />
            </Box>

            {currentOrder?.orderStatus === "DELIVERED" && (
              <Button
                variant="outlined"
                startIcon={<RateReview />}
                onClick={handleWriteReview}
                sx={{ mt: 1 }}
              >
                Write Review
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Order Status */}git status

      <Paper sx={{ p: 3, mb: 3 }} elevation={0}>
        <OrderStepper
          orderStatus={currentOrder?.orderStatus ?? ""}
          orderDate={currentOrder?.orderDate}
          deliveryDate={currentOrder?.deliverDate}
        />
      </Paper>

      {/* Delivery Address */}
      <Paper sx={{ p: 3, mb: 3 }} elevation={0}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Delivery Address
        </Typography>
        <Box display="flex" gap={2} mb={2}>
          <LocationOn color="primary" />
          <Box>
            <Typography fontWeight="medium">
              {currentOrder?.shippingAddress?.name}
            </Typography>
            <Typography variant="body2">
              {currentOrder?.shippingAddress?.address}
            </Typography>
            <Typography variant="body2">
              {currentOrder?.shippingAddress?.city},{" "}
              {currentOrder?.shippingAddress?.state} -{" "}
              {currentOrder?.shippingAddress?.pincode}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Phone color="primary" fontSize="small" />
          <Typography variant="body2">
            {currentOrder?.shippingAddress?.mobile}
          </Typography>
        </Box>
      </Paper>

      {/* Price Breakdown */}
      <Paper sx={{ p: 3, mb: 3 }} elevation={0}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Price Details
        </Typography>

        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2">MRP</Typography>
          <Typography variant="body2">₹{itemMrp.toFixed(2)}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2">Selling Price</Typography>
          <Typography variant="body2">₹{itemSp.toFixed(2)}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2">Coupon Discount</Typography>
          <Typography variant="body2" color="success.main">
            -₹{itemDiscount.toFixed(2)}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1" fontWeight="bold">
            Total Amount
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            ₹{finalAmount.toFixed(2)}
          </Typography>
        </Box>

        {itemDiscount > 0 && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: "success.light",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CreditScore color="success" />
            <Typography variant="body2">
              You saved ₹{itemDiscount.toFixed(2)} on this order
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Payment Method */}
      <Paper sx={{ p: 3, mb: 3 }} elevation={0}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Payment Method
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Payments color="primary" />
          <Typography>
            {currentOrder?.paymentStatus === "COMPLETED"
              ? "Prepaid"
              : "Cash on Delivery"}
          </Typography>
        </Box>
      </Paper>

      {/* Cancel Order Button */}
      {!["DELIVERED", "CANCELLED", "SHIPPED"].includes(
        currentOrder?.orderStatus || ""
      ) && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            variant="outlined"
            color="error"
            sx={{ py: 1.5, width: "100%", maxWidth: 400 }}
            onClick={handleCancelOrder}
          >
            Cancel Order
          </Button>
        </Box>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={orderCanceled ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {orderCanceled
            ? "Order canceled successfully"
            : `Failed to cancel order: ${error}`}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderDetails;
