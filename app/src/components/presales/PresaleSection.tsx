import React from 'react';

interface PresaleSectionProps {
    soldTokenAmount: string;
    incomeSolAmount: string;
    timeLeft: string;
}

const PresaleSection: React.FC<PresaleSectionProps> = ({ soldTokenAmount, incomeSolAmount, timeLeft }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 m-4">
            <h2 className="text-2xl font-bold mb-4">Current Presale Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <h3 className="text-lg font-semibold">Sold Token Amount</h3>
                    <p className="text-xl">{soldTokenAmount} TMONK</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Income SOL Amount</h3>
                    <p className="text-xl">{incomeSolAmount} SOL</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Time Left</h3>
                    <p className="text-xl">{timeLeft}</p>
                </div>
            </div>
        </div>
    );
};

export default PresaleSection;