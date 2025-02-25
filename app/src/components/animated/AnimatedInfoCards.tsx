import React from 'react';
import { motion} from 'framer-motion';

const cardAnimate = {
    offscreen:{ opacity:0, scale:0.5},
    onscreen:{
        opacity:1,
        scale:1,
        transition: {type:'spring',
        bounce:0.5,
        duration: 1.5
        }
    }
    }




const AnimatedInfoCard = (props) => {

    // async function sequence() {
    //     await animation.start({ rotateY:90, transition: {duration:0.4} })
    //     setIsRevealed(prevRevealed => !prevRevealed);
    //     await animation.start({ rotateY:0, transition: {duration:0.4} })
    //     animation.start({ rotateY:0 })
    // }


    return (
        
        <motion.div className='flex m-3' >
            <motion.div className=' flex-col text-center rounded-2xl py-1 w-[200px] lg:w-[216px] ' >
                
                <motion.h3 className='text-3xl sm:text-4xl lg:text-4xl font-bold px-0 py-0 pb-2 whitespace-nowrap'>{props.title}</motion.h3>
                <motion.h3 className={`text-2xl sm:text-2xl font-normal text-cB ${props.infoClassName}`}>{props.info}</motion.h3>
            </motion.div>
        </motion.div>
    );
}

const AnimatedInfoCards = (props) => {
    

    return (
        <div className='w-full bg-cA text-cC text-center'>
            <motion.div className='max-w-[1240px] mx-auto py-4 sm:px-4 sm:py-10 '>
                <motion.div className='flex justify-around flex-row max-w-[1240px] flex-wrap' initial={'offscreen'}
                whileInView={'onscreen'}
                viewport={{ once:true, amount:0.4 }}
                variants={cardAnimate}>
                    <AnimatedInfoCard key={props.title1} title={props.title1} info={props.info1} infoClassName={props.infoClassName1} />
                    <AnimatedInfoCard key={props.title2} title={props.title2} info={props.info2} infoClassName={props.infoClassName2} />
                    <AnimatedInfoCard key={props.title3} title={props.title3} info={props.info3} infoClassName={props.infoClassName3} />
                    <AnimatedInfoCard key={props.title4} title={props.title4} info={props.info4} infoClassName={props.infoClassName4} />
                </motion.div>
            </motion.div>
        </div>
    );
}

export default AnimatedInfoCards;