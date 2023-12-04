import React, { useState, useRef, useEffect } from 'react';
import { IconButton, Snackbar, Alert } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {addToFavorites, isCocktailFavorite, removeFromFavorites} from "../../utils/FavoritesLogic";
import {createList} from "../../utils/ListsLogic";
import AddToListModal from "./AddToListModal";

function CocktailButtons(props) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const buttonRef = useRef(null); // Ref for the button to position the snackbar
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userId = '1'; // Replace with the actual user ID
    const cocktailId = props.currentCocktail.Cocktail_ID.toString();

    const handleAddClick = () => {
        setIsModalOpen(true);
        console.log("Clicked button")

    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Use useEffect to check if the item is a favorite on page load
    useEffect(() => {
        // Implement logic to check if the item is a favorite
        // Example: You can use a function to check if it's a favorite
        const checkIfFavorite = async () => {
            // Replace with your logic to check if the cocktail is in the user's favorites
            // For example, you can use a function from your FavoritesLogic module
            const isFavorite = await isCocktailFavorite(userId, cocktailId);
            console.log(isFavorite)

            // Update the state based on whether it's a favorite or not
            setIsFavorite(isFavorite);
        };

        // Call the function to check if it's a favorite
        checkIfFavorite();
    }, [props.currentCocktail]);

    // const handleAddClick = async () => {
    //
    //     const listAdded = await createList("1", "NewList2", "Description");
    //     console.log("Clicked button")
    //     console.log(listAdded)
    //     // console.log(`Add button clicked for ${props.currentCocktail}`);
    // };

    const handleFavoriteClick = () => {
        setIsFavorite((isFavorite) => {
            const newFavoriteStatus = !isFavorite;
            setSnackbarMessage(newFavoriteStatus ? 'Added to favorites' : 'Removed from favorites');
            setSnackbarOpen(true);

            const userId = '1';
            const cocktailId = props.currentCocktail.Cocktail_ID.toString();

            if (newFavoriteStatus) {
                // If the user is marking it as a favorite, add it
                addToFavorites(userId, cocktailId)
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
                removeFromFavorites(userId, cocktailId)
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
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="flex" ref={buttonRef}>
            <IconButton onClick={handleAddClick} size="large">
                <AddCircleIcon fontSize="inherit" />
            </IconButton>
            <AddToListModal cocktailID = {cocktailId} isOpen={isModalOpen} onClose={handleCloseModal} />

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
