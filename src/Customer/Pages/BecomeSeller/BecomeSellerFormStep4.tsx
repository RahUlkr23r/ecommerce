import React from 'react';
import {
  Grid,
  TextField,
  Typography
} from '@mui/material';

interface SellerInfoProps {
  values: {
    sellerName: string;
    email: string;
    password: string;
    business: {
      businessName: string;
      businessEmail: string;
      businessMobile: string;
      logo: string;
      banner: string;
      businessAddress: string;
    };
  };
  errors: any;
  touched: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  setFieldValue: (field: string, value: any) => void;
  setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean) => void;
}

const BecomeSellerFormStep4: React.FC<SellerInfoProps> = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  setFieldTouched,
}) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>Seller Info</Typography>
      <Grid container spacing={2}>
        <Grid >
          <TextField
            fullWidth
            label="Seller Name"
            name="sellerName"
            value={values.sellerName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.sellerName && errors.sellerName)}
            helperText={touched.sellerName && errors.sellerName}
          />
        </Grid>

        <Grid >
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
        </Grid>

        <Grid >
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Grid>

        <Grid >
          <TextField
            fullWidth
            label="Business Name"
            name="business.businessName"
            value={values.business.businessName}
            onChange={(e) =>
              setFieldValue('sellerInfo.business.businessName', e.target.value)
            }
            onBlur={() => setFieldTouched('sellerInfo.business.businessName', true)}
            error={Boolean(
              touched.business?.businessName && errors.business?.businessName
            )}
            helperText={
              touched.business?.businessName && errors.business?.businessName
            }
          />
        </Grid>

        <Grid >
          <TextField
            fullWidth
            label="Business Email"
            name="business.businessEmail"
            value={values.business.businessEmail}
            onChange={(e) =>
              setFieldValue('sellerInfo.business.businessEmail', e.target.value)
            }
            onBlur={() => setFieldTouched('sellerInfo.business.businessEmail', true)}
            error={Boolean(
              touched.business?.businessEmail && errors.business?.businessEmail
            )}
            helperText={
              touched.business?.businessEmail && errors.business?.businessEmail
            }
          />
        </Grid>

        <Grid >
          <TextField
            fullWidth
            label="Business Mobile"
            name="business.businessMobile"
            value={values.business.businessMobile}
            onChange={(e) =>
              setFieldValue('sellerInfo.business.businessMobile', e.target.value)
            }
            onBlur={() => setFieldTouched('sellerInfo.business.businessMobile', true)}
            error={Boolean(
              touched.business?.businessMobile && errors.business?.businessMobile
            )}
            helperText={
              touched.business?.businessMobile && errors.business?.businessMobile
            }
          />
        </Grid>

        <Grid >
          <TextField
            fullWidth
            label="Business Address"
            name="business.businessAddress"
            value={values.business.businessAddress}
            onChange={(e) =>
              setFieldValue('sellerInfo.business.businessAddress', e.target.value)
            }
            onBlur={() => setFieldTouched('sellerInfo.business.businessAddress', true)}
            error={Boolean(
              touched.business?.businessAddress && errors.business?.businessAddress
            )}
            helperText={
              touched.business?.businessAddress && errors.business?.businessAddress
            }
          />
        </Grid>

        <Grid >
          <TextField
            fullWidth
            label="Business Logo URL"
            name="business.logo"
            value={values.business.logo}
            onChange={(e) =>
              setFieldValue('sellerInfo.business.logo', e.target.value)
            }
            onBlur={() => setFieldTouched('sellerInfo.business.logo', true)}
            error={Boolean(touched.business?.logo && errors.business?.logo)}
            helperText={touched.business?.logo && errors.business?.logo}
          />
        </Grid>

        <Grid >
          <TextField
            fullWidth
            label="Business Banner URL"
            name="business.banner"
            value={values.business.banner}
            onChange={(e) =>
              setFieldValue('sellerInfo.business.banner', e.target.value)
            }
            onBlur={() => setFieldTouched('sellerInfo.business.banner', true)}
            error={Boolean(touched.business?.banner && errors.business?.banner)}
            helperText={touched.business?.banner && errors.business?.banner}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default BecomeSellerFormStep4;
