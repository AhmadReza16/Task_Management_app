import { motion, useReducedMotion } from "framer-motion";

const StaggerContainer = ({
  children,
  className = "",
  stagger = 0.12,
  delay = 0,
  once = true,
  amount = 0.2,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: shouldReduceMotion
        ? {
            staggerChildren: 0,
            delayChildren: 0,
          }
        : {
            staggerChildren: stagger,
            delayChildren: delay,
          },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount,
      }}
    >
      {children}
    </motion.div>
  );
};

export default StaggerContainer;
