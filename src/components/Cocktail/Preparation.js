import React from "react";

function Preparation({ steps }) {
    return (
        <div className="md:w-1/2 space-y-2 mt-6 md:mt-0">
            <h3 className="font-medium text-lg " style={{ color: '#000000', fontFamily: 'SFProRegular', fontSize:"40px" }}>Preparation</h3>
            <div className="space-y-2">
                {steps.map((step, index) => (
                    <div key={index} className="border border-gray-400 rounded py-4 px-4">
                        <span className="font-bold text-lg" style={{ color: '#FF2D55', fontFamily: 'SFProRegular' }}>
                            {index + 1}.
                        </span>
                        <span className="ml-2">
                            {step.step}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Preparation;
