import React, {useEffect, useState} from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import EditReview from './EditReview';
import { doc, setDoc, collection, updateDoc } from "firebase/firestore"; 
import {db} from "../../firebase";

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

const Review = ({ setReviewsData, cocktailID, allReviews, reviewData, reviewHeader, rating, userName, currentUser, reviewText, isExpanded, onToggleExpand }) => {
    const [currentRating] = useState(rating);
    const [showSeeMore, setShowSeeMore] = useState(false);

    useEffect(() => {
        setShowSeeMore(reviewText.length > 200);
    }, [reviewText]);

    const previewText = reviewText.length > 200 ? reviewText.substring(0, 200) + '...' : reviewText;

    const StyledReviewContainer = styled(Box)({
        backgroundColor: '#eeebeb',
        padding: '16px',
        borderRadius: '8px',
        color: 'black',
        width: '320px',
        display: 'flex',
        flexDirection: 'column',
        wordWrap: 'break-word',
        overflow: 'hidden',
        minHeight: '200px', // Set a minimum height, adjust as needed
    });

    function handleEdit(editedReview){
        let bufArr = []
        for(let i = 0; i < allReviews.length; i++){
            if(allReviews[i].userName != currentUser){
                bufArr.push(allReviews[i])
            }
        }
        let newArray = [...bufArr, editedReview]
        setReviewsData(newArray)
        let documentRef = doc(db, "newCocktails", `${cocktailID}`)
        updateDoc(documentRef, {reviews: newArray})
    }

function handleDelete() {
    // Filter out the review to be deleted
    const updatedReviews = allReviews.filter(review => review.userName !== currentUser);

    // Update the state with the new reviews array
    setReviewsData(updatedReviews);

    // Update the Firestore document with the new reviews array
    const documentRef = doc(db, "newCocktails", `${cocktailID}`);
    updateDoc(documentRef, { reviews: updatedReviews });
}


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
                <StyledButton onClick={onToggleExpand}>
                    {isExpanded ? 'See Less' : 'See More'}
                </StyledButton>
            )}
            {userName == currentUser ? 
            <EditReview deleteReview={handleDelete} editReview={handleEdit} user={userName} reviewData={reviewData}/>
            : <></>}
        </StyledReviewContainer>
    );
};

export default Review;
