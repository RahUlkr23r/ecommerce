
import { Button, TextField, Typography, Box, Stack } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch } from "../../../State/Store";
import { sendLoginSignupOtp, signin } from "../../../State/AuthSlice";

const SellerLoginForm = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      console.log("form data", values);
      dispatch(signin(values));
    },
  });

  const handleSendOtp = () => {
    dispatch(
      sendLoginSignupOtp({
        email: formik.values.email,
        role: "SELLER",
      })
    );
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
            helperText={
              formik.touched.email && typeof formik.errors.email === "string"
                ? formik.errors.email
                : ""
            }
          />
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
              helperText={
                formik.touched.otp && typeof formik.errors.otp === "string"
                  ? formik.errors.otp
                  : ""
              }
            />
          </Box>
          <Button
            type="button"
            onClick={handleSendOtp}
            variant="outlined"
            fullWidth
            sx={{ py: 1.5 }}
          >
            Send OTP
          </Button>
          
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ py: 1.5 }}
          >
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
export default SellerLoginForm;
