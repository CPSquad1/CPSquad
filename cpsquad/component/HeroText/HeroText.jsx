"use client";
import { useEffect, useState, useRef } from 'react';

export default function HeroText() {
  const [letters, setLetters] = useState([]);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [decodedText, setDecodedText] = useState('');
  const sentenceRef = useRef(0);
  
  const sentences = [
    "Building  competitive  programmers",
    "Master  algorithms,  conquer  challenges",
    "Code,  compete,  collaborate "
  ];

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

  useEffect(() => {
    // Initialize letters for "CPSQUAD"
    const word = "CP SQUAD";
    const letterArray = word.split('').map((letter, index) => ({
      char: letter,
      y: 380, // Stagger starting positions
      targetY: 0,
      speed: 0,
      acceleration: 0.5,
      hasLanded: false,
      delay: index * 8, // Delay each letter
      delayCounter: 0
    }));
    setLetters(letterArray);

    // Start sentence decoding after all letters land
    const decodingDelay = setTimeout(() => {
      startDecoding();
    }, 2000);

    return () => clearTimeout(decodingDelay);
  }, []);

  useEffect(() => {
    // Animate letters falling
    const interval = setInterval(() => {
      setLetters(prevLetters => {
        const allLanded = prevLetters.every(l => l.hasLanded);
        
        return prevLetters.map(letter => {
          if (letter.hasLanded) return letter;
          
          if (letter.delayCounter < letter.delay) {
            return { ...letter, delayCounter: letter.delayCounter + 1 };
          }

          const newSpeed = letter.speed + letter.acceleration;
          let newY = letter.y + newSpeed;
          
          // Decelerate near target
          const distanceToTarget = letter.targetY - newY;
          if (distanceToTarget < 30 && distanceToTarget > 0) {
            const newSpeedSlowed = newSpeed * 0.85;
            newY = letter.y + newSpeedSlowed;
          }

          if (newY >= letter.targetY) {
            return { ...letter, y: letter.targetY, hasLanded: true, speed: 0 };
          }

          return { ...letter, y: newY, speed: newSpeed };
        });
      });
    }, 16);

    return () => clearInterval(interval);
  }, []);

  const startDecoding = () => {
    const currentSentence = sentences[sentenceRef.current];
    let iteration = 0;
    const maxIterations = currentSentence.length;

    const decodeInterval = setInterval(() => {
      setDecodedText(prev => {
        return currentSentence
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return currentSentence[index];
            }
            if (char === ' ') return ' ';
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');
      });

      iteration += 1/3; // Slower decode

      if (iteration >= maxIterations + 10) {
        clearInterval(decodeInterval);
        setDecodedText(currentSentence);
        
        // Switch to next sentence after 4 seconds
        setTimeout(() => {
          sentenceRef.current = (sentenceRef.current + 1) % sentences.length;
          setSentenceIndex(sentenceRef.current);
          startDecoding();
        }, 4000);
      }
    }, 50);
  };

  return (
    <div className="text-center max-w-4xl relative z-10">
      <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-[0.3em] font-[family-name:var(--font-poppins)] flex justify-center items-center h-[70px] md:h-[160px] uppercase">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="inline-block"
            style={{
              transform: `translateY(${letter.y}px)`,
              opacity: letter.delayCounter >= letter.delay ? 1 : 0,
              transition: 'opacity 0.2s'
            }}
          >
            {letter.char}
          </span>
        ))}
        <span 
          className="inline-block text-[#fcfcfc] animate-pulse"
          style={{
            textShadow: '0 0 10px #00FF41, 0 0 20px #00FF41'
          }}
        >_</span>
      </h1>
      <p className="text-4xl md:text-4xl mb-8 h-[80px] md:h-[100px] flex items-center justify-center text-[#00FF41] tracking-wide font-[family-name:var(--font-pixelify-sans)]"
         style={{
           textShadow: '0 0 8px #00FF41, 0 0 15px #00FF41',
           filter: 'brightness(1.1)'
         }}>
        {decodedText}
      </p>
      {/* <div className="flex gap-4 justify-center flex-wrap">
        <a
          href="#about"
          className="px-8 py-3 bg-[#00FF41] hover:bg-[#00DD35] text-black font-semibold rounded transition-colors font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,65,0.5)]"
        >
          Learn More
        </a>
        <a
          href="#features"
          className="px-8 py-3 border-2 border-[#00FF41] hover:border-[#00DD35] text-[#00FF41] hover:text-[#00DD35] font-semibold rounded transition-colors font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,65,0.3)]"
        >
          Explore Features
        </a>
      </div> */}
    </div>
  );
}
