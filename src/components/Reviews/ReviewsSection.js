import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Review from './Review';
import { useTheme } from '@mui/material/styles';
import ReviewBars from "./ReviewBars";
import CreateReview from "./CreateReview";
import cocktailData from "../../data/cocktail_list.json";
import { useNavigate } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth hook
import { Snackbar, Alert } from "@mui/material";

    const ReviewSection = (props) => {
        const navigate = useNavigate();
        const { currentUser } = useAuth(); // Use the currentUser from AuthContext
        const [reviewsData, setReviewsData] = useState([
            {
                reviewHeader: 'Amazing Taste!',
                rating: 4,
                userName: 'John Doe',
                reviewText: 'I expeI expected a bit more coI expected a bit more coctedI expected a bit more coI expected a bit more coI expected a bit more coI expected a bit more coI expected a bit more coI expected a bit more coI expected a bit more coI expected a bit more co a bit more coI absolutely loved this cocktail! The balance of flavors was perfect.'
            },
            {
                reviewHeader: 'Just okay',
                rating: 3,
                userName: 'Steve Brown',
                reviewText: 'I expected a bit more coI expected a bit more coI expected a bit more coIt was good, but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.It was good,It was good, but I expected a bit more complexity in flavor. but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.'
            },

            {
                reviewHeader: "This is decent",
                rating: 3,
                userName: props.user,
                reviewText: 'It was good, but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.It was good,It was good, but I expected a bit more complexity in flavor. but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.'
            },
            {
                reviewHeader: "This is decent",
                rating: 3,
                userName: props.user,
                reviewText: 'It was good, but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.It was good,It was good, but I expected a bit more complexity in flavor. but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.'
            },

            {
                reviewHeader: "This is decent",
                rating: 3,
                userName: props.user,
                reviewText: 'It was good, but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.It was good,It was good, but I expected a bit more complexity in flavor. but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.'
            },
            {
                reviewHeader: "This is decent",
                rating: 3,
                userName: props.user,
                reviewText: 'It was good, but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.It was good,It was good, but I expected a bit more complexity in flavor. but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.'
            },
            {
                reviewHeader: "This is decent",
                rating: 3,
                userName: props.user,
                reviewText: 'It was good, but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.It was good,It was good, but I expected a bit more complexity in flavor. but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.'
            },
            {
                reviewHeader: "This is decent",
                rating: 3,
                userName: props.user,
                reviewText: 'It was good, but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.It was good,It was good, but I expected a bit more complexity in flavor. but I expected a bit more complexity in flavor.It was good, but I expected a bit more complexity in flavor.'
            },

        ]);

        const [snackbarOpen, setSnackbarOpen] = useState(false);

        useEffect(() => {
            const selectedCocktail = cocktailData.find(c => c.Cocktail_ID === props.cocktail.Cocktail_ID);
            if (selectedCocktail && selectedCocktail.reviews) {
                setReviewsData(selectedCocktail.reviews.map(review => ({ ...review, isExpanded: false })));
            }
        }, [props.cocktail.Cocktail_ID]);

        const averageRating = reviewsData.reduce((acc, review) => acc + review.rating, 0) / reviewsData.length;

        const addReviewToData = (newReview) => {
            setReviewsData((prevReviews) => [newReview, ...prevReviews]);
        };

        const toggleReviewExpand = (index) => {
            setReviewsData(currentReviews =>
                currentReviews.map((review, idx) =>
                    idx === index ? { ...review, isExpanded: !review.isExpanded } : review
                )
            );
        };

        const settings = {
            // Your slider settings
        };

        const handleReviewAction = () => {
            if (!currentUser) {
                setSnackbarOpen(true);
                return;
            }
            navigate(`/all-reviews/${props.cocktail}`, { state: { allReviewsData: reviewsData } });
        };

        const handleCloseSnackbar = () => {
            setSnackbarOpen(false);
        };

        return (
            <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography sx={{ fontFamily: 'SFProRegular', fontSize: '48px', fontWeight: 'bold' }}>
                        Reviews
                    </Typography>
                    <Box>
                        <Button variant="outlined" size="small" sx={{ marginRight: '8px' }}
                                onClick={handleReviewAction}>
                            See all reviews
                        </Button>
                        <CreateReview addReview={addReviewToData} user={currentUser ? currentUser.email : "Guest"} />
                    </Box>
                </Box>

                <Box sx={{ padding: '0 16px' }} mb={2} display="flex" alignItems="center">
                    <Typography sx={{ fontFamily: 'SFProRegular' }}>
                        {/* Rating display logic */}
                    </Typography>
                    <ReviewBars reviewData={reviewsData} />
                </Box>

                <Box alignItems="center" mb={5}>
                    <Slider {...settings}>
                        {reviewsData.map((review, index) => (
                            <Review key={index} {...review} onToggleExpand={() => toggleReviewExpand(index)} />
                        ))}
                    </Slider>
                </Box>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
                        Please log in to write a review or see all reviews.
                    </Alert>
                </Snackbar>
            </Box>
        );
    };

    export default ReviewSection;
