import React, { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CircularProgress
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import {
  AccountStatus,
  fetchAllSellers,
  updateSellerStatus
} from '../../../State/Admins/adminControllerSlice';
import { Seller } from '../../../tpyes/Sellertype';

const accountStatusOptions = [
  { status: 'PENDING_VERIFICATION', title: 'Pending Verification' },
  { status: 'ACTIVE', title: 'Active' },
  { status: 'SUSPENDED', title: 'Suspended' },
  { status: 'DEACTIVATED', title: 'Deactivated' },
  { status: 'BANNED', title: 'Banned' },
  { status: 'CLOSED', title: 'Closed' },
];

const SellerTable = () => {
  const dispatch = useAppDispatch();
  const { sellers, loading } = useAppSelector((state) => state.adminSellers);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterStatus, setFilterStatus] = useState<AccountStatus | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchAllSellers(filterStatus) as any);
  }, [dispatch, filterStatus]);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterChange = (event: any) => {
    const value = event.target.value;
    setFilterStatus(value === '' ? undefined : value);
  };

  const handleStatusUpdate = (sellerId: number, newStatus: string) => {
    dispatch(updateSellerStatus({ id: sellerId, status: newStatus as AccountStatus }) as any);
  };

  const paginatedSellers = Array.isArray(sellers)
    ? sellers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : [];

  return (
    <>
      <div className="pb-4 w-50">
        <FormControl fullWidth>
          <InputLabel id="status-filter-label">Filter by Status</InputLabel>
          <Select
            labelId="status-filter-label"
            value={filterStatus || ''}
            label="Account Status"
            onChange={handleFilterChange}
          >
            
            {accountStatusOptions.map((option) => (
              <MenuItem key={option.status} value={option.status}>
                {option.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="seller table">
            <TableHead>
              <TableRow>
                <TableCell>Seller Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>GSTIN</TableCell>
                <TableCell>Business Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Change Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <CircularProgress size={28} />
                  </TableCell>
                </TableRow>
              ) : paginatedSellers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography>No sellers found.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedSellers.map((seller: Seller) => (
                  <TableRow key={seller.id} hover>
                    <TableCell>{seller.sellerName}</TableCell>
                    <TableCell>{seller.email}</TableCell>
                    <TableCell>{seller.mobile}</TableCell>
                    <TableCell>{seller.GSTIN || '-'}</TableCell>
                    <TableCell>{seller.businessDetails?.bussinessName || '-'}</TableCell>
                    <TableCell>{seller.accountStatus}</TableCell>
                    <TableCell align="center">
                      <Select
                        size="small"
                        value={seller.accountStatus}
                        onChange={(e) => handleStatusUpdate(seller.id, e.target.value)}
                      >
                        {accountStatusOptions.map((option) => (
                          <MenuItem key={option.status} value={option.status}>
                            {option.title}
                          </MenuItem>
                        ))}
                      </Select>
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
          count={sellers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default SellerTable;
