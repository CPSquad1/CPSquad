"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ContributorCard from "../ContributorCard/ContributorCard.jsx";
import Link from "next/link";
import { fetchContributors } from "../../app/lib/fetchContributors.js";

const ContributorsYearView = ({ year }) => {
  const [contributors, setContributors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});
  
  // Fetch contributors from Google Sheets
  useEffect(() => {
    async function loadContributors() {
      try {
        const data = await fetchContributors(year);
        setContributors(data);
      } catch (error) {
        console.error('Failed to load contributors:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (year) {
      loadContributors();
    }
  }, [year]);
  
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

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00FF41]/20 border-t-[#00FF41] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-slate-400">Loading contributors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00FF41]/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00FF41]/5 blur-[150px] rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="pt-32 pb-12 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            {/* <Link href="/contributors">
              <button className="mb-8 px-6 py-3 bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-md border border-white/10 hover:border-[#00FF41]/30 rounded-full transition-all duration-300 flex items-center gap-2 group">
                <svg className="w-5 h-5 text-[#00FF41] group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-white">Back to All Years</span>
              </button>
            </Link> */}

            <div className="flex items-center gap-6 mb-8">
              <div className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] to-[#00FF41]/40">
                {year}
              </div>
              <div className="flex-1 h-1 bg-gradient-to-r from-[#00FF41]/50 to-transparent"></div>
            </div>

            {/* <div className="flex flex-wrap items-center gap-4">
              <div className="px-6 py-2 bg-white/[0.03] backdrop-blur-md border border-[#00FF41]/20 rounded-full">
                <span className="text-[#00FF41] text-sm font-bold uppercase tracking-widest">
                  Contributors
                </span>
              </div>
              <div className="text-slate-400 text-lg">
                {contributors.length} dedicated contributors
              </div>
            </div> */}
          </div>
        </header>

        {/* Main Contributors Display */}
        <main className="px-4 sm:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="relative w-full max-w-[1100px] aspect-[9/16] sm:aspect-[16/9] mx-auto">
              {/* Glass panel container */}
              <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                {/* Sidebar with year - horizontal on mobile, vertical on desktop */}
                <div className="absolute left-0 top-0 right-0 sm:right-auto sm:bottom-0 h-12 sm:h-auto sm:w-20 border-b sm:border-b-0 sm:border-r border-white/5 bg-white/[0.03] flex sm:flex-col items-center justify-center">
                  <span className="text-3xl sm:text-6xl font-black text-white/10 sm:rotate-180 uppercase tracking-tighter" style={{ writingMode: "horizontal-tb", WebkitWritingMode: "horizontal-tb" }}>
                    <span className="hidden sm:inline" style={{ writingMode: "vertical-rl", WebkitWritingMode: "vertical-rl" }}>{year}</span>
                    <span className="inline sm:hidden">{year}</span>
                  </span>
                  <div className="absolute right-4 sm:right-auto sm:bottom-8 flex sm:flex-col gap-3 sm:gap-4">
                    <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-slate-600"></span>
                    <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#00FF41]"></span>
                    <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-slate-600"></span>
                  </div>
                </div>

                {/* Main content area */}
                <div className="mt-12 sm:mt-0 sm:ml-20 relative h-full flex items-center justify-center overflow-hidden">
                  {/* Header */}
                  {/* <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30">
                    <div className="px-12 py-3 bg-white/[0.05] backdrop-blur-md border border-[#00FF41]/20 rounded-full">
                      <h2 className="text-2xl font-bold tracking-[0.2em] uppercase text-white">
                        Contributors
                      </h2>
                    </div>
                  </div> */}

                  {/* Center Logo - Top on mobile, Center left on desktop */}
                  <div className="absolute left-1/2 sm:left-32 top-[22%] sm:top-1/2 -translate-x-1/2 sm:translate-x-0 -translate-y-1/2 w-40 sm:w-64 h-40 sm:h-64 flex items-center justify-center z-20">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-[#00FF41]/10 blur-3xl rounded-full"></div>
                    
                    {/* Logo container */}
                    <div className="relative z-10 w-32 sm:w-48 h-32 sm:h-48 rounded-full border-2 sm:border-4 border-[#00FF41]/30 p-3 sm:p-4 bg-black/40 backdrop-blur-sm">
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

                  {/* Contributors randomly positioned */}
                  <div className="relative w-full h-full">
                    {contributors.length === 0 ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center max-w-md">
                          <div className="text-6xl mb-4">📝</div>
                          <h3 className="text-2xl font-bold text-white mb-3">No Contributors Yet</h3>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            Contributors data will be loaded from Google Sheets. 
                            Please add team members to the spreadsheet to see them here.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {contributors.map((contributor, index) => (
                          <ContributorCard
                            key={`year-${year}-${contributor.id}-${index}`} // Changed: Added year and index to ensure uniqueness
                            {...contributor}
                            position={{
                              top: `${contributorPositions[index]?.top || 50}%`,
                              left: `${contributorPositions[index]?.left || 50}%`
                            }}
                            size="medium"
                          />
                        ))}

                        {/* Orbital rings */}
                        <div className="absolute inset-0 pointer-events-none opacity-10">
                          <div className="absolute top-[22%] sm:top-1/2 left-1/2 sm:left-[28%] -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[280px] h-[200px] sm:h-[280px] border border-[#00FF41]/20 rounded-full"></div>
                          <div className="absolute top-[22%] sm:top-1/2 left-1/2 sm:left-[28%] -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] border border-[#00FF41]/15 rounded-full"></div>
                          <div className="absolute top-[22%] sm:top-1/2 left-1/2 sm:left-[28%] -translate-x-1/2 -translate-y-1/2 w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] border border-[#00FF41]/5 rounded-full"></div>
                        </div>
                      </>
                    )}
                  </div>

                </div>
              </div>
            </div>

            {/* Contributors Grid - Detailed View */}
            {contributors.length > 0 && (
              <div className="mt-20">
                <h3 className="text-3xl font-bold mb-10 text-center">Meet The Contributors</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {contributors.map((contributor, index) => (
                    <div
                      key={`grid-${year}-${contributor.id}-${index}`} // Changed: Added year and index to ensure uniqueness
                      className="p-6 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-xl hover:border-[#00FF41]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,65,0.1)] group opacity-0 translate-y-8 animate-fadeUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-[#00FF41]/30 p-1 group-hover:border-[#00FF41] transition-all">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                          {contributor.avatar && !imageErrors[contributor.id] ? (
                            <img
                              src={contributor.avatar}
                              alt={contributor.name}
                              className="w-full h-full object-cover"
                              onError={() => setImageErrors(prev => ({ ...prev, [contributor.id]: true }))}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                              {contributor.name?.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-center mb-1">{contributor.name}</h4>
                      <p className="text-[#00FF41] text-sm text-center mb-3 uppercase tracking-wider">
                        {contributor.role}
                      </p>
                      {contributor.linkedin && (
                        <div className="flex gap-2 justify-center">
                          <a
                            href={contributor.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded bg-white/10 hover:bg-white/20 transition-colors"
                          >
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContributorsYearView;
