import {

    AccountBox,
    Add,
    Category,
    CountertopsOutlined,
    Dashboard,
    ElectricBolt,
   
    Home,
    Inventory,
    Logout,
    Receipt,
    ShoppingBag,
  } from '@mui/icons-material';
  import { useState } from 'react';

  import { Drawer, IconButton } from '@mui/material';
  import MenuIcon from '@mui/icons-material/Menu';
import DrawerList from '../../Seller/Component/SellerDrawerList/DrawerList';
  
  const menu = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: <Dashboard className="text-teal-600" />,
      activeIcon: <Dashboard className="text-white" />,
    },
    {
      name: 'Coupon',
      path: '/admin/coupon',
      icon: <CountertopsOutlined className="text-teal-600" />,
      activeIcon: <ShoppingBag className="text-white" />,
    },
    {
      name: 'Add New Coupon',
      path: '/admin/add-new-coupon',
      icon: <Inventory className="text-teal-600" />,
      activeIcon: <Inventory className="text-white" />,
    },
    {
      name: 'Home Page',
      path: '/admin/homePage',
      icon: <Home className="text-teal-600" />,
      activeIcon: <Add className="text-white" />,
    },
    {
      name: 'Electronics Category',
      path: '/admin/electronics-category',
      icon: <ElectricBolt className="text-teal-600" />,
      activeIcon: <ElectricBolt className="text-white" />,
    },
    {
        name: 'Shop By Category',
        path: '/admin/shop-by-category',
        icon: <Category className="text-teal-600" />,
        activeIcon: < Category className="text-white" />,
      },
    {
      name: 'Deal',
      path: '/admin/deal',
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
      path: '/logout',
      icon: <Logout className="text-teal-600" />,
      activeIcon: <Logout className="text-white" />,
    },
  ];
  
  const AdminDrawerList = () => {
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
  
  export default AdminDrawerList;
  