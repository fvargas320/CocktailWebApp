import React, { useState } from 'react';
import Box from '@mui/material/Box';
import default_image from '../../images/missing.png';
import { useNavigate } from 'react-router-dom';

function CocktailCard(props) {
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(props.image);
    const [isHovered, setIsHovered] = useState(false);

    const navigateToCocktailCard = () => {
        navigate(`/cocktail/${props.id}`);
    };

    const handleImageError = () => {
        setImageSrc(default_image); // Set the image source to the default image
    };

    const cardStyles = {
        cursor: 'pointer',
        transition: 'transform 0.2s, boxShadow 0.2s',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)', // Apply scaling on hover
        boxShadow: isHovered ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none', // Add shadow on hover
        backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)', // Slight tint on hover
    };

    return (
        <Box
            className="bg-white rounded-xl shadow-lg p-4 m-2"
            sx={{ height: '300px', width: '250px', ...cardStyles }}
            onClick={navigateToCocktailCard}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                className="block mx-auto h-68 rounded sm:mx-0 sm:shrink-0"
                src={imageSrc}
                alt={props.name}
                onError={handleImageError}
            />
            <p
                style={{
                    fontFamily: 'SFProRegular',
                    color: '#000000',
                    fontSize: '20px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                }}
            >
                {props.name}
            </p>
            <p style={{ fontFamily: 'SFProRegular', color: '#8A8A8D', fontSize: '16px' }}>
                {props.flavor} Flavor
            </p>
        </Box>
    );
}

export default CocktailCard;
