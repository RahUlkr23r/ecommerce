import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { createDeal } from '../../../State/Admins/dealSlice';
import { fetchAllHomeCategories } from '../../../State/Admins/adminSlice';
import { HomeCategory } from '../../../tpyes/HomeCategoryType';

const CreateDealTable = () => {
  const dispatch = useAppDispatch();


  const { homeCategories, loading } = useAppSelector((state) => state.admin);

  useEffect(() => {

dispatch(fetchAllHomeCategories(  localStorage.getItem("jwt") ));
   
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      categoryId: '',
      discount: 0,
    },
    validationSchema: Yup.object({
      categoryId: Yup.number()
        .required('Category is required')
        .typeError('Category is required'),
      discount: Yup.number()
        .min(1, 'Discount must be at least 1%')
        .max(100, 'Discount cannot exceed 100%')
        .required('Discount is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const selectedCategory = homeCategories.find(
        (cat) => cat.id === values.categoryId
      );

      if (!selectedCategory) {
        alert('Invalid category selected');
        return;
      }

      const reqData = {
        category: { id: selectedCategory.id },
        discount: values.discount,
      };

      dispatch(createDeal(reqData));
      resetForm();
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Create Deal
      </Typography>

      {/* Category Dropdown */}
      <FormControl
        fullWidth
        margin="normal"
        error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
      >
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          name="categoryId"
          value={formik.values.categoryId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Category"
        >
          {loading ? (
            <MenuItem disabled>Loading...</MenuItem>
          ) : (
            homeCategories.map((cat: HomeCategory) => (
              <MenuItem key={cat.categoryId} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))
          )}
        </Select>
        <FormHelperText>
          {formik.touched.categoryId && formik.errors.categoryId}
        </FormHelperText>
      </FormControl>

      {/* Discount Input */}
      <TextField
        fullWidth
        margin="normal"
        type="number"
        label="Discount (%)"
        name="discount"
        value={formik.values.discount}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.discount && Boolean(formik.errors.discount)}
        helperText={formik.touched.discount && formik.errors.discount}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        color="primary"
        sx={{ mt: 2 }}
      >
        Create Deal
      </Button>
    </Box>
  );
};

export default CreateDealTable;
