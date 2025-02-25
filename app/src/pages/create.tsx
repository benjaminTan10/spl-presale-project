"use client"

import React, { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import BasicPage from '../components/basic/BasicPage'
import CreatePresaleForm from '../components/presales/CreatePresaleForm'
import usePresale from '../hooks/usePresale'
import ConnectWalletCard from '../components/wallet/ConnectWalletCard'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-hot-toast'
import Head from 'next/head'
import axios from 'axios'

export default function Create() {
  const router = useRouter()
  const { walletConnected, transactionPending, setCurrentPresaleInDB, presaleIdentifier, setPresaleIdentifier, TmonkMintAuthority, setTmonkMintAuthority, presaleInfo, fetchPresaleInfo } = usePresale()
  const [loading, setLoading] = useState(false)
  const [connected, setConnected] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newTmonkAuth, setNewTmonkAuth] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const storedIsAdmin = localStorage.getItem('isAdmin')
    setIsAdmin(storedIsAdmin === 'true')
    fetchPresaleInfo();
  }, [])

  useEffect(() => {
    const fetchPresaleIdentifier = async () => {
      try {
        const response = await axios.get('/api/presaleIdentifier');
        if (response.data) {
          setPresaleIdentifier(response.data);
        }
      } catch (error) {
        console.error('Error fetching presale identifier:', error);
      }
    };

    fetchPresaleIdentifier();
    fetchPresaleInfo();
    // alert(presaleInfo);
  }, [walletConnected]);

  const handleStorageChange = () => {
    const storedIsAdmin = localStorage.getItem('isAdmin')
    setIsAdmin(storedIsAdmin === 'true')
  }

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  useEffect(() => {
    setConnected(walletConnected)
  }, [walletConnected, loading])

  const handleSetTmonkAuth = () => {
    setTmonkMintAuthority(newTmonkAuth)
    setIsDialogOpen(false)
    toast.success('TmonkMintAuthority updated successfully')
  }

  const handleSetPresaleIdentifier = async (e) => {
    e.preventDefault();
    const newIdentifier = parseInt(e.target.presaleIdentifier.value);
    if (isNaN(newIdentifier)) {
      toast.error('Please enter a valid number for the presale identifier');
      return;
    }
    setPresaleIdentifier(newIdentifier);
    try {
      const response = await axios.post('/api/presaleIdentifier', { data: JSON.stringify(newIdentifier) });
      if (response.status === 201) {
        toast.success('Presale identifier updated successfully');
        const currentResponse = await setCurrentPresaleInDB(newIdentifier);
        if (currentResponse && currentResponse.success) {
          toast.success(`Presale round ${newIdentifier} is set as current presale`);
        } else {
          throw new Error('Failed to set current presale');
        }
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error saving presale identifier:', error);
      toast.error('Failed to update presale identifier or set current presale');
    }
  };
  const renderPresaleInfo = async () => {
    const response = await axios.get('/api/presale');
    const fetchedPresaleInfoFromDatabase = response.data;
    if (!fetchedPresaleInfoFromDatabase && !presaleInfo) {
      return (
        <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-bold">No Active Presales</h2>
          <p>There are currently no active presales.</p>
        </div>
      );
    }
    if (!presaleInfo) {
      return (
        <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Current Presale Information</h2>

          <div className="p-4 mb-4 border rounded">
            <h3 className="mb-2 text-xl font-semibold">Presale {fetchedPresaleInfoFromDatabase.presaleInfo.presaleIdentifier}</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="font-semibold">Token Mint Address:</p>
                <p className="text-sm break-all">{fetchedPresaleInfoFromDatabase.presaleInfo.tokenMintAddress.toString()}</p>
              </div>
              <div>
                <p className="font-semibold">Soft Cap:</p>
                <p>{fetchedPresaleInfoFromDatabase.presaleInfo.softcapAmount.toString()} SOL</p>
              </div>
              <div>
                <p className="font-semibold">Hard Cap:</p>
                <p>{fetchedPresaleInfoFromDatabase.presaleInfo.hardcapAmount.toString()} SOL</p>
              </div>
              <div>
                <p className="font-semibold">Deposited Token Amount:</p>
                <p>{fetchedPresaleInfoFromDatabase.presaleInfo.depositTokenAmount.toString()} tokens</p>
              </div>
              {/* <div>
                <p className="font-semibold">Sold Token Amount:</p>
                <p>{fetchedPresaleInfoFromDatabase.presaleInfo.soldTokenAmount.toString()} tokens</p>
              </div> */}
              <div>
                <p className="font-semibold">End Time:</p>
                <p>{new Date(fetchedPresaleInfoFromDatabase.presaleInfo.endTime.toNumber() * 1000).toLocaleString()}</p>
              </div>
              <div>
                <p className="font-semibold">Max Token Per Address:</p>
                <p>{fetchedPresaleInfoFromDatabase.presaleInfo.maxTokenAmountPerAddress.toString()} tokens</p>
              </div>
              <div>
                <p className="font-semibold">Price Per Token:</p>
                <p>{fetchedPresaleInfoFromDatabase.presaleInfo.pricePerToken.toString()} lamports</p>
              </div>
              {/* <div>
                <p className="font-semibold">Is Live:</p>
                <p>{fetchedPresaleInfoFromDatabase.presaleInfo.isLive ? 'Yes' : 'No'}</p>
              </div> */}
              {/* <div>
                <p className="font-semibold">Is Soft Capped:</p>
                <p>{fetchedPresaleInfoFromDatabase.presaleInfo.isSoftCapped ? 'Yes' : 'No'}</p>
              </div> */}
              {/* <div>
                <p className="font-semibold">Is Hard Capped:</p>
                <p>{fetchedPresaleInfoFromDatabase.presaleInfo.isHardCapped ? 'Yes' : 'No'}</p>
              </div> */}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Current Presale Information</h2>

        <div className="p-4 mb-4 border rounded">
          <h3 className="mb-2 text-xl font-semibold">Presale {presaleInfo.presaleIdentifier}</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="font-semibold">Token Mint Address:</p>
              <p className="text-sm break-all">{presaleInfo.tokenMintAddress.toString()}</p>
            </div>
            <div>
              <p className="font-semibold">Soft Cap:</p>
              <p>{presaleInfo.softcapAmount.toString()} SOL</p>
            </div>
            <div>
              <p className="font-semibold">Hard Cap:</p>
              <p>{presaleInfo.hardcapAmount.toString()} SOL</p>
            </div>
            <div>
              <p className="font-semibold">Deposited Token Amount:</p>
              <p>{presaleInfo.depositTokenAmount.toString()} tokens</p>
            </div>
            <div>
              <p className="font-semibold">Sold Token Amount:</p>
              <p>{presaleInfo.soldTokenAmount.toString()} tokens</p>
            </div>
            <div>
              <p className="font-semibold">End Time:</p>
              <p>{new Date(presaleInfo.endTime.toNumber() * 1000).toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold">Max Token Per Address:</p>
              <p>{presaleInfo.maxTokenAmountPerAddress.toString()} tokens</p>
            </div>
            <div>
              <p className="font-semibold">Price Per Token:</p>
              <p>{presaleInfo.pricePerToken.toString()} lamports</p>
            </div>
            <div>
              <p className="font-semibold">Is Live:</p>
              <p>{presaleInfo.isLive ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p className="font-semibold">Is Soft Capped:</p>
              <p>{presaleInfo.isSoftCapped ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p className="font-semibold">Is Hard Capped:</p>
              <p>{presaleInfo.isHardCapped ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      </div>
    );

  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Create Presale</title>
        <meta name="description" content="Create a new presale for token sales" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BasicPage activePage={'Create'}>
        <Toaster position="top-right" />
        <div className="relative flex flex-row items-center justify-center min-h-screen py-2">
          {isAdmin && (
            <>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="absolute px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md top-36 right-4 hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Set TmonkAuth
              </button>
              <form onSubmit={handleSetPresaleIdentifier} className="absolute top-36 right-40">
                <input
                  type="number"
                  name="presaleIdentifier"
                  defaultValue={presaleIdentifier}
                  onChange={(e) => setPresaleIdentifier(Number(e.target.value))}
                  className="px-4 py-2 text-sm border rounded-l-md"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-purple-600 rounded-r-md hover:bg-purple-700"
                >
                  Set Presale ID
                </button>
              </form>
            </>
          )}
          {!connected && (
            <div className='flex flex-col items-center justify-center pt-48 text-center -mb-30'>
              <div className='text-5xl text-purple-600 font-handwritten'>
                Now you are disconnected. <br />
                Connect your wallet!
              </div>
              <ConnectWalletCard />
            </div>
          )}
          {connected && !loading && isAdmin && (
            <div className='flex flex-col items-center justify-center pt-48 text-center'>
              {/* {renderPresaleInfo()} */}
              {(!presaleInfo) && <CreatePresaleForm />}
              {presaleInfo && (
                <div className="mt-6 text-2xl font-bold text-purple-600">
                  Presale is active. Create presale form is not available.
                </div>
              )}
            </div>
          )}
          {loading && (
            <div className='flex items-center justify-center h-screen'>
              <ClipLoader color={'#6B46C1'} loading={loading} size={50} />
            </div>
          )}
        </div>
        {isDialogOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                        Set TmonkMintAuthority
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Enter the new TmonkMintAuthority value here. Click save when you're done.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <input
                      type="text"
                      value={newTmonkAuth}
                      onChange={(e) => setNewTmonkAuth(e.target.value)}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                      placeholder="Enter new TmonkAuth"
                    />
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleSetTmonkAuth}
                  >
                    Save changes
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </BasicPage>
    </>
  )
}