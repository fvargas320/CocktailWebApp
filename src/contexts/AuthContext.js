import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [profilePicURL, setProfilePicURL] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (currentUser) {
            getUserProfilePicture(currentUser.displayName).then((url) => {
                if (url === '') {
                    setProfilePicURL(getAvatarLetter(currentUser.displayName));
                } else {
                    setProfilePicURL(url);
                }
            });
        }
    }, [currentUser]);

    const getUserProfilePicture = async (username) => {
        const storageRef = ref(storage, '/');
        const result = await listAll(storageRef);
        const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
        const urls = await Promise.all(urlPromises);
        const filterUrl = urls.filter((url) => url.includes(username));
        return filterUrl.length > 0 ? filterUrl[0] : '';
    };

    const getAvatarLetter = (name) => {
        return name ? name.charAt(0) : currentUser.email.charAt(0).toUpperCase();
    };

    const setProfilePictureURL = (url) => {
        setProfilePicURL(url);
    };

    const value = {
        currentUser,
        profilePicURL,
        loading,
        setProfilePictureURL, // Add the new function to the context
        // You can add other authentication-related functions or data here, e.g., signOut
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
