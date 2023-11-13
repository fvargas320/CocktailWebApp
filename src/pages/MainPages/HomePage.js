import React from 'react';
import Cocktail from "../CocktailPages/Cocktail";
import cocktailData from "../../data/cocktail_list.json"; // Adjust the path if necessary

const HomePage = () => {
    return (
        <div>
            <h2 style={{ fontFamily: 'SFProRegular', color: "#000000", fontSize: "32px"}}>Popular Cocktails</h2>
            <div className="flex flex-wrap">
                {cocktailData.map((cocktail) => {
                    return (
                        <Cocktail
                            image={cocktail.image_url}
                            key={cocktail.key}
                            name={cocktail.name}
                            strength={cocktail.strength}
                            level={cocktail.difficulty_level}
                            flavor = {cocktail.main_flavor}
                        />
                    );
                })}

            </div>
        </div>
    );
};

export default HomePage;
