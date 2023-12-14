import {arrayUnion, collection, doc, getDoc, getDocs, setDoc, deleteDoc, updateDoc} from "firebase/firestore";
import {db} from "../firebase";

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
        const listDocRef = doc(collection(db, 'users', userId, 'Lists'), listName);

        // Check if the list already exists
        const docSnapshot = await getDoc(listDocRef);

        if (docSnapshot.exists()) {
            console.log("That list already exists");
            return false;
        }

        // Create a new list
        await setDoc(listDocRef, { name: listName, description: listDescription, cocktailIDs: [] });
        return true;
    } catch (error) {
        console.error('Error creating list:', error);
        throw error;
    }
};

export const getAllLists = async (userId) => {
    try {
        const listsCollectionRef = collection(db, 'users', userId, 'Lists');
        const querySnapshot = await getDocs(listsCollectionRef);

        if (querySnapshot.empty) {
            // Return an empty array if the collection does not exist or is empty
            return [];
        }

        return querySnapshot.docs.map(doc => ({
            name: doc.data().name,
            description: doc.data().description,
        }));
    } catch (error) {
        console.error('Error fetching lists:', error);
        throw error;
    }
};

export const removeList = async (userId, listName) => {
    try {
        // Define the reference to the specific list document
        const listDocRef = doc(db, 'users', userId, 'Lists', listName);

        // Check if the list exists
        const docSnapshot = await getDoc(listDocRef);

        if (docSnapshot.exists()) {
            // The list exists, so delete it
            await deleteDoc(listDocRef);
            console.log(`List "${listName}" has been deleted.`);
        } else {
            // The list does not exist
            console.log(`List "${listName}" does not exist.`);
            // You can throw an error or handle it as needed
        }
    } catch (error) {
        console.error('Error deleting list:', error);
        throw error; // Rethrow the error for handling in the calling code
    }
};
export const modifyList = async (userId, listName, newName, newDescription) => {
    try {
        // Construct a reference to the specific list document
        const listDocRef = doc(db, 'users', userId, 'Lists', listName);

        // Fetch the specific list document
        const docSnapshot = await getDoc(listDocRef);

        if (docSnapshot.exists()) {
            // The list exists, update it with the new name and description
            await updateDoc(listDocRef, {
                name: newName,
                description: newDescription,
            });

            console.log(`List "${listName}" updated successfully.`);
            return true; // List updated successfully
        } else {
            console.error("List does not exist");
            return false; // List does not exist
        }
    } catch (error) {
        console.error('Error modifying list:', error);
        throw error; // Rethrow the error for handling in the calling code
    }
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
export const removeCocktailFromList = async (userId, listID, cocktailId) => {
    try {
        // Define the reference to the specific list document
        const listDocRef = doc(db, 'users', userId, 'Lists', listID);

        // Fetch the current list document
        const listDoc = await getDoc(listDocRef);

        if (listDoc.exists()) {
            // Get the current list data
            const listData = listDoc.data();

            // Remove the specified cocktail from the list of cocktails
            listData.cocktailIDs = listData.cocktailIDs.filter(id => id !== cocktailId);

            // Update the list document in Firestore
            await updateDoc(listDocRef, { cocktailIDs: listData.cocktailIDs });
            console.log(`Cocktail with ID "${cocktailId}" removed from list.`);
        } else {
            console.log(`List with ID "${listID}" does not exist.`);
            // Handle the case where the list does not exist
        }
    } catch (error) {
        console.error('Error removing cocktail from list:', error);
        throw error; // Rethrow the error for handling in the calling code
    }
};
