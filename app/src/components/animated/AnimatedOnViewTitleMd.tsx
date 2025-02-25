import React from 'react';
import { motion } from 'framer-motion';



const AnimatedOnViewTitleMd = (props) => {

    const titleAnimate = {
        offscreen:{opacity:0, scale:0.7},
        onscreen:{
            opacity:1,
            scale:1,
            transition: {type:'spring',
            bounce:0.5,
            duration: 1.5,
            delay: 0 + props.delay,
            }
        }
    }
    
    return (
            <motion.h1
            initial={'offscreen'}
            whileInView={'onscreen'}
            viewport={{ once:true, amount:1 }}
            onClick={props.onClick}
            variants={titleAnimate} className={`py-4 text-4xl sm:text-5xl md:text-7xl font-semibold ${props.className}`}>
                    {props.text}
            </motion.h1>
    );
}

export default AnimatedOnViewTitleMd;
