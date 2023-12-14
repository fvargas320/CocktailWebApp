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
import Typography from "@mui/material/Typography";

const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};

const pageStyle = {
    padding: "0 16px", // Apply padding for even spacing on the left and right
    maxWidth: "100%", // Ensure content doesn't exceed the viewport width

};

const imageStyle = {
    height: "500px",
    borderRadius: "8px",
    maxWidth: "100%", // Initially set to 100% for desktop view
};

const titleStyle = {
    fontSize: "3rem",
    fontWeight: "bold",
    marginTop: "1rem",
};

const descriptionStyle = {
    fontSize: "1.2rem",
    color: "gray",
    marginTop: "0.5rem",
    marginBottom: "2rem",
    maxWidth: "75%",
};

const buttonStyle = {
    backgroundColor: "gray",
    color: "white",
    borderRadius: "4px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    marginTop: "1rem",
};

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
        <div style={pageStyle}> {/* Apply padding to the entire page */}
            <div style={containerStyle}>
                <div style={{ display: 'flex', alignItems: 'center', maxWidth: '50%' }}>



                    <img
                        src={imageSrc}
                        alt={`Cocktail ${cocktail.Cocktail_Name}`}
                        onError={handleImageError}
                        style={isMobileView() ? { ...imageStyle, maxWidth: "100%", alignItems:"normal"
                        } : imageStyle}
                    />
                    <div style={{ marginLeft: '20px', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h2 style={titleStyle}>{cocktail.Cocktail_Name}</h2>
                        </div>
                        <p style={descriptionStyle}>{cocktail.Description}</p>
                        <CocktailButtons currentCocktail={cocktail} />

                    </div>
                </div>

                <div style={{ minWidth: '50%' }}>
                    <Ingredients ingredients={cocktail.ingredients} />
                    <Preparation steps={cocktail.Preparation} />
                    <ReviewsSection cocktail={cocktail} user={auth.currentUser?.displayName} />
                </div>

                <div style={buttonStyle} onClick={handleClose}>
                    Close
                </div>
            </div>
        </div>
    );

    // Function to check if the current view is mobile (you can adjust this as needed)
    function isMobileView() {
        return window.innerWidth <= 768; // Adjust the breakpoint as needed
    }
}

export default CocktailCardView;
