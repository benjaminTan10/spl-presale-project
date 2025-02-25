'use client';

import { useEffect, useState } from 'react';
import usePresale from '../../hooks/usePresale';
import Head from 'next/head';
import axios from 'axios';
import PresaleRound from './presaleRound';
import { PresaleStatus } from './presaleStatus';
import { Notification } from '../notification';

interface NotificationProps {
  message: string | React.ReactNode;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

interface CurrentPresaleInfo {
  presaleIdentifier: number;
  tokenMintAddress: string | null;
  softcapAmount: number;
  hardcapAmount: number;
  depositTokenAmount: number;
  soldTokenAmount: number;
  
  startTime: number;
  endTime: number;
  maxTokenAmountPerAddress: number;
  minTokenAmountPerAddress: number;
  pricePerToken: number;
  isLive: boolean;
  isSoftCapped: boolean;
  isHardCapped: boolean;
  isInitialized: boolean;
}

const defaultPresaleRounds = [
  {
    round: 1,
    status: PresaleStatus.PRESALE_ACTIVE,
    startTime: 1727164800,
    endTime: 1727251200,
    amount: 150000000,
    minTokenAmountPerAddress: 1000,
    price: 0.0025,
  },
  {
    round: 2,
    status: PresaleStatus.PRESALE_SOON,
    amount: 200000000,
    startTime: 1733932800, // 2024-12-10 00:00:00 UTC
    endTime: 1734374400, // 2024-12-16 00:00:00 UTC
    minTokenAmountPerAddress: 1000,
    price: 0.004,
  },
  {
    round: 3,
    status: PresaleStatus.PRESALE_SOON,
    amount: 50000000,
    startTime: 1734374400, // 2024-12-16 00:00:00 UTC
    endTime: 1735584000, // 2024-12-30 00:00:00 UTC
    minTokenAmountPerAddress: 1000,
    price: 0.008,
  }
];

export default function PresalePanel() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [solPrice, setSolPrice] = useState(0);
  const [currentPresaleInfo, setCurrentPresaleInfo] = useState<CurrentPresaleInfo | null>(null);
  const [dbPresaleInfo, setDbPresaleInfo] = useState(null);

  const {
    presaleInfo,
    walletBalance,
    publicKey,
    holdingTokens,
    buyAndClaimToken,
    fetchPresaleInfo,
    fetchWalletBalance,
    fetchHoldingTokens,
    getCurrentPresaleFromDB,
    fetchPresaleInfoFromDB,
    presaleIdentifier
  } = usePresale();

  const [solAmount, setSolAmount] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [walletAddress, setWalletAddress] = useState("undefined");
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [progress, setProgress] = useState(0);
  const [email, setEmail] = useState('');
  const [currentPresaleNumber, setCurrentPresaleNumber] = useState(1);
  const [presaleStatus, setPresaleStatus] = useState(PresaleStatus.PRESALE_SOON);
  const [showNotification, setShowNotification] = useState<NotificationProps | null>(null);

