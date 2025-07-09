// src/components/Admin/Coupon/CouponTable.tsx

import React, { useEffect, useState } from 'react';
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
  Tooltip,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../State/Store';
import { fetchAllCoupons, deleteCoupon } from '../../../State/Admins/adminCouponSlice';
import { Coupon } from '../../../tpyes/CouponType';

const CouponTable = () => {
  const dispatch = useDispatch();
  const { coupons, loading, error } = useSelector((state: RootState) => state.adminCouponSlice);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchAllCoupons() as any);
  }, [dispatch]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (couponId: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this coupon?');
    if (!confirmed) return;

    const token = localStorage.getItem('jwt');
    if (!token) {
      alert('Unauthorized: No token found.');
      return;
    }

    dispatch(deleteCoupon({ couponId, token }) as any);
  };

  const safeCoupons: Coupon[] = Array.isArray(coupons) ? coupons : [];

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="coupon table">
          <TableHead>
            <TableRow>
              <TableCell>Coupon Code</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Min Order</TableCell>
              <TableCell>Discount (%)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ color: 'red' }}>
                  {error}
                </TableCell>
              </TableRow>
            ) : safeCoupons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No coupons found.
                </TableCell>
              </TableRow>
            ) : (
              safeCoupons
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((coupon: Coupon) => (
                  <TableRow hover key={coupon.id}>
                    <TableCell>{coupon.code}</TableCell>
                    <TableCell>{new Date(coupon.validateStartDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(coupon.validateEndDate).toLocaleDateString()}</TableCell>
                    <TableCell>{coupon.minimumOrderValue}</TableCell>
                    <TableCell>{coupon.discountPercentage}</TableCell>
                    <TableCell>{coupon.active ? 'Active' : 'Inactive'}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Delete Coupon">
                        <Delete
                          color="error"
                          sx={{ cursor: 'pointer' }}
                          onClick={() => handleDelete(coupon.id)}
                        />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={safeCoupons.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CouponTable;
