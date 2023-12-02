import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';




const PublicProfile = () => {
    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Typography variant="h5" fontWeight={"bold"}>
                Public Profile
            </Typography>
            <Box display={"flex"} gap={"16px"} marginTop={"16px"}>
                <Avatar 
                    alt="Michael Balian" 
                    src="" 
                    sx={{width: 128, height: 128}}
                />
                <Box display={"flex"} flexDirection={"column"} gap={"16px"} justifyContent={"center"}>
                    <Button 
                        variant="contained" 
                        style={{
                            backgroundColor: "#000080", 
                            color: "white", 
                            fontWeight: "bold"
                        }}
                    >
                        Change Picture
                    </Button>
                    <Button 
                        variant="outlined" 
                        color='info' 
                        style={{
                            border: "1px solid #000080", 
                            color: "#000080", 
                            fontWeight: "bold"
                            }}
                    >
                        Delete Picture
                    </Button>
                </Box>
            </Box>
            <TextField
                style={{margin: "28px 0px", width: "164px"}}
                label="Username"
            />
            <Button 
                variant="contained" 
                style={{
                    backgroundColor: "#000080", 
                    color: "white", 
                    fontWeight: "bold",
                    width: "164px"
                }}
            >
                Save Changes
            </Button>
        </Box>
    );
};

export default PublicProfile;