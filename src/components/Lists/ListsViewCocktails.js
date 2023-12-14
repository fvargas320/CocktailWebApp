import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CocktailCard from '../../components/Cocktail/CocktailCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { getAllListsAndCocktails } from '../../utils/ListsLogic';
import Typography from "@mui/material/Typography";
import Skeleton from '@mui/material/Skeleton';
import { useAuth } from "../../contexts/AuthContext"; // Import Skeleton from MUI

const ListsViewCocktails = () => {
    const { listName: encodedListName } = useParams();
    const listName = decodeURIComponent(encodedListName);

    const [cocktails, setCocktails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const cocktailsPerPage = 12; // Reduced to 12 per page
    const [loading, setLoading] = useState(true); // State for loading
    const { currentUser } = useAuth(); // Use the currentUser from AuthContext
    const userId = currentUser ? currentUser.uid : null;
    const [listDescription, setListDescription] = useState(''); // Declare and initialize listDescription state

    useEffect(() => {
        async function fetchCocktailsForList() {
            try {
                const lists = await getAllListsAndCocktails(userId);
                const list = lists.find((item) => item.name === listName);

                if (list) {
                    const cocktailCount = list.cocktails.length;
                    setTotalPages(Math.ceil(cocktailCount / cocktailsPerPage));
                    const startIndex = (currentPage - 1) * cocktailsPerPage;
                    const endIndex = startIndex + cocktailsPerPage;
                    const pageCocktails = list.cocktails.slice(startIndex, endIndex);
                    setCocktails(pageCocktails);
                    setListDescription(list.description); // Set the list description
                    setLoading(false); // Set loading to false once data is fetched
                } else {
                    console.log(`List "${listName}" not found.`);
                    setLoading(false); // Set loading to false if the list is not found
                }
            } catch (error) {
                console.error('Error fetching cocktails:', error);
            }
        }

        fetchCocktailsForList();
    }, [listName, currentPage]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Define the default and hover colors
    const defaultColor = '#000000';
    const supportTextColor = '#8A8A8D';
    return (
        <div>
            <Box
                sx={{
                    padding: '0 16px', // Standard-sized padding on left and right
                    display: 'flex',
                    flexDirection: 'column',
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
                        {listName}
                    </Box>
                </Typography>

                {loading ? (
                    <Skeleton variant="text" width={160} sx={{ fontSize: '1rem' }} />
                ) : (
                    <Typography sx={{ fontFamily: 'SFProRegular', color: supportTextColor, fontSize: '18px' }}>
                        {listDescription} {/* Display the list description */}
                    </Typography>
                )}

                {loading ? (
                    <Skeleton variant="text" width={160} sx={{ fontSize: '1rem' }} />
                ) : (
                    <Typography sx={{ fontFamily: 'SFProRegular', color: supportTextColor, fontSize: '18px' }}>
                        {cocktails.length} Total Cocktails
                    </Typography>
                )}
            </Box>

            {loading ? (
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
                // Show actual cocktail cards or "No Cocktails" message
                cocktails.length === 0 ? (
                    <Typography variant="h3" align="center" sx={{ mt: 4 }}>
                        No Cocktails in this collection
                    </Typography>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2, // 20px
                            justifyContent: 'center',
                        }}
                    >
                        {cocktails.map((cocktail) => (
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
                )
            )}

            <Stack
                spacing={2}
                justifyContent="center"
                sx={{
                    pt: 6,
                    pb: 4,
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Stack>
        </div>
    );

};

export default ListsViewCocktails;