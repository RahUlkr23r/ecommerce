import { Button, TextField, Typography, Box, Stack } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch } from "../../../State/Store";
import { sendLoginSignupOtp, signin } from "../../../State/AuthSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const OTP_RESEND_COOLDOWN = 60; // seconds

const SellerLoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // ✅ Initialize navigate

  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Validation schema
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    otp: yup
      .string()
      .when("otpSent", {
        is: true,
        then: (schema) =>
          schema
            .matches(/^\d{6}$/, "OTP must be 6 digits")
            .required("OTP is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Form data", values);
      try {
        const resultAction = await dispatch(signin(values));

        // ✅ Redirect to /seller on successful login
        if (signin.fulfilled.match(resultAction)) {
          navigate("/seller");
        } else {
          console.error("Login failed", resultAction);
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
  });

  // Countdown effect for resend OTP
  useEffect(() => {
    let timer: number | undefined;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendOtp = async () => {
    try {
      await formik.validateField("email");
      if (!formik.errors.email) {
        dispatch(
          sendLoginSignupOtp({
            email: formik.values.email,
            role: "SELLER",
          })
        );
        setOtpSent(true);
        setCountdown(OTP_RESEND_COOLDOWN);
      }
    } catch (error) {
      console.error("Email validation failed:", error);
    }
  };

  return (
    <Box
      maxWidth={400}
      mx="auto"
      mt={6}
      p={4}
      borderRadius={2}
      boxShadow={3}
      bgcolor="#fff"
    >
      <Typography variant="h5" align="center" fontWeight="bold" color="teal" mb={3}>
        Seller Login
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          {otpSent && (
            <Box>
              <Typography variant="body2" sx={{ mb: 1, opacity: 0.7 }}>
                Enter OTP sent to your email
              </Typography>
              <TextField
                fullWidth
                name="otp"
                label="OTP"
                variant="outlined"
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.otp && Boolean(formik.errors.otp)}
                helperText={formik.touched.otp && formik.errors.otp}
              />
            </Box>
          )}

          <Button
            type="button"
            onClick={handleSendOtp}
            variant="outlined"
            fullWidth
            sx={{ py: 1.5 }}
            disabled={
              countdown > 0 ||
              !formik.values.email ||
              Boolean(formik.errors.email)
            }
          >
            {countdown > 0 ? `Resend OTP in ${countdown}s` : "Send OTP"}
          </Button>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ py: 1.5 }}
            disabled={
              !otpSent || !formik.values.otp || Boolean(formik.errors.otp)
            }
          >
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SellerLoginForm;
