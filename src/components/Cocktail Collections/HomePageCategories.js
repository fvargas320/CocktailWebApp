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

const HomePageCategories = () => {

    let navigate = useNavigate();

    const navigateToCollection = (collectionName) => {
        navigate(`/all/categories/${collectionName}`);
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    dots: true,
                    infinite: false,
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };

    return (
        <div className="category-slider">
            <h3 style={{ fontFamily: 'SFProRegular', color: "#000000", fontSize: "32px" }}>Top Categories</h3>
            <Slider {...settings}>
                {categories.map((category, index) => (
                    <div key={index}>
                        <div
                            className="category-card"
                            style={{ backgroundImage: `url(${category.imageUrl})` }}
                        >
                            <h3 onClick={ () => navigateToCollection(category.firebaseCategory)}

                            >{category.title}</h3>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HomePageCategories;