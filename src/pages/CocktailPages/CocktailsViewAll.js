import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import CocktailCard from "../../components/Cocktail/CocktailCard";
import { useParams } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton"; // Import Skeleton from MUI

const CocktailsViewAll = () => {
    const { collection: encodedCollectionName } = useParams();
    const collectionName = decodeURIComponent(encodedCollectionName);

    const [cocktailIds, setCocktailIds] = useState([]); // Store all cocktail IDs
    const [totalIDs, setTotalIDs] = useState(0); // Store all cocktail IDs
    const [cocktails, setCocktails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const cocktailsPerPage = 16;
    const cocktailsRef = collection(db, "newCocktails");

    // Add isLoading state
    const [isLoading, setIsLoading] = useState(true);

    // Fetch all cocktail IDs
    const fetchCocktailIds = async () => {
        const q = query(cocktailsRef, where("Categories", "==", collectionName), orderBy("Cocktail_ID"));
        const querySnapshot = await getDocs(q);
        const ids = querySnapshot.docs.map(doc => doc.id);
        setTotalIDs(ids.length);
        setCocktailIds(ids);
        setTotalPages(Math.ceil(ids.length / cocktailsPerPage));
    };

    // Fetch cocktails for the current page
    const fetchCocktailsForPage = async (ids) => {
        const startIndex = (currentPage - 1) * cocktailsPerPage;
        const endIndex = startIndex + cocktailsPerPage;
        const pageIds = ids.slice(startIndex, endIndex);

        const cocktails = await Promise.all(pageIds.map(async (id) => {
            const docRef = doc(db, "newCocktails", id);
            const docSnap = await getDoc(docRef);
            return { id: docSnap.id, ...docSnap.data() };
        }));

        setCocktails(cocktails);
    };

    useEffect(() => {
        fetchCocktailIds();
    }, []);

    useEffect(() => {
        if (cocktailIds.length > 0) {
            setIsLoading(false); // Set isLoading to true when fetching data
            fetchCocktailsForPage(cocktailIds);
        }
    }, [currentPage, cocktailIds]);

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
                <Typography sx={{ fontFamily: 'SFProRegular' }}>
                    <Box component="span" sx={{
                        fontSize: '30px',
                        fontWeight: 'bold',
                        color: defaultColor
                    }}>
                        {collectionName}
                    </Box>
                </Typography>

                <Typography sx={{ fontFamily: 'SFProRegular', color: supportTextColor, fontSize: '18px' }}>
                    {isLoading ? ( // Render skeleton loading or total cocktails
                        <Skeleton variant="text" width={160} sx={{ fontSize: '1rem' }} />
                    ) : (
                        `${totalIDs} Total Cocktails`
                    )}
                </Typography>
            </Box>

            {isLoading ? ( // Render skeleton loading or cocktail cards
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
            )}

            <Stack
                spacing={2}
                justifyContent="center"
                sx={{
                    pt: 6,
                    pb: 4,
                    width: '100%',
                    alignItems: 'center'
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

export default CocktailsViewAll;
