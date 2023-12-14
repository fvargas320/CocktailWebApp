import React, { useState, useEffect } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
    InstantSearch,
    SearchBox,
    Pagination,
    useHits,
    RefinementList,
} from 'react-instantsearch';
import CocktailCard from '../../components/Cocktail/CocktailCard';
import Box from '@mui/material/Box';
import 'instantsearch.css/themes/satellite.css';

const searchClient = algoliasearch(
    'JU5G9QN5IC',
    '5312903f128979f46c5bb4948bbda094'
);

const Discover = () => {
    const [showFilters, setShowFilters] = useState(false);

    function StructuredResults() {
        const { hits } = useHits();
        console.log(hits);

        const flexContainerStyle = {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '18px',
            justifyContent: 'center'
        };

        return (
            <div style={flexContainerStyle}>
                {hits.map((cocktail) => (
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
            </div>
        );
    }

    return (
        <div>
            <InstantSearch searchClient={searchClient} indexName="newCocktails">
                <Box sx={{ justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
                    <h1>Discover Cocktails</h1>
                    <h2>Search our entire database with keywords or filters!</h2>
                </Box>

                <div style={{ display: 'flex' }}>
                    {showFilters && (
                        <>
                            <div style={{ flex: 1, paddingLeft: '10px', maxWidth: '33%' }}>
                                <div style={{ padding: '10px' }}>
                                    <h2>Alcohols</h2>
                                    <RefinementList limit={5} showMore={true} attribute="Alcohols" />
                                    <h2>Color</h2>
                                    <RefinementList limit={5} showMore={true} attribute="Color" />
                                </div>
                            </div>
                            <div style={{ flex: 1, paddingLeft: '10px', maxWidth: '33%' }}>
                                <div style={{ padding: '10px' }}>
                                    <h2>Flavors</h2>
                                    <RefinementList limit={5} showMore={true} attribute="Detailed_Flavors" />
                                    <h2>Strength</h2>
                                    <RefinementList limit={5} showMore={true} attribute="Strength" />
                                </div>
                            </div>
                            <div style={{ flex: 1, paddingLeft: '10px', maxWidth: '33%' }}>
                                <div style={{ padding: '10px' }}>
                                    <h2>Categories</h2>
                                    <RefinementList limit={5} showMore={true} attribute="Categories" />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        style={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            padding: '10px 15px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginBottom: '10px',
                        }}
                    >
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>
                    <SearchBox placeholder="Search for cocktails" style={{ width: '85%' }} />
                    <StructuredResults />
                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                        <Pagination />
                    </Box>
                </div>
            </InstantSearch>
        </div>
    );
};

export default Discover;
