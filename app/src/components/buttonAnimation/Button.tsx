'use client';

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from 'axios';
import SignupModal from '../auth/SignupModal';
import usePresale from "../../hooks/usePresale";
import NotificationModal from './NotificationModal';
import toast from "react-hot-toast";
import {Notification } from '../notification'

const ButtonAnimation = () => {
    const { publicKey } = usePresale();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('who@gmail.com');
    const [username, setUsername] = useState('');
    const [isNofifyModalOpen, setIsNotifyModalOpen] = useState(false);
    const [notifyText, setNotifyText] = useState('waiting for applying ...');
    const [showMobileButtons, setShowMobileButtons] = useState(false);
    const [showNotification, setShowNotification] = useState<{
        message: string; type: 'success' | 'error' | 'info';
        onClose: () => void
    } | null>(null);

    const goToPresale = () => {
        const presaleElement = document.getElementById('presalePanel');
        if (presaleElement) {
            presaleElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }
    };

    const airdropTriggered = () => {
        setIsModalOpen(true);
    };
    const onNotifyClose = () => {
        setIsNotifyModalOpen(false);
    };
    const airdropAction = async () => {
        if (!publicKey) {
            toast.error("Please connect your wallet");
            return;
        }
        try {
            const currentTime = new Date().toISOString();
            setNotifyText('waiting for applying ...');
            setIsNotifyModalOpen(true);
            const response = await axios.post('/api/requireAirdrop', {
                publicKey: publicKey.toString(),
                currentTime: currentTime,
                email: email,
            });
            setNotifyText('successfully applied.');
            setIsNotifyModalOpen(false);
            setShowNotification({ message: `Airdrop application successful! `, type: 'success', onClose: () => setShowNotification(null) });
        } catch (error) {
            console.error('Error applying for airdrop:', error);
            setShowNotification({ message: `Error: ${error.message}`, type: 'error', onClose: () => setShowNotification(null) });
            toast.error(`Error: ${error.message}`);
            throw error;
        }
    };

    return (
        <>
            {showNotification && (
                <Notification
                    message={showNotification.message}
                    type={showNotification.type}
                    onClose={showNotification.onClose}
                />
            )}
            <SignupModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                setEmail={setEmail}
                setUsername={setUsername}
                username={username}
                email={email}
                airdropAction={airdropAction}
            />
            <NotificationModal isNofifyModalOpen={isNofifyModalOpen} onNotifyClose={onNotifyClose} />
            
            {/* Desktop Buttons (md and larger screens) */}
            <div className="hidden md:block">
                <button 
                    onClick={goToPresale}
                    className="fixed bottom-[140px] right-[30px] z-50 text-white font-bold rounded">
                    <Image src="/monkey/buy.webp" width={60} height={60} alt="buy" />
                </button>
                <div className="fixed bottom-[140px] right-[30px] z-40 animate-ping">
                    <Image src="/monkey/buy.webp" width={60} height={60} alt="buy" />
                </div>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed bottom-[250px] right-[30px] z-20"
                    onClick={airdropTriggered}
                    id='airdrop'
                >
                    <Image src="/monkey/airdrop.webp" width={60} height={60} alt="airdrop" />
                </motion.button>
            </div>

            {/* Mobile Bar and Buttons (smaller than md screens) */}
            <div 
                className="md:hidden fixed right-0 top-1/2 -translate-y-1/2 z-50"
                onMouseEnter={() => setShowMobileButtons(true)}
                onMouseLeave={() => setShowMobileButtons(false)}
                onTouchStart={() => setShowMobileButtons(true)}
            >
                {/* Bar indicator */}
                <div className="w-2 h-32 bg-green-500 rounded-l-lg opacity-70"></div>
                
                {/* Mobile Buttons Container */}
                <motion.div
                    initial={{ x: 100 }}
                    animate={{ x: showMobileButtons ? 0 : 100 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute right-0 top-0 flex flex-col gap-4 bg-white/80 p-3 rounded-l-lg backdrop-blur-sm"
                >
                    <button 
                        onClick={goToPresale}
                        className="text-white font-bold rounded"
                    >
                        <Image src="/monkey/buy.webp" width={40} height={40} alt="buy" />
                    </button>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={airdropTriggered}
                        id='airdrop'
                    >
                        <Image src="/monkey/airdrop.webp" width={40} height={40} alt="airdrop" />
                    </motion.button>
                </motion.div>
            </div>
        </>
    );
};

export default ButtonAnimation;