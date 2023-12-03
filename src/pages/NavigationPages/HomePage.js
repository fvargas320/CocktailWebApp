import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import CocktailCard from "../../components/Cocktail/CocktailCard";
import {db} from "../../firebase";
import HomePageCategories from "../../components/Cocktail Collections/HomePageCategories";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Box} from "@mui/material";

const HomePage = () => {
    const [firstCollection, setFirstCollection] = useState([]);
    const [secondCollection, setSecondCollection] = useState([]);
    const [thirdCollection, setThirdCollection] = useState([]);

    useEffect(() => {
        const fetchCocktails = async (setQuery, category, resultsLimit) => {
            const cocktailsRef = collection(db, "newCocktails");
            const q = query(cocktailsRef, where("Categories", "==", category), limit(resultsLimit));

            const querySnapshot = await getDocs(q);
            const fetchedCocktails = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setQuery(fetchedCocktails);
        };

        fetchCocktails(setFirstCollection, "Strawberry Cocktails & Recipes", 10);
        fetchCocktails(setSecondCollection, "Light & Skinny", 10);
        fetchCocktails(setThirdCollection, "Quick & Easy Cocktails", 10);
    }, []);

    let navigate = useNavigate();

    const navigateToCollection = (collectionName) => {
        navigate(`/all/categories/${collectionName}`);
    };

    // Define the default and hover colors
    const defaultColor = '#000000';
    const hoverColor = '#758bd2';

    const buttonStyles = {
        fontFamily: 'SFProRegular',
        fontSize: '24px',
        fontWeight: 'bold',
        transition: 'color 0.3s',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        color: defaultColor,
    };

    const renderCocktails = (title, collectionName, cocktails) => (
        <>
            <Button
                variant="text"
                color="success"
                style={buttonStyles}
                onClick={ () => navigateToCollection(collectionName)}
                onMouseEnter={(e) => {
                    e.currentTarget.style.color = hoverColor;
                    e.currentTarget.querySelector('svg').style.fill = hoverColor;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.color = defaultColor;
                    e.currentTarget.querySelector('svg').style.fill = defaultColor;
                }}
                disableRipple // Disable the ripple effect
            >
                {title}
                <ChevronRightIcon fontSize="medium" />
            </Button>


            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 1, // 20px

                    maxWidth: '1800px',
                    margin: '0 auto', // Center the box in the container
                }}
            >
                {cocktails.map((cocktail) => (

                    <Box
                    key={cocktail.Cocktail_ID}
                    sx={{
                    flex: '0 0 calc(20% - 20px)', // Default: 4 cocktails per row with a 10px gap
                    maxWidth: 'calc(25% - 20px)',
                    marginBottom: '20px',
                    '@media (max-width: 1200px)': { // For medium screens
                    flex: '0 0 calc(33.33% - 20px)',
                    maxWidth: 'calc(33.33% - 20px)',
                },
                    '@media (max-width: 900px)': { // For small screens
                    flex: '0 0 calc(50% - 20px)',
                    maxWidth: 'calc(50% - 20px)',
                },
                    '@media (max-width: 600px)': { // For extra small screens
                    flex: '0 0 calc(50% - 20px)', // 2 cocktails per row
                    maxWidth: 'calc(50% - 20px)',
                },
                }}
                    >

                    <CocktailCard
                        id={cocktail.Cocktail_ID}
                        image={cocktail.Image_url}
                        key={cocktail.Cocktail_ID}
                        name={cocktail.Cocktail_Name}
                        strength={cocktail.Strength}
                        level={cocktail.Difficulty_Level}
                        flavor={cocktail.Main_Flavor}
                    />
                    </Box>
                ))}
            </Box>
        </>
    );

    return (
        <div>
            <HomePageCategories/>
            {renderCocktails("Quick & Easy Cocktails","Quick & Easy Cocktails", thirdCollection)}
            {renderCocktails("Light & Skinny Cocktails","Light & Skinny", secondCollection)}
            {renderCocktails("Strawberry Cocktails & Recipes", "Strawberry Cocktails & Recipes", firstCollection)}
        </div>
    );
};

export default HomePage;
