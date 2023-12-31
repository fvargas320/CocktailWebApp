import React,{useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {collection, getDocs, query, where, orderBy, getDoc, doc, updateDoc} from "firebase/firestore";
import { ref, deleteObject, getDownloadURL, uploadBytes, getBlob } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { updateProfile } from 'firebase/auth';


const PublicProfile = ({user, profilePicURL, setProfilePicURL, setAlert, setAlertInfo}) => {
    const [userNameChange, setUserNameChange] = useState("")

    useEffect(() => {
        setUserNameChange(user.displayName)
    }, [user])

    async function updateProfileInfo(){

        try {
            updateProfile(user, {
                displayName: userNameChange,
            }).then(() => {
                console.log('Display name set successfully');
            }).catch((error) => {
                console.error('Error setting display name:', error.message);
            });
            if(userNameChange != user.displayName){
                const response = await fetch(profilePicURL);
                const blob = await response.blob();
                const newObjectRef = ref(storage, `/${userNameChange}.png`)
                await uploadBytes(newObjectRef, blob);
                const oldObjectRef = ref(storage, profilePicURL);
                await deleteObject(oldObjectRef);
                const newProfilePicURL = await getDownloadURL(newObjectRef);
                setProfilePicURL(newProfilePicURL)
            }
            let result = {
                type:"success", 
                title:"Success", 
                message: "Account info updated successfully.",
                display: true
            }
            setAlert(true)
            setAlertInfo(result)
            setTimeout(() => {
                setAlert(false)
            }, 5000)
        } catch (error) {
            let result = {
                type:"error", 
                title:"Error", 
                message: `Error updating account info: ${error}`,
                display: true
            }
            setAlert(true)
            setAlertInfo(result)
            setTimeout(() => {
                setAlert(false)
            }, 5000)
        }
    }

    async function deleteProfilePicture(){
        const imageRef = ref(storage, profilePicURL);

        try {
            await deleteObject(imageRef);
            setProfilePicURL("default")
            let result = {
                type:"success", 
                title:"Success", 
                message: "Profile picture has been deleted successfully.",
                display: true
            }
            setAlert(true)
            setAlertInfo(result)
            setTimeout(() => {
                setAlert(false)
            }, 5000)
        } catch (error) {
            let result = {
                type:"error", 
                title:"Error", 
                message: `Error deleting profile picture: ${error}`,
                display: true
            }
            setAlert(true)
            setAlertInfo(result)
            setTimeout(() => {
                setAlert(false)
            }, 5000)
        }
    }

    function handleProfilePictureButton(){
        document.getElementById('imageInput').click()
    }

    async function changeProfilePicture(e){
        const file = e.target.files[0];

        if (file) {
            const storageRef = ref(storage, `/${user.displayName}.png`);

            try {
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);
                setProfilePicURL(downloadURL)
                let result = {
                    type:"success", 
                    title:"Success", 
                    message: "Profile picture has been changed successfully.",
                    display: true
                }
                setAlert(true)
                setAlertInfo(result)
                setTimeout(() => {
                    setAlert(false)
                }, 5000)
            } catch (error) {
                let result = {
                    type:"error", 
                    title:"Error", 
                    message: `Error changing profile picture: ${error}`,
                    display: true
                }
                setAlert(true)
                setAlertInfo(result)
                setTimeout(() => {
                    setAlert(false)
                }, 5000)
            }
        }
    }

    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Typography variant="h5" fontWeight={"bold"}>
                Public Profile
            </Typography>
            <Box display={"flex"} gap={"16px"} marginTop={"16px"}>
                <Avatar 
                    alt={user.displayName}
                    src={profilePicURL}
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
                        onClick={handleProfilePictureButton}
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
                            onClick={deleteProfilePicture}
                    >
                        Delete Picture
                    </Button>
                    <input
                        type="file"
                        accept="image/*"
                        id="imageInput"
                        onChange={changeProfilePicture}
                        style={{display: "none"}}
                    />
                </Box>
            </Box>
            <TextField
                style={{margin: "28px 0px", width: "164px"}}
                label="Username"
                defaultValue={user.displayName}
                onChange={(e) => setUserNameChange(e.target.value)}
            />
            <Button 
                variant="contained" 
                style={{
                    backgroundColor: "#000080", 
                    color: "white", 
                    fontWeight: "bold",
                    width: "164px"
                }}
                onClick={updateProfileInfo}
            >
                Save Changes
            </Button>
        </Box>
    );
};

export default PublicProfile;