"use client";

import { motion } from "framer-motion";

const Marquee = ({ children, speed = 50, direction = "left" }) => {
  const duplicateCount = 3;
  
  return (
    <div className="relative overflow-hidden whitespace-nowrap flex py-2">
      {/* Left fade overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none"></div>
      
      {/* Right fade overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none"></div>
      
      {/* Top fade overlay */}
      <div className="absolute left-0 right-0 top-0 h-4 bg-gradient-to-b from-[#0a0a0a]/60 to-transparent z-10 pointer-events-none"></div>
      
      {/* Bottom fade overlay */}
      <div className="absolute left-0 right-0 bottom-0 h-4 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent z-10 pointer-events-none"></div>
      
      <motion.div
        className="flex items-center"
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
          <motion.div 
            key={i} 
            className="flex-shrink-0 flex items-center"
            style={{ willChange: 'transform' }}
          >
            {children}
          </motion.div>
        ))}
      </motion.div>
      
      {/* Add subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent z-0 pointer-events-none"></div>
    </div>
  );
};

export default Marquee;
