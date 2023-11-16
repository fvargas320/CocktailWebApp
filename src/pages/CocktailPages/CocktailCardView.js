import { useNavigate, useParams } from "react-router-dom";
import cocktailData from "../../data/cocktail_list.json"; // Adjust the path if necessary
import Checkbox from '@mui/material/Checkbox';
import React, {useState} from "react";
import {IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ReviewsSection from "../../components/Reviews/ReviewsSection";
import Ingredients from "../../components/Cocktail/Ingredients";
import CocktailButtons from "../../components/Cocktail/CocktailButtons";
import Preparation from "../../components/Cocktail/Preparation";
function CocktailCardView(props, { onClose }) {
    let { id } = useParams();
    let navigate = useNavigate();

    const cocktail = getCocktailById(id); // Fetch cocktail based on ID
    console.log(cocktail);
    const [checkedState, setCheckedState] = useState(new Array(cocktail.preparation.length).fill(false));

    const handleCheckboxChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };

    if (!cocktail) {
        return <div>Cocktail not found</div>;
    }

    const handleClose = () => {
        navigate(-1); // Go back to the previous page
    };




    return (
        // Padding added to this div
        <div className="px-4 py-2 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center">
                <img className="h-80" src={cocktail.image_url} alt={`Cocktail ${cocktail.name}`} />
                <div className="flex flex-col justify-center md:ml-4 flex-grow">
                    <h2 className="text-6xl font-bold mt-4 md:mt-0">{cocktail.name}</h2>
                    <p className="text-sm text-gray-500 my-2">{cocktail.description}</p>
                </div>
                <div className="flex-none"> {/* This ensures that the buttons do not grow and have a fixed size */}
                    <CocktailButtons currentCocktail={cocktail} />
                </div>
            </div>


            <div className="flex flex-col md:flex-row md:space-x-4">
                {/* Ingredients list */}
                <Ingredients
                    ingredients={cocktail.ingredients}
                />
                {/* Preparation steps are now a separate component */}
                <Preparation steps={cocktail.preparation} />
            </div>
            <ReviewsSection user = {props.user.attributes.name}/>


            {/* Close button */}
            <div className="mt-4">
                <button className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600" onClick={handleClose}>
                    Close
                </button>
            </div>
        </div>
    );
}

function getCocktailById(id) {
    return cocktailData.find(cocktail => cocktail.Cocktail_ID === parseInt(id, 10));
}

export default CocktailCardView;
