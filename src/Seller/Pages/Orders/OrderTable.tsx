// import * as React from 'react';
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   CircularProgress,
//   Typography,
//   Button,
// } from '@mui/material';
// import { useAppDispatch, useAppSelector } from '../../../State/Store';
// import { fetchSellerOrders } from '../../../State/Sellers/sellerOrderSlice';

// export default function OrderTable() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const dispatch = useAppDispatch();
//   const { sellerOrders, loading, error } = useAppSelector((state) => state.sellerOrder);

//   React.useEffect(() => {
//     const jwt = localStorage.getItem('jwt');
//     if (jwt) {
//       dispatch(fetchSellerOrders(jwt));
//     }
//   }, [dispatch]);

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   if (loading) {
//     return (
//       <Paper sx={{ padding: 5, textAlign: 'center' }}>
//         <CircularProgress />
//       </Paper>
//     );
//   }

//   if (error) {
//     return (
//       <Paper sx={{ padding: 5, textAlign: 'center' }}>
//         <Typography color="error">{error}</Typography>
//         <Button onClick={() => window.location.reload()} sx={{ mt: 2 }} variant="outlined">
//           Retry
//         </Button>
//       </Paper>
//     );
//   }

//   const paginatedOrders =
//     Array.isArray(sellerOrders) && sellerOrders.length > 0
//       ? sellerOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//       : [];

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell>Order ID</TableCell>
//               <TableCell>Product(s)</TableCell>
//               <TableCell>Shipping Address</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell align="center">Update</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedOrders.map((order, index) => (
//               <TableRow hover role="checkbox" tabIndex={-1} key={index}>
//                 <TableCell>{order.id}</TableCell>
//                 <TableCell>
//                   {order.orderItems?.map((item: any) => (
//                     <div key={item.id}>
//                       <img src={item.product?.images[0] || ''} alt={item.product?.title || 'Product'} style={{ width: 40, height: 40, objectFit: 'cover', marginRight: 8 }} />
//                       {item.product?.title} × {item.quantity}{}{}
//                       {item.product.colors[0]} {}{}
//                     {item.product.sizes[0]}{}{}
                      
//                     </div>
//                   ))}
//                 </TableCell>
//                 <TableCell>
//                   {order.shippingAddress
//                     ? `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}`
//                     : 'N/A'}
//                 </TableCell>
//                 <TableCell>{order.orderStatus}</TableCell>
//                 <TableCell align="center">
//                   <Button variant="outlined" size="small">
//                     Update
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//             {paginatedOrders.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={5} align="center">
//                   No orders found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={sellerOrders?.length || 0}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }
import React, { useEffect, useState, useCallback } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Box,
  Chip,
  useTheme,
  Tooltip,
  Badge,
  Skeleton,
} from "@mui/material";
import {
  fetchSellerOrders,
  updateSellerOrderStatus,
} from "../../../State/Sellers/sellerOrderSlice";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  CheckCircle as CheckCircleIcon,
  LocalShipping as ShippingIcon,
  Warning as WarningIcon,
  Schedule as PendingIcon,
  Cancel as CancelledIcon,
  Payment as PaymentIcon,
} from "@mui/icons-material";
import { teal } from "@mui/material/colors";

// Memoize static data to prevent unnecessary re-renders
const columns = [
  { id: "id", label: "Order ID", minWidth: 100 },
  { id: "product", label: "Product(s)", minWidth: 300 },
  { id: "shippingAddress", label: "Shipping Address", minWidth: 250 },
  { id: "deliveryInfo", label: "Delivery Info", minWidth: 250 },
  { id: "paymentStatus", label: "Payment", minWidth: 120 },
  { id: "orderStatus", label: "Status", minWidth: 150 },
  { id: "actions", label: "Actions", minWidth: 200 },
];

const statusIcons = {
  PENDING: <PendingIcon color="disabled" />,
  PLACED: <PendingIcon color="info" />,
  CONFIRM: <CheckCircleIcon color="info" />,
  SHIPPED: <ShippingIcon color="warning" />,
  DELIVERED: <CheckCircleIcon color="success" />,
  CANCELLED: <CancelledIcon color="error" />,
};

const statusColors = {
  PENDING: "default",
  PLACED: "info",
  CONFIRM: "info",
  SHIPPED: "warning",
  DELIVERED: "success",
  CANCELLED: "error",
};

