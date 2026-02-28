"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const YearCard = ({ year, contributors = [] }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  // Generate random non-overlapping positions for contributors
  const generateRandomPositions = (count) => {
    const positions = [];
    const minDistance = 15; // Increased minimum distance for larger circles
    const logoArea = { x: 26, y: 50, radius: 18 }; // Larger logo avoidance area
    
    for (let i = 0; i < count; i++) {
      let attempts = 0;
      let position;
      
      while (attempts < 150) {
        // Generate random position on right side only (x: 48-88%, y: 12-88%)
        const x = 48 + Math.random() * 40;
        const y = 12 + Math.random() * 76;
        
        // Check if position overlaps with logo
        const distanceToLogo = Math.sqrt(Math.pow(x - logoArea.x, 2) + Math.pow(y - logoArea.y, 2));
        if (distanceToLogo < logoArea.radius + minDistance) {
          attempts++;
          continue;
        }
        
        // Check if position overlaps with other contributors
        let overlaps = false;
        for (const pos of positions) {
          const distance = Math.sqrt(Math.pow(x - pos.left, 2) + Math.pow(y - pos.top, 2));
          if (distance < minDistance) {
            overlaps = true;
            break;
          }
        }
        
        if (!overlaps) {
          position = { top: y, left: x };
          break;
        }
        
        attempts++;
      }
      
      // If couldn't find non-overlapping position, use fallback
      if (!position) {
        position = { top: 20 + (i * 8), left: 50 + (i % 5) * 8 };
      }
      
      positions.push(position);
    }
    
    return positions;
  };

  const [contributorPositions, setContributorPositions] = useState([]);
  
  // Regenerate positions when contributors data changes
  useEffect(() => {
    if (contributors.length > 0) {
      setContributorPositions(generateRandomPositions(contributors.length));
    }
  }, [contributors.length]);

  return (
    <Link href={`/contributors/${year}`}>
      <div className="relative w-full max-w-[900px] aspect-[16/10] overflow-hidden group cursor-pointer mx-auto">
        {/* Glass panel container */}
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transition-all duration-500 group-hover:border-[#00FF41]/30 group-hover:shadow-[0_0_30px_rgba(0,255,65,0.2)]">
          {/* Sidebar with year */}
          <div className="absolute left-0 top-0 bottom-0 w-16 border-r border-white/5 bg-white/[0.03] flex flex-col items-center justify-center">
            <span className="text-5xl font-black text-white/10 rotate-180 uppercase tracking-tighter" style={{ writingMode: "vertical-rl" }}>
              {year}
            </span>
            <div className="absolute bottom-6 flex flex-col gap-3 text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
            </div>
          </div>

          {/* Main content area */}
          <div className="ml-16 relative h-full flex items-center justify-center overflow-hidden">
            {/* Header */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
              <div className="px-8 py-2 bg-white/[0.05] backdrop-blur-md border border-[#00FF41]/20 rounded-full">
                <h2 className="text-lg font-bold tracking-[0.2em] uppercase text-white">
                  Contributors
                </h2>
              </div>
            </div>

            {/* Center Logo */}
            <div className="absolute left-24 top-1/2 -translate-y-1/2 w-48 h-48 flex items-center justify-center z-20">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#00FF41]/10 blur-3xl rounded-full"></div>
              
              {/* Logo container */}
              <div className="relative z-10 w-36 h-36 rounded-full border-3 border-[#00FF41]/30 p-3 bg-black/40 backdrop-blur-sm group-hover:border-[#00FF41]/60 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(0,255,65,0.4)]">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/logo.png"
                    alt="CP Squad Logo"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>
            </div>

            {/* Contributors random layout */}
            <div className="relative w-full h-full">
              {contributors.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center max-w-xs opacity-50">
                    <div className="text-4xl mb-2">📝</div>
                    <p className="text-slate-500 text-xs">No contributors yet</p>
                  </div>
                </div>
              ) : (
                <>
                  {contributors.map((contributor, index) => {
                    const position = { 
                      top: `${contributorPositions[index]?.top || 50}%`, 
                      left: `${contributorPositions[index]?.left || 50}%` 
                    };
                    const size = "w-20 h-20"; // Larger circles (80px)

                return (
                  <div
                    key={contributor.id || index}
                    className="contributor-node absolute group/node cursor-pointer transition-all duration-500 z-10"
                    style={position}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Avatar */}
                    <div className={`relative ${size} rounded-full border-2 border-[#00FF41]/40 p-1 group-hover/node:border-[#00FF41] group-hover/node:shadow-[0_0_20px_rgba(0,255,65,0.6)] transition-all duration-300`}>
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                        {contributor.avatar && !imageErrors[contributor.id] ? (
                          <img
                            src={contributor.avatar}
                            alt={contributor.name}
                            className="w-full h-full object-cover"
                            onError={() => setImageErrors(prev => ({ ...prev, [contributor.id]: true }))}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white text-sm font-bold">
                            {contributor.name?.charAt(0) || "?"}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-[#00FF41]/20 opacity-0 group-hover/node:opacity-100 flex items-center justify-center transition-all duration-300">
                          <svg className="w-1/2 h-1/2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Tooltip */}
                    <div className={`tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-4 transition-all duration-300 pointer-events-none w-48 bg-black/90 backdrop-blur-md border border-[#00FF41]/30 p-4 rounded-lg z-50 ${hoveredIndex === index ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-2"}`}>
                      <p className="text-white font-bold text-sm">{contributor.name}</p>
                      <p className="text-[#00FF41] text-xs font-medium uppercase">
                        {contributor.role || "Member"}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Decorative rings around logo only */}
              <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute top-1/2 left-[26%] -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] border border-[#00FF41]/20 rounded-full"></div>
                <div className="absolute top-1/2 left-[26%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-[#00FF41]/10 rounded-full"></div>
              </div>
              </>
              )}
            </div>

            {/* Bottom stats */}
            {/* <div className="absolute bottom-4 right-4 flex items-center gap-4">
              <div className="px-3 py-1.5 bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-full">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                  {contributors.length} Contributors
                </span>
              </div>
            </div> */}
          </div>
        </div>

        {/* Glow effects */}
        <div className="absolute top-[-10%] left-[10%] w-[40%] h-[40%] bg-[#00FF41]/5 blur-3xl rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] bg-[#00FF41]/5 blur-3xl rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </div>
    </Link>
  );
};

export default YearCard;
