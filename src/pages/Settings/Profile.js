import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import ProfileSidebar from '../../components/Settings/ProfileSidebar';
import PublicProfile from '../../components/Settings/PublicProfile';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Profile = () => {
    const [selectedTab, setSelectedTab] = useState("publicProfile")

    function renderTab(){
        if(selectedTab == "publicProfile"){
            return <PublicProfile/>;
        }else if(selectedTab == "favorites"){
            return <Item>Favorites</Item>;
        }
    }

    return (
        <Box sx={{ flexGrow: 1, marginX: 16, marginY: 16 }}>
            <Grid container spacing={3} height={830}>
                <Grid xs={6} md={2}>
                    <Box style={SidebarStyle}>
                        <ProfileSidebar
                            setSelectedTab={setSelectedTab}
                        />
                    </Box>
                </Grid>
                <Grid xs={6} md={10}>
                    {renderTab()}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;

const SidebarStyle = {
    height: "100%",
    borderRight: "1px solid grey"
}