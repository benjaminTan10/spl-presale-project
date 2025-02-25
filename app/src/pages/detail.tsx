'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BasicPage from '../components/basic/BasicPage';
import useTest from '../hooks/useTest';
import { ClipLoader } from 'react-spinners';
import Head from 'next/head';
import { BN } from '@project-serum/anchor';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TokenActivity, BuyerInfo } from '../hooks/useTest';
import { format } from 'date-fns';

export default function Detail() {
  const { allPresaleInfo, loading, error, tokenActivities, buyerInfo, refreshPresaleInfo } = useTest();

  const formatDate = (date: Date) => {
    return format(date, 'yyyy-MM-dd HH:mm:ss');
  };

  const formatAmount = (amount: BN) => {
    return amount.toString();
  };

  const renderActivityCard = (activity: TokenActivity) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-4 bg-green-50 rounded-lg shadow-sm"
    >
      <div className="flex justify-between items-center">
        <span className="text-green-700 font-semibold">{activity.type}</span>
        <span className="text-sm text-green-600">{formatDate(new Date(activity.createdAt))}</span>
      </div>
      <div className="mt-2">
        <p className="text-gray-600">Amount: {activity.amount} {activity.tokenType}</p>
        <a
          href={`https://solscan.io/tx/${activity.signature}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-green-600 hover:text-green-700"
        >
          View Transaction
        </a>
      </div>
    </motion.div>
  );

  const renderBuyerCard = (buyer: BuyerInfo) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-white rounded-lg shadow-md"
    >
      <div className="flex justify-between items-center">
        <span className="font-semibold text-gray-700">
          {buyer.publicKey.slice(0, 6)}...{buyer.publicKey.slice(-4)}
        </span>
        <span className="text-green-600 font-bold">{buyer.totalTokenAmount} tokens</span>
      </div>
      <div className="mt-2 space-y-2">
        {buyer.purchases.slice(0, 3).map((purchase, index) => (
          <div key={index} className="text-sm text-gray-600">
            <p>Amount: {purchase.tokenAmount} tokens ({purchase.solAmount} SOL)</p>
            <a
              href={`https://solscan.io/tx/${purchase.signature}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700"
            >
              View Transaction
            </a>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderPresaleCard = (presale: any, index: number) => {
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800">
              Presale #{presale.presaleIdentifier}
            </h3>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-700 font-semibold">Progress</p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${Math.min(
                        (presale.soldTokenAmount.toNumber() / presale.hardcapAmount.toNumber()) * 100,
                        100
                      )}%`
                    }}
                  />
                </div>
              </div>
              <div className="mt-1 flex justify-between text-sm text-gray-600">
                <span>{formatAmount(presale.soldTokenAmount)} sold</span>
                <span>{formatAmount(presale.hardcapAmount)} total</span>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-600">Token Mint Address:</p>
              <p className="text-sm break-all">{presale.tokenMintAddress}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Authority:</p>
              <p className="text-sm break-all">{presale.authority}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Soft Cap:</p>
              <p>{formatAmount(presale.softcapAmount)} tokens</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Hard Cap:</p>
              <p>{formatAmount(presale.hardcapAmount)} tokens</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Deposited Amount:</p>
              <p>{formatAmount(presale.depositTokenAmount)} tokens</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Sold Amount:</p>
              <p>{formatAmount(presale.soldTokenAmount)} tokens</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Max Per Address:</p>
              <p>{formatAmount(presale.maxTokenAmountPerAddress)} tokens</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Price Per Token:</p>
              <p>{presale.lamportPricePerToken.toNumber() / LAMPORTS_PER_SOL} SOL</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Status:</p>
              <div className="flex gap-2">
                <span className={`px-2 py-1 text-sm rounded ${presale.isLive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {presale.isLive ? 'Live' : 'Not Live'}
                </span>
                {presale.isSoftCapped && (
                  <span className="px-2 py-1 text-sm bg-blue-100 rounded text-blue-800">Soft Capped</span>
                )}
                {presale.isHardCapped && (
                  <span className="px-2 py-1 text-sm bg-purple-100 rounded text-purple-800">Hard Capped</span>
                )}
              </div>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Decimals:</p>
              <p>{presale.decimals}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-700 font-semibold">Time Information</p>
              <div className="mt-2 space-y-2">
                <p className="text-gray-600">Start: {formatDate(presale.startTime)}</p>
                <p className="text-gray-600">End: {formatDate(presale.endTime)}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <Head>
        <title>Presale Details</title>
        <meta name="description" content="Detailed view of all presales" />
      </Head>
      <BasicPage activePage="Detail">
        <div className="container mx-auto px-4 pt-48 pb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Presale Details</h1>
                <button
                  onClick={refreshPresaleInfo}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Refresh Data
                </button>
              </div>

              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <ClipLoader color={'#16a34a'} loading={loading} size={50} />
                </div>
              ) : error ? (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                  <p>{error}</p>
                </div>
              ) : (
                <AnimatePresence>
                  <div className="space-y-6">
                    {allPresaleInfo.map((presale, index) => renderPresaleCard(presale, index))}
                  </div>
                </AnimatePresence>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activities */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h2>
                <div className="space-y-4">
                  {tokenActivities.slice(0, 5).map((activity, index) => renderActivityCard(activity))}
                </div>
              </motion.div>

              {/* Top Buyers */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">Top Buyers</h2>
                <div className="space-y-4">
                  {buyerInfo
                    .sort((a, b) => b.totalTokenAmount - a.totalTokenAmount)
                    .slice(0, 5)
                    .map((buyer, index) => renderBuyerCard(buyer))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </BasicPage>
    </>
  );
}