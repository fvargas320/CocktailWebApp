import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import ReviewsSection from "../../components/Reviews/ReviewsSection";
import Ingredients from "../../components/Cocktail/Ingredients";
import CocktailButtons from "../../components/Cocktail/CocktailButtons";
import Preparation from "../../components/Cocktail/Preparation";
import { getAuth } from "firebase/auth";
import default_image from '../../images/missing.png';

function CocktailCardView() {
    const auth = getAuth();
    let { id } = useParams();
    let navigate = useNavigate();

    const [imageSrc, setImageSrc] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCocktail = async () => {
            const fetchedCocktail = await getCocktailById(id);
            setCocktail(fetchedCocktail);
            setImageSrc(fetchedCocktail?.Image_url || "");
            setIsLoading(false);
        };

        fetchCocktail();
    }, [id]);

    const [cocktail, setCocktail] = useState(null);

    const handleImageError = () => {
        setImageSrc(default_image);
    };

    const getCocktailById = async (id) => {
        const cocktailRef = doc(db, "newCocktails", id);
        const docSnapshot = await getDoc(cocktailRef);

        if (docSnapshot.exists()) {
            return docSnapshot.data();
        } else {
            return null;
        }
    };

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "80vh",
                }}
            >
                <CircularProgress color="primary" size={80} />
            </Box>
        );
    }

    const handleClose = () => {
        navigate(-1);
    };

    return (
        <div className="px-4 py-2 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center">
                <img
                    className="h-500   md:h-96" // Adjust height on mobile and md (medium) screens
                    src={imageSrc}
                    alt={`Cocktail ${cocktail.Cocktail_Name}`}
                    onError={handleImageError}
                />
                <div className="flex flex-col justify-center md:ml-4 flex-grow">
                    <h2 className="text-6xl font-bold mt-4 md:mt-0">
                        {cocktail.Cocktail_Name}
                    </h2>
                    <p className="text-sm text-gray-500 my-2">{cocktail.Description}</p>
                </div>
                <div className="flex-none">
                    <CocktailButtons currentCocktail={cocktail} />
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
                <Ingredients ingredients={cocktail.ingredients} />
                <Preparation steps={cocktail.Preparation} />
            </div>

            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ReviewsSection cocktail={cocktail} user={auth.currentUser?.displayName} />
            </Box>

            <div className="mt-4">
                <button
                    className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600"
                    onClick={handleClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default CocktailCardView;
