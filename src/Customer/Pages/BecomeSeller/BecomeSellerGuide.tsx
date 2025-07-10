import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import {
  PersonAdd,
  Storefront,
  AddShoppingCart,
  MonetizationOn,
} from '@mui/icons-material';
import { teal } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    icon: <PersonAdd sx={{ fontSize: 40, color: teal[600] }} />,
    title: 'Create an Account',
    description: 'Sign up with your email and verify your identity to get started.',
  },
  {
    icon: <Storefront sx={{ fontSize: 40, color: teal[600] }} />,
    title: 'Set Up Your Store',
    description: 'Add store details like name, logo, and description.',
  },
  {
    icon: <AddShoppingCart sx={{ fontSize: 40, color: teal[600] }} />,
    title: 'List Your Products',
    description: 'Upload product info, images, prices, and inventory details.',
  },
  {
    icon: <MonetizationOn sx={{ fontSize: 40, color: teal[600] }} />,
    title: 'Start Selling',
    description: 'Publish your listings and start receiving orders from customers.',
  },
];

const BecomeSellerGuide: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ px: 4, py: 6, backgroundColor: '#f9f9f9' }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        Start Selling on Our Platform
      </Typography>

      <Grid container spacing={4}>
        {steps.map((step) => (
          <Grid >
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', borderRadius: 3 }}>
              {step.icon}
              <Typography variant="h6" fontWeight="bold" mt={2}>
                {step.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                {step.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box textAlign="center" mt={5}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/become-seller')}
        >
          Become a Seller
        </Button>
      </Box>
    </Box>
  );
};

export default BecomeSellerGuide;
