import React, {useEffect, useState} from 'react';
import { Modal, TextField, Button, Box, List, ListItem, ListItemButton, ListItemText, Checkbox } from '@mui/material';
import {addCocktailsToList, createList, getAllLists} from "../../utils/ListsLogic";
import {useNavigate} from "react-router-dom";

const AddToListModal = ({cocktailID, isOpen, onClose }) => {
    const [listName, setListName] = useState('');
    const [listDescription, setListDescription] = useState('');
    const [showInputFields, setShowInputFields] = useState(false);
    const [lists, setLists] = useState([]); // State for storing lists
    const [checked, setChecked] = useState([]); // State for tracking checked items

    useEffect(() => {
        // Fetch lists when the modal opens
        if (isOpen) {
            const userId = '1'; // Replace with the actual user ID
            getAllLists(userId)
                .then(fetchedLists => setLists(fetchedLists))
                .catch(error => console.error('Error fetching lists:', error));
        }
    }, [isOpen]);

    const handleBack = () => {
        // Only reset the state for showing input fields
        setShowInputFields(false);
    };
    const handleClose = () => {
        // Reset the input fields and the state for showing them
        setListName('');
        setListDescription('');
        setShowInputFields(false);
        setChecked([])
        onClose(); // Call the original onClose prop
    };
    const handleAddList = async () => {
        if (listName.trim() === '') {
            // Handle empty list name
            return;
        }

        const userId = '1'; // Replace with the actual user ID
        const listAdded = await createList(userId, listName, listDescription);

        if (listAdded) {
            // List added successfully, close the modal and reset input fields
            handleClose()
        }
    };

    const handleAddCocktailsToList = async () => {
        try {
            await addCocktailsToList("1", checked, cocktailID);
            handleClose(); // Close the modal
        } catch (error) {
            console.error(error);
            // Optionally handle the error (e.g., show an error message)
        }
    };

    const handleToggle = (list) => {
        const currentIndex = checked.indexOf(list.name);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(list.name);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };


    return (
        <Modal open={isOpen} onClose={handleClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400 }}>
                {showInputFields ? (
                    <>
                        <h2>Creating a New List</h2>

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
                            <Button variant="contained" color="primary" onClick={handleBack}>Back</Button>
                            <Button variant="contained" color="primary" onClick={handleAddList}>Add</Button>
                        </Box>
                    </>
                ) : (
                    <>
                    <h2>Creating a New Lissssst</h2>
                        <List sx={{ width: '100%', maxHeight: 300, overflow: 'auto' }}>
                            {lists.map((list, index) => (
                                <ListItem key={index} disablePadding secondaryAction={
                                    <Checkbox
                                        edge="end"
                                        checked={checked.indexOf(list.name) !== -1}
                                        onChange={() => handleToggle(list)}
                                        inputProps={{ 'aria-labelledby': `checkbox-list-label-${index}` }}
                                    />
                                }>
                                    <ListItemButton onClick={() => handleToggle(list)}>
                                        <ListItemText primary={list.name} secondary={list.description} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>


                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
                            <Button variant="contained" color="primary" onClick={() => setShowInputFields(true)}>Create List</Button>
                            <Button variant="contained" color="primary" onClick={handleAddCocktailsToList}>Add Cocktails</Button>
                        </Box>

                    </>

                )}
            </Box>

        </Modal>
    );
};

export default AddToListModal;
