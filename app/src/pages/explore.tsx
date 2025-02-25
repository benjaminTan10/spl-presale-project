'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'
import BasicPage from '../components/basic/BasicPage'
import usePresale from '../hooks/usePresale'
import ConnectWalletCard from '../components/wallet/ConnectWalletCard'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-hot-toast'
import Head from 'next/head'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import axios from 'axios'

interface PresaleInfo {
  presaleIdentifier: number
  tokenMintAddress: string
  softcapAmount: number | null
  hardcapAmount: number | null
  depositTokenAmount: number | null
  soldTokenAmount: number | null
  startTime: number
  endTime: number
  maxTokenAmountPerAddress: number | null
  pricePerToken: number | null
  isLive: boolean
  isSoftCapped: boolean
  isHardCapped: boolean
  receivedSolAmount: number | null
}

interface PresaleData {
  presaleInfo: PresaleInfo
}

interface SolanaPrice {
  solana: {
    usd: number
    sol: number
  }
}

const fetchTotalSoldAmount = async () => {
  try {
    const response = await axios.get('/api/buy')
    return response.data.totalSoldAmount || 0
  } catch (error) {
    console.error('Error fetching total sold amount:', error)
    return 0
  }
}

export default function Explore() {
  const { walletConnected, buyAndClaimToken, withdraw, fetchPresaleInfo, publicKey, getWithdrawableTokensAndSol } = usePresale()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [connected, setConnected] = useState(false)
  const [buyAmount, setBuyAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [withdrawType, setWithdrawType] = useState<'Sol' | 'Token'>('Sol')
  const [currentPresaleInfo, setCurrentPresaleInfo] = useState<PresaleInfo | null>(null)
  const [solPrice, setSolPrice] = useState<number | null>(null)
  const [priceInUSD, setPriceInUSD] = useState<number | null>(null)
  const [email, setEmail] = useState('')
  const [withdrawableTokens, setWithdrawableTokens] = useState<number>(0)
  const [withdrawableSol, setWithdrawableSol] = useState<number >(0)

  useEffect(() => {
    setConnected(walletConnected)
    if (walletConnected) {
      fetchData()
    }
  }, [walletConnected])


  useEffect(() => {
    const getWithdrawable = async  () => {
      const response=await getWithdrawableTokensAndSol();
      const { SolTokenAmountFromSolana, TokenAmountFromSolana } = response;
      setWithdrawableTokens(TokenAmountFromSolana);
      setWithdrawableSol(SolTokenAmountFromSolana);
     }
     
    const fetchPrices = async () => {
      try {
        // Fetch SOL price
        const solResponse = await axios.get<SolanaPrice>(
          'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
        )
        setSolPrice(solResponse.data.solana.usd)

        // Fetch presale price from our API
        const presaleResponse = await axios.get('/api/current')
        if (presaleResponse.data.success && presaleResponse.data.presaleInfo) {
          // Convert price from lamports to SOL and then to USD
          const priceUSD = presaleResponse.data.presaleInfo.pricePerToken
          setPriceInUSD(priceUSD)
        }
      } catch (error) {
        console.error('Error fetching prices:', error)
      }
    }
    fetchPrices()
    //TODO: get the amount of tokens available to withdraw from the solana blockchain
    //TODO: get the amount of SOL available to withdraw from the solana blockchain

   getWithdrawable();
   
  }, [])

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const presaleResponse = await axios.get<PresaleData>('/api/current');

      if (presaleResponse.data && presaleResponse.data.presaleInfo) {
        // Ensure we're using the values from the database
        const presaleInfo = presaleResponse.data.presaleInfo;
        setCurrentPresaleInfo({
          ...presaleInfo,
          soldTokenAmount: presaleInfo.soldTokenAmount || 0,
          receivedSolAmount: presaleInfo.receivedSolAmount || 0
        });
      } else {
        throw new Error('Invalid presale data structure');
      }
      await fetchPresaleInfo();
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch presale information');
      toast.error('Failed to fetch presale information');
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!buyAmount) {
      toast.error('Please enter an amount to buy')
      return
    }

    if (!currentPresaleInfo) {
      toast.error('Presale information not available')
      return
    }
    //TODO: get the amount of SOL to buy from the user
    const solAmount = 0;
    setLoading(true)
    try {
      const result = await buyAndClaimToken(Number(buyAmount), email, solAmount)
      if (result.success) {
        toast.success('Tokens bought successfully')
        await axios.post('/api/buy', {
          publicKey: publicKey?.toString(),
          buyInfo: {
            presaleIdentifier: currentPresaleInfo.presaleIdentifier,
            tokenAmount: Number(buyAmount),
            signature: result.signature
          }
        })
        fetchData()
      } else {
        throw new Error(result.error || 'Failed to buy tokens')
      }
    } catch (error) {
      console.error('Error buying tokens:', error)
      toast.error(error instanceof Error ? error.message : 'An error occurred while buying tokens')
    } finally {
      setLoading(false)
    }
  }

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!withdrawAmount) {
      toast.error('Please enter an amount to withdraw')
      return
    }
    if (!currentPresaleInfo) {
      toast.error('Presale information not available')
      return
    }
    setLoading(true)
    try {
      const result = await withdraw(
        currentPresaleInfo.presaleIdentifier,
        Number(withdrawAmount),
        withdrawType
      )
      if (result.success) {
        toast.success(`${withdrawType} withdrawn successfully`)
        await axios.post('/api/token-activity', {
          publicKey: publicKey?.toString(),
          activity: {
            type: 'withdraw',
            amount: Number(withdrawAmount),
            tokenType: withdrawType,
            signature: result.signature
          }
        })
        
        // Refresh the withdrawable amounts
        const withdrawableResponse = await getWithdrawableTokensAndSol();
        setWithdrawableTokens(withdrawableResponse.TokenAmountFromSolana);
        setWithdrawableSol(withdrawableResponse.SolTokenAmountFromSolana);
        
        fetchData()
      } else {
        throw new Error(result.error || 'Failed to withdraw')
      }
    } catch (error) {
      console.error('Error withdrawing:', error)
      toast.error(error instanceof Error ? error.message : 'An error occurred while withdrawing')
    } finally {
      setLoading(false)
    }
  }

  const formatTokenAmount = (amount: number | null | undefined) => {
    if (amount === null || amount === undefined) {
      return 'Not deposited yet'
    }
    return `${amount.toLocaleString()} tokens`
  }

  const formatPrice = useMemo(() => {
    if (!priceInUSD || !solPrice) return { usd: 'Loading...', sol: 'Loading...' }

    const priceInSOL = priceInUSD / solPrice

    return {
      usd: `$${priceInUSD.toFixed(4)}`,
      sol: `${priceInSOL.toFixed(9)} `
    }
  }, [priceInUSD, solPrice])

  const renderPresaleInfo = () => {
    if (!currentPresaleInfo) return null

    const now = new Date().getTime() / 1000
    const isActive = now >= currentPresaleInfo.startTime && now < currentPresaleInfo.endTime
    const hasEnded = now >= currentPresaleInfo.endTime

    const chartData = [
      { name: 'Soft Cap', value: currentPresaleInfo.softcapAmount || 0 },
      { name: 'Hard Cap', value: currentPresaleInfo.hardcapAmount || 0 },
      { name: 'Deposited', value: currentPresaleInfo.depositTokenAmount || 0 },
      { name: 'Sold', value: currentPresaleInfo.soldTokenAmount || 0 },
    ]

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full p-4 mx-auto bg-white rounded-lg shadow-md max-w-7xl sm:p-6"
      >
        <h2 className="mb-4 text-xl font-bold sm:text-2xl">Presale Information</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 sm:gap-8">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-gray-600">Token Mint Address:</p>
                <p className="text-sm break-all">{currentPresaleInfo.tokenMintAddress || 'Not set'}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Status:</p>
                <p className={`font-medium ${isActive ? 'text-green-600' : hasEnded ? 'text-red-600' : 'text-yellow-600'}`}>
                  {isActive ? 'Active' : (hasEnded ? 'Ended' : 'Not Started')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-gray-600">Soft Cap:</p>
                <p>{formatTokenAmount(currentPresaleInfo.softcapAmount)}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Hard Cap:</p>
                <p>{formatTokenAmount(currentPresaleInfo.hardcapAmount)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-gray-600">Deposited Tokens:</p>
                <p>{formatTokenAmount(currentPresaleInfo.depositTokenAmount)}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Sold Tokens:</p>
                <p>{formatTokenAmount(currentPresaleInfo.soldTokenAmount)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-gray-600">Start Time:</p>
                <p>{new Date(currentPresaleInfo.startTime * 1000).toLocaleString()}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">End Time:</p>
                <p>{new Date(currentPresaleInfo.endTime * 1000).toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-gray-600">Max Tokens Per Address:</p>
                <p>{formatTokenAmount(currentPresaleInfo.maxTokenAmountPerAddress)}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Price Per Token:</p>
                <p>{formatPrice.usd} USD</p>
                <p className="text-sm text-gray-500">({formatPrice.sol}SOL)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <p className="font-semibold text-gray-600">Soft Capped:</p>
                <p>{currentPresaleInfo.isSoftCapped ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Hard Capped:</p>
                <p>{currentPresaleInfo.isHardCapped ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>

          <div className="h-[300px] sm:h-[400px]">
            <h3 className="mb-4 text-lg font-bold sm:text-xl">Presale Progress</h3>
            <ResponsiveContainer width="105%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Explore Presale</title>
        <meta name="description" content="Explore and participate in the ongoing presale" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BasicPage activePage={'Explore'}>
        <Toaster position="top-right" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative flex flex-col items-center justify-center w-full min-h-screen px-4 py-2"
        >
          {!connected && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className='flex flex-col items-center justify-center pt-24 text-center sm:pt-48 -mb-30'
            >
              <div className='mb-8 text-3xl text-purple-600 sm:text-5xl font-handwritten'>
                Connect your wallet to explore the presale!
              </div>
              <ConnectWalletCard />
            </motion.div>
          )}

          {connected && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='flex flex-col items-center justify-center w-full pt-24 text-center sm:pt-48'
            >
              {error ? (
                <div className="w-full p-4 mx-auto border border-red-200 rounded-lg max-w-7xl sm:p-6 bg-red-50">
                  <p className="text-red-600">{error}</p>
                  <button
                    onClick={fetchData}
                    className="px-4 py-2 mt-4 text-white bg-red-600 rounded hover:bg-red-700"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <>
                  {renderPresaleInfo()}
                  {currentPresaleInfo?.isLive && (
                    <motion.form
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      onSubmit={handleBuy}
                      className="w-full mx-auto mt-6 max-w-7xl"
                    >
                      <div className="p-4 bg-white rounded-lg shadow-md sm:p-6">
                        <h3 className="mb-4 text-lg font-bold sm:text-xl">Buy Tokens</h3>
                        <div className="flex flex-col gap-4 sm:flex-row">
                          <input
                            type="number"
                            value={buyAmount}
                            onChange={(e) => setBuyAmount(e.target.value)}
                            placeholder="Amount to buy"
                            className="flex-1 px-4 py-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email"
                            className="flex-1 px-4 py-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          <button
                            type="submit"
                            className="px-8 py-2 text-white transition-colors bg-purple-600 rounded hover:bg-purple-700"
                          >
                            Buy Tokens
                          </button>
                        </div>
                      </div>
                    </motion.form>
                  )}

                  {currentPresaleInfo && publicKey && (
                    <motion.form
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      onSubmit={handleWithdraw}
                      className="w-full mx-auto mt-6 max-w-7xl"
                    >
                      <div className="p-4 bg-white rounded-lg shadow-md sm:p-6">
                        <h3 className="mb-4 text-lg font-bold sm:text-xl">Withdraw Available</h3>
                        <div className="flex flex-col gap-4 sm:flex-row">
                          <p className='text-lg font-bold'>withdrawableTokens : {withdrawableTokens} tokens   </p>
                          <p className='text-lg font-bold'> withdrawableSol : {withdrawableSol} SOL </p>
                        </div>
                      </div>
                      <div className="p-4 bg-white rounded-lg shadow-md sm:p-6">
                        <h3 className="mb-4 text-lg font-bold sm:text-xl">Withdraw Funds</h3>
                        <div className="flex flex-col gap-4 sm:flex-row">
                          <input
                            type="number"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            placeholder="Amount to withdraw"
                            className="flex-1 px-4 py-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          <select
                            value={withdrawType}
                            onChange={(e) => setWithdrawType(e.target.value as 'Sol' | 'Token')}
                            className="px-4 py-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          >
                            <option value="Sol">SOL</option>
                            <option value="Token">Token</option>
                          </select>
                          <button
                            type="submit"
                            className="px-8 py-2 text-white transition-colors bg-purple-600 rounded hover:bg-purple-700"
                          >
                            Withdraw
                          </button>
                        </div>
                      </div>
                    </motion.form>
                  )}
                </>
              )}
            </motion.div>
          )}

          {loading && (
            <div className='flex items-center justify-center h-screen'>
              <ClipLoader color={'#6B46C1'} loading={loading} size={50} />
            </div>
          )}
        </motion.div>
      </BasicPage>
    </>
  )
}

