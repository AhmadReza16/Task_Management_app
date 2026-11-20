import { motion, useReducedMotion } from "framer-motion";

const FadeIn = ({
  children,
  delay = 0,
  duration = 0.45,
  x = 0,
  y = 25,
  className = "",
  once = true,
  amount = 0.2,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const initialState = shouldReduceMotion
    ? {
        opacity: 1,
        x: 0,
        y: 0,
      }
    : {
        opacity: 0,
        x,
        y,
      };

  const visibleState = {
    opacity: 1,
    x: 0,
    y: 0,
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

export default FadeIn;
