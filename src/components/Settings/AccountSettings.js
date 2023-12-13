import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Button } from '@mui/material';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


const AccountSettings = () => {
    const auth = getAuth()

    async function handleButtonClick(){
        try{
            await sendPasswordResetEmail(auth, "pobino1073@frandin.com");
            console.log("Password reset email sent")
            console.log(auth.currentUser)
        }catch(error){
            console.log(error)
        }
    }
    return (
        <Box>
            <Button onClick={handleButtonClick}>Click Me</Button>
        </Box>
    );
};

export default AccountSettings;