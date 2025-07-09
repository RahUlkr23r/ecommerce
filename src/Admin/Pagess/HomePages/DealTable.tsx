import * as React from 'react';
import {
  Avatar,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { deleteDeal, fetchAllDeals, updateDeal } from '../../../State/Admins/dealSlice';
import { Deals } from '../../../tpyes/dealType';

interface Column {
  id: 'sno' | 'image' | 'category' | 'discount' | 'edit' | 'delete';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}

const columns: readonly Column[] = [
  { id: 'sno', label: 'S.No', minWidth: 50 },
  { id: 'image', label: 'Image', minWidth: 100 },
  { id: 'category', label: 'Category', minWidth: 150 },
  { id: 'discount', label: 'Discount Percentage', minWidth: 100 },
  { id: 'edit', label: 'Edit', minWidth: 50, align: 'center' },
  { id: 'delete', label: 'Delete', minWidth: 50, align: 'center' },
];

export default function DealTable() {
  const dispatch = useAppDispatch();
  const { deals, loading } = useAppSelector((state) => state.deals);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [currentDeal, setCurrentDeal] = React.useState<Deals | null>(null);
  const [editedDiscount, setEditedDiscount] = React.useState<number>(0);

  React.useEffect(() => {
    dispatch(fetchAllDeals() as any);
  }, [dispatch]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (deal: Deals) => {
    setCurrentDeal(deal);
    setEditedDiscount(deal.discount);
    setOpenEdit(true);
  };

  const handleDelete = (deal: Deals) => {
    if (
      window.confirm(
        `Are you sure you want to delete the deal for category "${deal.category.categoryId}" with discount ₹${deal.discount}?`
      ) &&
      deal.id !== undefined
    ) {
      dispatch(deleteDeal(deal.id) as any);
    }
  };

  const handleUpdateDeal = () => {
    if (currentDeal && currentDeal.id) {
      const updated: Deals = {
        ...currentDeal,
        discount: editedDiscount,
      };
      dispatch(updateDeal({ id: currentDeal.id, deal: updated }) as any);
      setOpenEdit(false);
    }
  };

  const paginatedDeals = deals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="deal table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align ?? 'left'}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              [...Array(rowsPerPage)].map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  {columns.map((col) => (
                    <TableCell key={col.id}>
                      <Skeleton variant="text" width="100%" height={30} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : paginatedDeals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No deals available.
                </TableCell>
              </TableRow>
            ) : (
              paginatedDeals.map((deal, index) => (
                <TableRow hover key={deal.id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={deal.category.image || ''}
                      alt={deal.category.name}
                      style={{ width: 50, height: 50, borderRadius: '50%' }}
                    />
                  </TableCell>
                  <TableCell>{deal.category.name}</TableCell>
                  <TableCell>  {deal.discount}%</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => handleEdit(deal)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDelete(deal)}>
                        <DeleteIcon />
                      </IconButton>
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
        count={deals.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* 🔧 Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Deal Discount</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="number"
            label="Discount (%)"
            value={editedDiscount}
            onChange={(e) => setEditedDiscount(parseInt(e.target.value))}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateDeal} color="primary" variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
