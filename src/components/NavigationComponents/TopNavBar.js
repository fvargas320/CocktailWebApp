import * as React from 'react';
import { useState, useEffect } from 'react';
import { AppBar, Box, Tabs, Tab, Toolbar, Typography, MenuItem, Tooltip, IconButton, Avatar, Menu, useMediaQuery, useTheme, Button } from '@mui/material';
import MobileHamburgerNav from './MobileHamburgerNav';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';

const pages = ['Home', 'Discover','Favorites','Lists', 'View All'];
const settings = ['Profile', 'Favorites','Lists', 'Logout'];

const TopNavBar = (props) => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setuserName] = useState('');

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      if (user) {
        // Extract the first letter of the user's email
        const email = user.email || '';
        setUserEmail(email.charAt(0).toUpperCase());
        setuserName(user.displayName.charAt(0).toUpperCase())
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    const page = pages[newValue];
    const path = formatPageToPath(page);

    if (page === 'Home') {
      navigate('/');
    } else {
      navigate('/' + path);
    }
  };

  const handleSettingClick = (setting) => {
    handleCloseUserMenu();
  
    if (setting === 'Logout') {
      // Log out the user and navigate to the home page
      signOut(auth)
        .then(() => {
          // Successful logout
          setIsLoggedIn(false);
          setUserEmail('');
          navigate('/');
        })
        .catch((error) => {
          // Handle logout error
          console.error('Logout error:', error);
        });
    } else {
      // Handle other settings navigation
      const path = formatPageToPath(setting);
      navigate('/' + path);
  
      const pageIndex = pages.findIndex((p) => formatPageToPath(p) === path);
      if (pageIndex >= 0) {
        setValue(pageIndex);
      } else {
        setValue(false); // false = no tab highlights
      }
    }
  };
  

  const formatPageToPath = (pageName) => {
    return pageName.toLowerCase().split(' ').join('-');
  };

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <React.Fragment>
      <AppBar sx={{ background: '#7a7a7a' }}>
        <Toolbar>
          {isMatch ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <MobileHamburgerNav pages={pages} />
              <h2>HI</h2>
              <Typography sx={{ flexGrow: 1, textAlign: 'center', fontSize: '25px' }}>Drinkly</Typography>
              <Box sx={{ flexGrow: 0 }}>
                {isLoggedIn ? (
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Logged In" src="/static/images/avatar/290.jpg">
                        {userName}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Button variant="outlined" size="small" sx={{ marginRight: '8px' }} onClick={() => navigate(`/signin`)}>
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
                onClick={() => handleSettingClick('')}
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
              {isLoggedIn ? (
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Logged In" src="/static/images/avatar/290.jpg">
                        {userName}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Button variant="outlined" size="small" sx={{ marginRight: '8px' }} onClick={() => navigate(`/signin`)}>
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
