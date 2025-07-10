import React from 'react';
import {
  Box, Grid, TextField,  useTheme, useMediaQuery, Typography, Card, CardContent,
  InputAdornment, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { FormikErrors, FormikTouched } from 'formik';
import {
  LocalPhone, Person, PinDrop
} from '@mui/icons-material';

const indianStates: string[] = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

interface PickupAddressValues {
  name: string;
  mobile: string;
  pincode: string;
  city: string;
  address: string;
  state: string;
  locality: string;
}

interface BecomeSellerFormStep2Props {
  values: PickupAddressValues;
  errors: FormikErrors<PickupAddressValues>;
  touched: FormikTouched<PickupAddressValues>;
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  setFieldValue: (field: string, value: any) => void;
}

const BecomeSellerFormStep2: React.FC<BecomeSellerFormStep2Props> = ({
  values, errors, touched, handleChange, handleBlur, setFieldValue
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSelectChange = (e: any) => {
    setFieldValue('state', e.target.value);
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      padding: isSmallScreen ? '10px' : '20px',
      backgroundColor: theme.palette.background.default
    }}>
      <Card sx={{ width: '100%', maxWidth: '700px', borderRadius: '10px', boxShadow: theme.shadows[4] }}>
        <CardContent sx={{ padding: isSmallScreen ? '16px' : '24px' }}>
          <Typography variant="h5" component="h1"
            sx={{
              textAlign: 'center',
              mb: 2,
              fontWeight: 600,
              fontSize: isSmallScreen ? '1.2rem' : '1.5rem',
              color: theme.palette.primary.main,
            }}
          >
            PickUp Address
          </Typography>

          <Grid container spacing={2}>
            <Grid >
              <TextField fullWidth name="name" label="Full Name" size="small"
                value={values.name} onChange={handleChange} onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid >
              <TextField fullWidth name="mobile" label="Mobile Number" size="small"
                value={values.mobile} onChange={handleChange} onBlur={handleBlur}
                error={touched.mobile && Boolean(errors.mobile)}
                helperText={touched.mobile && errors.mobile}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPhone fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid>
              <TextField fullWidth name="pincode" label="Pincode" size="small"
                value={values.pincode} onChange={handleChange} onBlur={handleBlur}
                error={touched.pincode && Boolean(errors.pincode)}
                helperText={touched.pincode && errors.pincode}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PinDrop fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid >
              <TextField fullWidth name="address" label="Address" size="small"
                value={values.address} onChange={handleChange} onBlur={handleBlur}
              />
            </Grid>

            <Grid >
              <TextField fullWidth name="locality" label="Locality/Area" size="small"
                value={values.locality} onChange={handleChange} onBlur={handleBlur}
              />
            </Grid>

            <Grid >
              <TextField fullWidth name="city" label="City/District" size="small"
                value={values.city} onChange={handleChange} onBlur={handleBlur}
              />
            </Grid>

            <Grid >
              <FormControl fullWidth size="small">
                <InputLabel id="state-label">State</InputLabel>
                <Select
                  labelId="state-label"
                  id="state"
                  name="state"
                  value={values.state}
                  onChange={handleSelectChange}
                  onBlur={handleBlur}
                  label="State"
                >
                  <MenuItem value="" disabled>Select State</MenuItem>
                  {indianStates.map((state) => (
                    <MenuItem key={state} value={state}>{state}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BecomeSellerFormStep2;
