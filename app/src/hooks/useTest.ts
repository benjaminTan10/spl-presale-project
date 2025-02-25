'use client';

import { useEffect, useState } from 'react';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Program, BN } from '@project-serum/anchor';
import { IDL, TokenPresale } from '../interfaces/token_presale';
import { PRESALE_PROGRAM_PUBKEY } from '../constants';
import axios from 'axios';

export interface DetailedPresaleInfo {
  presaleIdentifier: number;
  tokenMintAddress: string;
  softcapAmount: BN;
  hardcapAmount: BN;
  depositTokenAmount: BN;
  soldTokenAmount: BN;
  startTime: Date;
  endTime: Date;
  maxTokenAmountPerAddress: BN;
  lamportPricePerToken: BN;
  isLive: boolean;
  authority: string;
  isSoftCapped: boolean;
  isHardCapped: boolean;
  isInitialized: boolean;
  decimals: number;
  decimalPerToken: BN;
}

interface RawPresaleAccount {
  presaleIdentifier: number;
  tokenMintAddress: PublicKey;
  softcapAmount: BN;
  hardcapAmount: BN;
  depositTokenAmount: BN;
  soldTokenAmount: BN;
  startTime: BN;
  endTime: BN;
  maxTokenAmountPerAddress: BN;
  lamportPricePerToken: BN;
  isLive: boolean;
  authority: PublicKey;
  isSoftCapped: boolean;
  isHardCapped: boolean;
  isInitialized: boolean;
  decimals: number;
  decimalPerToken: BN;
}

export interface TokenActivity {
  type: string;
  amount: number;
  tokenType: string;
  signature: string;
  presaleIdentifier: number;
  createdAt: Date;
}

export interface BuyerInfo {
  publicKey: string;
  totalTokenAmount: number;
  purchases: {
    presaleIdentifier: number;
    solAmount: number;
    tokenAmount: number;
    signature: string;
    timestamp: number;
  }[];
}

const useTest = () => {
  const { connection } = useConnection();
  const [allPresaleInfo, setAllPresaleInfo] = useState<DetailedPresaleInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenActivities, setTokenActivities] = useState<TokenActivity[]>([]);
  const [buyerInfo, setBuyerInfo] = useState<BuyerInfo[]>([]);

  const convertToDetailedPresaleInfo = (account: RawPresaleAccount): DetailedPresaleInfo => {
    return {
      ...account,
      startTime: new Date(account.startTime.toNumber() * 1000),
      endTime: new Date(account.endTime.toNumber() * 1000),
      tokenMintAddress: account.tokenMintAddress.toString(),
      authority: account.authority.toString(),
    };
  };

  const fetchAllPresaleInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const program = new Program(
        IDL,
        PRESALE_PROGRAM_PUBKEY,
        { connection }
      );

      const presaleAccounts = await Promise.all(
        Array.from({ length: 5 }, async (_, i) => {
          const presaleIdentifier = i + 1;
          try {
            const [pda] = PublicKey.findProgramAddressSync(
              [Buffer.from("PRESALE_SEED"), Buffer.from([presaleIdentifier])],
              program.programId
            );
            const account = await program.account.PresaleInfo.fetchNullable(pda);
            return account ? convertToDetailedPresaleInfo({
              ...account,
              presaleIdentifier,
            } as RawPresaleAccount) : null;
          } catch (err) {
            console.log(`No presale found for identifier ${presaleIdentifier}`);
            return null;
          }
        })
      );

      const validPresales = presaleAccounts.filter((account): account is DetailedPresaleInfo => 
        account !== null
      );

      setAllPresaleInfo(validPresales);
    } catch (err) {
      console.error('Error fetching presale info:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch presale information');
    } finally {
      setLoading(false);
    }
  };

  const fetchTokenActivities = async () => {
    try {
      const response = await axios.get('/api/token-activity');
      setTokenActivities(response.data);
    } catch (error) {
      console.error('Error fetching token activities:', error);
    }
  };

  const fetchBuyerInfo = async () => {
    try {
      const response = await axios.get('/api/buy');
      setBuyerInfo(response.data);
    } catch (error) {
      console.error('Error fetching buyer info:', error);
    }
  };

  useEffect(() => {
    fetchAllPresaleInfo();
    fetchTokenActivities();
    fetchBuyerInfo();
  }, [connection]);

  return {
    allPresaleInfo,
    loading,
    error,
    tokenActivities,
    buyerInfo,
    refreshPresaleInfo: fetchAllPresaleInfo
  };
};

export default useTest;