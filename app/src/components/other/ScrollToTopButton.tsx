"use client"
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const goToTop = () => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

export default function ScrollToTop() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", updatePosition);

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  const arrowUp = (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="chevron-up"
      className="arrowUp"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        fill="currentColor"
        d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
      ></path>
    </svg>
  );

  return (
    <AnimatePresence>
      {scrollPosition > 100 && (
        <motion.button
          onClick={goToTop}
          className="z-40 px-0 py-0 scrollToTop-btn right-[30px]"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.7, transition: { duration: 0.6 } }}
          exit={{ y: 100, opacity: 0, transition: { duration: 0.6 } }}
          whileHover={{
            scale: 1.3,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 1 }}
        >
          {arrowUp}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
