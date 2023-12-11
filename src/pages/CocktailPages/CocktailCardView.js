import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ReviewsSection from "../../components/Reviews/ReviewsSection";
import Ingredients from "../../components/Cocktail/Ingredients";
import CocktailButtons from "../../components/Cocktail/CocktailButtons";
import Preparation from "../../components/Cocktail/Preparation";
import { doc, getDoc } from 'firebase/firestore';
import db from "../../firebase";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function CocktailCardView(props) {
    let { id } = useParams();
    let navigate = useNavigate();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const [cocktail, setCocktail] = useState(null);

    useEffect(() => {
        const fetchCocktail = async () => {
            const fetchedCocktail = await getCocktailById(id);
            console.log(fetchedCocktail)
            setCocktail(fetchedCocktail);
            console.log("Stuck in effect");

        };

        fetchCocktail();
    }, [id]); // Dependency array with ID to fetch cocktail when ID changes

    const getCocktailById = async (id) => {
        const cocktailRef = doc(db, 'newCocktails', id);
        const docSnapshot = await getDoc(cocktailRef);

        if (docSnapshot.exists()) {
            console.log("stuck in function!");
            return docSnapshot.data();
        } else {
            console.log("No such document!");
            return null;
        }
    };

    if (!cocktail) {
        return <div>Loading cocktail...</div>; // Display loading message or spinner
    }

    const handleClose = () => {
        navigate(-1); // Go back to the previous page
    };





    return (
        // Padding added to this div
        <div className="px-4 py-2 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center">
                <img className="h-96" src={cocktail.Image_url} alt={`Cocktail ${cocktail.name}`} />
                <div className="flex flex-col justify-center md:ml-4 flex-grow">
                    <h2 className="text-6xl font-bold mt-4 md:mt-0">{cocktail.Cocktail_Name}</h2>
                    <p className="text-sm text-gray-500 my-2">{cocktail.Description}</p>
                </div>
                <div className="flex-none">
                    <CocktailButtons currentCocktail={cocktail} />
                </div>
            </div>


            <div className="flex flex-col md:flex-row md:space-x-4">
                {/* Ingredients list */}
                <Ingredients
                    ingredients={cocktail.ingredients}
                />
                {/* Preparation steps are now a separate component */}
                <Preparation steps={cocktail.Preparation} />
            </div>


            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Reviews" />
                    <Tab label="Comments" />
                </Tabs>
                {value === 0 && (
                    <ReviewsSection cocktail={cocktail.Cocktail_ID} user={"props.user.attributes.name"} />
                )}

                {value === 1 &&(
                    <Typography sx={{ fontFamily: 'SFProRegular' , fontSize:'48px', fontWeight: 'bold'}}>
                        Comments
                    </Typography>                )}
            </Box>

            {/* Close button */}
            <div className="mt-4">
                <button className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600" onClick={handleClose}>
                    Close
                </button>
            </div>
        </div>
    );
}



export default CocktailCardView;
