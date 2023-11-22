import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/system';
import PropTypes from 'prop-types'; // For prop type validation

const StyledRatingBarContainer = styled(Box)({
    height: '10px',
    borderRadius: '5px',
    background: '#e0e0e0', // Grey color for the unfilled bar
    flexGrow: 1,
    margin: '0 8px',
    maxWidth: '30%', // Example: Set a maximum width for the bars

});
const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

const StyledRatingBar = styled(Box)(({ width }) => ({
    height: '100%',
    borderRadius: '5px',
    background: '#6b6b6b', // Primary color for the filled bar
    width: `${width}%`, // width is a percentage of the parent's width
}));

const ReviewBars = ({ reviewData }) => {
    // Calculate the count of each star rating
    const starCounts = Array.from({ length: 5 }, (_, i) =>
        reviewData.filter(review => review.rating === 5 - i).length
    );

    // Get the total count for scaling the bars
    const totalCount = reviewData.length;

    return (
        <Box width="100%" maxWidth="500px" > {/* Center the bars container */}
            {starCounts.map((count, index) => {
                const label = `${5 - index} stars`;
                const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0;
                return (
                    <Box key={index} display="flex" alignItems="center" mb={1}>
                        <StyledRating name="read-only" value={5 - index} readOnly size="small" />
                        <StyledRatingBarContainer>
                            <StyledRatingBar width={percentage} />
                        </StyledRatingBarContainer>
                        <Typography variant="body2" sx={{ ml: 2 }}>
                            {count}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );
};

// Prop type validation for reviewData
ReviewBars.propTypes = {
    reviewData: PropTypes.arrayOf(
        PropTypes.shape({
            rating: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default ReviewBars;
