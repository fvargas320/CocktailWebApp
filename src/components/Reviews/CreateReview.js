import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import { styled } from "@mui/system";
import {IconButton, Snackbar, Alert} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth hook

export default function CreateReview(props) {
    const { currentUser } = useAuth(); // Use the currentUser from AuthContext
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [subject, setSubject] = useState('');
    const [reviewContent, setReviewContent] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const resetForm = () => {
        setRating(0);
        setSubject('');
        setReviewContent('');
    };

    const handleClickOpen = () => {
        if (!currentUser) {
            setSnackbarOpen(true);
            return;
        }
        setOpen(true);
    };

    const handleClose = () => {
        resetForm();
        setOpen(false);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    const handleCreateReview = () => {
        if (rating > 0) {
            props.addReview({
                reviewHeader: subject,
                rating: rating,
                userName: currentUser ? currentUser.displayName : "Guest", // Replace with user's email if available
                reviewText: reviewContent,
            });
            resetForm();
            handleClose();
        }
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
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
                <DialogContent>
                    <DialogContentText>
                        Ready to rate your latest drink? 🌟🥂
                        <br />
                        <strong>Subject:</strong> Write a short review heading.
                        <br />
                        <strong>Spill the Tea:</strong> Give us the juicy details in the content box. Loved it? Want more mint? Tell us everything!
                        <br />
                        <strong>Stars:</strong> Rate it from 1 (Meh) to 5 (Wowza) stars.
                    </DialogContentText>
                    <h3>Rate This Cocktail <span style={{color: 'red'}}>*</span></h3>
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
                        InputProps={{ style: { overflow: 'auto' } }}
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreateReview} disabled={rating === 0}>Create</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
                    Please log in to write a review.
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}

