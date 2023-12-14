import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Review from './Review'; // Import the Review component
import ReviewBars from "./ReviewBars";
import CreateReview from "./CreateReview";
import { useNavigate } from "react-router-dom";
import Slider from 'react-slick'; // Import Slider component from react-slick
import 'slick-carousel/slick/slick.css'; // Import slick-carousel CSS
import 'slick-carousel/slick/slick-theme.css';
import { useAuth } from "../../contexts/AuthContext"; // Import slick-carousel theme
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { IconButton, Snackbar, Alert } from "@mui/material";

const ReviewSection = (props) => {

    const navigate = useNavigate();
    const { currentUser } = useAuth(); // Use the currentUser from AuthContext
    const userName = currentUser ? currentUser.displayName : null;
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [reviewsData, setReviewsData] = useState([]);

    useEffect(() => {
        // Find the cocktail by ID and set its reviews
        const selectedCocktail = props.cocktail
        if (selectedCocktail && selectedCocktail.reviews) {
            setReviewsData(selectedCocktail.reviews.map(review => ({ ...review, isExpanded: false })));
        }
    }, [props.cocktail.Cocktail_ID]);

    const averageRating = reviewsData.reduce((acc, review) => acc + review.rating, 0) / reviewsData.length;

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const addReviewToData = (newReview) => {
        const userReviewed = reviewsData.some(review => review.userName === userName);

        if (!userReviewed) {
            const updatedReviews = [...reviewsData, newReview];
            setReviewsData(updatedReviews);

            const documentRef = doc(db, "newCocktails", `${props.cocktail.Cocktail_ID}`);
            updateDoc(documentRef, { reviews: updatedReviews });
        } else {
            setSnackbarOpen(true);
        }
    };

    const toggleReviewExpand = (index) => {
        setReviewsData(currentReviews =>
            currentReviews.map((review, idx) =>
                idx === index ? { ...review, isExpanded: !review.isExpanded } : review
            )
        );
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4, // Adjust the number of slides to show
        slidesToScroll: 2, // Adjust the number of slides to scroll
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Box sx={{ marginBottom: '24px', padding: '0 16px', marginTop: '24px' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography sx={{ fontFamily: 'SFProRegular', fontSize: '24px', fontWeight: 'bold' }}>
                    Reviews
                </Typography>
                <Box>
                    <Button variant="outlined" size="small" sx={{ marginRight: '8px' }}
                        onClick={() => navigate(`/all-reviews/${props.cocktail}`, { state: { allReviewsData: reviewsData } })}>
                        See all reviews
                    </Button>

                    <CreateReview addReview={addReviewToData} user={userName} reviewData={reviewsData} />
                </Box>
            </Box>

            <Box sx={{ padding: '0 16px', display: 'flex', alignItems: 'center', }}>
                <Typography sx={{ fontFamily: 'SFProRegular', fontSize: '20px', }}>
                    <Box component="span" sx={{ fontWeight: 'bold', fontSize: '46px', color: '#3E3E40', }}>
                        {isNaN(averageRating) ? "N/A" : averageRating.toFixed(1)}
                    </Box>

                    <Box component="span" sx={{ color: '#8A8A8D', fontSize: '18px', }}>
                        {' '}out of 5
                    </Box>

                    <Box component="span" sx={{ color: '#8A8A8D', fontSize: '18px', paddingLeft: "2rem" }}>
                        {' '}{reviewsData.length} Reviews
                    </Box>
                </Typography>

                <ReviewBars reviewData={reviewsData} />
            </Box>

            <Box alignItems="center" mb={5}>
                <Slider {...settings}>
                    {reviewsData.length > 0 ?
                        reviewsData.map((review, index) => (
                            <Review
                                key={index}
                                cocktailID={props.cocktail.Cocktail_ID}
                                reviewHeader={review.reviewHeader}
                                reviewData={review}
                                allReviews={reviewsData}
                                setReviewsData={setReviewsData}
                                rating={review.rating}
                                userName={review.userName}
                                currentUser={userName}
                                reviewText={review.reviewText}
                                isExpanded={review.isExpanded}
                                onToggleExpand={() => toggleReviewExpand(index)}
                                style={{ display: 'flex', flexDirection: 'column', }}
                            />
                        )) : <Typography variant='h3'>No Reviews</Typography>
                    }
                </Slider>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
                    You have already posted a review on this cocktail.
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ReviewSection;
