// src/firebase/favorites.js
import {arrayRemove, arrayUnion, doc, getDoc, updateDoc} from "firebase/firestore";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {db} from "../firebase";


// Function to check if a cocktail is a favorite for a specific user
export const isCocktailFavorite = async (userId, cocktailId) => {
    try {
        const userDocRef = doc(db, 'users', userId);

        // Fetch the user's document
        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
            const userData = docSnapshot.data();

            // Check if the cocktailId exists in the user's favorites array
            return userData.favorites.includes(cocktailId);
        } else {
            // Handle the case where the user document does not exist
            return false;
        }
    } catch (error) {
        console.error('Error checking if cocktail is a favorite:', error);
        throw error; // Rethrow the error for handling in the calling code
    }
};
export const addToFavorites = async (userId, cocktailId) => {
    try {
        const userDocRef = doc(db, 'users', userId);

        // Fetch current favorites to check if the cocktailId is already present
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            if (userData.favorites.includes(cocktailId)) {
                throw new Error("Cocktail already in favorites");
            }
        }

        // Update the user's document to add the cocktailId to the favorites array
        await updateDoc(userDocRef, {
            favorites: arrayUnion(cocktailId)
        });
    } catch (error) {
        console.error('Error adding to favorites:', error);
        throw error; // rethrow the error for handling in the component
    }
};
export const removeFromFavorites = async (userId, cocktailId) => {
    try {

        const userDocRef = doc(db, 'users', userId);

        // Update the user's document to remove the cocktailId from the favorites array
        await updateDoc(userDocRef, {
            favorites: arrayRemove(cocktailId)
        });

        console.log("Removed")

    } catch (error) {
        console.error('Error removing from favorites:', error);
        throw error; // rethrow the error for handling in the component
    }
};
