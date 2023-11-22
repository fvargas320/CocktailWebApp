import React, { useState, useRef } from 'react';
import { IconButton, Snackbar, Alert } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';

function CocktailButtons(props) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const buttonRef = useRef(null); // Ref for the button to position the snackbar

    const handleAddClick = () => {
        console.log(`Add button clicked for ${props.currentCocktail}`);
    };

    const handleFavoriteClick = () => {
        setIsFavorite((prevIsFavorite) => {
            const newFavoriteStatus = !prevIsFavorite;
            setSnackbarMessage(newFavoriteStatus ? 'Added to favorites' : 'Removed from favorites');
            setSnackbarSeverity(newFavoriteStatus ? 'success' : 'error'); // Change severity based on action
            setSnackbarOpen(true);
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
