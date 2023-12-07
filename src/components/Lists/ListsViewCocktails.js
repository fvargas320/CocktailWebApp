import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CocktailCard from '../../components/Cocktail/CocktailCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { getAllListsAndCocktails } from '../../utils/ListsLogic';
import Typography from "@mui/material/Typography";
import Skeleton from '@mui/material/Skeleton'; // Import Skeleton from MUI

const ListsViewCocktails = () => {
    const { listName: encodedListName } = useParams();
    const listName = decodeURIComponent(encodedListName);

    const [cocktails, setCocktails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const cocktailsPerPage = 12; // Reduced to 12 per page
    const [loading, setLoading] = useState(true); // State for loading

    useEffect(() => {
        async function fetchCocktailsForList() {
            try {
                const userId = "1"; // Replace with your user ID or fetch it dynamically
                const lists = await getAllListsAndCocktails(userId);

                const list = lists.find((item) => item.name === listName);

                if (list) {
                    const cocktailCount = list.cocktails.length;
                    setTotalPages(Math.ceil(cocktailCount / cocktailsPerPage));
                    const startIndex = (currentPage - 1) * cocktailsPerPage;
                    const endIndex = startIndex + cocktailsPerPage;
                    const pageCocktails = list.cocktails.slice(startIndex, endIndex);
                    setCocktails(pageCocktails);
                    setLoading(false); // Set loading to false once data is fetched
                } else {
                    console.log(`List "${listName}" not found.`);
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
                        {listName}
                    </Box>
                </Typography>

                <Typography sx={{ fontFamily: 'SFProRegular', color: supportTextColor, fontSize: '18px' }}>
                    {cocktails.length} Total Cocktails
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
                {loading ? (
                    // Show skeleton loading
                    Array.from(new Array(12)).map((_, index) => (
                        <Skeleton
                            key={index}
                            animation="wave"
                            variant="rectangular"
                            width={250}
                            height={300}
                            mr={2} // Add margin-right
                            ml={2} // Add margin-bottom
                        />
                    ))
                ) : (
                    // Show actual cocktail cards
                    cocktails.map((cocktail) => (
                        <CocktailCard
                            key={cocktail.Cocktail_ID}
                            id={cocktail.Cocktail_ID}
                            image={cocktail.Image_url}
                            name={cocktail.Cocktail_Name}
                            strength={cocktail.Strength}
                            level={cocktail.Difficulty_Level}
                            flavor={cocktail.Main_Flavor}
                        />
                    ))
                )}
            </Box>

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
