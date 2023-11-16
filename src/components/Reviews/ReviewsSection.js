import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Review from './Review'; // Import the Review component
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ReviewBars from "./ReviewBars";
import CreateReview from "./CreateReview";

const ReviewSection = (props) => {
    // Calculate the average rating from reviews data
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
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
    ]);
    const averageRating = reviewsData.reduce((acc, review) => acc + review.rating, 0) / reviewsData.length;

    const addReviewToData = (newReview) => {
        setReviewsData((prevReviews) => [newReview, ...prevReviews]);
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography sx={{ fontFamily: 'SFProRegular' , fontSize:'48px', fontWeight: 'bold'}}>
                    Reviews
                </Typography>
                <Box>
                    <Button variant="outlined" size="small" sx={{ marginRight: '8px' }}>
                        See all reviews
                    </Button>
                    {/*    Write a review*/}
                    <CreateReview addReview={addReviewToData} user={props.user} />
                </Box>
            </Box>
            <Box mb={2} display="flex" alignItems="center">
                <Typography sx={{ fontFamily: 'SFProRegular' }}>
                    <Box component="span" sx={{ fontWeight: 'bold', fontSize: '46px' }}>
                        {averageRating.toFixed(1)}
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

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {reviewsData.slice(0, 4).map((review, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: isSmallScreen ? '40%' : '320px',
                            mb: 2,
                            // Remove marginRight if it's a small screen or the last item on a large screen
                            marginRight: isSmallScreen ? 0 : index !== reviewsData.length - 1 ? 2 : 0,
                            // Centering the box on a small screen
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Review
                            reviewHeader={review.reviewHeader}
                            rating={review.rating}
                            userName={review.userName}
                            reviewText={review.reviewText}
                        />
                    </Box>
                ))}
            </Box>

        </Box>
    );
};

export default ReviewSection;