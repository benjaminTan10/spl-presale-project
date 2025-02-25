'use client';

import React from 'react';
import {motion} from 'framer-motion';

const SignupModal = ({isOpen,onRequestClose,email,username,setEmail,setUsername,airdropAction}) => {
  if(!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    airdropAction();
    onRequestClose();
  };

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <motion.div
        initial={{y: -50,opacity: 0}}
        animate={{y: 0,opacity: 1}}
        className="w-full max-w-md p-8 bg-white rounded-lg"
      >
        <h2 className="mb-4 text-2xl font-bold text-center text-green-600">Join the $TMONK Troop!</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            id="userEmail"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full p-2 text-white transition-colors bg-green-500 rounded hover:bg-green-600">
            Apply for Airdrop
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-600">
          <h3 className="mb-2 font-bold">Airdrop Rules:</h3>
          <ul className="pl-5 space-y-1 list-disc">
            <li>Join our <a href="https://discord.com/invite/cpjsEXcKvU" className="text-blue-500 hover:underline">Discord</a> community</li>
            <li>Follow us on <a href="https://twitter.com/@TMONK777" className="text-blue-500 hover:underline">Twitter</a></li>
            <li>Follow us on <a href="https://www.instagram.com/tmonk777/" className="text-blue-500 hover:underline">Instagram</a></li>
            <li>Follow us on <a href='https://t.me/+gcK4YOe5sXZjZWY5' className="text-blue-500 hover:underline">Telegram</a></li>
            <li>Hold a minimum balance of 100 $TMONK tokens</li>
            <li>Participate in community events and discussions</li>
            <li>Refer friends to join the $TMONK ecosystem</li>
          </ul>
        </div>
        <p className="mt-4 text-xs text-center text-gray-500">
          All trading involves risk. Only risk capital you're prepared to lose.
        </p>
        <button onClick={onRequestClose} className="w-full p-2 mt-4 text-white transition-colors bg-red-500 rounded hover:bg-red-600">
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default SignupModal;