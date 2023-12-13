import React, {useState} from 'react';
import algoliasearch from 'algoliasearch/lite';
import { Hits, InstantSearch, SearchBox, Pagination } from 'react-instantsearch';
import CocktailCard from '../../components/Cocktail/CocktailCard';
import Box from '@mui/material/Box';  // Import Box from Material-UI
import 'instantsearch.css/themes/satellite.css';

const searchClient = algoliasearch(
    'JU5G9QN5IC',
    '5312903f128979f46c5bb4948bbda094'
);

let cocktailArray = []
const Discover = () => {
    // Inline CSS for the cocktail list
    const cocktailListStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '20px'  // Added some margin to the top for spacing
    };




    return (
        <InstantSearch searchClient={searchClient} indexName="newCocktails">
            <h1>Discover Cocktails</h1>

            <SearchBox placeholder="Search for cocktails" />

            {/* Apply the cocktailListStyle to this div */}
            <div style={cocktailListStyle}>
                <Hits hitComponent={HitItem} />
            </div>

            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <Pagination />
            </Box>
        </InstantSearch>
    );
};


const HitItem = ({ hit }) => {
    // Extract relevant data from the hit and pass it to CocktailCard
    const cocktailData = {
        id: hit.Cocktail_ID,
        image: hit.Image_url,
        name: hit.Cocktail_Name,
        strength: hit.Strength,
        level: hit.Difficulty_Level,
        flavor: hit.Main_Flavor,
    };

    console.log("HIT")
    console.log(hit )
    console.log("cocktail Data")

    console.log(cocktailData)

    return (
            <CocktailCard {...cocktailData} />
   );
};

export default Discover;
