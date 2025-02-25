import React from 'react';
import { motion } from 'framer-motion';

const pAnimate = {
    offscreen:{opacity:0, scale:0.6},
    onscreen:{
        opacity:1,
        scale:1,
        transition: {type:'spring',
        bounce:0.4,
        duration: 1.5
        }
    }
}


const AnimatedOnViewP = (props) => {
    return (
            <motion.p
            initial={'offscreen'}
            whileInView={'onscreen'}
            viewport={{ once:true, amount:0.5 }}
            
            variants={pAnimate} className={`py-4 text-xl ${props.className}`} >
                    {props.text}
            </motion.p>
    );
}

export default AnimatedOnViewP;
