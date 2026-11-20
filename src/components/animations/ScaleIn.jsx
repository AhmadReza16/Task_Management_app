import { motion, useReducedMotion } from "framer-motion";

const ScaleIn = ({
  children,
  delay = 0,
  duration = 0.35,
  scale = 0.95,
  className = "",
  once = true,
  amount = 0.2,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const initialState = shouldReduceMotion
    ? {
        opacity: 1,
        scale: 1,
      }
    : {
        opacity: 0,
        scale,
      };

  const visibleState = {
    opacity: 1,
    scale: 1,
  };

  return (
    <motion.div
      className={className}
      initial={initialState}
      whileInView={visibleState}
      viewport={{
        once,
        amount,
      }}
      transition={{
        delay: shouldReduceMotion ? 0 : delay,
        duration: shouldReduceMotion ? 0 : duration,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScaleIn;
