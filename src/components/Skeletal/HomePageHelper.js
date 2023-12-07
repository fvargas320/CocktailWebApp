import React from 'react';

import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";




export function HomePageSkeletalList() {
    return (
        <>
            <Skeleton variant="text" width={450} sx={{ fontSize: '1rem' }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {Array.from(new Array(5)).map((_, index) => (
                    <Box key={index} sx={{ mr: 4, mb: 2 }}>
                        <Skeleton
                            animation="wave"
                            variant="rectangular"
                            width={250}
                            height={300}
                        />
                    </Box>
                ))}
            </Box>
            <Skeleton variant="text" width={450} sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" width={350} sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" width={250} sx={{ fontSize: '1rem' }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {Array.from(new Array(4)).map((_, index) => (
                    <Box key={index} sx={{ mr: 2, mb: 2 }}>
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