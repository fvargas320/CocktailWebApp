import React, { useEffect, useState } from 'react';
import { Modal, TextField, Button, Box } from '@mui/material';
import { createList } from "../../utils/ListsLogic";
import { useAuth } from '../../contexts/AuthContext';

const CreateListModal = ({ isOpen, onClose }) => {
    const [listName, setListName] = useState('');
    const [listDescription, setListDescription] = useState('');

    const { currentUser } = useAuth();
    const userId = currentUser ? currentUser.uid : null;

    const handleClose = () => {
        setListName('');
        setListDescription('');
        onClose();
    };

    const handleCreateList = async () => {
        if (listName.trim() === '' || !userId) {
            return;
        }

        if (listName.length > 75) {
            // Display a message for list names that exceed 75 characters
            alert('List name must be 75 characters or less.');
            return;
        }

        if (listDescription.length > 75) {
            // Display a message for descriptions that exceed 75 characters
            alert('List description must be 75 characters or less.');
            return;
        }

        const listAdded = await createList(userId, listName, listDescription);
        if (listAdded) {
            handleClose();

            // Refresh the page
            window.location.reload();
        }
    };


    return (
        <Modal open={isOpen} onClose={handleClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400 }}>
                <h2>Create a New List</h2>
                <TextField
                    label="List Name"
                    fullWidth
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="List Description"
                    fullWidth
                    value={listDescription}
                    onChange={(e) => setListDescription(e.target.value)}
                    margin="normal"
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                    <Button variant="contained" color="primary" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleCreateList}>Create</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CreateListModal;
