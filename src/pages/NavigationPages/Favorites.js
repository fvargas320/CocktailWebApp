import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { doc, getDoc, query, where, getDocs, collection } from 'firebase/firestore';
import db from '../../firebase';
import Box from '@mui/material/Box';
import CocktailCard from '../../components/Cocktail/CocktailCard';
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import {Skeleton} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from "@mui/material/Button";
import {removeFromFavorites} from "../../utils/FavoritesLogic";


const Favorites = () => {
    const userId = '1'; // Replace with the actual user ID
    const userDocRef = useMemo(() => doc(db, 'users', userId), [userId]);
    const [favoriteCocktails, setFavoriteCocktails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
        removeFromFavorites(userID, cocktailID)
            .then(fetchFavorites)
            .catch(error => console.error('Error removing favorite:', error));
    }, [fetchFavorites]);


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

            <Divider className="py-8" >
                <Chip label="No More Favorites" />
            </Divider>
        </div>
    );
};

export default Favorites;
