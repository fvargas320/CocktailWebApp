import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import {styled} from "@mui/system";

export default function CreateReview(props) {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0); // Initial rating state
    const [subject, setSubject] = useState('');
    const [reviewContent, setReviewContent] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log('Rating:', rating); // Log the rating when closing the dialog
        setOpen(false);
    };

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    const handleCreateReview = () => {
        // Pass the new review data up to the parent component
        props.addReview({
            reviewHeader: subject,
            rating: rating,
            userName: props.user, // Replace with user's name if available
            reviewText: reviewContent,
        });
        // Close the dialog
        handleClose();
    };

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: '#ff6d75',
        },
        '& .MuiRating-iconHover': {
            color: '#ff3d47',
        },
    });
    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                Write a Review
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Review</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/*{props.user.attributes.name}*/}
                        Ready to rate your latest drink? 🌟🥂
                        <br />
                        <strong>Subject:</strong> Write a short review heading.
                        <br />
                        <strong>Spill the Tea:</strong> Give us the juicy details in the content box. Loved it? Want more mint? Tell us everything!
                        <br />
                        <strong>Stars:</strong> Rate it from 1 (Meh) to 5 (Wowza) stars.
                    </DialogContentText>
                    <h3>Rate This Cocktail</h3>
                    <StyledRating
                        name="simple-controlled"
                        value={rating}
                        onChange={handleRatingChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="subject"
                        label="Subject"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="review-content"
                        label="Review Content"
                        type="text"
                        fullWidth
                        variant="standard"
                        multiline
                        rows={4}
                        InputProps={{
                            style: { overflow: 'auto' }
                        }}
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreateReview}>Create</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
