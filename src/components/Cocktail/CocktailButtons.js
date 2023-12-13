import React, { useState, useRef, useEffect } from 'react';
import { IconButton, Snackbar, Alert } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addToFavorites, isCocktailFavorite, removeFromFavorites } from "../../utils/FavoritesLogic";
import AddToListModal from "./AddToListModal";
import { useAuth } from '../../contexts/AuthContext'; // Import the useAuth hook

function CocktailButtons(props) {
    const { currentUser } = useAuth(); // Use the currentUser from the AuthContext
    const [isFavorite, setIsFavorite] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const buttonRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cocktailId = props.currentCocktail.Cocktail_ID.toString();

    const handleAddClick = () => {
        if (!currentUser) {
            showLoginPrompt();
            return;
        }
        setIsModalOpen(true);
    };

    const handleFavoriteClick = () => {
        if (!currentUser) {
            showLoginPrompt();
            return;
        }

        else{
                setIsFavorite((isFavorite) => {
                    const newFavoriteStatus = !isFavorite;
                    setSnackbarMessage(newFavoriteStatus ? 'Added to favorites' : 'Removed from favorites');
                    setSnackbarOpen(true);

                    const cocktailId = props.currentCocktail.Cocktail_ID.toString();

                    if (newFavoriteStatus) {
                        // If the user is marking it as a favorite, add it
                        addToFavorites(currentUser.uid, cocktailId)
                            .then(() => {
                                console.log('Added to favorites successfully');
                                // You can update the UI or state here if needed
                            })
                            .catch((error) => {
                                console.error('Error adding to favorites:', error);
                                // Handle the error, e.g., display an error message
                            });
                    } else {
                        // If the user is removing it from favorites, remove it
                        removeFromFavorites(currentUser.uid, cocktailId)
                            .then(() => {
                                console.log('Removed from favorites successfully');
                                // You can update the UI or state here if needed
                            })
                            .catch((error) => {
                                console.error('Error removing from favorites:', error);
                                // Handle the error, e.g., display an error message
                            });
                    }
                    return newFavoriteStatus;

                });


        }
    };



        const showLoginPrompt = () => {
        setSnackbarMessage('Please log in to use this feature');
        setSnackbarSeverity('info');
        setSnackbarOpen(true);
    };

    useEffect(() => {
        if (!currentUser) return;
        const checkIfFavorite = async () => {
            const isFavorite = await isCocktailFavorite(currentUser.uid, cocktailId);
            setIsFavorite(isFavorite);
        };
        checkIfFavorite();
    }, [currentUser, cocktailId]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="flex" ref={buttonRef}>
            <IconButton onClick={handleAddClick} size="large">
                <AddCircleIcon fontSize="inherit" />
            </IconButton>
            <AddToListModal cocktailID={cocktailId} isOpen={isModalOpen} onClose={handleCloseModal} />

            <IconButton onClick={handleFavoriteClick} size="large" color={isFavorite ? "secondary" : "default"}>
                <FavoriteIcon fontSize="inherit" />
            </IconButton>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default CocktailButtons;
