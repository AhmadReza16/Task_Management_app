import { motion, useReducedMotion } from "framer-motion";

const StaggerItem = ({
  children,
  className = "",
  x = 0,
  y = 25,
  duration = 0.45,
  scale = 1,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: shouldReduceMotion
      ? {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        }
      : {
          opacity: 0,
          x,
          y,
          scale,
        },

    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    },
  };

  return (
    <motion.div
      className={className}
      variants={itemVariants}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default StaggerItem;
