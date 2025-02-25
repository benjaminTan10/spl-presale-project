import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaTwitterSquare, FaGithub, FaDiscord, FaInstagram, FaTelegram } from "react-icons/fa";
import XIcon from "./xicon.png"
import Subscribe from './SubscribeForm'

const TWITTER_LINK = 'https://twitter.com/@TMONK777';
const GITHUB_LINK = 'https://github.com/TowerTransition';
const TREE_LINK = 'https://linktr.ee/';
const INSTAGRAM_LINK = 'https://www.instagram.com/tmonk777/';
const DISCORD_LINK = 'https://discord.gg/2aNj737F';
const TELEGRAM_LINK = 'https://t.me/+gcK4YOe5sXZjZWY5';

const BasicFooter = () => {
  const router = useRouter();

  return (
    <div className='bottom-0 flex flex-col justify-center py-16 text-center align-middle bg-gradient-to-r from-green-400 to-yellow-400 text-cC'>
      <p className='text-2xl font-light text-green-900'>Copyright © 2024 - All right reserved</p>
      <div className='flex justify-center align-middle md:flex-row xs:flex-col'>
        <div className='flex:1'></div>
        <div className='flex flex-row items-center justify-center align-middle flex:1'>
          <Image src={XIcon} alt="" className='mx-6 mt-4 xs:h-[30px] xs:w-[30px] md:h-[50px] md:w-[50px] m-3 text-gray-800 transition-all duration-300 cursor-pointer hover:scale-75' onClick={() => window.open(TWITTER_LINK, "_blank")} />
          <FaGithub size={50} className='mx-6 text-gray-800 transition-all duration-300 cursor-pointer hover:text-gray-600 hover:scale-90' onClick={() => window.open(GITHUB_LINK, "_blank")} />
          <FaDiscord size={50} className='mx-6 text-indigo-600 transition-all duration-300 cursor-pointer hover:text-indigo-800 hover:scale-90' onClick={() => window.open(DISCORD_LINK, "_blank")} />
          <FaInstagram size={50} className='mx-6 text-pink-500 transition-all duration-300 cursor-pointer hover:text-pink-700 hover:scale-90' onClick={() => window.open(INSTAGRAM_LINK, "_blank")} />
          <FaTelegram size={50} className='mx-6 text-blue-400 transition-all duration-300 cursor-pointer hover:text-blue-600 hover:scale-90' onClick={() => window.open(TELEGRAM_LINK, "_blank")} />
          {/* <SiTwitter size={50} className='mx-6 mt-4 text-green-500 transition-all duration-300 cursor-pointer hover:text-green-700' onClick={() => window.open(TREE_LINK, "_blank")} /> */}
        </div>
        <div className='flex:1'>
          <Subscribe />
        </div>
      </div>
    </div>
  );
}
export default BasicFooter;
