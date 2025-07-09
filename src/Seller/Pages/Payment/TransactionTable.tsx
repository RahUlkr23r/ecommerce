import * as React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  CircularProgress,
  Chip,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchSellerTransactions } from '../../../State/Sellers/transactionSlice';
import dayjs from 'dayjs';

const columns = [
  { id: 'date', label: 'Date', minWidth: 120 },
  { id: 'customerDetail', label: 'Customer Detail', minWidth: 150 },
  { id: 'order', label: 'Order Items', minWidth: 200 },
  { id: 'paymentStatus', label: 'Payment Status', minWidth: 130 },
  { id: 'orderStatus', label: 'Order Status', minWidth: 130 },
  { id: 'amount', label: 'Amount (₹)', minWidth: 100, align: 'right' },
];

const getStatusColor = (status: string, type: 'payment' | 'order') => {
  if (type === 'payment') {
    switch (status) {
      case 'PENDING':
        return 'default';
      case 'PROCESSING':
        return 'info';
      case 'COMPLETED':
        return 'success';
      case 'FAILED':
        return 'error';
      default:
        return 'default';
    }
  } else {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'SHIPPED':
        return 'info';
      case 'DELIVERED':
        return 'success';
      case 'CANCELLED':
        return 'error';
      default:
        return 'default';
    }
  }
};

const TransactionTable: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filterPayment, setFilterPayment] = React.useState('');
  const [filterOrder, setFilterOrder] = React.useState('');

  const dispatch = useAppDispatch();
  const { transactions, loading, error } = useAppSelector(
    (store) => store.transactions
  );

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt') || '';
    dispatch(fetchSellerTransactions(jwt));
  }, [dispatch]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const currencyFormat = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  });

  // Filter and sort
  const filtered = transactions.filter((txn) => {
    const paymentStatus = txn.order.paymentDetails?.status ?? '';
    const orderStatus = txn.order.orderStatus ?? '';
    return (
      (!filterPayment || paymentStatus === filterPayment) &&
      (!filterOrder || orderStatus === filterOrder)
    );
  });

  const sortedTransactions = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const paginatedTransactions = sortedTransactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ width: '100%', p: 2, overflow: 'hidden' }}>
      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 180 }} size="small">
          <InputLabel>Payment Status</InputLabel>
          <Select
            value={filterPayment}
            label="Payment Status"
            onChange={(e) => {
              setFilterPayment(e.target.value);
              setPage(0);
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="PROCESSING">Processing</MenuItem>
            <MenuItem value="COMPLETED">Completed</MenuItem>
            <MenuItem value="FAILED">Failed</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 180 }} size="small">
          <InputLabel>Order Status</InputLabel>
          <Select
            value={filterOrder}
            label="Order Status"
            onChange={(e) => {
              setFilterOrder(e.target.value);
              setPage(0);
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="SHIPPED">Shipped</MenuItem>
            <MenuItem value="DELIVERED">Delivered</MenuItem>
            <MenuItem value="CANCELLED">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align ?? 'left'}
                  style={{ minWidth: col.minWidth }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} align="center" style={{ color: 'red' }}>
                  {error}
                </TableCell>
              </TableRow>
            ) : paginatedTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedTransactions.map((txn, idx) => {
                const orderSummary = txn.order.orderItems
                  .map((item) => `${item.product.title} x${item.quantity}`)
                  .join(', ');
                const customerDetail = `${txn.customer.fullname} (${txn.customer.email})`;
                const paymentStatus = txn.order.paymentStatus ?? 'N/A';
                const orderStatus = txn.order.orderStatus ?? 'N/A';

                return (
                  <TableRow hover key={idx}>
                    <TableCell>{dayjs(txn.date).format('YYYY-MM-DD')}</TableCell>
                    <TableCell>{customerDetail}</TableCell>
                    <TableCell>{orderSummary}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={paymentStatus}
                        color={getStatusColor(paymentStatus, 'payment')}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={orderStatus}
                        color={getStatusColor(orderStatus, 'order')}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {currencyFormat.format(txn.order.totalSellingPrice || 0)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={sortedTransactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TransactionTable;
