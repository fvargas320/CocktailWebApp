import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { doc, getDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import Box from '@mui/material/Box';
import CocktailCard from '../../components/Cocktail/CocktailCard';
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { Skeleton } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import theme from "../../theme";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { removeFromFavorites } from "../../utils/FavoritesLogic";
import { RemoveCocktailDialog } from "../../utils/ListsDialogs&SkelatalList";
import { useAuth } from "../../contexts/AuthContext";

const Favorites = () => {
    const { currentUser } = useAuth();
    const userId = currentUser ? currentUser.uid : null;

    const userDocRef = useMemo(() => doc(db, 'users', userId), [userId]);
    const [favoriteCocktails, setFavoriteCocktails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cocktailToRemove, setCocktailToRemove] = useState(null);
    const [removeCocktailDialogOpen, setRemoveCocktailDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

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
        setCocktailToRemove({ userID, cocktailID });
        setRemoveCocktailDialogOpen(true);
    }, []);

    const confirmRemoveCocktail = async () => {
        try {
            if (cocktailToRemove) {
                await removeFromFavorites(
                    cocktailToRemove.userID,
                    cocktailToRemove.cocktailID.toString()
                );
                fetchFavorites();
                handleOpenSnackbar("Cocktail removed successfully");
            }
            setRemoveCocktailDialogOpen(false);
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
                    padding: '0 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
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

                {isLoading ? (
                    <Skeleton variant="text" width={160} sx={{ fontSize: '1rem' }} />
                ) : (
                    <Typography sx={{ fontFamily: 'SFProRegular', color: supportTextColor, fontSize: '18px' }}>
                        {favoriteCocktails.length} Total Favorites
                    </Typography>
                )}
            </Box>

            {isLoading ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {Array.from(new Array(6)).map((_, index) => (
                        <Box key={index} sx={{ mr: 4, mb: 2 }}>
                            <Skeleton
                                animation="wave"
                                variant="rectangular"
                                width={250}
                                height={300}
                            />
                        </Box>
                    ))}
                </Box>
            ) : (
                <>
                    {favoriteCocktails.length === 0 && (
                        <Typography variant="h5" align="center" mt={4}>
                            No Favorites Yet
                        </Typography>
                    )}

                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2,
                            justifyContent: 'center',
                        }}
                    >
                        {isLoading ? (
                            <>

                                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {Array.from(new Array(6)).map((_, index) => (
                                        <Box key={index} sx={{ mr: 4, mb: 2 }}>
                                            <Skeleton
                                                animation="wave"
                                                variant="rectangular"
                                                width={250}
                                                height={300}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            </>

                        ) : (
                            favoriteCocktails.map((cocktail) => (
                                <Box key={cocktail.Cocktail_ID} sx={{ position: 'relative', display: 'inline-block' }}>
                                    <CocktailCard
                                        id={cocktail.Cocktail_ID}
                                        image={cocktail.Image_url}
                                        name={cocktail.Cocktail_Name}
                                        strength={cocktail.Strength}
                                        level={cocktail.Difficulty_Level}
                                        flavor={cocktail.Main_Flavor}
                                    />
                                    <IconButton
                                        color="secondary"
                                        onClick={() => handleRemove(userId, cocktail.Cocktail_ID.toString())}
                                        sx={{
                                            position: 'absolute',
                                            bottom: 10,
                                            right: 10,
                                            "&:hover": {
                                                backgroundColor: "#e57373", // Specify the hover color
                                            },
                                        }}
                                    >
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Box>
                            ))
                        )}
                    </Box>
                </>
            )}

            <RemoveCocktailDialog
                open={removeCocktailDialogOpen}
                onClose={() => setRemoveCocktailDialogOpen(false)}
                onConfirmRemoveCocktail={confirmRemoveCocktail}
                displayText={"Are you sure you want to remove this cocktail from favorites?\n"}
            />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
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
}

export default Favorites;
