import React, { useEffect, useState, useRef } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Box, Button, Badge,
  InputBase, Drawer, List, ListItem, ListItemText, Avatar,
  ListItemButton, Tooltip, Divider, Paper, ClickAwayListener,
  Popper, MenuList, MenuItem, Fade
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import ClearIcon from '@mui/icons-material/Clear';
import CategorySheet from './CategorySheet';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../State/Store';
import { selectCartItemCount } from "../../../State/Customers/CartSlice";
import { AdminPanelSettings } from '@mui/icons-material';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const auth = useAppSelector((state) => state.auth);
  const { wishlist } = useAppSelector((state) => state.wishlist);
  const navigate = useNavigate();
  const cartItemCount = useAppSelector(selectCartItemCount);

  const drawerItems = ['Men', 'Women', 'Home & Furniture', 'Electronics'];

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const getCategoryKey = (label: string): 'men' | 'women' | 'electronics' | 'home_furniture' => {
    switch (label.toLowerCase()) {
      case 'men': return 'men';
      case 'women': return 'women';
      case 'electronics': return 'electronics';
      case 'home & furniture': return 'home_furniture';
      default: return 'men';
    }
  };

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(storedHistory);
  }, []);

  const saveToSearchHistory = (query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    
    let history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    history = history.filter((item: string) => item.toLowerCase() !== trimmedQuery.toLowerCase());
    history.unshift(trimmedQuery);
    history = history.slice(0, 5);
    localStorage.setItem('searchHistory', JSON.stringify(history));
    setSearchHistory(history);
  };

  const clearSearchHistory = () => {
    localStorage.removeItem('searchHistory');
    setSearchHistory([]);
  };

  const removeSearchHistoryItem = (itemToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedHistory = searchHistory.filter(item => item !== itemToRemove);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    setSearchHistory(updatedHistory);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent | React.KeyboardEvent, query?: string) => {
    event.preventDefault();
    const searchTerm = query || searchQuery.trim();
    if (searchTerm) {
      saveToSearchHistory(searchTerm);
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchQuery('');
      setShowMobileSearch(false);
      setSearchFocused(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearchSubmit(event);
    }
  };

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: '#fff', color: '#000', boxShadow: 2, zIndex: 1300 }}>
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          {/* Left Logo + Drawer */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              onClick={toggleDrawer(true)} 
              sx={{ display: { xs: 'flex', md: 'none' } }}
              aria-label="open menu"
            >
              <MenuIcon />
            </IconButton>
           <Typography 
  onClick={() => navigate("/")} 
  variant="h6" 
  sx={{ 
    fontFamily: 'Nunito',
    fontWeight: 'bold', 
    ml: 1, 
    color: '#00927c', 
    cursor: 'pointer',
    '&:hover': { opacity: 0.8 }
  }}
>
  Quick Cart
</Typography>

          </Box>

          {/* Center Nav + Search */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            alignItems: 'center', 
            gap: 3, 
            justifyContent: 'center', 
            flexGrow: 1 
          }}>
            {drawerItems.map((item) => (
              <Box 
                key={item} 
                onMouseEnter={() => setHoveredCategory(item)} 
                onMouseLeave={() => setHoveredCategory(null)} 
                sx={{ position: 'relative' }}
              >
                <Button
                  // onClick={() => navigate(`/product/${getCategoryKey(item)}`)}
                  color="inherit"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: '0%',
                      height: '2px',
                      backgroundColor: '#00927c',
                      transition: 'all 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '100%',
                    },
                  }}
                >
                  {item}
                </Button>
                {hoveredCategory === item && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: -150,
                      zIndex: 5,
                      backgroundColor: '#fff',
                      boxShadow: 4,
                      minWidth: 300,
                    }}
                    onMouseEnter={() => setHoveredCategory(item)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <CategorySheet category={getCategoryKey(item)} />
                  </Box>
                )}
              </Box>
            ))}

            {/* Desktop Search with Suggestions */}
            <Box 
              ref={searchRef}
              sx={{ 
                position: 'relative', 
                width: { md: 300, lg: 300 } 
              }}
            >
              <Box
                component="form"
                onSubmit={handleSearchSubmit}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#f1f1f1',
                  borderRadius: 2,
                  px: 2,
                  py: 0.5,
                  width: '100%',
                }}
              >
                <SearchIcon color="action" />
                <InputBase
                  placeholder="Search products…"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setSearchFocused(true)}
                  sx={{ ml: 1, flex: 1 }}
                  inputProps={{ 'aria-label': 'search products' }}
                />
                {searchQuery && (
                  <IconButton
                    size="small"
                    onClick={() => setSearchQuery('')}
                    sx={{ p: 0.5 }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>

              {/* Search Suggestions */}
              <Popper
                open={searchFocused && (searchQuery.length > 0 || searchHistory.length > 0)}
                anchorEl={searchRef.current}
                placement="bottom-start"
                transition
                sx={{ zIndex: 1400, width: searchRef.current?.clientWidth }}
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={150}>
                    <Paper elevation={3} sx={{ width: '100%', mt: 1 }}>
                      <ClickAwayListener onClickAway={() => setSearchFocused(false)}>
                        <MenuList autoFocusItem={false}>
                          {/* Recent Searches */}
                          {searchHistory.length > 0 && (
                            <>
                              <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                px: 2, 
                                py: 1,
                                color: 'text.secondary'
                              }}>
                                <Box display="flex" alignItems="center">
                                  <HistoryIcon fontSize="small" sx={{ mr: 1 }} />
                                  <Typography variant="body2">Recent searches</Typography>
                                </Box>
                                <Button 
                                  size="small" 
                                  onClick={clearSearchHistory}
                                  sx={{ minWidth: 0 }}
                                >
                                  Clear
                                </Button>
                              </Box>
                              {searchHistory.map((term, idx) => (
                                <MenuItem 
                                  key={idx} 
                                  onClick={(e) => handleSearchSubmit(e, term)}
                                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                                >
                                  <Typography noWrap>{term}</Typography>
                                  <IconButton
                                    size="small"
                                    onClick={(e) => removeSearchHistoryItem(term, e)}
                                    sx={{ p: 0.5 }}
                                  >
                                    <CloseIcon fontSize="small" />
                                  </IconButton>
                                </MenuItem>
                              ))}
                              <Divider />
                            </>
                          )}

                          {/* Current Search Suggestions */}
                          {searchQuery.length > 0 && (
                            <MenuItem 
                              onClick={(e) => handleSearchSubmit(e)}
                              sx={{ fontWeight: 500 }}
                            >
                              Search for "{searchQuery}"
                            </MenuItem>
                          )}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </Box>
          </Box>

          {/* Right Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Mobile search icon */}
            <IconButton 
              sx={{ display: { md: 'none' } }} 
              onClick={() => {
                setShowMobileSearch(!showMobileSearch);
                setSearchFocused(!showMobileSearch);
              }}
              aria-label={showMobileSearch ? 'close search' : 'open search'}
            >
              {showMobileSearch ? <CloseIcon /> : <SearchIcon />}
            </IconButton>

            <Tooltip title="Wishlist">
              <IconButton onClick={() => navigate("api/wishlist")} aria-label="wishlist">
                <Badge 
                  badgeContent={wishlist?.products?.length || 0} 
                  color="error"
                  max={99}
                >
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Cart">
              <IconButton onClick={() => navigate("api/cart")} aria-label="cart">
                <Badge 
                  badgeContent={cartItemCount} 
                  color="error"
                  max={99}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {auth?.isLoggedIn ? (
              <Tooltip title="My Account">
                <Avatar
                  onClick={() => navigate("/account/order")}
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: '#00927c',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                  src={ "https://cdn-icons-png.flaticon.com/128/3237/3237472.png"}
                  alt="User avatar"
                />
              </Tooltip>
            ) : (
              <Button
                onClick={() => navigate("/customer/login")}
                variant="outlined"
                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              >
                Login
              </Button>
            )}
            <Button
              onClick={() => navigate("/become-seller")}
              variant="contained"
              sx={{ 
                bgcolor: '#00927c', 
                display: { xs: 'none', sm: 'inline-flex' },
                '&:hover': { bgcolor: '#007965' }
              }}
            >
              Become a Seller
            </Button>
          </Box>
        </Toolbar>

        {/* Mobile Search */}
        {showMobileSearch && (
          <Box sx={{ px: 2, pb: 2, pt: 1, display: { md: 'none' } }}>
            <Box 
              ref={searchRef}
              sx={{ position: 'relative' }}
            >
              <Box
                component="form"
                onSubmit={handleSearchSubmit}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#f1f1f1',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                }}
              >
                <SearchIcon color="action" />
                <InputBase
                  placeholder="Search…"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setSearchFocused(true)}
                  sx={{ ml: 1, flex: 1 }}
                  inputProps={{ 'aria-label': 'search products' }}
                  autoFocus
                />
                {searchQuery && (
                  <IconButton
                    size="small"
                    onClick={() => setSearchQuery('')}
                    sx={{ p: 0.5 }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>

              {/* Mobile Search Suggestions */}
              <Popper
                open={searchFocused && (searchQuery.length > 0 || searchHistory.length > 0)}
                anchorEl={searchRef.current}
                placement="bottom-start"
                transition
                sx={{ zIndex: 1400, width: 'calc(100% - 32px)' }}
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={150}>
                    <Paper elevation={3} sx={{ width: '100%', mt: 1 }}>
                      <ClickAwayListener onClickAway={() => setSearchFocused(false)}>
                        <MenuList autoFocusItem={false}>
                          {searchHistory.length > 0 && (
                            <>
                              <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                px: 2, 
                                py: 1,
                                color: 'text.secondary'
                              }}>
                                <Box display="flex" alignItems="center">
                                  <HistoryIcon fontSize="small" sx={{ mr: 1 }} />
                                  <Typography variant="body2">Recent searches</Typography>
                                </Box>
                                <Button 
                                  size="small" 
                                  onClick={clearSearchHistory}
                                  sx={{ minWidth: 0 }}
                                >
                                  Clear
                                </Button>
                              </Box>
                              {searchHistory.map((term, idx) => (
                                <MenuItem 
                                  key={idx} 
                                  onClick={(e) => {
                                    handleSearchSubmit(e, term);
                                    setShowMobileSearch(false);
                                  }}
                                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                                >
                                  <Typography noWrap>{term}</Typography>
                                  <IconButton
                                    size="small"
                                    onClick={(e) => removeSearchHistoryItem(term, e)}
                                    sx={{ p: 0.5 }}
                                  >
                                    <CloseIcon fontSize="small" />
                                  </IconButton>
                                </MenuItem>
                              ))}
                              <Divider />
                            </>
                          )}

                          {searchQuery.length > 0 && (
                            <MenuItem 
                              onClick={(e) => {
                                handleSearchSubmit(e);
                                setShowMobileSearch(false);
                              }}
                              sx={{ fontWeight: 500 }}
                            >
                              Search for "{searchQuery}"
                            </MenuItem>
                          )}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </Box>
          </Box>
        )}
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer 
        anchor="left" 
        open={drawerOpen} 
        onClose={toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
      >
        <Box 
          sx={{ width: 250 }} 
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {drawerItems.map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => navigate(`/category/${getCategoryKey(text)}`)}>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
            <Divider />
            {auth?.isLoggedIn ? (
              <>
                <ListItem>
                  <Button fullWidth onClick={() => navigate("/account/profile")} variant="outlined">
                    My Profile
                  </Button>
                </ListItem>
                <ListItem>
                  <Button fullWidth onClick={() => navigate("/account/order")} variant="outlined">
                    My Orders
                  </Button>
                </ListItem>
              
              </>
            ) : (
              <>
                <ListItem>
                  <Button fullWidth onClick={() => navigate("/customer/login")} variant="outlined">
                    Login
                  </Button>
                </ListItem>
                <ListItem>
                  <Button fullWidth onClick={() => navigate("/customer/register")} variant="text">
                    Register
                  </Button>
                </ListItem>
              </>
            )}
            <ListItem>
              <Button 
                fullWidth 
                onClick={() => navigate("/become-seller")} 
                variant="contained" 
                sx={{ bgcolor: '#00927c', '&:hover': { bgcolor: '#007965' } }}
              >
                Become a Seller
              </Button>



            </ListItem>
            <ListItem>
              <Button 
                fullWidth 
                onClick={() => navigate("/admin")} 
                variant="outlined" 
                startIcon={<AdminPanelSettings/>}
              >
                ADMIN 
              </Button>
            </ListItem>
              <ListItem>
                  <Button
                    fullWidth
                    onClick={() => {
                      localStorage.removeItem("jwt");
                      window.location.reload();
                    }}
                    variant="outlined"
                    color="error"
                  >
                    Logout
                  </Button>
                </ListItem>
          </List>
        </Box>
          
      </Drawer>
    </>
  );
};

export default Navbar;