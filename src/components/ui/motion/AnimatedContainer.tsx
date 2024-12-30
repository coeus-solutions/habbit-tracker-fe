import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface AnimatedContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({ 
  children, 
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};