"use client";

import { motion } from "framer-motion";

const Marquee = ({ children, speed = 50, direction = "left" }) => {
  const duplicateCount = 3;
  
  return (
    <div className="overflow-hidden whitespace-nowrap flex">
      <motion.div
        className="flex"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {[...Array(duplicateCount)].map((_, i) => (
          <div key={i} className="flex-shrink-0 flex items-center">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
