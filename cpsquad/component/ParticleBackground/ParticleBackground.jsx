"use client";
import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, radius: 80 });
  const animationPhaseRef = useRef('entry');
  const exitProgressRef = useRef(0);
  const glitchTimerRef = useRef(0);
  const idleTimerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor(x, y, rowIndex, totalRows) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = -200 - Math.random() * 200;
        const particleSize = canvas.width < 640 ? 2 : canvas.width < 1024 ? 2.5 : 3;
        this.size = particleSize;
        this.density = (Math.random() * 30) + 1;
        this.baseSize = particleSize;
        this.opacity = 0;
        this.color = '#2D8A1F';
        this.rowIndex = rowIndex;
        this.totalRows = totalRows;
        this.sparkleSpeed = Math.random() * 0.03 + 0.02;
        this.sparklePhase = Math.random() * Math.PI * 2;
        this.glitchOffsetX = 0;
        this.glitchOffsetY = 0;
        this.fallSpeed = 0;
        this.maxFallSpeed = Math.random() * 0.5 + 0.35;
        this.acceleration = 0.035;
        this.fallDelay = Math.random() * 150;
        this.delayCounter = 0;
        this.hasLanded = false;
        // Matrix rain properties
        this.char = this.getRandomChar();
        this.charChangeRate = Math.random() * 5 + 3;
        this.charCounter = 0;
        this.trail = [];
        this.trailLength = Math.floor(Math.random() * 10) + 5;
      }
      
      getRandomChar() {
        const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return chars[Math.floor(Math.random() * chars.length)];
      }

      draw() {
        if (this.delayCounter >= this.fallDelay || animationPhaseRef.current !== 'entry') {
          if (animationPhaseRef.current === 'entry' && !this.hasLanded) {
            // Matrix rain effect - draw trailing characters
            const fontSize = canvas.width < 640 ? 10 : canvas.width < 1024 ? 12 : 14;
            ctx.font = `${fontSize}px monospace`;
            ctx.textAlign = 'center';
            
            // Draw trail
            this.trail.forEach((trailPos, index) => {
              const trailOpacity = (index / this.trail.length) * 0.5;
              ctx.fillStyle = `rgba(0, 255, 65, ${trailOpacity})`;
              ctx.globalAlpha = trailOpacity;
              ctx.fillText(this.getRandomChar(), trailPos.x, trailPos.y);
            });
            
            // Draw main character (brightest)
            ctx.fillStyle = '#00FF41';
            ctx.globalAlpha = 1;
            ctx.shadowColor = '#00FF41';
            ctx.shadowBlur = 10;
            ctx.fillText(this.char, this.x + this.glitchOffsetX, this.y + this.glitchOffsetY);
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
          } else {
            // Normal particle rendering for idle/exit
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 5;
            ctx.beginPath();
            ctx.arc(this.x + this.glitchOffsetX, this.y + this.glitchOffsetY, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
          }
        }
      }

      update() {
        const mouse = mouseRef.current;
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius && mouse.x && animationPhaseRef.current === 'idle') {
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let force = (mouse.radius - distance) / mouse.radius;
          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (Math.abs(this.x - this.baseX) > 0.1) {
            this.x += (this.baseX - this.x) * 0.15;
          }
          if (Math.abs(this.y - this.baseY) > 0.1) {
            this.y += (this.baseY - this.y) * 0.15;
          }
        }

        if (animationPhaseRef.current === 'entry') {
          if (!this.hasLanded) {
            if (this.delayCounter < this.fallDelay) {
              this.delayCounter++;
            } else {
              if (this.opacity === 0) {
                this.opacity = 0.8;
              }
              
              if (this.fallSpeed < this.maxFallSpeed) {
                this.fallSpeed += this.acceleration;
              }
              
              // Update trail positions for Matrix effect
              if (this.trail.length >= this.trailLength) {
                this.trail.shift();
              }
              this.trail.push({ x: this.x, y: this.y });
              
              // Change character periodically
              this.charCounter++;
              if (this.charCounter >= this.charChangeRate) {
                this.char = this.getRandomChar();
                this.charCounter = 0;
              }
              
              this.y += this.fallSpeed;
              this.opacity = Math.min(1, this.opacity + 0.01);

              const distanceToTarget = this.baseY - this.y;
              if (distanceToTarget < 160 && distanceToTarget > 0) {
                this.fallSpeed *= 0.88;
              }
              
              if (this.y >= this.baseY) {
                this.y = this.baseY;
                this.hasLanded = true;
                this.opacity = 1;
                this.fallSpeed = 0;
                this.trail = []; // Clear trail when landed
              }
            }
          }
        } else if (animationPhaseRef.current === 'idle') {
          this.sparklePhase += this.sparkleSpeed;
          this.opacity = 0.8 + Math.sin(this.sparklePhase) * 0.2;
          this.size = this.baseSize + Math.sin(this.sparklePhase * 2) * 0.4;
          this.glitchOffsetX = 0;
          this.glitchOffsetY = 0;
        } else if (animationPhaseRef.current === 'exit') {
          if (glitchTimerRef.current % 3 === 0) {
            this.glitchOffsetX = (Math.random() - 0.5) * 8;
            this.glitchOffsetY = (Math.random() - 0.5) * 8;
          }
          
          const rowExitProgress = exitProgressRef.current - ((this.totalRows - this.rowIndex) / this.totalRows) * 0.3;
          if (rowExitProgress > 0) {
            this.opacity = Math.max(0, 1 - rowExitProgress * 3);
          }
        }
      }
    }

    function init() {
      particlesRef.current = [];
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      // Responsive sizing based on viewport
      const baseSize = Math.min(canvas.width, canvas.height);
      const symbolSize = canvas.width < 640 ? baseSize * 0.7 : 
                        canvas.width < 1024 ? baseSize * 0.85 : baseSize * 1;
      
      // Responsive gap and thickness
      const gap = canvas.width < 640 ? 15 : canvas.width < 1024 ? 18 : 20;
      const thickness = canvas.width < 640 ? 60 : canvas.width < 1024 ? 75 : 90;
      const particlesByRow = [];
      
      const rightAngle = symbolSize * 0.35;
      const slashWidth = symbolSize * 0.2;
      const leftAngle = symbolSize * 0.35;
      const totalWidth = rightAngle + slashWidth + leftAngle;
      const height = symbolSize * 0.6;
      
      const startX = centerX - totalWidth / 2;
      const startY = centerY - height / 2;
      
      let rowIndex = 0;
      for (let y = 0; y < height; y += gap) {
        const row = [];
        const actualY = startY + y;
        const progress = y / height;
        
        let rightCenterX;
        if (progress <= 0.5) {
          rightCenterX = startX + (rightAngle * (1 - progress * 2));
        } else {
          rightCenterX = startX + (rightAngle * ((progress - 0.5) * 2));
        }
        
        for (let offset = -thickness/2; offset <= thickness/2; offset += gap) {
          row.push({ x: rightCenterX + offset, y: actualY });
        }
        
        const slashCenterX = startX + rightAngle + (slashWidth * (1 - progress));
        
        for (let offset = -thickness/2; offset <= thickness/2; offset += gap) {
          row.push({ x: slashCenterX + offset, y: actualY });
        }
        
        const leftStart = startX + rightAngle + slashWidth;
        let leftCenterX;
        if (progress <= 0.5) {
          leftCenterX = leftStart + (leftAngle * progress * 2);
        } else {
          leftCenterX = leftStart + (leftAngle * (2 - progress * 2));
        }
        
        for (let offset = -thickness/2; offset <= thickness/2; offset += gap) {
          row.push({ x: leftCenterX + offset, y: actualY });
        }
        
        if (row.length > 0) {
          particlesByRow.push(row);
        }
        rowIndex++;
      }
      
      const totalRows = particlesByRow.length;
      particlesByRow.forEach((row, rowIdx) => {
        row.forEach(pos => {
          particlesRef.current.push(new Particle(pos.x, pos.y, rowIdx, totalRows));
        });
      });
      
      startEntryAnimation();
    }

    function animate() {
      // Fade effect for Matrix trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      if (animationPhaseRef.current === 'entry') {
        const allLanded = particlesRef.current.every(p => p.hasLanded);
        if (allLanded) {
          animationPhaseRef.current = 'idle';
          startIdleTimer();
        }
      } else if (animationPhaseRef.current === 'exit') {
        exitProgressRef.current += 0.015;
        glitchTimerRef.current++;
        
        if (glitchTimerRef.current % 2 === 0) {
          const glitchColors = ['#4AF626', '#00FF00', '#39FF14', '#00FFFF', '#FF00FF', '#FFFF00', '#FF1493'];
          particlesRef.current.forEach(particle => {
            if (Math.random() > 0.7) {
              particle.color = glitchColors[Math.floor(Math.random() * glitchColors.length)];
            }
          });
        }
        
        if (exitProgressRef.current >= 1.3) {
          restartAnimation();
          return;
        }
      }
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        particlesRef.current[i].update();
        particlesRef.current[i].draw();
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    function startEntryAnimation() {
      animationPhaseRef.current = 'entry';
      exitProgressRef.current = 0;
      glitchTimerRef.current = 0;
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    }

    function startIdleTimer() {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = setTimeout(() => {
        startExitAnimation();
      }, 12000);
    }

    function startExitAnimation() {
      animationPhaseRef.current = 'exit';
      exitProgressRef.current = 0;
      glitchTimerRef.current = 0;
    }

    function restartAnimation() {
      cancelAnimationFrame(animationFrameRef.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      init();
      animate();
    }

    // const handleMouseMove = (event) => {
    //   mouseRef.current.x = event.clientX;
    //   mouseRef.current.y = event.clientY;
    // };

    // const handleMouseLeave = () => {
    //   mouseRef.current.x = null;
    //   mouseRef.current.y = null;
    // };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      restartAnimation();
    };

    // canvas.addEventListener('mousemove', handleMouseMove);
    // canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'auto' }}
    />
  );
}
