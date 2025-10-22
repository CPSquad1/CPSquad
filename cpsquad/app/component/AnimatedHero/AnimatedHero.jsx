"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import DecryptedText from './DecryptedText';
import '../../glitch.css';

const AnimatedHero = () => {
  // Cycling texts for decrypted animation
  const texts = [
    "WELCOME TO CP SQUAD_",
    "IF YOU LOVE CODING_",
    "YOU'RE AT THE RIGHT PLACE_",
    "SOLVE PROBLEMS_"
  ];
  
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [key, setKey] = useState(0);

  // Cycle through texts automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      setKey(prev => prev + 1); // Force re-render of DecryptedText
    }, 4000);

    return () => clearInterval(interval);
  }, [texts.length]);

  // Delta Triangle Background with Matrix Characters (Static Pattern)
  const DeltaTriangleBackground = () => {
    const [triangleChars, setTriangleChars] = useState([]);
    const matrixChars = "abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*";

    useEffect(() => {
      const createTriangleMatrix = () => {
        const chars = [];
        const rows = 20; // Reduced rows for smaller triangle
        
        for (let row = 0; row < rows; row++) {
          // Calculate characters per row (triangle shape - wider at bottom)
          const charsInRow = Math.floor(3 + (row * 1.8));
          const rowWidth = charsInRow * 2; // Total width of this row
          const startX = 50 - (rowWidth / 2); // Center each row
          
          for (let col = 0; col < charsInRow; col++) {
            const randomBrightness = 0.4 + Math.random() * 0.6;
            chars.push({
              id: `char-${row}-${col}`,
              char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
              x: startX + (col * 2), // Horizontal spacing
              y: 15 + (row * 3), // Vertical spacing - starts lower for centered triangle
              brightness: randomBrightness,
              glowDelay: Math.random() * 5, // Random glow timing
            });
          }
        }
        
        setTriangleChars(chars);
      };

      createTriangleMatrix();

      // Refresh characters occasionally for variety
      const interval = setInterval(createTriangleMatrix, 12000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dense Triangle Matrix Characters - Static with subtle glow */}
        {triangleChars.map((charData) => (
          <motion.div
            key={charData.id}
            className="absolute font-mono text-[#00ff00] select-none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: charData.brightness,
            }}
            transition={{
              duration: 0.3,
              delay: charData.glowDelay * 0.1,
            }}
            style={{
              left: `${charData.x}%`,
              top: `${charData.y}%`,
              fontSize: 'clamp(8px, 1vw, 12px)',
              textShadow: `0 0 5px rgba(0, 255, 0, ${charData.brightness * 0.8})`,
              filter: `brightness(${charData.brightness})`,
              fontWeight: 400,
              lineHeight: 1,
            }}
          >
            {charData.char}
          </motion.div>
        ))}

        {/* Subtle random character flicker effect */}
        <style jsx>{`
          @keyframes subtle-flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}</style>
      </div>
    );
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Delta Triangle Background - Only the triangle */}
      <DeltaTriangleBackground />

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto w-full">
        {/* Animated Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          {/* Main Title: CP SQUAD (Delta Force Style) */}
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            className="text-white font-bold mb-6 sm:mb-8 md:mb-10 tracking-wider relative z-30"
            style={{
              fontSize: 'clamp(3.5rem, 15vw, 9rem)',
              fontFamily: "'Pixelify Sans', 'Arial Black', 'Helvetica', sans-serif",
              fontWeight: 900,
              letterSpacing: 'clamp(0.3em, 3vw, 0.8em)',
              textShadow: '6px 6px 12px rgba(0, 0, 0, 0.9)',
              lineHeight: 1,
            }}
          >
            CP SQUAD
          </motion.h1>

          {/* Decrypted Text Animation - Green text like Delta Force */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3rem] flex items-center justify-center mb-10 sm:mb-12 md:mb-14 relative z-30"
          >
            <div 
              className="text-[#00ff00] font-bold tracking-wide px-6 py-2"
              style={{
                fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                fontFamily: 'var(--font-pixelify-sans)',
                textShadow: '0 0 10px rgba(0, 255, 0, 0.8), 0 0 20px rgba(0, 255, 0, 0.4)',
                letterSpacing: '0.05em',
                fontWeight: 700,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
              }}
            >
              <DecryptedText
                key={key}
                text={texts[currentTextIndex]}
                speed={60}
                maxIterations={12}
                sequential={true}
                revealDirection="start"
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/~`"
                className="typing-text-revealed"
                parentClassName="typing-text"
                encryptedClassName="typing-text-encrypted"
                animateOn="view"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
    </section>
  );
};

export default AnimatedHero;