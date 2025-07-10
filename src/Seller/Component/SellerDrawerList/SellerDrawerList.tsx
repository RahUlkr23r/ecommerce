
import {
    AccountBalance,
    AccountBox,
    Add,
    Dashboard,
    Inventory,
    Logout,
    Receipt,
    ShoppingBag,
  } from '@mui/icons-material';
  import { useState } from 'react';
  import DrawerList from './DrawerList';
  import { Drawer, IconButton } from '@mui/material';
  import MenuIcon from '@mui/icons-material/Menu';
  
  const menu = [
    {
      name: 'Dashboard',
      path: '/seller',
      icon: <Dashboard className="text-teal-600" />,
      activeIcon: <Dashboard className="text-white" />,
    },
    {
      name: 'Order',
      path: '/seller/orders',
      icon: <ShoppingBag className="text-teal-600" />,
      activeIcon: <ShoppingBag className="text-white" />,
    },
    {
      name: 'Product',
      path: '/seller/products',
      icon: <Inventory className="text-teal-600" />,
      activeIcon: <Inventory className="text-white" />,
    },
    {
      name: 'Add Product',
      path: '/seller/add-product',
      icon: <Add className="text-teal-600" />,
      activeIcon: <Add className="text-white" />,
    },
    {
      name: 'Payment',
      path: '/seller/payment',
      icon: <AccountBalance className="text-teal-600" />,
      activeIcon: <AccountBalance className="text-white" />,
    },
    {
      name: 'Transaction',
      path: '/seller/transaction',
      icon: <Receipt className="text-teal-600" />,
      activeIcon: <Receipt className="text-white" />,
    },
  ];
  
  const menu2 = [
    {
      name: 'Account',
      path: '/seller/account',
      icon: <AccountBox className="text-teal-600" />,
      activeIcon: <AccountBox className="text-white" />,
    },
    {
      name: 'Logout',
      path: '/',
      icon: <Logout className="text-teal-600" />,
      activeIcon: <Logout className="text-white" />,

    },
  ];
  
  const SellerDrawerList = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
  
    const toggleDrawer = () => {
      setMobileOpen(!mobileOpen);
    };
  
    return (
      <>
        {/* Mobile Menu Button */}
        <div className="lg:hidden p-4">
          <IconButton onClick={toggleDrawer} aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
        </div>
  
        {/* Mobile Drawer */}
        <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
          <div className="w-64">
            <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />
          </div>
        </Drawer>
  
        {/* Desktop Permanent Sidebar */}
        <div className="hidden lg:block w-64 h-full border-r">
          <DrawerList menu={menu} menu2={menu2} toggleDrawer={() => {}} />
        </div>
      </>
    );
  };
  
  export default SellerDrawerList;
  