import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const AnimatedLinkButton = (props) => {
  const buttonVariants = {
    hover: {
      scale: 1.1,
    },
    pressed: {
      scale: 0.9,
    },
    rest: {
      scale: 1,
    }
  };
  const router = useRouter()

  const handleButtonClick = (route) => {
    router.push(route)
  }

  return (
    <motion.button
      initial="rest"
      whileHover="hover"
      whileTap="pressed"
      variants={buttonVariants}
      className={`text-xl text-cC ${props.className}`}
      onClick={() => handleButtonClick(props.route)}
    >
      {props.text}
    </motion.button>
  );
};
export default AnimatedLinkButton