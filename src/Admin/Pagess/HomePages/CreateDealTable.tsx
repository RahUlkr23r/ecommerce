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
import { Deals } from '../../../tpyes/dealType';

const CreateDealTable: React.FC = () => {
  const dispatch = useAppDispatch();

  const { homeCategories, loading } = useAppSelector((state) => state.admin);

  useEffect(() => {
    const token = localStorage.getItem('jwt') || '';
    dispatch(fetchAllHomeCategories(token));
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      categoryId: '', // we'll convert to number later
      discount: 0,
    },
    validationSchema: Yup.object({
      categoryId: Yup.number()
        .required('Category is required')
        .typeError('Category is required'),
      discount: Yup.number()
        .required('Discount is required')
        .min(1, 'Discount must be at least 1%')
        .max(100, 'Discount cannot exceed 100%'),
    }),
    onSubmit: (values, { resetForm }) => {
      const selectedCategory = homeCategories.find(
        (cat) => cat.id === Number(values.categoryId)
      );

      if (!selectedCategory) {
        alert('Invalid category selected');
        return;
      }

const reqData: Deals = {
  name: selectedCategory.name ?? '',
  image: [selectedCategory.image], // if your API expects array
  section: selectedCategory.section ?? '',
  discount: values.discount,
  category: {
    categoryId: selectedCategory.categoryId, // ✅ Required
    id: selectedCategory.id,
    name: selectedCategory.name,
    image: selectedCategory.image,
    section: selectedCategory.section,
  },
};



      dispatch(createDeal(reqData));
      resetForm();
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        maxWidth: 450,
        mx: 'auto',
        mt: 4,
        p: 3,
        bgcolor: '#fff',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" align="center" fontWeight="bold" mb={2}>
        Create Deal
      </Typography>

      {/* Category Selector */}
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
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))
          )}
        </Select>
        <FormHelperText>
          {formik.touched.categoryId && formik.errors.categoryId}
        </FormHelperText>
      </FormControl>

      {/* Discount Field */}
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

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3, py: 1.2 }}
        disabled={loading}
      >
        Create Deal
      </Button>
    </Box>
  );
};

export default CreateDealTable;
