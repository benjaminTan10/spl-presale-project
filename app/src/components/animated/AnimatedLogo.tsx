import React from 'react';
import { motion } from 'framer-motion';

const logoAnimation = {
    initial: { scale: 0.5, opacity: 0, rotate: -180},
    animate: {scale: 1, opacity: 1, rotate: 0, transition: {type:'spring',
    bounce:0.4,
    duration: 1.5,
    delay: 0.5
    }},
    exit: {scale: 0.5, opacity: 0, rotate: -180, transition:{duration: 1.5}},
  }

  
  const AnimatedLogoMd = (props) => {
    return (
        <motion.img variants={logoAnimation} initial='initial' animate='animate' exit='exit'
          className={`h-[60px] sm:h-[80px] pl-1 pr-2 sm:px-3 cursor-pointer ${props.className}`}
          src={'/images/BonkLogo.png'} alt='' onClick={props.onClick}
          />
    );
  }

  const AnimatedLogoLg = (props) => {
    return (
        <motion.img variants={logoAnimation} initial='initial' animate='animate' exit='exit'
          className=' h-[200px] sm:h-[60vh] sm:max-h-[500px] w-[200px] sm:w-auto pointer-events-none self-center mx-auto'
          src={'/images/BonkLogo.png'} alt='' onClick={props.onClick}
          />
    );
  }
  
  export {AnimatedLogoLg}
  export default AnimatedLogoMd;


  