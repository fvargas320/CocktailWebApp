import React from 'react';
import {useNavigate} from 'react-router-dom';
import Box from "@mui/material/Box";

function Cocktail(props) {
    let navigate = useNavigate();
    const navigateToCocktailCard = () => {
        navigate(`/cocktail/${props.id}`);
    };

    return (
        <Box className="bg-white rounded-xl shadow-lg p-4 m-2" sx={{ height: "300px",  width: "250px"}} onClick={navigateToCocktailCard}>
                <img className="block mx-auto h-68 rounded sm:mx-0 sm:shrink-0" src={props.image} alt={props.name} />
                <p style={{
                    fontFamily: 'SFProRegular',
                    color: "#000000",
                    fontSize: "20px",
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                }}>
                    {props.name}
                </p>
                <p style={{ fontFamily: 'SFProRegular', color: "#8A8A8D", fontSize: "16px"}}>{props.flavor} Flavor</p>
        </Box>
    );
}

export default Cocktail;



