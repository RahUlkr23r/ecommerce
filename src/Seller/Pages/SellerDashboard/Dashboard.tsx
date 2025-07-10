import { useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  Divider,
  Paper,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  ShoppingCart,
  AttachMoney,
  AddBox,
  Inventory,
  TrendingUp,
  Cancel,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchSellerReport } from '../../../State/Sellers/sellerReportSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { report, loading, error } = useAppSelector((state) => state.sellerReport);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(fetchSellerReport(jwt));
    }
  }, [dispatch]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);

  if (loading) {
    return (
      <Box 
        height="80vh" 
        display="flex" 
        justifyContent="center" 
        alignItems="center"
        sx={{ backgroundColor: 'background.dark' }}
      >
        <CircularProgress size={50} sx={{ color: 'primary.main' }} />
        <Typography ml={2} variant="h6" color="text.primary">
          Loading Dashboard...
        </Typography>
      </Box>
    );
  }

  if (error || !report) {
    return (
      <Box 
        height="80vh" 
        display="flex" 
        justifyContent="center" 
        alignItems="center"
        sx={{ backgroundColor: 'background.default' }}
      >
        <Typography variant="h6" color="error.main">
          {error ? `Error: ${String(error)}` : 'No report data available.'}
        </Typography>
      </Box>
    );
  }

  const metrics = [
    {
      title: 'Total Orders',
      value: report.totalOrders,
      icon: <ShoppingCart fontSize="large" />,
      color: theme.palette.primary.main,
      trendIcon: <TrendingUp sx={{ color: theme.palette.success.main }} />,
    },
    {
      title: 'Total Sales',
      value: formatCurrency(report.totalSales),
      icon: <AttachMoney fontSize="large" />,
      color: theme.palette.success.main,
      trendIcon: <TrendingUp sx={{ color: theme.palette.success.main }} />,
    },
    {
      title: 'Cancelled Orders',
      value: report.cancelledOrders,
      icon: <Cancel fontSize="large" />,
      color: theme.palette.error.main,
      trendIcon: <TrendingUp sx={{ color: theme.palette.error.main }} />,
    },
  ];

  const quickActions = [
    {
      title: 'Add New Product',
      icon: <AddBox />,
      path: '/seller/add-product',
      variant: 'contained' as const,
    },
    {
      title: 'Manage Products',
      icon: <Inventory />,
      path: '/seller/products',
      variant: 'outlined' as const,
    },
    {
      title: 'View All Orders',
      icon: <ShoppingCart />,
      path: '/seller/orders',
      variant: 'outlined' as const,
    },
  ];

  return (
    <Box sx={{  
      p: { xs: 2, md: 4 }, 
      maxWidth: '1400px', 
      mx: 'auto',
      backgroundColor: 'background.dark  ',
      minHeight: '100vh',

    }}>
      <Typography 
        variant="h3" 
        fontWeight="bold" 
        mb={4} 
        color="text.primary"
        sx={{ 
          textShadow: '0px 2px 4px rgba(0,0,0,0.3)',
          letterSpacing: '1px',
        }}
      >
        Seller Dashboard
      </Typography>

      {/* KPIs Section */}
      <Grid container spacing={3}>
        {metrics.map((metric) => (
          <Grid>
            <Card
              elevation={0}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                borderLeft: `4px solid ${metric.color}`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: '50%',
                    backgroundColor: `${metric.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {metric.icon}
                </Box>
                {metric.trendIcon}
              </Box>
              <Box mt={2}>
                <Typography variant="h4" fontWeight="bold" color="text.primary">
                  {metric.value}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {metric.title}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3} mt={4}>
        <Grid >
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              backgroundColor: 'background.success',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <AddBox color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight={600} color="text.primary">
                Quick Actions
              </Typography>
            </Box>
            <Divider sx={{ mb: 2, backgroundColor: 'divider' }} />
            <Grid container spacing={2}>
              {quickActions.map((action) => (
                <Grid>
                  <Button
                    fullWidth
                    variant={action.variant}
                    startIcon={action.icon}
                    onClick={() => navigate(action.path)}
                    sx={{
                      py: 1.5,
                      fontWeight: 600,
                      borderRadius: 1,
                      letterSpacing: '0.5px',
                      textTransform: 'none',
                      ...(action.variant === 'contained' ? {
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.dark' },
                      } : {
                        borderColor: 'divider',
                        color: 'text.primary',
                        '&:hover': { 
                          borderColor: 'primary.main',
                          backgroundColor: 'action.hover',
                        },
                      }),
                    }}
                  >
                    {action.title}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Activity or Stats Section */}
        <Grid >
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              backgroundColor: 'background.paper',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              height: '100%',
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2} color="text.primary">
              Performance Overview
            </Typography>
            <Divider sx={{ mb: 3, backgroundColor: 'divider' }} />
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" color="text.secondary">
                  Order Completion Rate
                </Typography>
                <Typography variant="body1" fontWeight="bold" color="text.primary">
                  {report.totalOrders > 0 
                    ? `${Math.round(((report.totalOrders - report.cancelledOrders) / report.totalOrders) * 100)}%` 
                    : 'N/A'}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" color="text.secondary">
                  Avg. Order Value
                </Typography>
                <Typography variant="body1" fontWeight="bold" color="text.primary">
                  {report.totalOrders > 0 
                    ? formatCurrency(report.totalSales / report.totalOrders) 
                    : formatCurrency(0)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;