  // Fetch current presale info from DB
  useEffect(() => {
    const fetchCurrentPresale = async () => {
      try {
        setLoading(true);
        console.log('=== Fetching Current Presale ===');
        const response = await axios.get('/api/current');
        console.log('API Response:', response.data);
        if (response.data && response.data.presaleInfo) {
          const presaleData = response.data.presaleInfo;
          console.log('Setting presale info from API:', presaleData);
          setCurrentPresaleInfo({
            presaleIdentifier: Number(presaleData.presaleIdentifier),
            tokenMintAddress: presaleData.tokenMintAddress,
            softcapAmount: Number(presaleData.softcapAmount),
            hardcapAmount: Number(presaleData.hardcapAmount),
            depositTokenAmount: Number(presaleData.depositTokenAmount),
            soldTokenAmount: Number(presaleData.soldTokenAmount),
            startTime: Number(presaleData.startTime),
            endTime: Number(presaleData.endTime),
            maxTokenAmountPerAddress: Number(presaleData.maxTokenAmountPerAddress),
            minTokenAmountPerAddress: Number(presaleData.minTokenAmountPerAddress),
            pricePerToken: Number(presaleData.pricePerToken),
            isLive: Boolean(presaleData.isLive),
            isSoftCapped: Boolean(presaleData.isSoftCapped),
            isHardCapped: Boolean(presaleData.isHardCapped),
            isInitialized: Boolean(presaleData.isInitialized)
          });
          setCurrentPresaleNumber(Number(presaleData.presaleIdentifier));
        } else {
          const currentRound = defaultPresaleRounds.find(round =>
            Date.now() / 1000 >= round.startTime && Date.now() / 1000 < round.endTime
          ) || defaultPresaleRounds[0];

          console.log('Using default round:', currentRound);
          setCurrentPresaleNumber(currentRound.round);
          setCurrentPresaleInfo({
            presaleIdentifier: currentRound.round,
            tokenMintAddress: null,
            softcapAmount: currentRound.amount * 0.5,
            hardcapAmount: currentRound.amount,
            depositTokenAmount: 0,
            soldTokenAmount: 0,
            startTime: currentRound.startTime,
            endTime: currentRound.endTime,
            maxTokenAmountPerAddress: currentRound.amount * 0.1,
            minTokenAmountPerAddress: currentRound.minTokenAmountPerAddress,
            pricePerToken: currentRound.price,
            isLive: currentRound.status === PresaleStatus.PRESALE_ACTIVE,
            isSoftCapped: false,
            isHardCapped: false,
            isInitialized: true
          });
        }
      } catch (error) {
        console.error('Error in fetchCurrentPresale:', error);
        // Fallback to default values on error
        const currentRound = defaultPresaleRounds.find(round =>
          Date.now() / 1000 >= round.startTime && Date.now() / 1000 < round.endTime
        ) || defaultPresaleRounds[0];

        setCurrentPresaleNumber(currentRound.round);
        setCurrentPresaleInfo({
          presaleIdentifier: currentRound.round,
          tokenMintAddress: null,
          softcapAmount: currentRound.amount * 0.5,
          hardcapAmount: currentRound.amount,
          depositTokenAmount: 0,
          soldTokenAmount: 0,
          startTime: currentRound.startTime,
          endTime: currentRound.endTime,
          maxTokenAmountPerAddress: currentRound.amount * 0.1,
          minTokenAmountPerAddress: currentRound.minTokenAmountPerAddress,
          pricePerToken: currentRound.price,
          isLive: currentRound.status === PresaleStatus.PRESALE_ACTIVE,
          isSoftCapped: false,
          isHardCapped: false,
          isInitialized: true
        });

        setShowNotification({
          message: 'Using default presale information',
          type: 'info',
          onClose: () => setShowNotification(null)
        });
      } finally {
        console.log('Current State after fetch:', {
          currentPresaleInfo,
          currentPresaleNumber,
          presaleStatus
        });
        setLoading(false);
      }
    };

    fetchCurrentPresale();
  }, []);

