import React, { useEffect, useState } from 'react';
import {collection, getDocs, query, where, orderBy, getDoc, doc} from "firebase/firestore";
import db from "../../firebase";
import Cocktail from "../../components/Cocktail/Cocktail";
import { useParams } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";

const AllCocktails = () => {
    const { collection: encodedCollectionName } = useParams();
    const collectionName = decodeURIComponent(encodedCollectionName);

    const [cocktailIds, setCocktailIds] = useState([]); // Store all cocktail IDs
    const [totalIDs, setTotalIDs] = useState(0); // Store all cocktail IDs

    const [cocktails, setCocktails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const cocktailsPerPage = 16;
    const cocktailsRef = collection(db, "newCocktails");

    // Fetch all cocktail IDs
    const fetchCocktailIds = async () => {
        const q = query(cocktailsRef, where("Categories", "==", collectionName), orderBy("Cocktail_ID"));
        const querySnapshot = await getDocs(q);
        const ids = querySnapshot.docs.map(doc => doc.id);
        setTotalIDs(ids.length)
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
            fetchCocktailsForPage(cocktailIds);
        }
    }, [currentPage, cocktailIds]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div>
            <h1>Currently Viewing: {collectionName}</h1>
            <h1>Viewing 16 out of {totalIDs} cocktails </h1>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2, // 20px
                    justifyContent: 'center',
                }}
            >
                {cocktails.map((cocktail) => (
                    <Cocktail
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

export default AllCocktails;