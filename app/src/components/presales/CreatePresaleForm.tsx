'use client'

import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedButton from '../animated/AnimatedButton'
import AnimatedOnViewTitleMd from '../animated/AnimatedOnViewTitleMd'
import usePresale from '../../hooks/usePresale'
import InputGroup from './InputGroup'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { BN } from '@project-serum/anchor'

export default function CreatePresaleForm() {
    const router = useRouter()
    const { createAndStartPresale, presaleIdentifier, setCurrentPresaleInDB, setPresaleIdentifier, depositToken, publicKey, presaleInfo, TmonkMintAuthority, fetchPresaleInfo, setTmonkMintAuthority } = usePresale()
    const [presaleTokenAddress, setPresaleTokenAddress] = useState(TmonkMintAuthority)
    const [amountOfTokensForPresale, setAmountOfTokensForPresale] = useState(0)
    const [maxTokenAmountPerAddress, setMaxTokensPerWallet] = useState(0)
    const [pricePerToken, setPrice] = useState(0)
    const [minTokenAmountPerAddress, setMinBuy] = useState(0)
    const [hardcapDollar, setHardcapDollar] = useState(0)
    const [softcapDollar, setSoftcapDollar] = useState(0)
    const [hardcapAmount, setHardcap] = useState(0)
    const [softcapAmount, setSoftcap] = useState(0)
    const [presaleStartTime, setPresaleStartTime] = useState(new Date())
    const [presaleEndTime, setPresaleEndTime] = useState(new Date())
    const [error, setError] = useState("")
    const [showDepositDialog, setShowDepositDialog] = useState(false)
    const [depositAmount, setDepositAmount] = useState(0)
    const [showTmonkAuthDialog, setShowTmonkAuthDialog] = useState(false)
    const [newTmonkAuth, setNewTmonkAuth] = useState('')
    const [decimals, setDecimals] = useState(6);
    const [maxSolAmountPerAddress, setMaxSolAmountPerAddress] = useState(0)
    const [minSolAmountPerAddress, setMinSolAmountPerAddress] = useState(0)
    const [solPrice, setSolPrice] = useState(0)

    useEffect(() => {
        setPresaleTokenAddress(TmonkMintAuthority)
    }, [TmonkMintAuthority])

    useEffect(() => {
        const fetchSolPrice = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
                );
                setSolPrice(response.data.solana.usd);
            } catch (error) {
                console.error('Error fetching SOL price:', error);
                toast.error('Failed to fetch SOL price');
            }
        };
        fetchSolPrice();
    }, []);

    useEffect(() => {
        if (hardcapDollar && pricePerToken) {
            const calculatedHardcap = Math.floor(hardcapDollar / pricePerToken);
            setHardcap(calculatedHardcap)
            setAmountOfTokensForPresale(calculatedHardcap)
        }
        if (softcapDollar && pricePerToken) {
            const calculatedSoftcap = Math.floor(softcapDollar / pricePerToken);
            setSoftcap(calculatedSoftcap)
        }
        if (solPrice && maxSolAmountPerAddress) {
            const dollarAmount = maxSolAmountPerAddress * solPrice;
            const tokenAmount = Math.floor(dollarAmount / pricePerToken);
            setMaxTokensPerWallet(tokenAmount);
        }
        if (solPrice && minSolAmountPerAddress) {
            const dollarAmount = minSolAmountPerAddress * solPrice;
            const tokenAmount = Math.floor(dollarAmount / pricePerToken);
            setMinBuy(tokenAmount);
        }
    }, [hardcapDollar, softcapDollar, pricePerToken, solPrice, maxSolAmountPerAddress, minSolAmountPerAddress])

    const handlePresaleTokenAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPresaleTokenAddress(e.target.value)
    }

    const handleMaxTokensPerWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxTokensPerWallet(Number(e.target.value))
    }

    const handleMinTokensPerWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinBuy(Number(e.target.value))
    }

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value)
        if (isNaN(value) || value <= 0) {
            setError("Price must be a positive number")
        } else {
            setError("")
            setPrice(value)
        }
    }

    const handleHardCapDollar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        setHardcapDollar(value)
        if (pricePerToken > 0) {
            const calculatedHardcap =Math.floor( value / pricePerToken)
            setHardcap(calculatedHardcap)
            setAmountOfTokensForPresale(calculatedHardcap)
        }
    }

    const handleSoftCapDollar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        setSoftcapDollar(value)
        if (pricePerToken > 0) {
            const calculatedSoftcap = Math.floor(value / pricePerToken);
            setSoftcap(calculatedSoftcap)
        }
    }

    const handleSetPresaleIdentifier = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPresaleIdentifier(Number(e.target.value))
    }

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPresaleStartTime(new Date(e.target.value))
    }

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPresaleEndTime(new Date(e.target.value))
    }

    const handleDecimalsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDecimals(Number(e.target.value))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (error) {
            toast.error("Please fix the errors before submitting")
            return
        }
        try {
            const tokenMintAddress = new PublicKey(presaleTokenAddress)
            const startTimestamp = Math.floor(presaleStartTime.getTime() / 1000)
            const endTimestamp = Math.floor(presaleEndTime.getTime() / 1000)
            if (decimals > 9 || decimals < 0) {
                toast.error("Decimals must be between 0 and 9");
                return;
            }
            const result = await createAndStartPresale(
                presaleIdentifier,
                tokenMintAddress,
                softcapAmount,
                hardcapAmount,
                maxTokenAmountPerAddress,
                minTokenAmountPerAddress,
                pricePerToken,
                startTimestamp,
                endTimestamp,
                decimals
            )

            if (result.success) {
                toast.success(
                    <div>
                        <p>Presale created successfully!</p>
                        <p>Signature: {result.signature.slice(0, 3)}...{result.signature.slice(-3)}</p>
                        <p>Token Address: {tokenMintAddress.toString().slice(0, 3)}...{tokenMintAddress.toString().slice(-3)}</p>
                        <p>Soft Cap: {softcapAmount}</p>
                        <p>Hard Cap: {hardcapAmount}</p>
                        <a href={`https://solscan.io/tx/${result.signature}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            View on Solscan
                        </a>
                    </div>,
                    { duration: 20000 }
                )

                // Ask if user wants to set this as current presale
                if (window.confirm("Do you want to set this as the current presale?")) {
                    const setCurrentResult = await setCurrentPresaleInDB(presaleIdentifier)
                    if (setCurrentResult && setCurrentResult.success) {
                        toast.success("Current presale set successfully")
                        setShowDepositDialog(true)
                    } else {
                        toast.error("Failed to set current presale")
                    }
                }

                setShowDepositDialog(true)
                await fetchPresaleInfo()
            } else {
                toast.error(`Failed to create presale: ${result.error}`)
            }
        } catch (error) {
            console.error('Error creating presale:', error)
            toast.error(`Failed to create presale, other error : ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
    }

    const handleDeposit = async () => {
        try {
            const result = await depositToken(depositAmount)
            if (result.success) {
                toast.success(`Deposit successful! Signature: ${result.signature}`)
                await fetchPresaleInfo()
            } else {
                toast.error(`Deposit failed: ${result.error}`)
            }
        } catch (error) {
            console.error('Error depositing tokens:', error)
            toast.error(`Failed to deposit tokens: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
    }

    const handleSetTmonkAuth = async () => {
        try {
            await setTmonkMintAuthority(newTmonkAuth)
            toast.success('TmonkMintAuthority updated successfully')
            setShowTmonkAuthDialog(false)
        } catch (error) {
            console.error('Error updating TmonkMintAuthority:', error)
            toast.error(`Failed to update TmonkMintAuthority: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
    }

    const handleMaxSolPerWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const solAmount = Number(e.target.value);
        setMaxSolAmountPerAddress(solAmount);
        
        if (solPrice && pricePerToken) {
            const dollarAmount = solAmount * solPrice;
            const tokenAmount = Math.floor(dollarAmount / pricePerToken);
            setMaxTokensPerWallet(tokenAmount);
        }
    };

    const handleMinSolPerWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const solAmount = Number(e.target.value);
        setMinSolAmountPerAddress(solAmount);
        
        if (solPrice && pricePerToken) {
            const dollarAmount = solAmount * solPrice;
            const tokenAmount = Math.floor(dollarAmount / pricePerToken);
            setMinBuy(tokenAmount);
        }
    };

    if (presaleInfo && presaleInfo.isInitialized && presaleInfo.depositTokenAmount.gt(new BN(0))) {
        router.push('/explore')
        return null
    }

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between mb-4'>
                <AnimatedButton
                    text='Set TmonkAuth'
                    className="text-white bg-purple-600"
                    onClick={() => setShowTmonkAuthDialog(true)}
                />
                <AnimatedButton
                    text='Deposit'
                    className="text-white bg-green-600"
                    onClick={() => setShowDepositDialog(true)}
                />
            </div>
            <form onSubmit={handleSubmit}>
                <div className='flex px-3 mb-3 h-30 py-auto md:px-5 align-end mt-7'>
                    <AnimatedOnViewTitleMd text={"Create Your Presale"} className={"mx-auto self-center text-black justify-center flex text-center"} />
                </div>
                <div className='w-[90vw] align-end items-center flex flex-col bg-gray-200'>
                    <div className='flex-col items-center justify-center flex-1 transition-colors rounded-2xl'>
                        <div className='flex flex-col items-center px-3 py-2 md:p-3 md:px-5 lg:flex-row'>
                            <InputGroup value={presaleTokenAddress} onChangeFunc={handlePresaleTokenAddressChange} itemLabel="Token Address:" placeholder="Enter token address" type="text" />
                            <InputGroup value={presaleIdentifier} onChangeFunc={handleSetPresaleIdentifier} type="number" itemLabel="Presale Identifier:" placeholder="Enter presale identifier" />
                        </div>
                    </div>
                    <div className='flex-col items-center justify-center flex-1 transition-colors rounded-2xl'>
                        <div className='flex flex-col items-center px-3 py-2 md:p-3 md:px-5 lg:flex-row'>
                            <InputGroup value={hardcapDollar} onChangeFunc={handleHardCapDollar} type="number" itemLabel="HardCap (Dollar):" placeholder="Hard cap of presale in dollars" />
                            <InputGroup value={softcapDollar} onChangeFunc={handleSoftCapDollar} type="number" itemLabel="SoftCap (Dollar):" placeholder="Soft cap of presale in dollars" />
                        </div>
                    </div>
                    <div className='flex-col items-center justify-center flex-1 transition-colors rounded-2xl'>
                        <div className='flex flex-col items-center px-3 py-2 md:p-3 md:px-5 lg:flex-row'>
                            <InputGroup value={hardcapAmount} onChangeFunc={() => { }} type="number" itemLabel="Hard Cap (Tokens):" placeholder="Hard cap in tokens" readOnly={true} />
                            <InputGroup value={softcapAmount} onChangeFunc={() => { }} type="number" itemLabel="Soft Cap (Tokens):" placeholder="Soft cap in tokens" readOnly={true} />
                        </div>
                    </div>
                    <div className='flex-col items-center justify-center flex-1 transition-colors rounded-2xl'>
                        <div className='flex flex-col items-center px-3 py-2 md:p-3 md:px-5 lg:flex-row'>
                            <InputGroup value={maxSolAmountPerAddress} onChangeFunc={handleMaxSolPerWalletChange} itemLabel="Maximum Buy (SOL):" type="number" placeholder="Input maximum amount of SOL." />
                            <InputGroup value={minSolAmountPerAddress} onChangeFunc={handleMinSolPerWalletChange} itemLabel="Minimum Buy (SOL):" type="number" placeholder="Input minimum amount of SOL." />
                        </div>
                    </div>
                    
                    <div className='flex-col items-center justify-center flex-1 transition-colors rounded-2xl'>
                        <div className='flex flex-col items-center px-3 py-2 md:p-3 md:px-5 lg:flex-row'>
                            <InputGroup value={maxTokenAmountPerAddress} onChangeFunc={() => {}} itemLabel="Maximum Buy (Tokens):" type="number" placeholder="Maximum amount of Token"  readOnly={true}/>
                            <InputGroup value={minTokenAmountPerAddress} onChangeFunc={() => {}} itemLabel="Minimum Buy (Tokens):" type="number" placeholder="Minimum amount of Token" readOnly={true}/>
                        </div>
                    </div>
                    <div className='flex-col items-center justify-center flex-1 transition-colors rounded-2xl'>
                        <div className='flex flex-col items-center px-3 py-2 md:p-3 md:px-5 lg:flex-row'>
                            <InputGroup value={amountOfTokensForPresale} onChangeFunc={() => { }} type="number" itemLabel="Tokens Amount:" placeholder="Total tokens for presale" readOnly />
                            <InputGroup value={pricePerToken} onChangeFunc={handlePriceChange} type="number" itemLabel="Price:" placeholder="Token price" step="0.000000001" />
                        </div>
                    </div>
                    <div className='flex-col items-center justify-center flex-1 transition-colors rounded-2xl'>
                        <div className='flex flex-col items-center px-3 py-2 md:p-3 md:px-5 lg:flex-row'>
                            <InputGroup value={formatDateForInput(presaleStartTime)} onChangeFunc={handleStartTimeChange} itemLabel="Start Time:" type="datetime-local" placeholder="Select start time" />
                            <InputGroup value={formatDateForInput(presaleEndTime)} onChangeFunc={handleEndTimeChange} itemLabel="End Time:" type="datetime-local" placeholder="Select end time" />
                        </div>
                    </div>
                    <div className='flex-col items-center justify-center flex-1 transition-colors rounded-2xl'>
                        <div className='flex flex-col items-center px-3 py-2 md:p-3 md:px-5 lg:flex-row'>
                            <InputGroup value={decimals} onChangeFunc={null} itemLabel="Token Decimals:" type="number" placeholder="Enter token decimals" />
                        </div>
                    </div>
                </div>
                <div className='flex px-3 mb-3 h-30 py-auto md:px-5 align-end mt-7'>
                    <AnimatedButton type="submit" text={'Create'} className={"mx-auto bg-green-600 text-white"} />
                </div>
            </form>

            <AnimatePresence>
                {showDepositDialog && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    >
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            className="p-6 bg-white rounded-lg shadow-lg"
                        >
                            <h2 className="mb-4 text-2xl font-bold">Deposit Tokens</h2>
                            <InputGroup
                                value={depositAmount}
                                onChangeFunc={(e) => setDepositAmount(Number(e.target.value))}
                                itemLabel="Deposit Amount:"
                                placeholder="Enter deposit amount"
                                type="number"
                            />
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={handleDeposit}
                                    className="px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                                >
                                    Deposit
                                </button>
                                <button
                                    onClick={() => setShowDepositDialog(false)}
                                    className="px-4 py-2 ml-2 text-gray-700 transition-colors bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
                {showTmonkAuthDialog && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    >
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            className="p-6 bg-white rounded-lg shadow-lg"
                        >
                            <h2 className="mb-4 text-2xl font-bold">Set TmonkMintAuthority</h2>
                            <InputGroup
                                value={newTmonkAuth}
                                onChangeFunc={(e) => setNewTmonkAuth(e.target.value)}
                                itemLabel="New TmonkMintAuthority:"
                                placeholder="Enter new TmonkMintAuthority"
                                type="text"
                            />
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={handleSetTmonkAuth}
                                    className="px-4 py-2 text-white transition-colors bg-purple-500 rounded hover:bg-purple-600"
                                >
                                    Set
                                </button>
                                <button
                                    onClick={() => setShowTmonkAuthDialog(false)}
                                    className="px-4 py-2 ml-2 text-gray-700 transition-colors bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function formatDateForInput(date: Date): string {
    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return ""; // Return an empty string or a default value
    }
    return date.toISOString().slice(0, 16);
}