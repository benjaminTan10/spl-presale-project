import React from 'react';
import { motion } from 'framer-motion';

const cardAnimate = {
    offscreen:{x:-100, opacity:0, scale:0.5},
    onscreen:{
        x:0,
        opacity:1,
        scale:1,
        transition: {type:'spring',
        bounce:0.4,
        duration: 3
        }
    }
}


const AnimatedOnViewCard = (props) => {
    return (
        <motion.div className='flex' 
        initial={'offscreen'}
        whileInView={'onscreen'}
        viewport={{ once:true, amount:0.2 }}
        transition={{staggerChildren:0.5}}
        >
            <motion.div variants={cardAnimate} className=' flex-col border text-left rounded-2xl py-12 px-8'>
                <motion.div className='bg-cB inline-flex p-2 rounded-full'>
                    {props.icon}
                </motion.div>
                <motion.h3 className='text-xl font-bold py-4'>{props.heading}</motion.h3>
                <motion.p>
                    {props.text}
                </motion.p>
            </motion.div>
        </motion.div>
    );
}

export default AnimatedOnViewCard;
