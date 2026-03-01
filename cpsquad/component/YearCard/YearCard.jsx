"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const YearCard = ({ year, contributors = [] }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  // Define size for avatars - responsive
  const size = "w-14 h-14 sm:w-20 sm:h-20"; // Responsive size for year card view

  // Generate grid positions for all contributors (no role-based positioning)
  const generateGridPositions = (contributors) => {
    const count = contributors.length;
    const assignedPositions = [];
    
    // Calculate optimal grid layout based on total number of contributors
    let columns, rows;
    
    // Mobile: 4 columns, Desktop: dynamic columns
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      columns = 4; // Fixed 4 columns for mobile
    } else {
      if (count <= 4) {
        columns = 2;
      } else if (count <= 9) {
        columns = 3;
      } else if (count <= 16) {
        columns = 4;
      } else if (count <= 25) {
        columns = 5;
      } else {
        columns = 6;
      }
    }
    
    rows = Math.ceil(count / columns);
    
    // Dynamic grid configuration based on number of rows and columns
    // Mobile: center-aligned grid below logo, Desktop: right-aligned grid
    const gridConfig = {
      startX: typeof window !== 'undefined' && window.innerWidth < 640 ? 10 : 45, // Mobile: 10%, Desktop: 45%
      startY: typeof window !== 'undefined' && window.innerWidth < 640 ? 38 : 12, // Mobile: start at 38% (closer to logo), Desktop: 12%
      columnGap: typeof window !== 'undefined' && window.innerWidth < 640 ? 18 : Math.min(16, (50 / columns)),
      rowGap: typeof window !== 'undefined' && window.innerWidth < 640 ? 10 : Math.min(18, (75 / rows)),
      columns: columns
    };
    
    // Position all contributors in grid
    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / gridConfig.columns);
      const col = i % gridConfig.columns;
      assignedPositions[i] = {
        top: gridConfig.startY + (row * gridConfig.rowGap),
        left: gridConfig.startX + (col * gridConfig.columnGap)
      };
    }
    
    return assignedPositions;
  };

  const [contributorPositions, setContributorPositions] = useState([]);
  
  // Regenerate positions when contributors data changes or window resizes
  useEffect(() => {
    if (contributors.length > 0) {
      setContributorPositions(generateGridPositions(contributors));
    }
    
    // Add resize listener to regenerate positions on screen size change
    const handleResize = () => {
      if (contributors.length > 0) {
        setContributorPositions(generateGridPositions(contributors));
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [contributors]);

  return (
    <Link href={`/contributors/${year}`}>
      <div className="relative w-full max-w-[900px] aspect-[9/16] sm:aspect-[16/10] overflow-hidden group cursor-pointer mx-auto">
        {/* Glass panel container */}
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transition-all duration-500 group-hover:border-[#00FF41]/30 group-hover:shadow-[0_0_30px_rgba(0,255,65,0.2)]">
          {/* Sidebar with year - horizontal on mobile, vertical on desktop */}
          <div className="absolute left-0 top-0 right-0 sm:right-auto sm:bottom-0 h-12 sm:h-auto sm:w-16 border-b sm:border-b-0 sm:border-r border-white/5 bg-white/[0.03] flex sm:flex-col items-center justify-center">
            <span className="text-3xl sm:text-5xl font-black text-white/10 sm:rotate-180 uppercase tracking-tighter" style={{ writingMode: "horizontal-tb", WebkitWritingMode: "horizontal-tb" }}>
              <span className="hidden sm:inline" style={{ writingMode: "vertical-rl", WebkitWritingMode: "vertical-rl" }}>{year}</span>
              <span className="inline sm:hidden">{year}</span>
            </span>
            <div className="absolute right-4 sm:right-auto sm:bottom-6 flex sm:flex-col gap-2 sm:gap-3 text-slate-500">
              <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-slate-600"></span>
              <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#00FF41]"></span>
              <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-slate-600"></span>
            </div>
          </div>

          {/* Main content area */}
          <div className="mt-12 sm:mt-0 sm:ml-16 relative h-full flex items-center justify-center overflow-hidden">
            {/* Header */}
            <div className="absolute top-2 sm:top-6 left-1/2 -translate-x-1/2 z-30">
              <div className="px-3 sm:px-8 py-1 sm:py-2 bg-white/[0.05] backdrop-blur-md border border-[#00FF41]/20 rounded-full">
                <h2 className="text-[10px] sm:text-lg font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white">
                  Contributors
                </h2>
              </div>
            </div>

            {/* Center Logo - Top on mobile, Center left on desktop */}
            <div className="absolute left-1/2 sm:left-24 top-[22%] sm:top-1/2 -translate-x-1/2 sm:translate-x-0 -translate-y-1/2 w-32 sm:w-48 h-32 sm:h-48 flex items-center justify-center z-20">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#00FF41]/10 blur-3xl rounded-full"></div>
              
              {/* Logo container */}
              <div className="relative z-10 w-24 sm:w-36 h-24 sm:h-36 rounded-full border-2 sm:border-3 border-[#00FF41]/30 p-2 sm:p-3 bg-black/40 backdrop-blur-sm group-hover:border-[#00FF41]/60 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(0,255,65,0.4)]">
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
                      left: `${contributorPositions[index]?.left || 50}%`,
                    };

                    return (
                      <div
                        key={`contributor-${contributor.id}-${index}`}
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
                              <div className="w-full h-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">
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
                        <div className={`tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-2 sm:mb-4 transition-all duration-300 pointer-events-none w-32 sm:w-48 bg-black/90 backdrop-blur-md border border-[#00FF41]/30 p-2 sm:p-4 rounded-lg z-50 ${hoveredIndex === index ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-2"}`}>
                          <p className="text-white font-bold text-xs sm:text-sm">{contributor.name}</p>
                          <p className="text-[#00FF41] text-[10px] sm:text-xs font-medium uppercase">
                            {contributor.role || "Member"}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  {/* Decorative rings around logo only */}
                  <div className="absolute inset-0 pointer-events-none opacity-10">
                    <div className="absolute top-[22%] sm:top-1/2 left-1/2 sm:left-[26%] -translate-x-1/2 -translate-y-1/2 w-[160px] sm:w-[220px] h-[160px] sm:h-[220px] border border-[#00FF41]/20 rounded-full"></div>
                    <div className="absolute top-[22%] sm:top-1/2 left-1/2 sm:left-[26%] -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[300px] h-[220px] sm:h-[300px] border border-[#00FF41]/10 rounded-full"></div>
                  </div>
                </>
              )}
            </div>

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
