import React from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from './AnimatedButton';
import { useRouter } from 'next/router';
import { goToTop } from '../../utils/ScrollToTopOnLoad'
import Image from 'next/image';

// const teamImages = [{
//     image: '/images/BonkLogo.png',
//     name: 'create',
//     title: 'create',
// }
// ];
const cardAnimate = {
    offscreen: { opacity: 0, scale: 0.5 },
    onscreen: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            bounce: 0.3,
            duration: 2
        }
    }
}
const AnimatedInfoCard = (props) => {
    const router = useRouter();

    return (
        <motion.div className='flex m-3' key={props.id}
            initial={'offscreen'}
            whileInView={'onscreen'}
            viewport={{ once: true, amount: 0.4 }}
            variants={cardAnimate}
        >
            <motion.div variants={cardAnimate} className=' flex-col border-2 text-center rounded-3xl py-6 pb-3 px-8 w-[260px] md:w-[300px] lg:w-[360px] border-black' >
                <h3 className='text-xl font-bold py-0 text-cB'>{props.title}</h3>
                {/* <Image width={60} height={60} src={teamImages[0].image} alt='' className='w-[260px] md:w-[300px] lg:w-[360px] rounded-2xl my-4' /> */}
                <h3 className='text-xl font-normal pb-2 text-[black]'>{props.description}</h3>
                <div className='flex h-30 py-auto px-3 md:px-5 align-end mt-7 mb-3'>
                    <AnimatedButton type="submit" text={props.title} className="mx-auto bg-" onClick={() => { router.push(props.link); goToTop(); }} />
                </div>
            </motion.div>
        </motion.div>
    );
}

export default AnimatedInfoCard;