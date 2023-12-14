import React from 'react';

import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export function HomePageSkeletalList() {
    return (
        <>
            <Skeleton variant="text" width={450} sx={{ fontSize: '1rem', justifyContent: 'center', paddingLeft: '10px' }} />
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    paddingLeft: '10px', // Add left padding to the Box
                }}
            >
                {Array.from(new Array(10)).map((_, index) => (
                    <Box
                        key={index}
                        sx={{
                            flex: '0 0 calc(20% - 20px)', // Default: 4 cocktails per row with a 10px gap
                            maxWidth: 'calc(25% - 20px)',
                            marginBottom: '20px',
                            '@media (max-width: 1200px)': { // For medium screens
                                flex: '0 0 calc(33.33% - 20px)',
                                maxWidth: 'calc(33.33% - 20px)',
                            },
                            '@media (max-width: 900px)': { // For small screens
                                flex: '0 0 calc(50% - 20px)',
                                maxWidth: 'calc(50% - 20px)',
                            },
                            '@media (max-width: 600px)': { // For extra small screens
                                flex: '0 0 calc(50% - 20px)', // 2 cocktails per row
                                maxWidth: 'calc(50% - 20px)',
                            },
                        }}
                    >
                        <Skeleton
                            animation="wave"
                            variant="rectangular"
                            width={250}
                            height={300}
                        />
                    </Box>
                ))}
            </Box>

        </>

    );
}