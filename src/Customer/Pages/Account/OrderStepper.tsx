import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  FiberManualRecord,
  LocalShipping,
  Inventory,
  Cancel,
  ShoppingBag
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../State/Store";

const OrderStepper = ({ orderStatus }: { orderStatus: string }) => {
  const { currentOrder } = useAppSelector((store) => store.order);
  const [statusSteps, setStatusSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!currentOrder?.orderDate) return;

    const orderDate = new Date(currentOrder.orderDate);
    const today = new Date();
    const deliveryDate = currentOrder.deliverDate 
      ? new Date(currentOrder.deliverDate) 
      : new Date(orderDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Default 7 days delivery

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
    };

    const baseSteps = [
      { 
        name: "Order Placed", 
        description: formatDate(orderDate), 
        value: "PLACED",
        icon: <ShoppingBag fontSize="small" />,
        date: orderDate
      },
      { 
        name: "Packed", 
        description: formatDate(new Date(orderDate.getTime() + 2 * 24 * 60 * 60 * 1000)), 
        value: "CONFIRM",
        icon: <Inventory fontSize="small" />,
        date: new Date(orderDate.getTime() + 2 * 24 * 60 * 60 * 1000)
      },
      { 
        name: "Shipped", 
        description: formatDate(new Date(orderDate.getTime() + 3 * 24 * 60 * 60 * 1000)), 
        value: "SHIPPED",
        icon: <LocalShipping fontSize="small" />,
        date: new Date(orderDate.getTime() + 3 * 24 * 60 * 60 * 1000)
      },
      { 
        name: "Out for Delivery", 
        description: formatDate(new Date(orderDate.getTime() + 6 * 24 * 60 * 60 * 1000)), 
        value: "OUT_FOR_DELIVERY",
        icon: <LocalShipping fontSize="small" />,
        date: new Date(orderDate.getTime() + 6 * 24 * 60 * 60 * 1000)
      },
      { 
        name: "Delivered", 
        description: formatDate(deliveryDate), 
        value: "DELIVERED",
        icon: <CheckCircle fontSize="small" />,
        date: deliveryDate
      }
    ];

    const cancelledSteps = [
      { 
        name: "Order Placed", 
        description: formatDate(orderDate), 
        value: "PLACED",
        icon: <ShoppingBag fontSize="small" />,
        date: orderDate
      },
      { 
        name: "Cancelled", 
        description: formatDate(new Date(orderDate.getTime() + 1 * 24 * 60 * 60 * 1000)), 
        value: "CANCELLED",
        icon: <Cancel fontSize="small" />,
        date: new Date(orderDate.getTime() + 1 * 24 * 60 * 60 * 1000)
      }
    ];

    if (orderStatus === "CANCELLED") {
      setStatusSteps(cancelledSteps);
      setCurrentStep(1);
    } else {
      setStatusSteps(baseSteps);
      
      // Calculate current step based on date if status is not explicitly set
      let activeStep = 0;
      if (orderStatus) {
        activeStep = baseSteps.findIndex(step => step.value === orderStatus);
      } else {
        activeStep = baseSteps.findIndex(step => step.date > today) - 1;
        if (activeStep < 0) activeStep = baseSteps.length - 1;
      }
      
      setCurrentStep(activeStep >= 0 ? activeStep : 0);
    }
  }, [orderStatus, currentOrder]);

  if (!currentOrder) return null;

  return (
    <Box sx={{ my: 4 }}>
      {statusSteps.map((step, index) => (
        <Box key={index} sx={{ display: 'flex', px: 2 }}>
          {/* Vertical Stepper Line and Icon */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: index <= currentStep ? 'primary.light' : 'action.disabledBackground',
                color: index <= currentStep ? 'primary.main' : 'action.disabled',
                zIndex: 1
              }}
            >
              {index < currentStep ? (
                <CheckCircle fontSize="small" />
              ) : (
                step.icon || <FiberManualRecord fontSize="small" />
              )}
            </Box>

            {index !== statusSteps.length - 1 && (
              <Box
                sx={{
                  height: 80,
                  width: 2,
                  bgcolor: index < currentStep ? 'primary.main' : 'divider'
                }}
              />
            )}
          </Box>

          {/* Step Content */}
          <Box sx={{ ml: 2, width: '100%', mb: 3 }}>
            <Box
              sx={{
                p: 2,
                borderRadius: 1,
                bgcolor: step.value === orderStatus 
                  ? step.value === 'CANCELLED' ? 'error.light' : 'primary.light'
                  : 'transparent',
                transform: step.value === orderStatus ? 'translateY(-8px)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <Typography 
                variant="body1" 
                fontWeight={step.value === orderStatus ? 600 : 500}
                color={step.value === orderStatus 
                  ? step.value === 'CANCELLED' ? 'error.dark' : 'primary.dark' 
                  : 'text.primary'}
              >
                {step.name}
              </Typography>
              <Typography 
                variant="caption" 
                color={step.value === orderStatus 
                  ? step.value === 'CANCELLED' ? 'error.main' : 'primary.main' 
                  : 'text.secondary'}
              >
                {step.description}
                {step.value === orderStatus && !['DELIVERED', 'CANCELLED'].includes(step.value) && (
                  <span> • Expected</span>
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default OrderStepper;