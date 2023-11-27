import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import Cocktail from "../../components/Cocktail/Cocktail";
import db from "../../firebase"; // Ensure this is the correct path to your firebase config

const HomePage = () => {
    const [firstCollection, setFirstCollection] = useState([]);
    const [secondCollection, setSecondCollection] = useState([]);
    const [thirdCollection, setThirdCollection] = useState([]);

    useEffect(() => {
        const fetchCocktails = async (setQuery, category, resultsLimit) => {
            const cocktailsRef = collection(db, "newCocktails");
            const q = query(cocktailsRef, where("Categories", "==", category), limit(resultsLimit));

            const querySnapshot = await getDocs(q);
            const fetchedCocktails = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setQuery(fetchedCocktails);
        };

        fetchCocktails(setFirstCollection, "Strawberry Cocktails & Recipes", 8);
        fetchCocktails(setSecondCollection, "Light & Skinny", 8);
        fetchCocktails(setThirdCollection, "Quick & Easy Cocktails", 8);
    }, []);

    const renderCocktails = (title, cocktails) => (
        <>
            <h3 style={{ fontFamily: 'SFProRegular', color: "#000000", fontSize: "32px" }}>{title}</h3>
            <div className="flex flex-wrap">
                {cocktails.map((cocktail) => (
                    <Cocktail
                        id={cocktail.Cocktail_ID}
                        image={cocktail.Image_url}
                        key={cocktail.Cocktail_ID}
                        name={cocktail.Cocktail_Name}
                        strength={cocktail.Strength}
                        level={cocktail.Difficulty_Level}
                        flavor={cocktail.Main_Flavor}
                    />
                ))}
            </div>
        </>
    );

    return (
        <div>
            {renderCocktails("Strawberry Cocktails & Recipes", firstCollection)}
            {renderCocktails("Light & Skinny Cocktails", secondCollection)}
            {renderCocktails("Quick & Easy Cocktails", thirdCollection)}
        </div>
    );
};

export default HomePage;
