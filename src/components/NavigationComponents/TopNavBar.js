import * as React from 'react';
import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import { Box, Tabs, Tab, Toolbar, Typography, MenuItem, Tooltip, IconButton, Avatar, Menu, useMediaQuery, useTheme } from "@mui/material";
import NavDrawer from "./NavDrawer";
import { useNavigate } from "react-router-dom";

const pages = ['Home', 'Discover','Favorites', 'View All'];
const settings = ['Profile', 'Favorites', 'Logout'];

const TopNavBar = (props) => {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);

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
        navigate('/' + path);
    };

    const handleSettingClick = (setting) => {
        handleCloseUserMenu();
        if (setting === 'Logout') {
            props.signOut(); // Call the signOut prop when Logout is clicked
        } else {
            const path = formatPageToPath(setting);
            navigate('/' + path);

            const pageIndex = pages.findIndex(p => formatPageToPath(p) === path);
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
                            <NavDrawer pages={pages} />
                            <Typography sx={{ flexGrow: 1, textAlign: 'center', fontSize: "25px"}}>Drinkly</Typography>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Logged In" src="/static/images/avatar/290.jpg" />
                                    </IconButton>
                                </Tooltip>
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
                                    ))
                                    }
                                </Menu>
                            </Box>
                        </Box>
                    ) : (
                        <>
                            <Typography onClick={() => handleSettingClick("")}
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
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={props.user.attributes.name} src="/static/images/avatar/290.jpg" />
                                    </IconButton>
                                </Tooltip>
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
