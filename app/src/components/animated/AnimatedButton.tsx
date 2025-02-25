import { motion } from 'framer-motion';

const AnimatedButton = (props) => {
  const buttonVariants = {
    hover: {
      scale: 1.05,
    },
    pressed: {
      scale: 0.95,
    },
    rest: {
      scale: 1,
    }
  };

  return (
    <motion.button
      initial="rest"
      whileHover="hover"
      whileTap="pressed"
      variants={buttonVariants}
      className={`text-xl text-cC ${props.className} bg-cB py-3 px-7 rounded-lg`}
      onClick={props.onClick}
    >
      {props.text}
    </motion.button>
  );
};
export default AnimatedButton