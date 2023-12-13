import React, { useEffect, useState } from 'react';
import { Modal, TextField, Button, Box, List, ListItem, ListItemButton, ListItemText, Checkbox } from '@mui/material';
import { addCocktailsToList, createList, getAllLists } from "../../utils/ListsLogic";
import { useAuth } from '../../contexts/AuthContext';
import Typography from "@mui/material/Typography"; // Import useAuth hook

const AddToListModal = ({ cocktailID, isOpen, onClose }) => {
    const [listName, setListName] = useState('');
    const [listDescription, setListDescription] = useState('');
    const [showInputFields, setShowInputFields] = useState(false);
    const [lists, setLists] = useState([]);
    const [checked, setChecked] = useState([]);

    const { currentUser } = useAuth(); // Use the currentUser from AuthContext
    const userId = currentUser ? currentUser.uid : null;

    useEffect(() => {
        if (isOpen && userId) {
            getAllLists(userId)
                .then(fetchedLists => setLists(fetchedLists))
                .catch(error => console.error('Error fetching lists:', error));
        }
    }, [isOpen, userId]);

    const handleBack = () => {
        setShowInputFields(false);
    };

    const handleClose = () => {
        setListName('');
        setListDescription('');
        setShowInputFields(false);
        setChecked([])
        onClose();
    };

    const handleAddList = async () => {
        if (listName.trim() === '' || !userId) {
            return;
        }

        const listAdded = await createList(userId, listName, listDescription);
        if (listAdded) {
            // Optionally, fetch the lists again to update the UI
            const updatedLists = await getAllLists(userId);
            setLists(updatedLists);
            handleClose();
        }
    };


    const handleAddCocktailsToList = async () => {
        try {
            if (userId) {
                await addCocktailsToList(userId, checked, cocktailID);
                handleClose();
            }
        } catch (error) {
            console.error(error);
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
                ) : lists.length > 0 ? (
                    <>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Your Lists:
                        </Typography>                        <List sx={{ width: '100%', maxHeight: 300, overflow: 'auto' }}>
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
                ) : (
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            No Lists Exist Yet
                        </Typography>
                        <Button variant="contained" color="primary" onClick={() => setShowInputFields(true)}>
                            Create List
                        </Button>
                    </Box>
                )}
            </Box>
        </Modal>
    );

};

export default AddToListModal;