  // Fetch wallet-specific data when wallet connects
  useEffect(() => {
    const fetchWalletData = async () => {
      if (!publicKey) {
        setWalletAddress("undefined");
        return;
      }

      try {
        setLoading(true);
        setWalletAddress(publicKey.toString());

        await Promise.all([
          fetchPresaleInfo(),
          fetchWalletBalance(),
          fetchHoldingTokens(),
          (async () => {
            const dbInfo = await fetchPresaleInfoFromDB();
            setDbPresaleInfo(dbInfo);
          })()
        ]);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        setShowNotification({
          message: 'Failed to fetch wallet information',
          type: 'error',
          onClose: () => setShowNotification(null)
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [publicKey, fetchPresaleInfo, fetchPresaleInfoFromDB, fetchWalletBalance, fetchHoldingTokens]);

  // Fetch SOL price
  useEffect(() => {
    const fetchSolPrice = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
        );
        setSolPrice(response.data.solana.usd);
      } catch (error) {
        console.error("Error fetching SOL price:", error);
        setShowNotification({
          message: 'Failed to fetch SOL price',
          type: 'error',
          onClose: () => setShowNotification(null)
        });
      }
    };

    fetchSolPrice();
    const interval = setInterval(fetchSolPrice, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = Date.now() / 1000;
      let endTime = 0, startTime = 0;

      if (currentPresaleInfo) {
        endTime = Number(currentPresaleInfo.endTime);
        startTime = Number(currentPresaleInfo.startTime);
      } else {
        const currentRound = defaultPresaleRounds.find(round =>
          now >= round.startTime && now < round.endTime
        ) || defaultPresaleRounds[0];
        endTime = currentRound.endTime;
        startTime = currentRound.startTime;
      }

      const distance = endTime - now;

      if (distance <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setProgress(100);
        setPresaleStatus(PresaleStatus.PRESALE_PAST);
        return;
      }

      const days = Math.floor(distance / (60 * 60 * 24));
      const hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((distance % (60 * 60)) / 60);
      const seconds = Math.floor(distance % 60);

      setTimeRemaining({ days, hours, minutes, seconds });

      const totalDuration = endTime - startTime;
      const timePassed = now - startTime;
      const newProgress = Math.min(Math.max((timePassed / totalDuration) * 100, 0), 100);
      setProgress(newProgress);

      setPresaleStatus(now < startTime ? PresaleStatus.PRESALE_SOON : PresaleStatus.PRESALE_ACTIVE);
    };

    const timer = setInterval(calculateTimeRemaining, 1000);
    calculateTimeRemaining();
    return () => clearInterval(timer);
  }, [currentPresaleInfo]);

  const validateInputs = () => {
    if (!email.includes('@')) {
      setShowNotification({
        message: 'Please enter a valid email address',
        type: 'error',
        onClose: () => setShowNotification(null)
      });
      return false;
    }
    if (tokenAmount <= 0) {
      setShowNotification({
        message: 'Please enter a positive amount for tokens',
        type: 'error',
        onClose: () => setShowNotification(null)
      });
      return false;
    }
    // const minimumSolAmount = currentPresaleInfo?.minTokenAmountPerAddress / currentPresaleInfo?.pricePerToken || 0.025;
    // alert (minimumSolAmount+"::currentpresInfo:mintokenAmount::"+currentPresaleInfo?.minTokenAmountPerAddress+"::"+currentPresaleInfo?.pricePerToken);
    // if (solAmount < minimumSolAmount) {
    if (solAmount < 0.0205) {
      setShowNotification({
        message: 'Minimum SOL amount is 0.0205',
        type: 'error',
        onClose: () => setShowNotification(null)
      });
      return false;
    }
    if (solAmount > walletBalance) {
      setShowNotification({
        message: 'Insufficient SOL balance',
        type: 'error',
        onClose: () => setShowNotification(null)
      });
      return false;
    }
    return true;
  };

  const renderPresaleRounds = () => {
    return defaultPresaleRounds.map((round) => {
      let status = PresaleStatus.PRESALE_SOON;
      let currentAmount = 0;
      let currentPrice = round.price;
      const now = Date.now() / 1000;

      if (currentPresaleInfo && currentPresaleInfo.presaleIdentifier === round.round) {
        status = getPresaleStatus(currentPresaleInfo);
        currentAmount = Number(currentPresaleInfo.soldTokenAmount);
        currentPrice = Number(currentPresaleInfo.pricePerToken);
      } else {
        if (now < round.startTime) {
          status = PresaleStatus.PRESALE_SOON;
        } else if (now >= round.startTime && now < round.endTime) {
          status = PresaleStatus.PRESALE_ACTIVE;
        } else {
          status = PresaleStatus.PRESALE_PAST;
        }
      }

      return (
        <PresaleRound
          key={round.round}
          roundNumber={round.round}
          status={status}
          tokenAmount={round.amount}
          price={Number(currentPrice).toFixed(4)}
          currentPresaleNumber={currentPresaleNumber}
          presaleIdentifier={round.round}
          soldAmount={currentAmount}
        />
      );
    });
  };

  const handleSolAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value);
    setSolAmount(amount);

    console.log('=== SOL Amount Change ===');
    console.log('Input amount:', amount);
    console.log('Current SOL price:', solPrice);

    let tokenPrice: number;
    if (currentPresaleInfo) {
      tokenPrice = currentPresaleInfo.pricePerToken;
      console.log('Using presale info price:', tokenPrice);
    } else {
      const currentRound = defaultPresaleRounds.find(round => round.round === currentPresaleNumber);
      tokenPrice = currentRound ? currentRound.price : defaultPresaleRounds[0].price;
      console.log('Using default round price:', tokenPrice);
    }

    const calculatedTokenAmount = Math.floor(amount * solPrice / tokenPrice);
    console.log('Calculated token amount:', calculatedTokenAmount);
    setTokenAmount(calculatedTokenAmount);
  };

