import React, { useEffect, useState } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, Avatar, IconButton, CircularProgress,
  Typography, Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchAllHomeCategories, updateHomeCategory } from '../../../State/Admins/adminSlice';
import { HomeCategory } from '../../../tpyes/HomeCategoryType';

interface Column {
  id: 'sno' | 'id' | 'image' | 'category' | 'update';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}

const columns: readonly Column[] = [
  { id: 'sno', label: 'S.No', minWidth: 50 },
  { id: 'id', label: 'ID', minWidth: 100 },
  { id: 'image', label: 'Image', minWidth: 100 },
  { id: 'category', label: 'Category', minWidth: 150 },
  { id: 'update', label: 'Update', minWidth: 100, align: 'center' },
];

export default function HomeCategoryTable({ data }: { data?: HomeCategory[] }) {
  const dispatch = useAppDispatch();
  const reduxCategories = useAppSelector(state => state.admin.homeCategories);
  const error = useAppSelector(state => state.admin.error);
  const loading = useAppSelector(state => state.admin.loading);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<HomeCategory | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedImage, setEditedImage] = useState('');

  useEffect(() => {
    if (!data) {
      dispatch(fetchAllHomeCategories());
    }
  }, [dispatch, data]);

  const categoriesToShow = data ?? reduxCategories;

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (category: HomeCategory) => {
    setSelectedCategory(category);
    setEditedName(category.name || '');
    setEditedImage(category.image || '');
    setEditDialogOpen(true);
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedCategory(null);
  };

  const handleUpdate = async () => {
    if (selectedCategory) {
      const updatedData = {
        ...selectedCategory,
        name: editedName,
        image: editedImage,
      };
      try {
        await dispatch(updateHomeCategory({ id: Number(selectedCategory.categoryId!), data: updatedData })).unwrap();
        alert('Category updated successfully');
        handleDialogClose();
        dispatch(fetchAllHomeCategories()); // Refresh list
      } catch (err) {
        alert('Update failed');
      }
    }
  };

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="category table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align ?? 'left'} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && !data ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : error && !data ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography color="error">{error}</Typography>
                  </TableCell>
                </TableRow>
              ) : categoriesToShow.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No categories found.
                  </TableCell>
                </TableRow>
              ) : (
                categoriesToShow
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((category, index) => (
                    <TableRow hover key={category.categoryId}>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{category.categoryId}</TableCell>
                      <TableCell>
                        <Avatar src={category.image} variant="square" sx={{ width: 100, height: 100 }} />
                      </TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" onClick={() => handleEdit(category)}>
                          <EditIcon />
                        </IconButton>
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
          count={categoriesToShow.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit Home Category</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Category Name"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Image URL"
            value={editedImage}
            onChange={(e) => setEditedImage(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
