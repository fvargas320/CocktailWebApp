import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import Review from './Review';
const AllReviews = () => {
    const location = useLocation();
    let navigate = useNavigate();
    const reviewsData = location.state.allReviewsData;
    const [toggleReviewsData, setToggleReviewsData] = useState(reviewsData);

// Example of a function to toggle the expanded state of a review
    const toggleReviewExpand = (index) => {
        const updatedReviews = toggleReviewsData.map((review, idx) => {
            if (idx === index) {
                return { ...review, isExpanded: !review.isExpanded };
            }
            return review;
        });
        setToggleReviewsData(updatedReviews);
    };

    const handleClose = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <Box>
            <Typography sx={{ fontFamily: 'SFProRegular', fontSize:'48px', fontWeight: 'bold' }}>
                All Reviews
            </Typography>
            {/* Display total number of reviews */}
            <Typography sx={{ fontFamily: 'SFProRegular', fontSize:'24px', marginBottom: '16px' }}>
                Total Reviews: {toggleReviewsData ? toggleReviewsData.length : 0}
            </Typography>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                '& > *': {
                    boxSizing: 'border-box', // Ensure padding and borders are included in width calculation
                    width: {
                        xs: 'calc(50% - 16px)', // 2 items per row for extra small screens
                        sm: 'calc(33.333% - 16px)', // 3 items per row for small screens
                        lg: 'calc(25% - 16px)' // 4 items per row for large screens
                    },
                    minWidth: '250px', // Prevent items from becoming too small
                    maxWidth: '1fr', // Allow items to grow to fill available space
                }
            }}>
                {toggleReviewsData && toggleReviewsData.map((review, index) => (

                        <Review
                            reviewHeader={review.reviewHeader}
                            rating={review.rating}
                            userName={review.userName}
                            reviewText={review.reviewText}
                            isExpanded={review.isExpanded}
                            onToggleExpand={() => toggleReviewExpand(index)}
                        />
                ))}
            </Box>

            <Divider>
                <Chip label="End of Reviews" />
            </Divider>

            <button className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600" onClick={handleClose}>
                Back to details
            </button>
        </Box>
    );
};

export default AllReviews;
