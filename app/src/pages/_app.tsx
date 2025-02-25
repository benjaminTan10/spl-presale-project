import React from 'react';
import { AppProps } from 'next/app';
import '../styles/index.css';
import '../styles/wallet-adapter.css'
import { WalletConnectProvider } from '../components/wallet/WalletConnectProvider';
import Script from "next/script";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletConnectProvider>
      <Component {...pageProps} />
    </WalletConnectProvider>
  );
}

export default MyApp;