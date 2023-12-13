import React, { useState, useEffect } from 'react';
import { AppBar, Box, Tabs, Tab, Toolbar, Typography, MenuItem, Tooltip, IconButton, Avatar, Menu, useMediaQuery, useTheme, Button } from '@mui/material';
import MobileHamburgerNav from './MobileHamburgerNav';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from "../../contexts/AuthContext";

const TopNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const { currentUser } = useAuth(); // Use the user from AuthContext
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [value, setValue] = useState(0);

  const pages = currentUser ? ['Home', 'Discover', 'Favorites', 'Lists'] : ['Home']; // Display tabs based on user login status
  const settings = ['Profile', 'Favorites', 'Lists', 'Logout'];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    const page = pages[newValue];
    const path = formatPageToPath(page);
    navigate(page === 'Home' ? '/' : '/' + path);
  };

  const handleSettingClick = (setting) => {
    handleCloseUserMenu();

    if (setting === 'Logout') {
      signOut(getAuth()).then(() => {
        navigate('/');
      }).catch((error) => {
        console.error('Logout error:', error);
      });
    } else {
      const path = formatPageToPath(setting);
      navigate('/' + path);
      const pageIndex = pages.findIndex((p) => formatPageToPath(p) === path);
      setValue(pageIndex >= 0 ? pageIndex : false);
    }
  };

  const formatPageToPath = (pageName) => {
    return pageName.toLowerCase().split(' ').join('-');
  };

  const getAvatarLetter = () => {
    if (currentUser) {
      return currentUser.displayName ? currentUser.displayName.charAt(0) : currentUser.email.charAt(0).toUpperCase();
    }
    return '';
  };
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Update the tab value based on the current route
    const currentPage = pages.findIndex((page) => location.pathname.includes(formatPageToPath(page)));
    setValue(currentPage);
  }, [location.pathname, pages]);

  return (
      <React.Fragment>
        <AppBar sx={{ background: '#7a7a7a' }}>
          <Toolbar>
            {isMatch ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <MobileHamburgerNav pages={pages} />
                  <Typography sx={{ flexGrow: 1, textAlign: 'center', fontSize: '25px' }}>Drinkly</Typography>
                  <Box sx={{ flexGrow: 0 }}>
                    {currentUser ? (
                        <Tooltip title="Open settings">
                          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Logged In">
                              {getAvatarLetter()}
                            </Avatar>
                          </IconButton>
                        </Tooltip>
                    ) : (
                        <Button variant="outlined" size="small" sx={{ marginRight: '8px' }} onClick={() => navigate('/signin')}>
                          Login
                        </Button>
                    )}
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                          <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                            <Typography textAlign="center">{setting}</Typography>
                          </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </Box>
            ) : (
                <>
                  <Typography
                      sx={{
                        mr: 2,
                        fontWeight: 700,
                        color: 'inherit',
                      }}
                  >
                    DRINKLY LOGO
                  </Typography>
                  <Tabs value={value} onChange={handleTabChange} sx={{ flexGrow: 1 }} textColor="inherit">
                    {pages.map((page, index) => (
                        <Tab key={index} label={page} />
                    ))}
                  </Tabs>
                  <Box sx={{ flexGrow: 0 }}>
                    {currentUser ? (
                        <Tooltip title="Open settings">
                          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Logged In">
                              {getAvatarLetter()}
                            </Avatar>
                          </IconButton>
                        </Tooltip>
                    ) : (
                        <Button variant="contained" size="small" sx={{ marginRight: '8px' }} onClick={() => navigate('/signin')}>
                          Login
                        </Button>
                    )}
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                          <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                            <Typography textAlign="center">{setting}</Typography>
                          </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </>
            )}
          </Toolbar>
        </AppBar>
      </React.Fragment>
  );
};

export default TopNavBar;
