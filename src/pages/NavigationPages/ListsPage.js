import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import { getAllListsAndCocktails } from "../../utils/ListsLogic";
import CocktailCard from "../../components/Cocktail/CocktailCard";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {useNavigate} from "react-router-dom"; // Assume this is your API call

function ListsPage() {
    const [lists, setLists] = useState([]);
    console.log(lists)

    useEffect(() => {
        getAllListsAndCocktails("1")
            .then(data => setLists(data))
            .catch(error => console.error('Error fetching lists and cocktails:', error));
    }, []);

    console.log("HERE")

    // Define the default and hover colors
    const defaultColor = '#000000';
    const supportTextColor = '#8A8A8D';
    // Define the default and hover colors
    const hoverColor = '#758bd2';

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

    return (
        <Box sx={{ p: 4 }}>
            {lists.length > 0 ? (
                lists.map((list, index) => (
                    <Box key={index}>

                        <Box
                            sx={{
                                padding: '0 16px', // Standard-sized padding on left and right
                                display: 'flex',
                                justifyContent: 'space-between', // Align items on the left and right edges
                                mb: 2
                            }}
                        >
                            <Box>
                                <Button
                                    variant="text"
                                    color="success"
                                    style={buttonStyles}
                                    onClick={ () => console.log("Navigate to view all page")}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = hoverColor;
                                        e.currentTarget.querySelector('svg').style.fill = hoverColor;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = defaultColor;
                                        e.currentTarget.querySelector('svg').style.fill = defaultColor;
                                    }}
                                    disableRipple // Disable the ripple effect
                                >{list.name}
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
                                    onClick={() => console.log("HI")}
                                    size="small"
                                    sx={{ mr: 2 }} // Add margin to the right of the first button
                                >
                                    Modify List
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => console.log("HI")}
                                    size="small"
                                >
                                    Delete List
                                </Button>
                            </Box>


                        </Box>





                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {list.cocktails.map(cocktail => (
                                <CocktailCard
                                    key={cocktail.Cocktail_ID}
                                    id={cocktail.Cocktail_ID}
                                    image={cocktail.Image_url}
                                    name={cocktail.Cocktail_Name}
                                    strength={cocktail.Strength}
                                    level={cocktail.Difficulty_Level}
                                    flavor={cocktail.Main_Flavor}
                                />
                            ))}
                        </Box>
                    </Box>
                ))
            ) : (
                <h2>No Lists Yet</h2>
            )}
        </Box>
    );

}

export default ListsPage;
