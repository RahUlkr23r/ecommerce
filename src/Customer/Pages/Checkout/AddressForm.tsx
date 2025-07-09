import React from 'react';
import {
  Box, Grid, TextField, Button, useTheme, useMediaQuery, Typography, Card, CardContent,
  Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from "yup";
import { useAppDispatch } from '../../../State/Store';
import { createOrder } from '../../../State/Customers/OrderSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../State/Store';

const indianStates: string[] = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

interface AddressFormValues {
  name: string;
  mobile: string;
  pincode: string;
  city: string;
  address: string;
  state: string;
  locality: string;
}

interface AddressFormProps {
  paymentGateway: string;
}

const AddressForm: React.FC<AddressFormProps> = ({ paymentGateway }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  

  const initialValues: AddressFormValues = {
    name: '',
    mobile: '',
    pincode: '',
    city: '',
    address: '',
    state: '',
    locality: ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    mobile: Yup.string().required("Mobile number is required")
      .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
    pincode: Yup.string().required("Pincode is required")
      .matches(/^[1-9]\d{5}$/, "Invalid pin code (6 digits)"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
    state: Yup.string().required("State is required"),
    locality: Yup.string().required("Locality is required"),
  });

  const onSubmit = (
    values: AddressFormValues,
    { resetForm }: FormikHelpers<AddressFormValues>
  ) => {
    

    const jwt = localStorage.getItem("jwt") || "";

    dispatch(createOrder({
      address: {
        ...values,
        pincode: Number(values.pincode),
        isDefault: false,
        country: "India" // Assuming country is always India  
        ,

        street: undefined
      },
      jwt,
      paymentGateway,
      amount: 0
    }));

    // resetForm(); // optional
  };

  const formik = useFormik<AddressFormValues>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      padding: isSmallScreen ? '10px' : '20px',
      backgroundColor: theme.palette.background.default
    }}>
      <Card sx={{ width: '100%', maxWidth: '700px', borderRadius: '10px', boxShadow: theme.shadows[4] }}>
        <CardContent sx={{ padding: isSmallScreen ? '16px' : '24px' }}>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              textAlign: 'center',
              mb: 2,
              fontWeight: 600,
              fontSize: isSmallScreen ? '1.2rem' : '1.5rem',
              color: theme.palette.primary.main,
            }}
          >
            Contact Details
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid >
                <TextField
                  fullWidth
                  name="name"
                  label="Full Name"
                  size="small"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>

              <Grid >
                <TextField
                  fullWidth
                  name="mobile"
                  label="Mobile Number"
                  size="small"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                  helperText={formik.touched.mobile && formik.errors.mobile}
                />
              </Grid>

              <Grid >
                <TextField
                  fullWidth
                  name="pincode"
                  label="Pincode"
                  size="small"
                  value={formik.values.pincode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                  helperText={formik.touched.pincode && formik.errors.pincode}
                />
              </Grid>

              <Grid>
                <TextField
                  fullWidth
                  name="city"
                  label="City"
                  size="small"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              </Grid>

              <Grid >
                <TextField
                  fullWidth
                  name="locality"
                  label="Locality"
                  size="small"
                  value={formik.values.locality}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.locality && Boolean(formik.errors.locality)}
                  helperText={formik.touched.locality && formik.errors.locality}
                />
              </Grid>

              <Grid >
                <TextField
                  fullWidth
                  name="address"
                  label="Address"
                  size="small"
                  multiline
                  rows={3}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>

              <Grid >
                <FormControl fullWidth size="small">
                  <InputLabel>State</InputLabel>
                  <Select
                    name="state"
                    label="State"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                  >
                    {indianStates.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formik.touched.state && formik.errors.state && (
                  <Typography color="error" variant="caption">{formik.errors.state}</Typography>
                )}
              </Grid>

              <Grid textAlign="center">
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Place Order
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddressForm;
