import React from 'react';
import AnimatedOnViewTitleLg from '../animated/AnimatedOnViewTitleLg';
import aboutInfo from './aboutInfo';
import AnimatedInfoCard from '../animated/AnimatedInfoCard';
import AnimatedOnViewP from '../animated/AnimatedOnViewP';
import { motion } from 'framer-motion';

const AboutSection = () => {

    const topicText = `As admin, you can create presale your self and control that`;
    const aboutElements = aboutInfo.map(
        item => {
            return (
                <AnimatedInfoCard key={item.id} title={item.title} description={item.description} link={item.link} />
            )
        }
    )

    return (
        <div className='w-full text-center bg-gray-100 text-cC'>
            <motion.div className='max-w-[1240px] mx-auto px-4 pb-16 pt-36 overflow-hidden'>
                <AnimatedOnViewTitleLg className="mb-6 " text='Build your presale' />
                <AnimatedOnViewP className='mb-8 text-black' text={topicText} />
                <motion.div className='flex justify-center flex-row max-w-[1240px] flex-wrap overflow-hidden'>
                    {aboutElements}
                </motion.div>
            </motion.div>
        </div>
    );
}

export default AboutSection;