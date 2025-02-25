import React from 'react';
import { PresaleStatus } from './presaleStatus';

interface PresaleRoundProps {
    roundNumber: number;
    tokenAmount: number | undefined;
    price: string;
    status: PresaleStatus;
    currentPresaleNumber: number;
    presaleIdentifier: number;
    soldAmount?: number;
}

const PresaleRound: React.FC<PresaleRoundProps> = ({
    roundNumber,
    status,
    tokenAmount,
    price,
    currentPresaleNumber,
    presaleIdentifier,
    soldAmount = 0
}) => {
    const getStatusColor = () => {
        if (roundNumber === currentPresaleNumber) {
            switch (status) {
                case PresaleStatus.PRESALE_SOON:
                    return "bg-blue-600";
                case PresaleStatus.PRESALE_ACTIVE:
                    return "animate-background-fade";
                case PresaleStatus.PRESALE_PAST:
                    return "bg-green-600";
                default:
                    return "bg-blue-600";
            }
        } else if (roundNumber < currentPresaleNumber) {
            return "bg-green-600";
        } else {
            return "bg-blue-600";
        }
    };

    const getStatusText = () => {
        if (roundNumber === currentPresaleNumber) {
            switch (status) {
                case PresaleStatus.PRESALE_SOON:
                    return "SOON";
                case PresaleStatus.PRESALE_ACTIVE:
                    return "ACTIVE";
                case PresaleStatus.PRESALE_PAST:
                    return "COMPLETED";
                default:
                    return "COMING SOON";
            }
        } else if (roundNumber < currentPresaleNumber) {
            return "COMPLETED";
        } else {
            return "COMING SOON";
        }
    };

    const formatTokenAmount = (amount: number | undefined) => {
        if (amount === undefined || isNaN(amount)) return '0';
        return amount.toLocaleString();
    };

    return (
        <div className={`flex flex-col justify-between w-full px-1 py-1 rounded ${getStatusColor()}`}>
            <div className="flex flex-col items-center justify-between">
                <div className="font-bold text-white whitespace-nowrap">ROUND - {roundNumber}</div>
                <div className="text-xs leading-tight text-white whitespace-nowrap">{getStatusText()}</div>
            </div>
            <div className="leading-tight text-yellow-300 whitespace-nowrap">
                <span className="hidden md:inline">{formatTokenAmount(soldAmount)} / </span>
                {formatTokenAmount(tokenAmount)}
            </div>
            <div className="leading-tight text-white whitespace-nowrap">Price: ${price}</div>
        </div>
    );
};

export default PresaleRound;

