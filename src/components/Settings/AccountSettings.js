import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Button } from '@mui/material';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


const AccountSettings = ({setAlert, setAlertInfo}) => {
    const auth = getAuth()

    async function handlePasswordReset(){
        try{
            await sendPasswordResetEmail(auth, auth.currentUser.email);
            let result = {
                type:"success", 
                title:"Success", 
                message: `Password reset email has been sent to ${auth.currentUser.email}`,
                display: true
            }
            setAlert(true)
            setAlertInfo(result)
            setTimeout(() => {
                setAlert(false)
            }, 5000)
        }catch(error){
            console.log(error)
        }
    }
    return (
        <Box>
            <Typography>Click the button below to reset your account password</Typography>
            <Button 
                variant="contained" 
                style={{
                    backgroundColor: "#000080", 
                    color: "white", 
                    fontWeight: "bold",
                    width: "164px",
                    marginTop: "16px"
                }}
                onClick={handlePasswordReset}
            >
                Reset Password
            </Button>
        </Box>
    );
};

export default AccountSettings;