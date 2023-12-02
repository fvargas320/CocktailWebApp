import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

const ProfileSidebar = ({setSelectedTab}) => {
    return (
        <Box>
            <Typography variant="h3" fontWeight={"bold"}>
                Settings
            </Typography>
            <Box style={chipContainer}>
                <Chip 
                    label="Public Profile" 
                    variant="outlined" 
                    onClick={() => setSelectedTab("publicProfile")}
                    sx={chipStyle}
                />
            </Box>
            <Box style={chipContainer}>
                <Chip 
                    label="Favorites" 
                    variant="outlined" 
                    onClick={() => setSelectedTab("favorites")}
                    sx={chipStyle}
                />
            </Box>
        </Box>
    );
};

export default ProfileSidebar;

const chipStyle = {
    '.MuiChip-label': {
        whiteSpace: 'normal',
        fontSize: "18px",
        fontWeight: "bold"
    }
}

const chipContainer = {
    marginTop: "12px"
}