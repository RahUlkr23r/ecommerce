import {
  ElectricBolt,
  CheckCircle,
  LocalShipping,
  Warning,
  Cancel
} from '@mui/icons-material';
import {
  Avatar,
  Chip,
  Box,
  Typography
} from '@mui/material';
import {
  teal,
  green,
  orange,
  blue,
  grey
} from '@mui/material/colors';
import { Order, OrderItems } from '../../../tpyes/OrderTypes';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

const OrderItemCard = ({ item, order }: { item: OrderItems; order: Order }) => {
  const navigate = useNavigate();

  const { deliveryDate, statusInfo } = useMemo(() => {
    const orderDate = new Date(order.orderDate);
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(orderDate.getDate() + 7);

    let statusInfo = {
      text: '',
      color: '',
      icon: <ElectricBolt />,
      message: ''
    };

    const today = new Date();
    const timeDiff = deliveryDate.getTime() - today.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (order.orderStatus === 'DELIVERED') {
      statusInfo = {
        text: 'Delivered',
        color: green[500],
        icon: <CheckCircle />,
        message: 'Your order has arrived'
      };
    } else if (order.orderStatus === 'CANCELLED') {
      statusInfo = {
        text: 'Cancelled',
        color: grey[700],
        icon: <Cancel />,
        message: 'Your order was cancelled'
      };
    } else if (dayDiff <= 0) {
      statusInfo = {
        text: 'Delayed',
        color: orange[500],
        icon: <Warning />,
        message: 'Delivery delayed'
      };
    } else if (dayDiff <= 2) {
      statusInfo = {
        text: 'Arriving soon',
        color: teal[500],
        icon: <LocalShipping />,
        message: 'Arriving soon'
      };
    } else {
      statusInfo = {
        text: 'On the way',
        color: blue[500],
        icon: <LocalShipping />,
        message: 'On the way'
      };
    }

    return {
      deliveryDate: deliveryDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      statusInfo
    };
  }, [order.orderDate, order.orderStatus]);

  const paymentCompleted = order.paymentStatus === 'COMPLETED';

  const handleClick = () => {
    if (paymentCompleted) {
      navigate(`/account/order/${order.id}/${item.id}`);
    }
  };

  // 🧮 Proportional Discount Logic (same as OrderDetails)
  const {
    itemSp,
    itemDiscount,
    finalAmount
  } = useMemo(() => {
    
    const sp = item.sellingPrice ?? 0;
    const totalSp = sp ;

    const totalDiscount = order.discount ?? 0;
    const orderTotalSp = order.totalSellingPrice ?? 0;

    const itemShare = orderTotalSp > 0 ? totalSp / orderTotalSp : 0;
    const itemLevelDiscount = itemShare * totalDiscount;
    const finalPrice = totalSp - itemLevelDiscount;

    return {
      itemSp: totalSp,
      itemDiscount: itemLevelDiscount,
      finalAmount: finalPrice
    };
  }, [item, order]);

  return (
    <Box
      onClick={handleClick}
      sx={{
        backgroundColor: 'background.paper',
        p: 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        cursor: paymentCompleted ? 'pointer' : 'not-allowed',
        opacity: order.orderStatus === 'CANCELLED' ? 0.7 : 1,
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: paymentCompleted ? 2 : 0,
          borderColor: paymentCompleted ? 'primary.main' : 'divider'
        }
      }}
    >
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Avatar sx={{ bgcolor: statusInfo.color }}>{statusInfo.icon}</Avatar>
        <Box>
          <Chip
            label={statusInfo.text}
            size="small"
            sx={{
              backgroundColor: `${statusInfo.color}20`,
              color: statusInfo.color,
              fontWeight: 'bold'
            }}
          />
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {order.orderStatus === 'DELIVERED'
              ? `Arrived on ${deliveryDate}`
              : order.orderStatus === 'CANCELLED'
              ? 'Cancelled'
              : statusInfo.message === 'Delayed'
              ? 'Checking new delivery date'
              : `Expected by ${deliveryDate}`}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          p: 3,
          backgroundColor: `${teal[50]}`,
          borderRadius: 1,
          display: 'flex',
          gap: 3,
          alignItems: 'center'
        }}
      >
        <Box>
          <img
            src={item.product.images[0]}
            alt={item.product.title}
            style={{
              width: 120,
              height: 120,
              objectFit: 'contain',
              borderRadius: 1,
              border: '1px solid #e0e0e0'
            }}
          />
        </Box>

        <Box flexGrow={1}>
          <Typography variant="subtitle2" color="text.secondary">
            {item.product.seller?.businessDetails?.bussinessName}
          </Typography>
          <Typography variant="body1" fontWeight="bold" mt={0.5}>
            {item.product.title}
          </Typography>
          <Typography variant="body2" mt={1}>
            {item.product.description?.substring(0, 100)}...
          </Typography>
          <Box display="flex" gap={2} mt={1.5}>
            <Typography variant="body2">
              <strong>Qty:</strong> {item.quantity}
            </Typography>
            {item.sizes && (
              <Typography variant="body2">
                <strong>Size:</strong> {item.sizes}
              </Typography>
            )}
          </Box>
        </Box>

        <Box textAlign="right" minWidth={120}>
          <Typography variant="body1" fontWeight="bold" color="primary">
           Paid  -  ₹{finalAmount.toFixed(2)}
          </Typography>

          {itemSp > 0 && itemDiscount > 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'line-through' }}
            >
          ₹{itemSp.toFixed(2)}
            </Typography>
          )}

          {!paymentCompleted ? (
            <Typography variant="body2" color="error.main">
              Payment {order.paymentStatus?.toLowerCase() || 'pending'}
            </Typography>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default OrderItemCard;
