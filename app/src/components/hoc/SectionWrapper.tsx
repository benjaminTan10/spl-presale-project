import { motion } from "framer-motion";

import { styles } from "../../styles/roadmap";
import { staggerContainer } from "../../utils/motion";

const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl w-screen relative z-0`}
        // className={`${styles.padding} max-w-7xl my-0 w-full relative z-0  bg-gradient-to-r from-green-400 to-lime-500`}
        id={idName}
      >
        <div className="flex justify-center mx-auto from-green-400 to-yellow-400">
          <Component />
        </div>
      </motion.section>
    );
  };

export default StarWrapper;
