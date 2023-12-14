import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export function ModifyListDialog({
                                     open,
                                     onClose,
                                     listName,
                                     listDescription,
                                     onNameChange,
                                     onDescriptionChange,
                                     onModifyList,
                                 }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Modify List: {listName}</DialogTitle>
            <DialogContent>
                <TextField
                    label="List Name"
                    fullWidth
                    variant="outlined"
                    value={listName}
                    onChange={onNameChange}
                    sx={{ marginBottom: 2, marginTop: 2 }}
                />
                <TextField
                    label="List Description"
                    fullWidth
                    multiline
                    variant="outlined"
                    value={listDescription}
                    onChange={onDescriptionChange}
                    sx={{ marginBottom: 2, marginTop: 2 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onModifyList} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export function RemoveCocktailDialog({ open, onClose, onConfirmRemoveCocktail, displayText }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Removal</DialogTitle>
            <DialogContent>
                <Typography>
                    {displayText}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirmRemoveCocktail} color="secondary">
                    Remove
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export function DeleteListDialog({ open, onClose, listName, onConfirmDeleteList }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to delete the list "{listName}"?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirmDeleteList} color="secondary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}


export function SkeletalList() {
    return (
        <>
            <Skeleton variant="text" width={450} sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" width={350} sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" width={250} sx={{ fontSize: '1rem' }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {Array.from(new Array(4)).map((_, index) => (
                    <Box key={index} sx={{ mr: 2, mb: 2 }}>
                        <Skeleton
                            animation="wave"
                            variant="rectangular"
                            width={250}
                            height={300}
                        />
                    </Box>
                ))}
            </Box>
            <Skeleton variant="text" width={450} sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" width={350} sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" width={250} sx={{ fontSize: '1rem' }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {Array.from(new Array(4)).map((_, index) => (
                    <Box key={index} sx={{ mr: 2, mb: 2 }}>
                        <Skeleton
                            animation="wave"
                            variant="rectangular"
                            width={250}
                            height={300}
                        />
                    </Box>
                ))}
            </Box>
        </>
    );
}
