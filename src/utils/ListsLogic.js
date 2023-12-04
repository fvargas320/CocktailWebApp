// src/firebase/favorites.js
import {arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import db from "../firebase";

// Function to fetch the details of a single cocktail by ID
async function fetchCocktailDetails(cocktailId) {
    const cocktailRef = doc(db, 'newCocktails', cocktailId);
    const cocktailSnap = await getDoc(cocktailRef);
    return cocktailSnap.exists() ? cocktailSnap.data() : null;
}

// Main function to get all lists and their cocktails
export async function getAllListsAndCocktails(userId) {
    try {
        const listsCollectionRef = collection(db, 'users', userId, 'Lists');
        const listsSnapshot = await getDocs(listsCollectionRef);

        return await Promise.all(listsSnapshot.docs.map(async (listDoc) => {
            const listData = listDoc.data();
            const cocktails = await Promise.all(
                listData.cocktailIDs.map(cocktailId => fetchCocktailDetails(cocktailId))
            );

            return {
                name: listData.name,
                description: listData.description,
                cocktails: cocktails.filter(cocktail => cocktail !== null)
            };
        }));
    } catch (error) {
        console.error('Error fetching lists and cocktails:', error);
        throw error;
    }
}

// Function to check if a cocktail is a favorite for a specific user
export const createList = async (userId, listName, listDescription) => {
    try {
        const listDocRef = doc(db, 'users', userId, 'Lists', listName);
        console.log(listDocRef + "HOOOO")
        // Fetch the specific list document
        const docSnapshot = await getDoc(listDocRef);

        if (docSnapshot.exists()) {
            // The list already exists
            console.log("That list already exists")
            return false; // Or handle as needed
        } else {
            // Create a new list if it does not exist
            await setDoc(listDocRef, { name: listName, description: listDescription, cocktailIDs: [] });
            console.log("YESSSIR")
            return true; // List created successfully
        }
    } catch (error) {
        console.error('Error creating list:', error);
        throw error; // Rethrow the error for handling in the calling code
    }
};

export const getAllLists = async (userId) => {
    try {
        // Define the collection reference for the specific user's Lists
        const listsCollectionRef = collection(db, 'users', userId, 'Lists');

        // Fetch all documents from the Lists collection
        const querySnapshot = await getDocs(listsCollectionRef);

        // Map through each document and extract the desired information
        const lists = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                name: data.name,
                description: data.description
            };
        });

        console.log(lists); // Log the list of names and descriptions
        return lists; // Return the list of names and descriptions
    } catch (error) {
        console.error('Error fetching lists:', error);
        throw error; // Rethrow the error for handling in the calling code
    }
};

export const removeList = async (userId, cocktailId) => {
};

export const modifyList = async (userId, cocktailId) => {
};
export const addCocktailsToList = async (userId, listNamesArray, cocktailId) => {
    try {
        // Loop through the list names
        for (const listName of listNamesArray) {
            const listDocRef = doc(db, 'users', userId, 'Lists', listName);

            // Fetch the specific list document
            const docSnapshot = await getDoc(listDocRef);
            if (docSnapshot.exists()) {
                const listData = docSnapshot.data();

                // Check if the cocktail is already in the list
                if (listData.cocktailIDs.includes(cocktailId)) {
                    console.log(`Cocktail already in list: ${listName}`);
                    continue; // Skip to the next list
                }

                // Update the list document to add the cocktailId
                await updateDoc(listDocRef, {
                    cocktailIDs: arrayUnion(cocktailId)
                });
            } else {
                console.error(`List not found: ${listName}`);
                // Handle the case where the list does not exist
                // For example, you might want to create the list here
            }
        }
    } catch (error) {
        console.error('Error adding cocktail to lists:', error);
        throw error; // Rethrow the error for handling in the calling code
    }
};
export const removeFavoritesToList = async (userId, listID, cocktailId) => {
    try {
        const userDocRef = doc(db, 'users', userId);

        // Update the user's document to remove the cocktailId from the favorites array
        await updateDoc(userDocRef, {
            favorites: arrayRemove(cocktailId)
        });
    } catch (error) {
        console.error('Error removing from favorites:', error);
        throw error; // rethrow the error for handling in the component
    }
};

//is cocktail in list
