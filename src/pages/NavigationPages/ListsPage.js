import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import { getAllListsAndCocktails, modifyList, removeList } from "../../utils/ListsLogic";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { removeCocktailFromList } from "../../utils/ListsLogic";
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
import {getAuth} from "firebase/auth";

function ListsPage() {
    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false); // State for modify list dialog
    const [listName, setListName] = useState(''); // State for list name
    const [listDescription, setListDescription] = useState(''); // State for list description
    const [listToModify, setListToModify] = useState(null); // State for the list to modify
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false); // State for delete list confirmation dialog
    const [cocktailToRemove, setCocktailToRemove] = useState(null); // State to store cocktail to remove
    const [removeCocktailDialogOpen, setRemoveCocktailDialogOpen] = useState(false); // State for remove cocktail confirmation dialog

    const navigate = useNavigate();

    const auth = getAuth();
    const userId = auth.currentUser.uid
    console.log(userId)

    useEffect(() => {
        getAllListsAndCocktails(userId)
            .then(data => {
                setLists(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching lists and cocktails:', error);
                setIsLoading(false);
            });
    }, []);

// Access custom styles and colors
    const defaultColor = theme.customStyles.defaultColor;
    const supportTextColor = theme.customStyles.supportTextColor;
    const hoverColor = theme.customStyles.hoverColor;


    const buttonStyles = {
        fontFamily: 'SFProRegular',
        fontSize: '24px',
        fontWeight: 'bold',
        transition: 'color 0.3s',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        color: defaultColor,
    };

    const handleDeleteList = (listName) => {
        // Show the delete list confirmation dialog
        setListName(listName);
        setConfirmationDialogOpen(true);
    };

    const confirmDeleteList = async () => {
        try {
            
            await removeList(userId, listName);
            setLists((prevLists) => prevLists.filter((list) => list.name !== listName));
            console.log(`List "${listName}" deleted successfully.`);
            window.location.reload();
            setConfirmationDialogOpen(false); // Close the delete list confirmation dialog
        } catch (error) {
            console.error('Error deleting list:', error);
        }
    };

    const handleModifyList = async () => {
        try {
            
            const isModified = await modifyList(userId, listToModify.name, listName, listDescription);

            if (isModified) {
                // Update the state to reflect the changes
                setLists((prevLists) =>
                    prevLists.map((list) =>
                        list.name === listToModify.name ? { ...list, name: listName, description: listDescription } : list
                    )
                );

                console.log(`List "${listToModify.name}" modified successfully.`);
                setDialogOpen(false); // Close the modify list dialog after modification
            } else {
                console.log(`List "${listToModify.name}" does not exist.`);
            }
        } catch (error) {
            console.error('Error modifying list:', error);
        }
    };

    const handleRemoveCocktail = (listName, cocktailId) => {
        // Show the remove cocktail confirmation dialog
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
                            ? {
                                ...list,
                                cocktails: list.cocktails.filter(
                                    (cocktail) => cocktail.Cocktail_ID !== cocktailToRemove.cocktailId
                                ),
                            }
                            : list
                    )
                );
                console.log(`Cocktail with ID "${cocktailToRemove.cocktailId}" removed from list.`);
            }
            setRemoveCocktailDialogOpen(false); // Close the remove cocktail confirmation dialog
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
        <Box sx={{ p: 4 }}>
            {isLoading ? (
                <SkeletalList/>

            ) : (
                lists.length > 0 ? (
                    lists.map((list, index) => (
                        <Box key={index}>
                            <Box
                                sx={{
                                    padding: '0 16px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    mb: 2
                                }}
                            >
                                <Box>
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
                                    <Typography sx={{ fontFamily: 'SFProRegular', fontSize: '18px', color: supportTextColor }}>
                                        {"Description: " + list.description}
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'SFProRegular', color: supportTextColor, fontSize: '18px' }}>
                                        {list.cocktails.length} Cocktails
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 8 }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => openDialog(list)} // Open the modify list dialog for editing
                                        size="small"
                                        sx={{ mr: 2 }}
                                    >
                                        Modify List
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleDeleteList(list.name)}
                                        size="small"
                                    >
                                        Delete List
                                    </Button>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                {list.cocktails.map((cocktail) => (
                                    <Box key={cocktail.Cocktail_ID} sx={{ position: 'relative' }}>
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
                    <h2>No Lists Yet</h2>
                )
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
                displayText={"Are you sure you want to remove this cocktail from this list?\n"}

            />

            <DeleteListDialog
                open={confirmationDialogOpen}
                onClose={() => setConfirmationDialogOpen(false)}
                listName={listName}
                onConfirmDeleteList={confirmDeleteList}
            />

            <Divider className="py-8">
                <Chip label="No More Lists" />
            </Divider>
        </Box>
    );
}

export default ListsPage;
