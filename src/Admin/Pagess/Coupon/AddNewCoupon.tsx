import React from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper
} from '@mui/material';
import { useAppDispatch } from '../../../State/Store';
import { createCoupon } from '../../../State/Admins/adminCouponSlice';

const AddNewCoupon = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      code: '',
      discountPercentage: '',
      validityStartDate: '',
      validityEndDate: '',
      minimumOrderValue: '',
    },
   onSubmit: async (values) => {
  const formattedValues = {
    code: values.code.trim(),
    discountPercentage: Number(values.discountPercentage),
    validateStartDate: values.validityStartDate,   // ✅ Correct field name
    validateEndDate: values.validityEndDate,       // ✅ Correct field name
    minimumOrderValue: Number(values.minimumOrderValue),
    active: true,
  };

  try {
    const result = await dispatch(createCoupon(formattedValues));
    if (createCoupon.fulfilled.match(result)) {
      alert("✅ Coupon created successfully!");
      formik.resetForm();
    } else {
      alert(`❌ Failed: ${result.payload}`);
    }
  } catch (error) {
    console.error("Error creating coupon:", error);
    alert("❌ Error while creating coupon.");
  }
},

  });

  return (
    <Paper elevation={3} sx={{ maxWidth: 500, margin: 'auto', padding: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add New Coupon
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Coupon Code"
            name="code"
            value={formik.values.code}
            onChange={formik.handleChange}
            required
            fullWidth
          />

          <TextField
            label="Discount Percentage (%)"
            name="discountPercentage"
            type="number"
            value={formik.values.discountPercentage}
            onChange={formik.handleChange}
            inputProps={{ min: 0, max: 100 }}
            required
            fullWidth
          />

          <TextField
            label="Start Date"
            name="validityStartDate"
            type="date"
            value={formik.values.validityStartDate}
            onChange={formik.handleChange}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
          />

          <TextField
            label="End Date"
            name="validityEndDate"
            type="date"
            value={formik.values.validityEndDate}
            onChange={formik.handleChange}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
          />

          <TextField
            label="Minimum Order Value"
            name="minimumOrderValue"
            type="number"
            value={formik.values.minimumOrderValue}
            onChange={formik.handleChange}
            inputProps={{ min: 0 }}
            required
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary">
            Create Coupon
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default AddNewCoupon;
