import { useNavigate, useParams } from "react-router-dom";
import cocktailData from "../../data/cocktail_list.json"; // Adjust the path if necessary
import Checkbox from '@mui/material/Checkbox';
import {useState} from "react";
import {IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
function CocktailCardView({ onClose }) {
    let { id } = useParams();
    let navigate = useNavigate();

    const cocktail = getCocktailById(id); // Fetch cocktail based on ID

    const [checkedState, setCheckedState] = useState(new Array(cocktail.preparation.length).fill(false));
    const [portionCount, setPortionCount] = useState(1);

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


    const handleIncrement = () => {
        setPortionCount((prevCount) => (prevCount < 10 ? prevCount + 1 : prevCount));
    };

    const handleDecrement = () => {
        setPortionCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
    };


    return (
        // Padding added to this div
        <div className="px-4 py-2 md:px-8">
            <div className="flex flex-col md:flex-row">
                <img className="h-80" src={cocktail.image_url} alt={`Cocktail ${cocktail.name}`} />
                <div className="flex flex-col justify-center md:ml-4">
                    <h2 className="text-6xl font-bold mt-4 md:mt-0">{cocktail.name}</h2>
                    <p className="text-sm text-gray-500 my-2">{cocktail.description}</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
                {/* Ingredients list */}
                <div>
                    <h3 className="font-medium text-lg " style={{ color: '#000000', fontFamily: 'SFProRegular', fontSize:"40px" }}>Ingredients</h3>
                    <div className="space-y-2">
                        {cocktail.ingredients.map((ingredient, index) => (
                            <div key={index} className="border border-gray-400 rounded p-4 flex items-center">
                                <span className="font-bold mr-2">{ingredient.amount}</span> of {ingredient.ingredient}
                            </div>
                        ))}
                    </div>
                    {/* Portions counter */}
                    <div className="border border-gray-400 rounded p-4 flex items-center justify-between">
                        <h3 className="font-medium text-lg">Portions</h3>
                        <div className="flex items-center">
                            <IconButton onClick={handleDecrement} disabled={portionCount === 1} size="small">
                                <RemoveIcon fontSize="inherit" />
                            </IconButton>
                            <span className="mx-2">{portionCount}</span>
                            <IconButton onClick={handleIncrement} disabled={portionCount === 10} size="small">
                                <AddIcon fontSize="inherit" />
                            </IconButton>
                        </div>
                    </div>
                </div>

                {/* Preparation steps */}
                <div className="md:w-1/2 space-y-2 mt-6 md:mt-0">
                    <h3 className="font-medium text-lg " style={{ color: '#000000', fontFamily: 'SFProRegular', fontSize:"40px" }}>Preparation</h3>
                    <div className="space-y-2">
                        {cocktail.preparation.map((step, index) => (
                            <div key={index} className="border border-gray-400 rounded py-4 px-4 flex justify-between items-center">
                                <span className="font-bold text-lg" style={{ color: '#FF2D55', fontFamily: 'SFProRegular' }}>
                                    {index + 1}.
                                </span>
                                <span className="ml-2" style={{
                                    textDecoration: checkedState[index] ? 'line-through' : 'none',
                                    color: checkedState[index] ? '#D3D3D3' : 'inherit'
                                }}>
                                    {step.step}
                                </span>
                                <Checkbox
                                    checked={checkedState[index]}
                                    onChange={() => handleCheckboxChange(index)}
                                    sx={{
                                        color: "#ec1742",
                                        '&.Mui-checked': {
                                            color: "#FF2D55",
                                        },
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

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
