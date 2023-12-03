import React, {useEffect, useMemo, useState} from 'react';
import { doc, getDoc, query, where, getDocs, collection } from 'firebase/firestore';
import db from '../../firebase';
import Box from '@mui/material/Box';
import CocktailCard from '../../components/Cocktail/CocktailCard';
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const Favorites = () => {
    const userId = '1'; // Replace with the actual user ID
    const userDocRef = useMemo(() => doc(db, 'users', userId), [userId]);
    const [favoriteCocktails, setFavoriteCocktails] = useState([]);

    useEffect(() => {
        // Fetch the user's document, including the favorites array
        getDoc(userDocRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    const favoritesArray = userData.favorites; // This is your array of favorite cocktail IDs

                    // Create an array of queries for each value in the favoritesArray
                    const queries = favoritesArray.map((value) =>
                        query(collection(db, 'newCocktails'), where('Cocktail_ID', '==', parseInt(value)))
                    );

                    // Execute all queries in parallel using Promise.all
                    return Promise.all(queries.map((q) => getDocs(q)));
                } else {
                    // Handle the case where the user document does not exist
                    return [];
                }
            })
            .then((querySnapshots) => {
                const cocktails = [];
                console.log(querySnapshots.length)

                // Iterate through querySnapshots to access the matching documents
                querySnapshots.forEach((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // Access the matching document data
                        const cocktailData = doc.data();
                        cocktails.push(cocktailData);
                        console.log('Matching Cocktail:', cocktailData);
                        // Do something with the matching cocktail data here
                    });
                });

                // Set the favoriteCocktails state with the fetched data
                setFavoriteCocktails(cocktails);
            })
            .catch((error) => {
                console.error('Error querying Firestore:', error);
            });
    }, [userDocRef]);


    // Define the default and hover colors
    const defaultColor = '#000000';
    const supportTextColor = '#8A8A8D';

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
                <Typography sx={{ fontFamily: 'SFProRegular'}}>
                    <Box component="span" sx={{
                        fontSize: '30px',
                        fontWeight: 'bold',
                        color: defaultColor}}
                    >
                        {"Your Favorites"}
                    </Box>
                </Typography>

                <Typography sx={{ fontFamily: 'SFProRegular', color: supportTextColor, fontSize: '18px' }}>
                    {favoriteCocktails.length} Total Favorites
                </Typography>

            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2, // 20px
                    justifyContent: 'center',
                }}
            >
                {favoriteCocktails.map((cocktail) => (
                    <CocktailCard
                        key={cocktail.Cocktail_ID}
                        id={cocktail.Cocktail_ID}
                        image={cocktail.Image_url}
                        name={cocktail.Cocktail_Name}
                        strength={cocktail.Strength}
                        level={cocktail.Difficulty_Level}
                        flavor={cocktail.Main_Flavor}
                    />
                ))}
            </Box>

            <Divider className="py-8" >
                <Chip label="No More Favorites" />
            </Divider>
        </div>
    );
};

export default Favorites;
