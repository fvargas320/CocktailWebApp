import React, {useEffect, useState} from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

const StyledButton = styled(Button)({
    color: '#ff6d75',
    '&:hover': {
        backgroundColor: 'rgba(255, 109, 117, 0.04)',
    },
});

const Review = ({ reviewHeader, rating, userName, reviewText }) => {
    const [currentRating] = useState(rating);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showSeeMore, setShowSeeMore] = useState(false);

    useEffect(() => {
        setShowSeeMore(reviewText.length > 200);
    }, [reviewText]);

    const previewText = reviewText.length > 200 ? reviewText.substring(0, 200) + '...' : reviewText;

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const StyledReviewContainer = styled(Box)({
        backgroundColor: '#d2d2d2',
        padding: '16px',
        borderRadius: '8px',
        color: 'black',
        maxWidth: '320px',
        minWidth: '320px',
        display: 'flex',
        flexDirection: 'column',
        wordWrap: 'break-word',
        overflow: 'hidden',
        minHeight: '200px', // Set a minimum height, adjust as needed
    });


    return (
        <StyledReviewContainer>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="subtitle1" gutterBottom>
                    {userName}
                </Typography>
                <StyledRating
                    name="read-only"
                    value={currentRating}
                    readOnly
                    size="small"
                />
            </Box>
            <Typography
                variant="h6"
                component="h4"
                gutterBottom
                style={{ fontWeight: 'bold' }} // Make sure this is bold
            >
                {reviewHeader}
            </Typography>

            <Typography variant="body2" gutterBottom>
                {isExpanded ? reviewText : previewText}
            </Typography>
            {showSeeMore && (
                <StyledButton onClick={handleToggleExpand}>
                    {isExpanded ? 'See Less' : 'See More'}
                </StyledButton>
            )}
        </StyledReviewContainer>
    );
};

export default Review;
