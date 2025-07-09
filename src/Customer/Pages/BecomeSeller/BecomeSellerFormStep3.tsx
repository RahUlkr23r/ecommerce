import React from 'react';
import { Box, TextField, Typography, Grid, Card, CardContent } from '@mui/material';

type BecomeSellerFormStep3Props = {
  values: {
    accountNumber: string;
    ifsc: string;
    accountHolderName: string;
  };
  errors: {
    accountNumber?: string;
    ifsc?: string;
    accountHolderName?: string;
  };
  touched: {
    accountNumber?: boolean;
    ifsc?: boolean;
    accountHolderName?: boolean;
  };
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
  setFieldValue: (field: string, value: any) => void;
};

const BecomeSellerFormStep3: React.FC<BecomeSellerFormStep3Props> = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
}) => {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Card sx={{ width: '100%', maxWidth: 600, p: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Bank Details
          </Typography>

          <Grid container spacing={2}>
            <Grid >
              <TextField
                fullWidth
                name="accountNumber"
                label="Account Number"
                value={values.accountNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.accountNumber && Boolean(errors.accountNumber)}
                helperText={touched.accountNumber && errors.accountNumber}
              />
            </Grid>

            <Grid >
              <TextField
                fullWidth
                name="ifsc"
                label="IFSC Code"
                value={values.ifsc}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.ifsc && Boolean(errors.ifsc)}
                helperText={touched.ifsc && errors.ifsc}
              />
            </Grid>

            <Grid >
              <TextField
                fullWidth
                name="accountHolderName"
                label="Account Holder Name"
                value={values.accountHolderName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.accountHolderName && Boolean(errors.accountHolderName)}
                helperText={touched.accountHolderName && errors.accountHolderName}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BecomeSellerFormStep3;
