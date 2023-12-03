import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import ProfileSidebar from '../../components/Settings/ProfileSidebar';
import PublicProfile from '../../components/Settings/PublicProfile';
import {collection, getDocs, query, where, orderBy, getDoc, doc} from "firebase/firestore";
import {db, storage} from '../../firebase';
import { ref, list, listAll, getDownloadURL } from "firebase/storage"
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import LinearProgress from '@mui/material/LinearProgress';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const usersRef = collection(db, "users");

const Profile = () => {
    const [user, setUser] = useState(null)
    const [profilePicURL, setProfilePicURL] = useState(null)
    const [selectedTab, setSelectedTab] = useState("publicProfile")
    const [alertInfo, setAlertInfo] = useState({type:"success", title:"Success", message:""})
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        getUserByUN()
        getProfilePicture()
    }, [])

    async function getUserByUN(){
        const q = query(usersRef, where("userName", "==", "FernandoVargas"), orderBy("userName"));
        const querySnapshot = await getDocs(q);
        const user = querySnapshot.docs.map(doc => doc.data());

        if(user.length > 0){
            setUser(user[0])
        }else{
            alert("COULD NOT FIND USER!")
        }
    }

    async function getProfilePicture(){
        const username = "FernandoVargas"
        const storageRef = ref(storage, '/');
        const result = await listAll(storageRef);
        const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
        const urls = await Promise.all(urlPromises)
        const filterUrl = urls.filter(url => url.includes(username))
        if(filterUrl.length > 0){
            setProfilePicURL(filterUrl[0])
        }else{
            setProfilePicURL("default")
            console.log("COULD NOT FIND Image URL!")
        }
    }

    function renderTab(){
        if(selectedTab == "publicProfile"){
            return <PublicProfile 
                user={user} 
                profilePicURL={profilePicURL} 
                setProfilePicURL={setProfilePicURL}
                setAlert={setAlert} 
                setAlertInfo={setAlertInfo}
            />;
        }else if(selectedTab == "favorites"){
            return <Item>Favorites</Item>;
        }
    }

    return (
        <Box sx={{ flexGrow: 1, marginX: 16, marginY: 16 }}>
            {alert ? 
                <Alert severity={alertInfo.type}>
                    <AlertTitle>{alertInfo.title}</AlertTitle>
                    {alertInfo.message}
                </Alert> : <></>
            }
            <Grid container spacing={3} height={830}>
                <Grid xs={6} md={2}>
                    <Box style={SidebarStyle}>
                        <ProfileSidebar
                            setSelectedTab={setSelectedTab}
                        />
                    </Box>
                </Grid>
                <Grid xs={6} md={10}>
                    {user && profilePicURL ? renderTab() : <LinearProgress color='info'/>}
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