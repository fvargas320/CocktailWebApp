import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import { styled } from "@mui/system";
import {IconButton, Snackbar, Alert} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth hook
import { Box, Typography } from '@mui/material';
import { doc, setDoc, collection, updateDoc, getDoc } from "firebase/firestore"; 
import { db } from '../../firebase';

export default function HelloWorld() {
    const [stringValue, setStringValue] = useState(null)
    const [textFieldValue, setTextFieldValue] = useState(null)
    useEffect(() => {
        let documentRef = doc(db, "helloworld", "1")
        getDoc(documentRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const documentData = docSnapshot.data();
                    setStringValue(documentData["value"])
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });
    }, [])

    function handleButtonClick(){
        let documentRef = doc(db, "helloworld", `1`)
        updateDoc(documentRef, {value: textFieldValue})
        setStringValue(textFieldValue)
    }

    return (
        <Box display={'flex'} flexDirection={'column'} gap={'32px'}>
            <Typography variant='h3' textAlign={'center'} fontWeight={'bold'} style={{textDecoration: "underline"}}>Modify Firebase Document Value</Typography>
            <Typography variant='h3' textAlign={'center'}>Firebase Document Value = <span style={{color:"red"}}>{stringValue}</span></Typography>
            <Box style={textFieldContainerStyle}>
                <TextField 
                    label={"Change document value..."}
                    value={textFieldValue}
                    onChange={(e) => setTextFieldValue(e.target.value)}
                />
                <Button variant="contained" onClick={handleButtonClick}>
                    Change Value
                </Button>
            </Box>
            
        </Box>
    );
}

const textFieldContainerStyle = {
    heigth: "800px", 
    display:"flex", 
    justifyContent: "center", 
    alignItems: "center", 
    flexDirection:"column",
    gap: "16px"
}