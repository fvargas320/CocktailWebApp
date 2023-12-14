import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { doc, getDoc, query, where, getDocs, collection } from 'firebase/firestore';
import {db} from '../../firebase';
import Box from '@mui/material/Box';
import CocktailCard from '../../components/Cocktail/CocktailCard';
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { Skeleton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from "@mui/material/Button";
import theme from "../../theme";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { removeFromFavorites } from "../../utils/FavoritesLogic";
import { RemoveCocktailDialog } from "../../components/Lists/ListsDialogs&SkelatalList";
import {getAuth} from "firebase/auth";
import {useAuth} from "../../contexts/AuthContext";

const Favorites = () => {


    const { currentUser } = useAuth(); // Use the currentUser from AuthContext
    const userId = currentUser ? currentUser.uid : null;

    const userDocRef = useMemo(() => doc(db, 'users', userId), [userId]);
    const [favoriteCocktails, setFavoriteCocktails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cocktailToRemove, setCocktailToRemove] = useState(null); // State to store cocktail to remove
    const [removeCocktailDialogOpen, setRemoveCocktailDialogOpen] = useState(false); // State for remove cocktail confirmation dialog
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    // Access custom styles and colors from theme file
    const defaultColor = theme.customStyles.defaultColor;
    const supportTextColor = theme.customStyles.supportTextColor;

    const fetchFavorites = useCallback(() => {
        setIsLoading(true);
        getDoc(userDocRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    const favoritesArray = userData.favorites;
                    if (favoritesArray.length > 0) {
                        const queryFavorites = query(
                            collection(db, 'newCocktails'),
                            where('Cocktail_ID', 'in', favoritesArray.map(value => parseInt(value)))
                        );
                        return getDocs(queryFavorites);
                    } else {
                        return [];
                    }
                } else {
                    throw new Error('User document does not exist');
                }
            })
            .then((querySnapshot) => {
                if (Array.isArray(querySnapshot)) {
                    setFavoriteCocktails([]);
                } else {
                    const cocktails = querySnapshot.docs.map(doc => doc.data());
                    setFavoriteCocktails(cocktails);
                }
            })
            .catch((error) => {
                console.error('Error querying Firestore:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [userDocRef]);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    const handleRemove = useCallback((userID, cocktailID) => {
        setCocktailToRemove({ userID, cocktailID }); // Set the cocktail to remove
        setRemoveCocktailDialogOpen(true); // Open the confirmation dialog
    }, []);

    const confirmRemoveCocktail = async () => {
        try {
            if (cocktailToRemove) {
                await removeFromFavorites(
                    cocktailToRemove.userID,
                    cocktailToRemove.cocktailID.toString()
                );
                fetchFavorites(); // Refresh the favorites list after removal
                handleOpenSnackbar("Cocktail removed successfully");
            }
            setRemoveCocktailDialogOpen(false); // Close the remove cocktail confirmation dialog
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };


    const handleOpenSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };


    return (
        <div>
            <Box
                sx={{
                    padding: '0 16px', // Standard-sized padding on left and right
                    display: 'flex',
                    justifyContent: 'space-between', // Align items on the left and right edges
                    alignItems: 'center', // Vertically center items
                }}
                mb={2}
            >
                <Typography sx={{ fontFamily: 'SFProRegular' }}>
                    <Box component="span" sx={{
                        fontSize: '30px',
                        fontWeight: 'bold',
                        color: defaultColor
                    }}>
                        {"Your Favorites"}
                    </Box>
                </Typography>

                <Typography sx={{ fontFamily: 'SFProRegular', color: supportTextColor, fontSize: '18px' }}>
                    {favoriteCocktails.length} Total Favorites
                </Typography>
            </Box>

            {favoriteCocktails.length === 0 ? (
                <Typography variant="h5" align="center" mt={4}>
                    No Favorites Yet
                </Typography>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,
                        justifyContent: 'center',
                    }}
                >
                    {isLoading ? (
                        Array.from(new Array(4)).map((_, index) => (
                            <Skeleton key={index} animation="wave" variant="rectangular" width={250} height={300} />
                        ))
                    ) : (
                        favoriteCocktails.map((cocktail) => (
                            <Box key={cocktail.Cocktail_ID} sx={{ position: 'relative' }}>
                                <CocktailCard
                                    id={cocktail.Cocktail_ID}
                                    image={cocktail.Image_url}
                                    name={cocktail.Cocktail_Name}
                                    strength={cocktail.Strength}
                                    level={cocktail.Difficulty_Level}
                                    flavor={cocktail.Main_Flavor}
                                />
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    startIcon={<DeleteForeverIcon />}
                                    onClick={() => handleRemove(userId, cocktail.Cocktail_ID.toString())}
                                    sx={{ position: 'absolute', top: 0, right: 0 }}
                                >
                                    Delete
                                </Button>
                            </Box>
                        ))
                    )}
                </Box>
            )}

            <RemoveCocktailDialog
                open={removeCocktailDialogOpen}
                onClose={() => setRemoveCocktailDialogOpen(false)}
                onConfirmRemoveCocktail={confirmRemoveCocktail}
                displayText={"Are you sure you want to remove this cocktail from favorites?\n"}
            />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000} // Adjust the duration as needed
                onClose={() => setSnackbarOpen(false)}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    severity="success"
                    onClose={() => setSnackbarOpen(false)}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>

            {favoriteCocktails.length > 0 && (
                <Divider className="py-8">
                    <Chip label="No More Favorites" />
                </Divider>
            )}
        </div>
    );

};

export default Favorites;
