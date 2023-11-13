import React, { useState } from "react";
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

const NavDrawer = (props) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate();

    const handleListItemClick = (page) => {
        setOpenDrawer(false);
        const path = page.toLowerCase().split(' ').join('-');
        navigate('/' + path);
    };

    return (
        <React.Fragment>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <List>
                    {props.pages.map((page, index) => (
                        <ListItemButton onClick={() => handleListItemClick(page)} key={index}>
                            <ListItemText>{page}</ListItemText>
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            <IconButton sx={{ color: 'white', marginLeft: 'auto' }} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon/>
            </IconButton>
        </React.Fragment>
    );
};

export default NavDrawer;
