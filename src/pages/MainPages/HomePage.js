import React from 'react';
import { FixedSizeList } from 'react-window';

import Cocktail from "../../components/Cocktail/Cocktail";
import cocktailData from "../../data/cocktail_list.json";

const Row = ({ index, style }) => {
    const cocktail = cocktailData[index];

    return (
        <div style={style}>
            <Cocktail
                id={cocktail.Cocktail_ID}
                image={cocktail.image_url}
                name={cocktail.name}
                strength={cocktail.strength}
                level={cocktail.difficulty_level}
                flavor={cocktail.main_flavor}
            />
        </div>
    );
};

const ClickableTitle = ({ onClick, children }) => (
    <h2
        style={{
            fontFamily: 'SFProRegular',
            color: "#000000",
            fontSize: "32px",
            cursor: 'pointer', // Add cursor pointer to indicate it's clickable
            display: 'flex',
            alignItems: 'center',
            marginRight: '16px', // Add margin for spacing
            transition: 'color 0.3s', // Add transition for smooth color change
        }}
        onClick={onClick}
        onMouseEnter={(e) => e.target.style.color = '#007BFF'} // Change color on hover
        onMouseLeave={(e) => e.target.style.color = '#000000'} // Revert color on mouse leave
    >
        {children}
    </h2>
);

const HomePage = () => {
    return (
        <div>
            {/* Popular Cocktails Section */}
            <ClickableTitle
                onClick={() => {
                    // Handle the click event, e.g., navigate to the full list
                    console.log('Clicked Popular Cocktails');
                }}
            >
                Popular Cocktails
            </ClickableTitle>

            {/* Popular Cocktails List */}
            <FixedSizeList
                height={225}
                width={1500} // Adjust the width to your desired size
                itemSize={250}
                itemCount={cocktailData.length}
                itemData={cocktailData}
                layout="horizontal"
            >
                {Row}
            </FixedSizeList>

            {/* Fruity Cocktails Section */}
            <ClickableTitle
                onClick={() => {
                    // Handle the click event, e.g., navigate to the full list
                    console.log('Clicked Fruity Cocktails');
                }}
            >
                Fruity Cocktails
            </ClickableTitle>

            {/* Fruity Cocktails List */}
            <FixedSizeList
                height={225}
                width={1500} // Adjust the width to your desired size
                itemSize={250}
                itemCount={cocktailData.length}
                itemData={cocktailData}
                layout="horizontal"
            >
                {Row}
            </FixedSizeList>
        </div>
    );
};

export default HomePage;
