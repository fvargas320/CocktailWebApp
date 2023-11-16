import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Ingredients({ ingredients }) {
    const [portionCount, setPortionCount] = useState(1);
    const [modifiedIngredients, setModifiedIngredients] = useState([...ingredients]);
    const [checkedState, setCheckedState] = useState(
        new Array(ingredients.length).fill(false)
    );

    const handleIncrement = () => {
        setPortionCount((prevCount) => (prevCount < 10 ? prevCount + 1 : prevCount));
    };

    const handleDecrement = () => {
        setPortionCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
    };

    useEffect(() => {
        // Update the modified ingredients when portionCount changes
        const updatedIngredients = ingredients.map((ingredient) => ({
            ...ingredient,
            amount: (parseFloat(ingredient.amount) * portionCount).toString(),
        }));
        setModifiedIngredients(updatedIngredients);
    }, [portionCount, ingredients]);

    const handleCheckboxChange = (index) => {
        const updatedCheckedState = checkedState.map((item, idx) =>
            idx === index ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };

    return (
        <div>
            <h3 className="font-medium text-lg " style={{ color: '#000000', fontFamily: 'SFProRegular', fontSize: "40px" }}>Ingredients</h3>
            <div className="space-y-2">
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
                {modifiedIngredients.map((ingredient, index) => (
                    <div key={index} className="border border-gray-400 rounded p-4 flex justify-between items-center">
                        <span className="font-bold mr-2">{ingredient.amount} {ingredient.measurement}</span> of {ingredient.ingredient}
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
    );
}

export default Ingredients;
