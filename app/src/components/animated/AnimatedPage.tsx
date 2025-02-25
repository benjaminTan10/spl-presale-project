import React from "react"
import { motion } from "framer-motion"

const pageAnimations = {
    initial: { scale: 1, opacity: 0},
    animate: {scale: 1, opacity: 1},
    exit: {scale: 1, opacity: 0, transition:{duration: 0.5}},
}

const AnimatedPage = ({children}) => {
    return (
        <motion.div  variants={pageAnimations} initial='initial' animate='animate' exit='exit' transition={{duration:1 }}>
            {children}
        </motion.div>
    )
}

export default AnimatedPage