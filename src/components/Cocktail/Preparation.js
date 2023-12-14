import React from "react";
import Typography from "@mui/material/Typography";

function Preparation({ steps }) {
    return (
        <div className=" space-y-4 mt-6 md:mt-0">
            <Typography sx={{ fontFamily: 'SFProRegular', fontSize: '24px', fontWeight: 'bold', paddingTop:'1.5rem'}}> Preperation </Typography>
            <div className="space-y-4">
                {steps.map((step, index) => (
                    <div key={index} className="border border-gray-400 rounded p-4">
                        <span className="font-bold text-lg" style={{ color: '#FF2D55', fontFamily: 'SFProRegular' }}>
                            {index + 1}.
                        </span>
                        <span className="ml-2 text-lg" style={{ color: '#000000', fontFamily: 'SFProRegular', fontSize: '20px',
                        }}>
                            {step} {/* Directly using the step string */}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Preparation;
