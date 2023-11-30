import React from 'react';
import './HomePageCategories.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Import images
import summerImage from '../../images/Summer_Collection.png';
import christmasImage from '../../images/Christmas_Collection.png';
import ginImage from '../../images/Blue_Collection.png';
import allImage from '../../images/all.png';
import spicyImage from '../../images/spicy.png';
import champImage from '../../images/champ.png';
import cocoImage from '../../images/coco.png';
import strawberryImage from '../../images/strawberry.png';
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomePageCategories from "./HomePageCategories";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import ReviewBars from "../Reviews/ReviewBars";


const categories = [
    { title: 'Christmas Cocktails', imageUrl: christmasImage, firebaseCategory: 'Mixologist Approved' },
    { title: 'Champagne Cocktails',  imageUrl: champImage, firebaseCategory: 'Champagne Cocktails' },
    { title: 'Strawberry Cocktails', firebaseCategory: 'Strawberry Cocktails & Recipes', imageUrl: strawberryImage },
    { title: 'Coconut Cocktails', imageUrl: cocoImage, firebaseCategory: 'Coconut Cocktails & Recipes' },
    { title: 'Summer Cocktails', imageUrl: summerImage, firebaseCategory: 'Pool Party Drinks & Recipes' },
    { title: 'Blue Cocktails', imageUrl: ginImage, firebaseCategory: 'Blue Drinks' },
    { title: 'Spicy Cocktails', imageUrl: spicyImage, firebaseCategory: 'Spicy Recipes & Cocktails' },
    { title: 'All Cocktails', imageUrl: allImage, large: true },

    // Add more categories as needed
];

const ViewAllCategories  = () => {

    let navigate = useNavigate();

    const navigateToCollection = (collectionName) => {
        navigate(`/all/categories/${collectionName}`);
    };
    const handleClose = () => {
        navigate(-1); // Go back to the previous page
    };

    // Define the default and hover colors
    const defaultColor = '#000000';
    const supportTextColor = '#8A8A8D';

    return (
        <div className="all-categories-page">

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
                        {"All Categories"}
                    </Box>
                </Typography>

                <Typography sx={{ fontFamily: 'SFProRegular', color: supportTextColor, fontSize: '18px' }}>
                    Viewing {categories.length} Total Collections
                </Typography>

            </Box>


            <Box direction="column"
                     alignItems="center"
                     justifyContent="center" sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                    gap: 2,
                    '& > *': {
                        boxSizing: 'border-box', // Ensure padding and borders are included in width calculation
                        width: {
                            xs: 'calc(200% - 20px)', // 2 items per row for extra small screens
                            sm: 'calc(33.333% - 20px)', // 3 items per row for small screens
                            lg: 'calc(25% - 20px)' // 4 items per row for large screens
                        },
                        minWidth: '250px', // Prevent items from becoming too small
                        maxWidth: '1fr',
                    }
                }}
                >
                    {categories.map((category, index) => (
                    <div key={index}>
                        <div
                            className="category-card"
                            style={{ backgroundImage: `url(${category.imageUrl})` }}
                            onClick={ () => navigateToCollection(category.firebaseCategory)}
                        >
                            <h3

                            >{category.title}</h3>
                        </div>
                    </div>
                ))}
                </Box>

            <Divider className="py-8" >
                <Chip label="No More Collections" />
            </Divider>

            <button className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600" onClick={handleClose}>
                Back to Home
            </button>

        </div>
    );
}


export default ViewAllCategories;