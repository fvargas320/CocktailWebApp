import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cocktail(props) {
    let navigate = useNavigate();
    const navigateToCocktailCard = () => {
        navigate(`/cocktail/${props.id}`);
    };

    return (
        <div onClick={navigateToCocktailCard}>
            <div className="bg-white rounded-lg shadow-md p-2 m-1">
                <img className="block mx-auto h-40 w-40 rounded-sm sm:mx-0 sm:shrink-0" src={props.image} alt={props.name} />
                <p style={{ fontFamily: 'SFProRegular', color: "#000000", fontSize: "16px"}}>{props.name}</p>
                <p style={{ fontFamily: 'SFProRegular', color: "#8A8A8D", fontSize: "12px"}}>{props.flavor} Flavor</p>
            </div>
        </div>
    );
}

export default Cocktail;




