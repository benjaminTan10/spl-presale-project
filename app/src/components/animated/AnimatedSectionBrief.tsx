import React, {useState, useEffect} from 'react';
import AnimatedLinkButton from './AnimatedLinkButton';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { goToTop } from '../../utils/ScrollToTopOnLoad';
import Image from 'next/image';

const AnimatedSectionBrief = (props) => {

  const [isMobile, setisMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setisMobile(true);
    }

    return () => {
    };
  }, []);


  const router = useRouter();

  const handleButtonClick = (route) => {
    router.push(route)
  }

  const sectionVariants = {
    hover: {
      scale: 1.2,
      transition: {type:'spring',
        bounce:0.5,
        duration: 1.5
        }
    },
    inView: {
      scale: 1.1,
      transition: {type:'spring',
        bounce:0.5,
        duration: 1.5
        }
    },
    pressed: {
      scale: 0.9,
    },
    rest: {
      scale: 1,
      transition: {type:'spring',
        bounce:0.5,
        duration: 1
        }
    }
  };


  return (
    <div className=' overflow-hidden'>
    <motion.div className={`w-full h-[60vh] md:h-[70vh] lg:h-[60vh] relative cursor-pointer ${props.sectionDivClassName}`}
    initial="rest"
    whileTap={isMobile ? "" : "pressed"}
    whileInView={ 'inView' }
    viewport={{ once:false, amount:0.7 }}
    variants={ sectionVariants}
    onClick={() => {handleButtonClick(props.route); goToTop();}}
    >
      

        <Image
        className='object-cover h-full w-full absolute z-0 pointer-events-none '
        width={100} height={100}
        src={props.sectionImg} 
        alt=''
        />


      <div className='w-full h-full flex flex-col justify-center items-center text-cC px-10 md:px-4 text-center z-20 text-3xl sm:text-4xl md:text-6xl'>
        
      <div className='z-20 bg-cB rounded-2xl px-2 md:px-4 py-2 opacity-80'>
        <h1 className={`z-20 font-semibold text-2xl sm:text-4xl md:text-6xl ${props.textClassName}`}> 
        {props.text}
        </h1>
      </div>

        <AnimatedLinkButton text={props.bText} route={props.route} className='mt-5 opacity-70 font-semibold text-3xl sm:text-4xl md:text-6xl bg-gradient-to-r from-[black] to-[black]'/>

      </div>
    </motion.div>
    {/* <div className='relative pointer-events-none w-full min-h-[100px] h-[100px] bg-cA z-30'></div> */}
    </div>
  );
};

export default AnimatedSectionBrief;
