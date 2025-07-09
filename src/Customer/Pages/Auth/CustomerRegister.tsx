import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useAppDispatch } from '../../../State/Store';
import { sendLoginSignupOtp, signup } from './authSlice';
import { useNavigate } from 'react-router-dom';

const CustomerRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(30);
  const [showResend, setShowResend] = useState(false);

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    otp: otpSent ? Yup.string().required('OTP is required').length(6, 'OTP must be 6 digits') : Yup.string(),
    Fullname: otpVerified ? Yup.string().required('Full name is required').min(3, 'Name too short') : Yup.string(),
    password: otpVerified ? Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase, one lowercase, one number and one special character'
      ) : Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      otp: '',
      Fullname: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const signupRequest = {
          email: values.email,
          fullname: values.Fullname,
          otp: values.otp,
          password: values.password,
          role: 'CUSTOMER'
        };
        
        await dispatch(signup(signupRequest)).unwrap();
        navigate('/account');
      } catch (error: any) {
        setStatus(error.message || 'Registration failed');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleSendOtp = async () => {
    if (!formik.values.email || formik.errors.email) return;

    try {
      await dispatch(
        sendLoginSignupOtp({
          email: formik.values.email,
          role: 'CUSTOMER',
        })
      ).unwrap();
      setOtpSent(true);
      startCountdown();
      formik.setStatus(null);
    } catch (error: any) {
      formik.setStatus(error.message || 'Failed to send OTP');
    }
  };

  const handleResendOtp = () => {
    handleSendOtp();
  };

  const startCountdown = () => {
    setOtpCountdown(30);
    setShowResend(false);
    const timer = setInterval(() => {
      setOtpCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (!formik.values.otp || formik.errors.otp) return;
    setOtpVerified(true);
    formik.setStatus(null);
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      p: 4,
      maxWidth: 500,
      mx: 'auto',
      boxShadow: 1,
      borderRadius: 2,
      bgcolor: 'background.paper'
    }}>
      <Typography variant="h5" component="h1" align="center" color="primary" gutterBottom>
        Create Your Account
      </Typography>

      {formik.status && (
        <Alert severity="error" onClose={() => formik.setStatus(null)}>
          {formik.status}
        </Alert>
      )}

      {/* Email Field */}
      <TextField
        fullWidth
        label="Email Address"
        name="email"
        type="email"
        variant="outlined"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={otpSent}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        placeholder="example@email.com"
      />

      {/* OTP Section */}
      {otpSent && !otpVerified && (
        <>
          <TextField
            fullWidth
            label="Enter 6-digit OTP"
            name="otp"
            variant="outlined"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.otp && Boolean(formik.errors.otp)}
            helperText={formik.touched.otp && formik.errors.otp}
            inputProps={{ maxLength: 6 }}
          />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              onClick={handleVerifyOtp}
              variant="contained"
              color="primary"
              disabled={formik.isSubmitting || !formik.values.otp || !!formik.errors.otp}
              sx={{ flex: 1 }}
            >
              Verify OTP
            </Button>
            
            {showResend ? (
              <Button
                onClick={handleResendOtp}
                variant="outlined"
                color="primary"
                disabled={formik.isSubmitting}
                sx={{ flex: 1 }}
              >
                Resend OTP
              </Button>
            ) : (
              <Typography variant="body2" sx={{ 
                flex: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'text.secondary'
              }}>
                Resend in {otpCountdown}s
              </Typography>
            )}
          </Box>
        </>
      )}

      {/* Registration Form */}
      {otpVerified && (
        <>
          <TextField
            fullWidth
            label="Full Name"
            name="Fullname"
            variant="outlined"
            value={formik.values.Fullname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.Fullname && Boolean(formik.errors.Fullname)}
            helperText={formik.touched.Fullname && formik.errors.Fullname}
            placeholder="John Doe"
          />
          
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            placeholder="At least 8 characters"
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={formik.isSubmitting}
            fullWidth
          >
            {formik.isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : 'Complete Registration'}
          </Button>
        </>
      )}

      {/* Send OTP Button (initial state) */}
      {!otpSent && (
        <Button
          onClick={handleSendOtp}
          variant="contained"
          color="primary"
          size="large"
          disabled={formik.isSubmitting || !formik.values.email || !!formik.errors.email}
          fullWidth
        >
          Send OTP
        </Button>
      )}
    </Box>
  );
};

export default CustomerRegister;