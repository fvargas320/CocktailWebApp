import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CocktailCard from "../../components/Cocktail/CocktailCard";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import {
    ModifyListDialog,
    RemoveCocktailDialog,
    DeleteListDialog,
    SkeletalList
} from '../../components/Lists/ListsDialogs&SkelatalList';
import theme from "../../theme";
import { getAllListsAndCocktails, modifyList, removeList, removeCocktailFromList } from "../../utils/ListsLogic";
import { useAuth } from '../../contexts/AuthContext';
import CreateListModal from "../../components/Cocktail/CreateListModal";

function ListsPage() {
    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [listName, setListName] = useState('');
    const [listDescription, setListDescription] = useState('');
    const [listToModify, setListToModify] = useState(null);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [cocktailToRemove, setCocktailToRemove] = useState(null);
    const [removeCocktailDialogOpen, setRemoveCocktailDialogOpen] = useState(false);
    const [addToListModalOpen, setAddToListModalOpen] = useState(false); // State to manage the "Create a new List" modal

    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const userId = currentUser ? currentUser.uid : null;

    const buttonStyles = {
        fontFamily: 'SFProRegular',
        fontSize: '24px',
        fontWeight: 'bold',
        transition: 'color 0.3s',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.primary.main,
    };

    const hoverColor = theme.palette.secondary.main;
    const defaultColor = theme.palette.primary.main;
    const supportTextColor = theme.palette.text.secondary;

    useEffect(() => {
        if (!userId) {
            setIsLoading(false);
            return;
        }
        getAllListsAndCocktails(userId)
            .then(data => {
                setLists(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching lists and cocktails:', error);
                setIsLoading(false);
            });
    }, [userId]);

    const handleDeleteList = (listName) => {
        setListName(listName);
        setConfirmationDialogOpen(true);
    };

    const confirmDeleteList = async () => {
        try {
            await removeList(userId, listName);
            setLists((prevLists) => prevLists.filter((list) => list.name !== listName));
            setConfirmationDialogOpen(false);
        } catch (error) {
            console.error('Error deleting list:', error);
        }
    };

    const handleModifyList = async () => {
        try {
            const isModified = await modifyList(userId, listToModify.name, listName, listDescription);
            if (isModified) {
                setLists((prevLists) =>
                    prevLists.map((list) =>
                        list.name === listToModify.name ? { ...list, name: listName, description: listDescription } : list
                    )
                );
                setDialogOpen(false);
            }
        } catch (error) {
            console.error('Error modifying list:', error);
        }
    };

    const handleRemoveCocktail = (listName, cocktailId) => {
        setCocktailToRemove({ listName, cocktailId });
        setRemoveCocktailDialogOpen(true);
    };

    const confirmRemoveCocktail = async () => {
        try {
            if (cocktailToRemove) {
                await removeCocktailFromList(userId, cocktailToRemove.listName, cocktailToRemove.cocktailId.toString());
                setLists((prevLists) =>
                    prevLists.map((list) =>
                        list.name === cocktailToRemove.listName
                            ? { ...list, cocktails: list.cocktails.filter((cocktail) => cocktail.Cocktail_ID !== cocktailToRemove.cocktailId) }
                            : list
                    )
                );
            }
            setRemoveCocktailDialogOpen(false);
        } catch (error) {
            console.error('Error removing cocktail from list:', error);
        }
    };

    const openDialog = (list) => {
        setListToModify(list);
        setListName(list.name);
        setListDescription(list.description);
        setDialogOpen(true);
    };

    return (
        <Box sx={{ p: 4, display: 'flex', flexDirection: 'column'}}>
            {/* Move the "Create a new List" button to the top of the page */}
            <Button
                variant="contained"
                color="primary"
                onClick={() => setAddToListModalOpen(true)}
                sx={{ fontSize: '14px', fontWeight: 'bold', mb: 2 }}
            >
                Create a new List
            </Button>

            {isLoading ? (
                <SkeletalList />
            ) : lists.length > 0 ? (
                lists.map((list, index) => (
                    <Box key={index}>
                        <Box
                            sx={{
                                padding: '0 16px',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                mb: 2,
                                flexWrap: 'wrap', // Allow content to wrap
                            }}
                        >
                            <Box sx={{ flex: '1', minWidth: '50%' }}> {/* Adjust min-width to control the column layout */}
                                <Button
                                    variant="text"
                                    color="success"
                                    style={buttonStyles}
                                    onClick={() => navigate(`/lists/${list.name}`)}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = hoverColor;
                                        e.currentTarget.querySelector('svg').style.fill = hoverColor;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = defaultColor;
                                        e.currentTarget.querySelector('svg').style.fill = defaultColor;
                                    }}
                                    disableRipple
                                >
                                    {list.name}
                                    <ChevronRightIcon fontSize="medium" />
                                </Button>
                                <Typography
                                    sx={{
                                        fontFamily: 'SFProRegular',
                                        fontSize: '18px',
                                        color: supportTextColor,
                                        whiteSpace: 'pre-wrap', // Allow text to wrap
                                        wordWrap: 'break-word', // Break long words
                                    }}
                                >
                                    {"Description: " + (list.description.length > 30 ? list.description.substring(0, 30) + '...' : list.description)}
                                </Typography>
                                <Typography sx={{ fontFamily: 'SFProRegular', color: supportTextColor, fontSize: '18px' }}>
                                    {list.cocktails.length} Cocktails
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 8, flexDirection: 'row' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => openDialog(list)}
                                    size="small"
                                    sx={{ mr: 2 }} // Add margin to the right
                                >
                                    Modify List
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDeleteList(list.name)}
                                    size="small"
                                >
                                    Delete List
                                </Button>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            {list.cocktails.map((cocktail) => (
                                <Box key={cocktail.Cocktail_ID} sx={{ position: 'relative', marginBottom: 2 }}>
                                    <CocktailCard
                                        id={cocktail.Cocktail_ID}
                                        image={cocktail.Image_url}
                                        name={cocktail.Cocktail_Name}
                                        strength={cocktail.Strength}
                                        level={cocktail.Difficulty_Level}
                                        flavor={cocktail.Main_Flavor}
                                    />

                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        startIcon={<DeleteForeverIcon />}
                                        onClick={() => handleRemoveCocktail(list.name, cocktail.Cocktail_ID)}
                                        sx={{ position: 'absolute', top: 0, right: 0 }}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ))
            ) : (
                <>
                    <h2>No Lists Yet</h2>
                </>
            )}

            <ModifyListDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                listName={listName}
                listDescription={listDescription}
                onNameChange={(e) => setListName(e.target.value)}
                onDescriptionChange={(e) => setListDescription(e.target.value)}
                onModifyList={handleModifyList}
            />

            <RemoveCocktailDialog
                open={removeCocktailDialogOpen}
                onClose={() => setRemoveCocktailDialogOpen(false)}
                onConfirmRemoveCocktail={confirmRemoveCocktail}
            />

            <DeleteListDialog
                open={confirmationDialogOpen}
                onClose={() => setConfirmationDialogOpen(false)}
                listName={listName}
                onConfirmDeleteList={confirmDeleteList}
            />

            <CreateListModal
                isOpen={addToListModalOpen}
                onClose={() => setAddToListModalOpen(false)}
                cocktailID={null}
            />
        </Box>
    );

}

export default ListsPage;
