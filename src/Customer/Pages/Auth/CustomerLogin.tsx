import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { useFormik } from 'formik';
import { sendLoginSignupOtp } from './authSlice';
import { login } from './authSlice';
import { Button, CircularProgress, TextField, Typography, Alert, Snackbar } from '@mui/material';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const CustomerLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [showOtpResend, setShowOtpResend] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(30);
  const { auth } = useAppSelector(store => store);
  
  // Check authentication status and redirect
  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate('/account'); // Redirect to orders page after successful login
    }
  }, [auth.isLoggedIn, navigate]);

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    otp: otpSent ? Yup.string().required('OTP is required').length(6, 'OTP must be 6 digits') : Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      otp: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  useEffect(() => {
    if (otpSent && otpCountdown > 0) {
      const timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (otpCountdown === 0) {
      setShowOtpResend(true);
    }
  }, [otpCountdown, otpSent]);

  const handleSendOtp = () => {
    if (!formik.values.email || formik.errors.email) return;

    dispatch(
      sendLoginSignupOtp({
        email: formik.values.email,
        role: 'CUSTOMER',
      })
    ).then(() => {
      setOtpSent(true);
      setOtpCountdown(30);
      setShowOtpResend(false);
    });
  };

  const handleResendOtp = () => {
    handleSendOtp();
  };

  return (
    <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4 p-6 max-w-md mx-auto'>
      <Typography variant='h5' component='h1' align='center' color='primary' gutterBottom>
        Customer Login
      </Typography>

      {auth.error && (
        <Snackbar open={!!auth.error} autoHideDuration={6000}>
          <Alert severity="error" sx={{ width: '100%' }}>
            {auth.error}
          </Alert>
        </Snackbar>
      )}

      <TextField
        fullWidth
        label="Email Address"
        variant="outlined"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={otpSent && !showOtpResend}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        placeholder="Enter your registered email"
      />

      {!otpSent ? (
        <Button
          onClick={handleSendOtp}
          variant="contained"
          color="primary"
          size="large"
          disabled={auth.loading || !formik.values.email || !!formik.errors.email}
          fullWidth
        >
          {auth.loading ? <CircularProgress size={24} color="inherit" /> : "Send OTP"}
        </Button>
      ) : (
        <>
          <TextField
            fullWidth
            label="Enter 6-digit OTP"
            variant="outlined"
            name="otp"
            type="text"
            inputProps={{ maxLength: 6 }}
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.otp && Boolean(formik.errors.otp)}
            helperText={formik.touched.otp && formik.errors.otp}
            placeholder="Check your email for OTP"
          />

          {showOtpResend ? (
            <Button
              onClick={handleResendOtp}
              variant="outlined"
              color="primary"
              disabled={auth.loading}
              fullWidth
            >
              Resend OTP
            </Button>
          ) : (
            <Typography variant="body2" color="textSecondary" align="center">
              Resend OTP in {otpCountdown} seconds
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={auth.loading || !formik.values.otp || !!formik.errors.otp}
            fullWidth
          >
            {auth.loading ? <CircularProgress size={24} color="inherit" /> : "Continue"}
          </Button>
        </>
      )}
    </form>
  );
};

export default CustomerLogin;
















// import React, { useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../../../State/Store';
// import { useFormik } from 'formik';
// import { sendLoginSignupOtp } from './authSlice';
// import { Button, CircularProgress, TextField } from '@mui/material';
// import { login } from './authSlice';

// const CustomerLogin = () => {
//   const dispatch = useAppDispatch();
//   const [otpSent, setOtpSent] = useState(false);
//  const {auth}=useAppSelector(store=>store)
//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       otp: '',
//     },
//     onSubmit: (values) => {
//       console.log("Submitted values:", values);
//       dispatch(login(values))
//     },
//   });

//   const handleSendOtp = () => {
//     if (!formik.values.email) return;

//     dispatch(
//       sendLoginSignupOtp({
//         email: formik.values.email,
//         role: 'CUSTOMER',
//       })
//     );
//     setOtpSent(true);
//   };

//   return (
//     <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4 p-6'>
//       <h1 className='text-center font-bold text-xl text-teal-600'>Login</h1>

//       <TextField
//         fullWidth
//         label="Email"
//         variant="outlined"
//         name="email"
//         value={formik.values.email}
//         onChange={formik.handleChange}
//         disabled={otpSent}
//       />

//       {!otpSent ? (
//         <Button
//           onClick={handleSendOtp}
//           variant="contained"
//           sx={{ backgroundColor: '#00927c' }}
//         >{auth.loading?<CircularProgress/>:"   Send OTP"}
       
//         </Button>
//       ) : (
//         <>
//           <TextField
//             fullWidth
//             label="Enter OTP"
//             variant="outlined"
//             name="otp"
//             value={formik.values.otp}
//             onChange={formik.handleChange}
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             sx={{ backgroundColor: '#00927c' }}
//           >
//             Continue
//           </Button>
//         </>
//       )}
//     </form>
//   );
// };

// export default CustomerLogin;
