import { Button, Step, StepLabel, Stepper } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import BecomeSellerFormStep1 from './BecomeSellerFormStep1';
import BecomeSellerFormStep2 from './BecomeSellerFormStep2';
import BecomeSellerFormStep3 from './BecomeSellerFormStep3';
import BecomeSellerFormStep4 from './BecomeSellerFormStep4';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { createSeller, resetSellerState } from '../../../State/Sellers/createSellerSlice';
import { useNavigate } from 'react-router-dom';
import {  Seller } from '../../../tpyes/Sellertype'; // Adjust the path if needed

const steps = ['Tax Details & Mobile', 'Pickup Address', 'Bank Details', 'Supplier Details'];

const SellerAccountForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, success, error, seller } = useAppSelector((state) => state.createSeller);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (success && seller) {
      navigate(`/verify-seller/${seller.email}`);
      dispatch(resetSellerState());
    }
  }, [success, seller, navigate, dispatch]);

  const formik = useFormik({
    initialValues: {
      mobile: '',
      otp: '',
      GSTIN: '',
      pickupAddress: {
        name: '',
        mobile: '',
        pincode: '',
        address: '',
        locality: '',
        city: '',
        state: '',
      },
      bankDetails: {
        accountNumber: '',
        ifsc: '',
        accountHolderName: '',
      },
      sellerInfo: {
        sellerName: '',
        email: '',
        password: '',
        business: {
          businessName: '',
          businessEmail: '',
          businessMobile: '',
          logo: '',
          banner: '',
          businessAddress: '',
        },
      },
      role: 'SELLER',
    },

    validationSchema: Yup.object({
      mobile: Yup.string().required('Mobile is required'),
      GSTIN: Yup.string().required('GSTIN is required'),

      pickupAddress: Yup.object().shape({
        name: Yup.string().required('Name is required').min(2),
        mobile: Yup.string()
          .required('Mobile number is required')
          .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
        pincode: Yup.string()
          .required('Pincode is required')
          .matches(/^\d{6}$/, 'Pincode must be 6 digits'),
        address: Yup.string().required('Address is required').min(5),
        locality: Yup.string().required('Locality is required'),
        city: Yup.string().required('City/District is required'),
        state: Yup.string().required('State is required'),
      }),

      bankDetails: Yup.object().shape({
        accountHolderName: Yup.string().required('Account holder name is required'),
        accountNumber: Yup.string().required('Account number is required'),
        ifsc: Yup.string().required('IFSC code is required'),
      }),

      sellerInfo: Yup.object().shape({
        sellerName: Yup.string().required('Seller name is required'),
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().min(6).required('Password is required'),
        business: Yup.object().shape({
          businessName: Yup.string().required('Business name is required'),
          businessEmail: Yup.string().email().required('Business email is required'),
          businessMobile: Yup.string()
            .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
            .required('Business mobile is required'),
          logo: Yup.string().url().nullable(),
          banner: Yup.string().url().nullable(),
          businessAddress: Yup.string().required('Business address is required'),
        }),
      }),
    }),

    onSubmit: () => {
      const payload: Seller = {
        // will be ignored by backend or set to auto-generated
        sellerName: formik.values.sellerInfo.sellerName,
        email: formik.values.sellerInfo.email,
        password: formik.values.sellerInfo.password,
        mobile: formik.values.mobile,
        GSTIN: formik.values.GSTIN || null,
        emailVarified: false,
        role: 'SELLER', // ✅ Required!
        accountStatus: 'PENDING_VERIFICATION', // ✅ One of the valid enum strings

        bankDetails: {
          accountNumber: formik.values.bankDetails.accountNumber,
          ifscCode: formik.values.bankDetails.ifsc,
          bankName: 'Unknown', // Optional: You can fill this from IFSC using Razorpay/Bank lookup later
          accountHolderName: formik.values.bankDetails.accountHolderName,
        },

        businessDetails: {
          banner: formik.values.sellerInfo.business.banner,
          logo: formik.values.sellerInfo.business.logo,
          bussinessName: formik.values.sellerInfo.business.businessName,
          bussinessEmail: formik.values.sellerInfo.business.businessEmail,
          bussinessMobile: formik.values.sellerInfo.business.businessMobile,
          bussinessAddress: formik.values.sellerInfo.business.businessAddress,
        },

        pickupAddress: {
          id: 0, // backend can ignore or auto-generate this
          name: formik.values.pickupAddress.name,
          address: formik.values.pickupAddress.address,
          locality: formik.values.pickupAddress.locality,
          city: formik.values.pickupAddress.city,
          state: formik.values.pickupAddress.state,
          pincode: formik.values.pickupAddress.pincode,
          mobile: formik.values.pickupAddress.mobile,
        },
        id: 0
      };

      dispatch(createSeller(payload));
    },
  });

  const handleStep = (value: number) => () => {
    const nextStep = activeStep + value;

    if (nextStep === steps.length) {
      handleCreateAccount();
    } else if (nextStep >= 0 && nextStep < steps.length) {
      setActiveStep(nextStep);
    }
  };

  const handleCreateAccount = () => {
    formik.handleSubmit();
  };

  return (
    <div className="space-y-5">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <section className="mt-20 space-y-10">
        <div>
          {activeStep === 0 && <BecomeSellerFormStep1 formik={formik} />}

          {activeStep === 1 && (
            <BecomeSellerFormStep2
              values={formik.values.pickupAddress}
              errors={formik.errors.pickupAddress || {}}
              touched={formik.touched.pickupAddress || {}}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const { name, value } = e.target;
                formik.setFieldValue(`pickupAddress.${name}`, value);
              }}
              handleBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                const { name } = e.target;
                formik.setFieldTouched(`pickupAddress.${name}`, true);
              }}
              setFieldValue={(field: string, value) =>
                formik.setFieldValue(`pickupAddress.${field}`, value)
              }
            />
          )}

          {activeStep === 2 && (
            <BecomeSellerFormStep3
              values={formik.values.bankDetails}
              errors={formik.errors.bankDetails || {}}
              touched={formik.touched.bankDetails || {}}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const { name, value } = e.target;
                formik.setFieldValue(`bankDetails.${name}`, value);
              }}
              handleBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                const { name } = e.target;
                formik.setFieldTouched(`bankDetails.${name}`, true);
              }}
              setFieldValue={(field: string, value: any) =>
                formik.setFieldValue(`bankDetails.${field}`, value)
              }
            />
          )}

          {activeStep === 3 && (
            <BecomeSellerFormStep4
              values={formik.values.sellerInfo}
              errors={formik.errors.sellerInfo || {}}
              touched={formik.touched.sellerInfo || {}}
              handleChange={(e: { target: { name: any; value: any } }) => {
                const { name, value } = e.target;
                formik.setFieldValue(`sellerInfo.${name}`, value);
              }}
              handleBlur={(e: { target: { name: any } }) => {
                const { name } = e.target;
                formik.setFieldTouched(`sellerInfo.${name}`, true);
              }}
              setFieldValue={formik.setFieldValue}
              setFieldTouched={formik.setFieldTouched}
            />
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <Button onClick={handleStep(-1)} variant="outlined" disabled={activeStep === 0}>
            Back
          </Button>
          <Button
            onClick={handleStep(1)}
            variant="contained"
            disabled={loading}
          >
            {loading
              ? 'Processing...'
              : activeStep === steps.length - 1
              ? 'Create Account'
              : 'Continue'}
          </Button>
        </div>

        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}
      </section>
    </div>
  );
};

export default SellerAccountForm;
