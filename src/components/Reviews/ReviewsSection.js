import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Review from './Review'; // Import the Review component
import { useTheme } from '@mui/material/styles';
import ReviewBars from "./ReviewBars";
import CreateReview from "./CreateReview";
import cocktailData from "../../data/cocktail_list.json";
import {useNavigate} from "react-router-dom";
import Slider from 'react-slick'; // Import Slider component from react-slick
import 'slick-carousel/slick/slick.css'; // Import slick-carousel CSS
import 'slick-carousel/slick/slick-theme.css'; // Import slick-carousel theme


const ReviewSection = (props) => {

    const navigate = useNavigate();

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

    useEffect(() => {
        // Find the cocktail by ID and set its reviews
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
        <Box>

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography sx={{ fontFamily: 'SFProRegular' , fontSize:'48px', fontWeight: 'bold'}}>
                    Reviews
                </Typography>
                <Box>
                    <Button variant="outlined" size="small" sx={{ marginRight: '8px' }}
                            onClick={() => navigate(`/all-reviews/${props.cocktail}`, { state: { allReviewsData: reviewsData } })}>
                        See all reviews
                    </Button>


                    {/*    Write a review*/}
                    <CreateReview addReview={addReviewToData} user={props.user} />
                </Box>
            </Box>
            <Box sx= {{padding: '0 16px', // Standard-sized padding on left and right
            }} mb={2} display="flex" alignItems="center">
                <Typography sx={{ fontFamily: 'SFProRegular' }}>
                    <Box component="span" sx={{ fontWeight: 'bold', fontSize: '46px' }}>
                        {isNaN(averageRating) ? "N/A" : averageRating.toFixed(1)}
                    </Box>

                    <Box component="span" sx={{ color: '#8A8A8D' }}>
                        {' '}out of 5
                    </Box>
                    <Box component="span" sx={{ color: '#8A8A8D', paddingX: "2rem"}} >
                        {' '}{reviewsData.length} Reviews
                    </Box>
                </Typography>

                <ReviewBars reviewData={reviewsData} />
            </Box>

            <Box alignItems="center" mb={5}>
                <Slider {...settings}>
                    {reviewsData.map((review, index) => (
                        <Review
                            key={index} // Add a key for each slide
                            reviewHeader={review.reviewHeader}
                            rating={review.rating}
                            userName={review.userName}
                            reviewText={review.reviewText}
                            isExpanded={review.isExpanded}
                            onToggleExpand={() => toggleReviewExpand(index)}
                            style={{ display: 'flex', flexDirection: 'column',
                            }} // Apply Flexbox styles directly

                        />
                    ))}
                </Slider>
            </Box>

        </Box>
    );
};

export default ReviewSection;