  const setManualTokenAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value);
    setTokenAmount(amount);

    console.log('=== Manual Token Amount Change ===');
    console.log('Input amount:', amount);
    console.log('Current SOL price:', solPrice);

    let tokenPrice: number;
    if (currentPresaleInfo) {
      tokenPrice = currentPresaleInfo.pricePerToken;
      console.log('Using presale info price:', tokenPrice);
    } else {
      const currentRound = defaultPresaleRounds.find(round => round.round === currentPresaleNumber);
      tokenPrice = currentRound ? currentRound.price : defaultPresaleRounds[0].price;
      console.log('Using default round price:', tokenPrice);
    }

    const calculatedSolAmount = amount * tokenPrice / solPrice;
    console.log('Calculated SOL amount:', calculatedSolAmount);
    setSolAmount(calculatedSolAmount);
  };

  const handleBuy = async () => {
    if (!publicKey) {
      setShowNotification({
        message: "Please connect your wallet first",
        type: 'error',
        onClose: () => setShowNotification(null)
      });
      return;
    }

    if (!validateInputs()) return;

    try {
      setShowNotification({
        message: "Processing your purchase...",
        type: "info",
        onClose: () => setShowNotification(null)
      });

      const result = await buyAndClaimToken(tokenAmount, email, solAmount);

      if (result.success) {
        // Format signature to show first 4 and last 4 characters
        const formattedSignature = `${result.signature.slice(0, 4)}...${result.signature.slice(-4)}`;
        
        // Open Solscan when clicking the signature
        const openSolscan = () => {
          window.open(`https://solscan.io/tx/${result.signature}`, '_blank');
        };

        setShowNotification(prevState => ({
          message: (
            <div>
              Transaction successful! Signature:{' '}
              <span 
                onClick={openSolscan}
                className="cursor-pointer text-blue-500 hover:text-blue-700 underline"
              >
                {formattedSignature}
              </span>
            </div>
          ),
          type: 'success',
          onClose: () => setShowNotification(null)
        }));

        // Refresh data
        await Promise.all([
          fetchWalletBalance(),
          fetchHoldingTokens(),
          fetchPresaleInfo()
        ]);
      } else {
        throw new Error(result.error || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Error buying tokens:", error);
      setShowNotification(prevState => ({
        message: error instanceof Error ? error.message : "Failed to purchase tokens",
        type: 'error',
        onClose: () => setShowNotification(null)
      }));
    }
  };

  const changeWalletAddress = () => {
    setShowNotification({
      message: "Cannot change wallet address manually. Please use a wallet connection.",
      type: 'error',
      onClose: () => setShowNotification(null)
    });
  };

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(null);
      }, 5000); // Hide notification after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="w-32 h-32 border-t-2 border-b-2 border-green-500 rounded-full animate-spin"></div>
    </div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div id="presalePanel" className="border-spacing-11 bg-gradient-to-b from-[#ffffff6e] to-[#4ef75770] my-5 flex flex-col items-center p-4 sm:p-6 rounded-xl shadow-lg w-[95%] max-w-3xl mx-auto">
      <Head>
        <meta name="description" content="Join the most promising meme coin of today!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="font-bold animated-heading bg-[#2cc433]"><h1 className='text-5xl'>Presale</h1></div>
      <p className="mb-2 text-xl font-bold text-green-800 outline-cA font-roboto">Buy before the price goes up!</p>
      <div className="flex flex-col rounded-xl items-center bg-[#f7f7f7c4] shadow-md">
        <div className="flex px-4 space-x-2">
          <div className="px-4 text-center text-green-800 rounded">
            <span className="text-2xl font-bold">{timeRemaining.days}</span>
            <div className="text-sm">days</div>
          </div>
          <div className="px-4 text-center text-green-800 rounded">
            <span className="text-2xl font-bold">{timeRemaining.hours}</span>
            <div className="text-sm">hours</div>
          </div>
          <div className="px-4 text-center text-green-800 rounded">
            <span className="text-2xl font-bold">{timeRemaining.minutes}</span>
            <div className="text-sm">min</div>
          </div>
          <div className="px-4 text-center text-green-800 rounded">
            <span className="text-2xl font-bold">{timeRemaining.seconds}</span>
            <div className="text-sm">sec</div>
          </div>
        </div>
        <p className="text-sm text-center text-purple-700 ">{progress.toFixed(2)}% completed</p>
        <div className="w-full bg-gray-300 rounded-b-md">
          <div
            className={`h-4 rounded-bl-lg rounded-r-lg ${progress < 100 ? 'bg-orange-500' : 'bg-green-500'} progress-bar`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="flex flex-row mt-2 space-x-4">
        {renderPresaleRounds()}
      </div>
      <div className="flex flex-col items-center w-full mt-4 px-2 sm:px-4">
        <label htmlFor="amount" className="block text-sm sm:text-base font-bold text-green-900 text-center">
          Enter the amount in SOLANA (min : 0.0205SOL)
        </label>
        <label htmlFor="amount" className="block text-xs sm:text-sm font-bold text-purple-800 text-center">
          Balance: <span className="mx-1 text-red-500">{walletBalance}</span> SOL
        </label>
        <label htmlFor="amount" className="block text-xs sm:text-sm font-bold text-purple-800 text-center">
          Sol price is $<span className="mx-1 text-red-500">{solPrice}</span>
        </label>
        <div className="flex justify-end w-full mt-2">
          <input
            type="number"
            id="tokenamount"
            className="w-full px-2 py-1 text-sm sm:text-base text-green-900 bg-white border-2 border-yellow-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="0"
            value={tokenAmount}
            onChange={setManualTokenAmount}
          />
          <button className="px-2 sm:px-4 text-sm sm:text-base text-white transition duration-300 bg-yellow-400 rounded-r-lg shadow-md hover:bg-yellow-500">
            TMONK
          </button>
        </div>
        <div className="flex justify-end w-full mt-1">
          <input
            type="number"
            id="solamount"
            className="w-full px-2 py-1 text-sm sm:text-base text-green-900 bg-white border-2 border-yellow-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="0"
            min="0.0205"
            value={solAmount}
            onChange={handleSolAmountChange}
          />
          <button className="px-2 sm:px-4 text-sm sm:text-base text-white transition duration-300 bg-yellow-400 rounded-r-lg shadow-md hover:bg-yellow-500">
          &nbsp;&nbsp;&nbsp;SOL&nbsp;&nbsp;&nbsp;
          </button>
        </div>
      </div>

      <div className="w-full mt-2 px-2 sm:px-4">
        <label htmlFor="email" className="block text-sm sm:text-base text-green-900">Your E-mail address:</label>
        <input
          type="email"
          id="email"
          className="w-full p-1 text-sm sm:text-base text-green-800 rounded"
          placeholder="your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="w-full mt-2 px-2 sm:px-4">
        <label htmlFor="solanaAddress" className="block text-sm sm:text-base text-green-800">Your SOLANA address:</label>
        <input 
          type="text" 
          id="solanaAddress"
          value={walletAddress} 
          onChange={changeWalletAddress} 
          className="w-full p-1 text-sm sm:text-base text-green-800 rounded" 
          placeholder="your SOLANA address" 
        />
      </div>

      <button
        className="px-6 py-2 mt-4 text-base sm:text-lg font-bold text-green-900 transition duration-300 bg-yellow-500 rounded-xl hover:bg-yellow-600 hover:text-green-900 w-[80%] sm:w-auto"
        onClick={handleBuy}>
        BUY $TMONK
      </button>

      {showNotification && (
        <Notification
          message={showNotification.message}
          type={showNotification.type}
          onClose={() => setShowNotification(null)}
        />
      )}
    </div>
  );
}

const getPresaleStatus = (info: any): PresaleStatus => {
  const now = Date.now() / 1000;
  const startTime = info.startTime?.toNumber ? info.startTime.toNumber() : info.startTime;
  const endTime = info.endTime?.toNumber ? info.endTime.toNumber() : info.endTime;

  if (now < startTime) {
    return PresaleStatus.PRESALE_SOON;
  } else if (now > endTime) {
    return PresaleStatus.PRESALE_PAST;
  } else {
    return PresaleStatus.PRESALE_ACTIVE;
  }
};

