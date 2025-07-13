import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../State/Store';
import { logout } from '../../../State/AuthSlice';

interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
}

interface DrawerListProps {
  menu: MenuItem[];
  menu2: MenuItem[];
  toggleDrawer: () => void;
}

const DrawerList: React.FC<DrawerListProps> = ({ menu, menu2, toggleDrawer }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout(() => navigate('/login'))); // ✅ pass navigate as callback
    toggleDrawer();
  };

  const renderMenu = (items: MenuItem[]) =>
    items.map((item, index) => {
      const isActive = location.pathname === item.path;
      const isLogout = item.name.toLowerCase() === 'logout';

      return (
        <ListItem
          key={index}
          onClick={() => {
            if (isLogout) {
              handleLogout();
            } else {
              navigate(item.path);
              toggleDrawer();
            }
          }}
          component="button"
          className={`rounded-r-xl ${
            isActive ? 'bg-teal-600 text-white' : 'hover:bg-gray-100'
          } transition-all duration-200`}
        >
          <ListItemIcon className={isActive ? 'text-white' : 'text-teal-600'}>
            {isActive ? item.activeIcon : item.icon}
          </ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      );
    });

  return (
    <div className="h-full pr-2 lg:pr-4 flex flex-col justify-between bg-white">
      <div>
        <List className="space-y-1">{renderMenu(menu)}</List>
      </div>
      <div className="pb-2">
        <List className="space-y-1">{renderMenu(menu2)}</List>
      </div>
    </div>
  );
};

export default DrawerList;
