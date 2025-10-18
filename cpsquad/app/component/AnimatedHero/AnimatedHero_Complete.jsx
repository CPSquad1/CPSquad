"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import DecryptedText from './DecryptedText';
import '../../glitch.css';

const AnimatedHero = () => {
  // Cycling texts for decrypted animation
  const texts = [
    "WELCOME TO CP SQUAD",
    "IF YOU LOVE CODING",
    "YOU'RE AT THE RIGHT PLACE_",
    "SOLVE PROBLEMS"
  ];
  
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [key, setKey] = useState(0);

  // Cycle through texts automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      setKey(prev => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [texts.length]);

  // Delta Triangle with Full Animation Cycle
  const DeltaTriangleBackground = () => {
    const [triangleChars, setTriangleChars] = useState([]);
    const [animationPhase, setAnimationPhase] = useState('drawing'); // drawing, filling, filled, glitch, reset
    const [visibleChars, setVisibleChars] = useState(new Set());
    const [borderComplete, setBorderComplete] = useState(false);
    const matrixChars = "abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*";

    useEffect(() => {
      const createTriangleMatrix = () => {
        const chars = [];
        const rows = 28;
        
        for (let row = 0; row < rows; row++) {
          const charsInRow = Math.floor((row + 1) * 3.2);
          const startX = 50 - (charsInRow * 1.1) / 2;
          
          for (let col = 0; col < charsInRow; col++) {
            chars.push({
              id: `char-${row}-${col}`,
              char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
              x: startX + (col * 2.2),
              y: 12 + (row * 2.9),
              row: row,
              col: col,
              fillDelay: (row * 0.08) + (col * 0.02),
            });
          }
        }
        
        return chars;
      };

      const chars = createTriangleMatrix();
      setTriangleChars(chars);

      // Animation Cycle Timeline (15 seconds total)
      const startCycle = () => {
        // Phase 1: Draw border (0-2s)
        setAnimationPhase('drawing');
        setBorderComplete(false);
        setVisibleChars(new Set());

        setTimeout(() => {
          setBorderComplete(true);
        }, 2000);

        // Phase 2: Fill with characters one by one (2-7s)
        setTimeout(() => {
          setAnimationPhase('filling');
          
          // Add characters one by one
          chars.forEach((char) => {
            setTimeout(() => {
              setVisibleChars(prev => new Set([...prev, char.id]));
            }, char.fillDelay * 1000);
          });
        }, 2000);

        // Phase 3: Fully filled state (7-11s)
        setTimeout(() => {
          setAnimationPhase('filled');
        }, 7000);

        // Phase 4: Glitch effect (11-13s)
        setTimeout(() => {
          setAnimationPhase('glitch');
        }, 11000);

        // Phase 5: Reset/fade out (13-15s)
        setTimeout(() => {
          setAnimationPhase('reset');
          setVisibleChars(new Set());
          setBorderComplete(false);
        }, 13000);
      };

      startCycle();
      const interval = setInterval(startCycle, 15000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Triangle Border */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="triangle-glow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="glitch-filter">
              <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>

          {/* Main Triangle Outline */}
          <motion.path
            d="M 50 10 L 90 82 L 10 82 Z"
            fill="none"
            stroke="#00ff00"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={animationPhase === 'glitch' ? "url(#glitch-filter)" : "url(#triangle-glow)"}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: borderComplete || animationPhase === 'reset' ? 1 : animationPhase === 'drawing' ? 1 : 1,
              opacity: animationPhase === 'reset' ? 0 : animationPhase === 'glitch' ? [0.8, 0.3, 0.8, 0.5] : [0.6, 0.9, 0.6],
              strokeWidth: animationPhase === 'glitch' ? [0.5, 0.8, 0.5, 0.7] : 0.5,
            }}
            transition={{ 
              pathLength: { duration: 2, ease: "easeInOut" },
              opacity: { duration: animationPhase === 'glitch' ? 0.3 : 3, repeat: animationPhase === 'glitch' ? Infinity : Infinity, ease: "easeInOut" },
              strokeWidth: { duration: 0.2, repeat: animationPhase === 'glitch' ? Infinity : 0 }
            }}
          />

          {/* Corner Accents */}
          {borderComplete && animationPhase !== 'reset' && (
            <>
              <motion.circle
                cx="50" cy="10" r="1"
                fill="#00ff00"
                filter="url(#triangle-glow)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: animationPhase === 'glitch' ? [1, 0.5, 1] : 1, 
                  scale: animationPhase === 'glitch' ? [1, 1.5, 1] : 1 
                }}
                transition={{ duration: 0.5, repeat: animationPhase === 'glitch' ? Infinity : 0 }}
              />
              <motion.circle
                cx="90" cy="82" r="1"
                fill="#00ff00"
                filter="url(#triangle-glow)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: animationPhase === 'glitch' ? [1, 0.5, 1] : 1, 
                  scale: animationPhase === 'glitch' ? [1, 1.5, 1] : 1 
                }}
                transition={{ duration: 0.5, delay: 0.1, repeat: animationPhase === 'glitch' ? Infinity : 0 }}
              />
              <motion.circle
                cx="10" cy="82" r="1"
                fill="#00ff00"
                filter="url(#triangle-glow)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: animationPhase === 'glitch' ? [1, 0.5, 1] : 1, 
                  scale: animationPhase === 'glitch' ? [1, 1.5, 1] : 1 
                }}
                transition={{ duration: 0.5, delay: 0.2, repeat: animationPhase === 'glitch' ? Infinity : 0 }}
              />
            </>
          )}
        </svg>

        {/* Matrix Characters filling the triangle */}
        <AnimatePresence>
          {triangleChars.map((charData) => {
            const isVisible = visibleChars.has(charData.id);
            
            if (!isVisible && animationPhase !== 'glitch' && animationPhase !== 'filled') return null;

            return (
              <motion.div
                key={charData.id}
                className="absolute font-mono text-[#00ff00] select-none"
                initial={{ 
                  y: -50, 
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  y: animationPhase === 'glitch' ? [0, -3, 3, -2, 0] : 0,
                  x: animationPhase === 'glitch' ? [0, -2, 2, -1, 0] : 0,
                  opacity: animationPhase === 'reset' ? 0 : animationPhase === 'glitch' ? [0.8, 0.3, 0.9, 0.4, 0.8] : isVisible ? 0.7 : 0,
                  scale: animationPhase === 'glitch' ? [1, 0.9, 1.1, 0.95, 1] : isVisible ? 1 : 0,
                  filter: animationPhase === 'glitch' ? [
                    'brightness(1) hue-rotate(0deg)',
                    'brightness(1.5) hue-rotate(90deg)',
                    'brightness(0.8) hue-rotate(-90deg)',
                    'brightness(1.2) hue-rotate(45deg)',
                    'brightness(1) hue-rotate(0deg)'
                  ] : 'brightness(1)',
                }}
                transition={{
                  y: { duration: animationPhase === 'filling' ? 0.5 : 0.15, ease: "easeOut", repeat: animationPhase === 'glitch' ? Infinity : 0 },
                  x: { duration: 0.15, repeat: animationPhase === 'glitch' ? Infinity : 0 },
                  opacity: { duration: animationPhase === 'filling' ? 0.5 : 0.1, repeat: animationPhase === 'glitch' ? Infinity : 0 },
                  scale: { duration: animationPhase === 'filling' ? 0.5 : 0.15, repeat: animationPhase === 'glitch' ? Infinity : 0 },
                  filter: { duration: 0.2, repeat: animationPhase === 'glitch' ? Infinity : 0 }
                }}
                exit={{ opacity: 0, scale: 0, transition: { duration: 0.3 } }}
                style={{
                  left: `${charData.x}%`,
                  top: `${charData.y}%`,
                  fontSize: 'clamp(7px, 1vw, 13px)',
                  textShadow: animationPhase === 'glitch' 
                    ? '0 0 10px #00ff00, 2px 2px #ff00ff, -2px -2px #00ffff' 
                    : '0 0 6px rgba(0, 255, 0, 0.6)',
                }}
              >
                {charData.char}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    );
  };

  // Subtle Background Matrix Rain
  const BackgroundMatrixRain = () => {
    const [columns, setColumns] = useState([]);
    const matrixChars = "01";

    useEffect(() => {
      const createColumns = () => {
        if (typeof window === 'undefined') return [];
        
        const width = window.innerWidth;
        const height = window.innerHeight;
        const columnCount = width < 640 ? 6 : width < 1024 ? 10 : 15;
        
        const cols = [];
        for (let i = 0; i < columnCount; i++) {
          const charsPerColumn = Math.floor(height / 35) + 2;
          cols.push({
            id: i,
            x: (i / columnCount) * 100,
            chars: Array.from({ length: charsPerColumn }, () => 
              matrixChars[Math.floor(Math.random() * matrixChars.length)]
            ),
            delay: Math.random() * 10,
            speed: 10 + Math.random() * 5,
          });
        }
        return cols;
      };

      setColumns(createColumns());

      const handleResize = () => setColumns(createColumns());
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-8">
        {columns.map((column) => (
          <motion.div
            key={column.id}
            className="absolute font-mono"
            initial={{ y: -100 }}
            animate={{ y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000 }}
            transition={{
              duration: column.speed,
              delay: column.delay,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0,
            }}
            style={{
              left: `${column.x}%`,
              color: '#00ff00',
              fontSize: 'clamp(8px, 0.7vw, 11px)',
              lineHeight: '1.8',
              textShadow: '0 0 3px rgba(0, 255, 0, 0.2)',
              opacity: 0.15,
            }}
          >
            {column.chars.join('')}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Matrix Rain */}
      <BackgroundMatrixRain />
      
      {/* Delta Triangle Background */}
      <DeltaTriangleBackground />

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative"
        >
          {/* Main Title: CP SQUAD */}
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="text-white font-bold mb-8 sm:mb-12 md:mb-16 tracking-wider relative z-30"
            style={{
              fontSize: 'clamp(3rem, 12vw, 8rem)',
              fontFamily: "'Arial Black', 'Helvetica', sans-serif",
              fontWeight: 900,
              letterSpacing: 'clamp(0.2em, 2vw, 0.5em)',
              textShadow: '4px 4px 12px rgba(0, 0, 0, 0.9)',
            }}
          >
            CP SQUAD
          </motion.h1>

          {/* Decrypted Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            className="min-h-[2.5rem] sm:min-h-[3rem] md:min-h-[3.5rem] flex items-center justify-center mb-12 sm:mb-16 relative z-30"
          >
            <DecryptedText
              key={key}
              text={texts[currentTextIndex]}
              speed={50}
              maxIterations={10}
              sequential={true}
              revealDirection="start"
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/~`"
              className="typing-text-revealed"
              parentClassName="typing-text"
              encryptedClassName="typing-text-encrypted"
              animateOn="view"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg text-gray-300 font-mono mb-8 sm:mb-12 max-w-3xl mx-auto px-4 leading-relaxed relative z-30"
          >
            At CP Squad, we bridge the gaps between problems and solutions. We combine our
            expertise in competitive programming to craft powerful problem-solving skills.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 sm:px-6 relative z-30"
          >
            <motion.a
              href="#about"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(0, 255, 0, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 sm:px-10 py-3 sm:py-4 bg-[#00ff00] text-black font-bold text-sm sm:text-base md:text-lg border-2 border-[#00ff00] transition-all w-full sm:w-auto text-center max-w-xs uppercase tracking-wider hover:bg-[#00dd00]"
            >
              Learn More
            </motion.a>
            <motion.a
              href="#features"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#00ff00",
                color: "#000",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 sm:px-10 py-3 sm:py-4 border-2 border-[#00ff00] text-[#00ff00] font-bold text-sm sm:text-base md:text-lg transition-all w-full sm:w-auto text-center max-w-xs uppercase tracking-wider"
            >
              Explore
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
    </section>
  );
};

export default AnimatedHero;
