import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  transitionKey?: string;
  duration?: number;
  transitionType?: 'fade' | 'slide' | 'scale' | 'flip';
}

/**
 * PageTransition component that provides smooth animations when navigating between routes
 * @param children - The route components to be rendered
 * @param transitionKey - Unique identifier for the route (defaults to pathname)
 * @param duration - Animation duration in seconds (default: 0.3)
 * @param transitionType - Type of transition animation (default: 'fade')
 */
const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  transitionKey,
  duration = 0.7,
  transitionType = 'fade'
}) => {
  const location = useLocation();
  const key = transitionKey || location.pathname;
  
  // Define different animation variants
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slide: {
      initial: { x: '100%', opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '-100%', opacity: 0 }
    },
    scale: {
      initial: { scale: 1, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.8, opacity: 0 }
    },
    flip: {
      initial: { rotateY: 90, opacity: 0 },
      animate: { rotateY: 0, opacity: 1 },
      exit: { rotateY: -90, opacity: 0 }
    }
  };

  // Select the appropriate animation variant
  const selectedVariant = variants[transitionType];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={selectedVariant}
        transition={{ 
          duration, 
          ease: "easeIn" 
        }}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