// Payment status configurations
const paymentStatusConfig = {
  PENDING: {
    color: "warning",
    icon: <PaymentIcon color="warning" fontSize="small" />,
    label: "Pending"
  },
  COMPLETED: {
    color: "success",
    icon: <CheckCircleIcon color="success" fontSize="small" />,
    label: "Paid"
  },
  FAILED: {
    color: "error",
    icon: <WarningIcon color="error" fontSize="small" />,
    label: "Failed"
  },
  REFUNDED: {
    color: "info",
    icon: <PaymentIcon color="info" fontSize="small" />,
    label: "Refunded"
  },
};

// Skeleton loader component for rows
const LoadingRow = () => (
  <TableRow>
    {columns.map((column) => (
      <TableCell key={column.id}>
        <Skeleton variant="rectangular" height={40} />
      </TableCell>
    ))}
  </TableRow>
);

export default function OrderTable() {
  const dispatch = useAppDispatch();
  const { sellerOrders, loading, error } = useAppSelector(
    (state) => state.sellerOrder
  );
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  const jwt = localStorage.getItem("jwt") || "";

  const calculateDeliveryDate = useCallback((orderDate: string) => {
    return new Date(new Date(orderDate).getTime() + 7 * 24 * 60 * 60 * 1000);
  }, []);

  const getDeliveryStatus = useCallback((orderDate: string, orderStatus: string) => {
    if (orderStatus === "DELIVERED") return { text: "Delivered", color: "success" };
    if (orderStatus === "CANCELLED") return { text: "Cancelled", color: "error" };

    const deliveryDate = calculateDeliveryDate(orderDate);
    const today = new Date();
    const timeDiff = deliveryDate.getTime() - today.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);

    if (dayDiff < 0) return { text: "Overdue", color: "error" };
    if (dayDiff <= 2) return { text: "Urgent", color: "warning" };
    return { text: "On time", color: "info" };
  }, [calculateDeliveryDate]);

  useEffect(() => {
    if (jwt) {
      const fetchData = async () => {
        try {
          await dispatch(fetchSellerOrders(jwt));
        } finally {
          setInitialLoad(false);
        }
      };
      fetchData();
    }
  }, [dispatch, jwt]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleStatusChange = useCallback((orderId: number, newStatus: string) => {
    dispatch(updateSellerOrderStatus({ jwt, orderId, orderStatus: newStatus }));
  }, [dispatch, jwt]);

  const toggleOrderExpand = useCallback((orderId: number) => {
    setExpandedOrder(prev => prev === orderId ? null : orderId);
  }, []);

  if (initialLoad) {
    return (
      <Paper sx={{ p: 2, borderRadius: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    <Skeleton variant="text" width="70%" />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <LoadingRow key={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="300px"
        p={3}
        bgcolor="error.light"
        borderRadius={2}
      >
        <WarningIcon color="error" style={{ fontSize: 60 }} />
        <Typography variant="h6" mt={2} color="error">
          Error loading orders
        </Typography>
        <Typography color="error" mt={1}>
          {error}
        </Typography>
      </Box>
    );
  }

  if (sellerOrders.length === 0 && !loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="300px"
        p={3}
      >
        <img
          src="/empty-orders.svg"
          alt="No orders"
          style={{ width: 150, opacity: 0.7 }}
        />
        <Typography variant="h6" mt={3} color="textSecondary">
          No orders found
        </Typography>
        <Typography color="textSecondary">
          You don't have any orders yet
        </Typography>
      </Box>
    );
  }

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: theme.shadows[3],
      }}
    >
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="orders table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{
                    minWidth: column.minWidth,
                    fontWeight: "bold",
                    backgroundColor: teal[700],
                    color: theme.palette.primary.contrastText,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading && page === 0 ? (
              Array.from({ length: rowsPerPage }).map((_, index) => (
                <LoadingRow key={index} />
              ))
            ) : (
              sellerOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => {
                  const deliveryStatus = getDeliveryStatus(
                    order.orderDate,
                    order.orderStatus
                  );
                  const deliveryDate = calculateDeliveryDate(order.orderDate);
                  const shippingAddress = order.shippingAddress
                    ? `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.pincode}`
                    : "N/A";

                  // Get payment status configuration
                  const paymentStatus = order.paymentStatus || "PENDING";
                  const paymentConfig = paymentStatusConfig[paymentStatus] || paymentStatusConfig.PENDING;

                  return (
                    <React.Fragment key={order.id}>
                      <TableRow
                        hover
                        sx={{
                          "&:hover": {
                            backgroundColor: theme.palette.action.hover,
                          },
                        }}
                        onClick={() => toggleOrderExpand(order.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <TableCell>
                          <Typography
                            variant="body2"
                            fontWeight="bold"
                            color="primary"
                          >
                            #{order.id}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Badge
                              badgeContent={order.orderItems.length}
                              color="secondary"
                              sx={{ mr: 2 }}
                            >
                              <img
                                src={order.orderItems[0]?.product.images?.[0]}
                                alt={
                                  order.orderItems[0]?.product.title || "Product"
                                }
                                style={{
                                  width: 50,
                                  height: 50,
                                  objectFit: "cover",
                                  borderRadius: 4,
                                  border: `1px solid ${theme.palette.divider}`,
                                }}
                                loading="lazy"
                              />
                            </Badge>
                            <Box>
                              <Typography fontWeight="medium">
                                {order.orderItems[0]?.product.title ||
                                  "Product Name"}
                              </Typography>
                              {order.orderItems.length > 1 && (
                                <Typography variant="caption" color="textSecondary">
                                  +{order.orderItems.length - 1} more items
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </TableCell>

                        <TableCell>
                          <Typography variant="body2">
                            {shippingAddress.split(",")[0]}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {shippingAddress.split(",").slice(1).join(",")}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Tooltip
                              title={
                                deliveryStatus.text === "Delivered"
                                  ? "Order delivered"
                                  : deliveryStatus.text === "Cancelled"
                                  ? "Order cancelled"
                                  : `Expected by ${new Date(deliveryDate).toLocaleDateString()}`
                              }
                            >
                              <Chip
                                icon={statusIcons[order.orderStatus]}
                                label={
                                  deliveryStatus.text === "Delivered" ||
                                  deliveryStatus.text === "Cancelled"
                                    ? deliveryStatus.text
                                    : new Date(deliveryDate).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                      })
                                }
                                size="small"
                                color={deliveryStatus.color as any}
                                variant="outlined"
                              />
                            </Tooltip>
                            {deliveryStatus.text === "Urgent" && (
                              <Tooltip title="Delivery due soon">
                                <WarningIcon
                                  color="warning"
                                  fontSize="small"
                                />
                              </Tooltip>
                            )}
                            {deliveryStatus.text === "Overdue" && (
                              <Tooltip title="Delivery overdue">
                                <WarningIcon color="error" fontSize="small" />
                              </Tooltip>
                            )}
                          </Box>
                        </TableCell>

                        <TableCell>
                          <Tooltip title={`Payment ${paymentStatus.toLowerCase()}`}>
                            <Chip
                              icon={paymentConfig.icon}
                              label={paymentConfig.label}
                              size="small"
                              color={paymentConfig.color as any}
                              variant="outlined"
                              sx={{
                                textTransform: "capitalize",
                                fontWeight: "medium",
                              }}
                            />
                          </Tooltip>
                        </TableCell>

                        <TableCell>
                          <Chip
                            label={order.orderStatus}
                            color={statusColors[order.orderStatus] as any}
                            size="small"
                            variant="filled"
                            sx={{
                              textTransform: "capitalize",
                              fontWeight: "medium",
                            }}
                          />
                        </TableCell>

                        <TableCell>
                          <Select
                            size="small"
                            value={order.orderStatus}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                            onClick={(e) => e.stopPropagation()}
                            sx={{
                              minWidth: 120,
                              "& .MuiSelect-select": {
                                paddingY: 1,
                              },
                            }}
                          >
                            <MenuItem value="PENDING">Pending</MenuItem>
                            <MenuItem value="PLACED">Placed</MenuItem>
                            <MenuItem value="SHIPPED">Shipped</MenuItem>
                            <MenuItem value="DELIVERED">Delivered</MenuItem>
                            <MenuItem value="CANCELLED">Cancelled</MenuItem>
                          </Select>
                        </TableCell>
                      </TableRow>

                      {expandedOrder === order.id && (
                        <TableRow>
                          <TableCell colSpan={7} sx={{ py: 2 }}>
                            <Box
                              sx={{
                                backgroundColor: theme.palette.background.default,
                                borderRadius: 2,
                                p: 2,
                              }}
                            >
                              <Typography
                                variant="subtitle2"
                                gutterBottom
                                color="textSecondary"
                              >
                                Order Details
                              </Typography>
                              <Box display="flex" flexWrap="wrap" gap={4}>
                                <Box>
                                  <Typography
                                    variant="caption"
                                    color="textSecondary"
                                  >
                                    Customer
                                  </Typography>
                                  <Typography>
                                    {order.user?.fullname || "N/A"}
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography
                                    variant="caption"
                                    color="textSecondary"
                                  >
                                    Contact
                                  </Typography>
                                  <Typography>
                                    {order.shippingAddress?.mobile || "N/A"}
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography
                                    variant="caption"
                                    color="textSecondary"
                                  >
                                    Order Date
                                  </Typography>
                                  <Typography>
                                    {new Date(
                                      order.orderDate
                                    ).toLocaleDateString()}
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography
                                    variant="caption"
                                    color="textSecondary"
                                  >
                                    Payment Status
                                  </Typography>
                                  <Typography>
                                    {paymentConfig.label} ({order.paymentStatus || "N/A"})
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography
                                    variant="caption"
                                    color="textSecondary"
                                  >
                                    Expected Delivery
                                  </Typography>
                                  <Typography>
                                    {new Date(deliveryDate).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              </Box>

                              <Typography
                                variant="subtitle2"
                                mt={2}
                                gutterBottom
                                color="textSecondary"
                              >
                                Products
                              </Typography>
                              <Box
                                sx={{
                                  maxHeight: 200,
                                  overflowY: "auto",
                                  border: `1px solid ${theme.palette.divider}`,
                                  borderRadius: 1,
                                  p: 1,
                                }}
                              >
                                {order.orderItems.map((item, idx) => (
                                  <Box
                                    key={idx}
                                    display="flex"
                                    alignItems="center"
                                    gap={2}
                                    mb={2}
                                    pb={1}
                                    sx={{
                                      borderBottom:
                                        idx < order.orderItems.length - 1
                                          ? `1px solid ${theme.palette.divider}`
                                          : "none",
                                    }}
                                  >
                                    <img
                                      src={item.product.images?.[0]}
                                      alt={item.product.title}
                                      style={{
                                        width: 60,
                                        height: 60,
                                        objectFit: "cover",
                                        borderRadius: 4,
                                        border: `1px solid ${theme.palette.divider}`,
                                      }}
                                      loading="lazy"
                                    />
                                    <Box flexGrow={1}>
                                      <Typography fontWeight={500}>
                                        {item.product.title}
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        color="textSecondary"
                                      >
                                        Qty: {item.quantity} | Size: {item.sizes}
                                      </Typography>
                                    </Box>
                                    <Box textAlign="right">
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ textDecoration: "line-through" }}
                                      >
                                        ₹{item.mrpPrice}
                                      </Typography>
                                      <Typography variant="body2" fontWeight={500}>
                                        ₹{item.sellingPrice}
                                      </Typography>
                                    </Box>
                                  </Box>
                                ))}
                              </Box>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[100, 200, 500]}
        component="div"
        count={sellerOrders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          "& .MuiTablePagination-toolbar": {
            padding: 1,
          },
        }}
      />
    </Paper>
  );
}
// import React, { useEffect, useState } from "react";
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   Select,
//   MenuItem,
//   CircularProgress,
//   Typography,
//   Button,
//   TextField,
// } from "@mui/material";
// import { useAppDispatch, useAppSelector } from "../../../State/Store";
// import {
//   fetchSellerOrders,
//   updateSellerOrderStatus,
// } from "../../../State/Sellers/sellerOrderSlice";
// import dayjs from "dayjs";
// import { saveAs } from "file-saver";
// import Papa from "papaparse";

// const columns = [
//   { id: "id", label: "Order ID", minWidth: 100 },
//   { id: "product", label: "Product(s)", minWidth: 300 },
//   { id: "shippingAddress", label: "Shipping Address", minWidth: 250 },
//   { id: "orderDate", label: "Order Date", minWidth: 150 },
//   { id: "deliveryDate", label: "Expected Delivery", minWidth: 150 },
//   { id: "orderStatus", label: "Status", minWidth: 150 },
//   { id: "update", label: "Update Status", minWidth: 200 },
// ];

// export default function OrderTable() {
//   const dispatch = useAppDispatch();
//   const { sellerOrders, loading, error } = useAppSelector(
//     (state) => state.sellerOrder
//   );

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [filter, setFilter] = useState("");
//   const jwt = localStorage.getItem("jwt") || "";

//   useEffect(() => {
//     if (jwt) dispatch(fetchSellerOrders(jwt));
//   }, [dispatch, jwt]);

//   const handleChangePage = (_event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const handleStatusChange = (orderId: number, newStatus: string) => {
//     dispatch(updateSellerOrderStatus({ jwt, orderId, orderStatus: newStatus }));
//   };

//   const handleExportCSV = () => {
//     const csvData = sellerOrders.map((order) => ({
//       id: order.id,
//       orderDate: order.orderDate,
//       deliveryDate: order.deliverDate,
//       orderStatus: order.orderStatus,
//       shippingAddress: `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.pincode}`,
//     }));
//     const csv = Papa.unparse(csvData);
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
//     saveAs(blob, "orders.csv");
//   };

//   const filteredOrders = sellerOrders.filter(
//     (order) =>
//       order.id.toString().includes(filter.toLowerCase()) ||
//       order.orderStatus.toLowerCase().includes(filter.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <Paper sx={{ padding: 5, textAlign: "center" }}>
//         <CircularProgress />
//         <Typography mt={2}>Loading orders...</Typography>
//       </Paper>
//     );
//   }

//   if (error) {
//     return (
//       <Paper sx={{ padding: 5, textAlign: "center" }}>
//         <Typography color="error">{error}</Typography>
//       </Paper>
//     );
//   }

//   return (
//     <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
//       <Box display="flex" justifyContent="space-between" mb={2}>
//         <TextField
//           label="Search Orders"
//           size="small"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         />
//         <Button variant="outlined" onClick={handleExportCSV}>
//           Export CSV
//         </Button>
//       </Box>

//       <TableContainer sx={{ maxHeight: 600 }}>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   style={{ minWidth: column.minWidth, fontWeight: "bold" }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {filteredOrders
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((order) => {
//                 const shippingAddress = order.shippingAddress
//                   ? `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.pincode}`
//                   : "N/A";

//                 return (
//                   <TableRow hover key={order.id}>
//                     <TableCell>{order.id}</TableCell>

//                     <TableCell>
//                       {order.orderItems.map((item, idx) => (
//                         <div
//                           key={idx}
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "10px",
//                             marginBottom: "10px",
//                             borderBottom: "1px solid #ddd",
//                             paddingBottom: "8px",
//                           }}
//                         >
//                           <img
//                             src={item.product.images?.[0]}
//                             alt={item.product.title}
//                             style={{
//                               width: "60px",
//                               height: "60px",
//                               objectFit: "cover",
//                               borderRadius: "4px",
//                               border: "1px solid #ccc",
//                             }}
//                           />
//                           <div>
//                             <div style={{ fontWeight: 600 }}>{item.product.title}</div>
//                             <div style={{ fontSize: "0.85rem", color: "#555" }}>
//                               Qty: {item.quantity} | Size: {item.sizes}
//                             </div>
//                             <div style={{ fontSize: "0.85rem", color: "#444" }}>
//                               MRP: ₹{item.mrpPrice} | Selling: ₹{item.sellingPrice}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </TableCell>

//                     <TableCell>{shippingAddress}</TableCell>
//                     <TableCell>{dayjs(order.orderDate).format("DD MMM YYYY")}</TableCell>
//                     <TableCell>{order.deliverDate ? dayjs(order.deliverDate).format("DD MMM YYYY") : "-"}</TableCell>
//                     <TableCell>{order.orderStatus}</TableCell>
//                     <TableCell>
//                       <Select
//                         size="small"
//                         value={order.orderStatus}
//                         onChange={(e) =>
//                           handleStatusChange(order.id, e.target.value)
//                         }
//                       >
//                         <MenuItem value="PENDING">Pending</MenuItem>
//                         <MenuItem value="PLACED">Placed</MenuItem>
//                         <MenuItem value="CONFIRM">Confirmed</MenuItem>
//                         <MenuItem value="SHIPPED">Shipped</MenuItem>
//                         <MenuItem value="DELIVERED">Delivered</MenuItem>
//                         <MenuItem value="CANCELLED">Cancelled</MenuItem>
//                       </Select>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={filteredOrders.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }
