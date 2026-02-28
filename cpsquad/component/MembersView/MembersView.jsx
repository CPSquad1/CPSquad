"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ContributorCard from "../ContributorCard/ContributorCard.jsx";
import Link from "next/link";
import { fetchContributorsByYear } from "../../app/lib/fetchContributors.js";

const MembersView = () => {
  const [currentYearMembers, setCurrentYearMembers] = useState([]);
  const [currentYear, setCurrentYear] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});
  
  // Fetch contributors and determine current year
  useEffect(() => {
    async function loadMembers() {
      try {
        const allData = await fetchContributorsByYear();
        
        // Get all years and find the latest one
        const years = Object.keys(allData).filter(year => allData[year].length > 0);
        
        if (years.length > 0) {
          // Sort years to find the latest (extract first 4-digit year for sorting)
          const latestYear = years.sort((a, b) => {
            const yearA = parseInt(a.match(/\d{4}/)?.[0] || a);
            const yearB = parseInt(b.match(/\d{4}/)?.[0] || b);
            return yearB - yearA;
          })[0];
          
          setCurrentYear(latestYear);
          setCurrentYearMembers(allData[latestYear] || []);
        }
      } catch (error) {
        console.error('Failed to load members:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadMembers();
  }, []);
  
  // Generate random non-overlapping positions for members
  const generateRandomPositions = (count) => {
    const positions = [];
    const minDistance = 15;
    const logoArea = { x: 28, y: 50, radius: 18 };
    
    for (let i = 0; i < count; i++) {
      let attempts = 0;
      let position;
      
      while (attempts < 150) {
        const x = 48 + Math.random() * 40;
        const y = 12 + Math.random() * 76;
        
        const distanceToLogo = Math.sqrt(Math.pow(x - logoArea.x, 2) + Math.pow(y - logoArea.y, 2));
        if (distanceToLogo < logoArea.radius + minDistance) {
          attempts++;
          continue;
        }
        
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
      
      if (!position) {
        position = { top: 20 + (i * 8), left: 50 + (i % 5) * 8 };
      }
      
      positions.push(position);
    }
    
    return positions;
  };

  const [memberPositions, setMemberPositions] = useState([]);
  
  // Regenerate positions when members data changes
  useEffect(() => {
    if (currentYearMembers.length > 0) {
      setMemberPositions(generateRandomPositions(currentYearMembers.length));
    }
  }, [currentYearMembers.length]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00FF41]/20 border-t-[#00FF41] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-slate-400">Loading members...</p>
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
            <div className="mb-8">
              <div className="inline-block mb-6">
                <div className="px-6 py-2 bg-white/[0.03] backdrop-blur-md border border-[#00FF41]/20 rounded-full">
                  <span className="text-[#00FF41] text-sm font-bold uppercase tracking-widest">
                    Current Team
                  </span>
                </div>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-[#00FF41] to-white bg-clip-text text-transparent">
                Our Members
              </h1>
              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
                Meet the talented individuals driving CP Squad forward in {currentYear}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 mb-12">
              <div className="flex items-center gap-6">
                <div className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] to-[#00FF41]/40">
                  {currentYear}
                </div>
                <div className="flex-1 h-1 w-32 bg-gradient-to-r from-[#00FF41]/50 to-transparent"></div>
              </div>
              
              <div className="px-6 py-2 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-full">
                <span className="text-slate-400 text-sm uppercase tracking-wider">
                  {currentYearMembers.length} Active Members
                </span>
              </div>

              <Link href="/contributors">
                <button className="px-6 py-2 bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-md border border-white/10 hover:border-[#00FF41]/30 rounded-full transition-all duration-300 flex items-center gap-2 group">
                  <span className="text-white text-sm">View All Years</span>
                  <svg className="w-4 h-4 text-[#00FF41] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Members Display */}
        <main className="px-4 sm:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="relative w-full max-w-[1400px] aspect-[16/9] mx-auto">
              {/* Glass panel container */}
              <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                {/* Sidebar with year */}
                <div className="absolute left-0 top-0 bottom-0 w-20 border-r border-white/5 bg-white/[0.03] flex flex-col items-center justify-center">
                  <span className="text-6xl font-black text-white/10 rotate-180 uppercase tracking-tighter" style={{ writingMode: "vertical-rl" }}>
                    {currentYear}
                  </span>
                  <div className="absolute bottom-8 flex flex-col gap-4">
                    <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                    <span className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                  </div>
                </div>

                {/* Main content area */}
                <div className="ml-20 relative h-full flex items-center justify-center overflow-hidden">
                  {/* Header */}
                  {/* <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30">
                    <div className="px-12 py-3 bg-white/[0.05] backdrop-blur-md border border-[#00FF41]/20 rounded-full">
                      <h2 className="text-2xl font-bold tracking-[0.2em] uppercase text-white">
                        Active Members
                      </h2>
                    </div>
                  </div> */}

                  {/* Center Logo */}
                  <div className="absolute left-32 top-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center z-20">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-[#00FF41]/10 blur-3xl rounded-full animate-pulse"></div>
                    
                    {/* Logo container */}
                    <div className="relative z-10 w-48 h-48 rounded-full border-4 border-[#00FF41]/40 p-4 bg-black/40 backdrop-blur-sm shadow-[0_0_40px_rgba(0,255,65,0.3)]">
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

                  {/* Members randomly positioned */}
                  <div className="relative w-full h-full">
                    {currentYearMembers.length === 0 ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center max-w-md">
                          <div className="text-6xl mb-4">👥</div>
                          <h3 className="text-2xl font-bold text-white mb-3">No Members Yet</h3>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            Members data will be loaded from Google Sheets. 
                            Please add team members for the current year to see them here.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {currentYearMembers.map((member, index) => (
                          <ContributorCard
                            key={member.id}
                            {...member}
                            position={{
                              top: `${memberPositions[index]?.top || 50}%`,
                              left: `${memberPositions[index]?.left || 50}%`
                            }}
                            size="large"
                          />
                        ))}

                        {/* Orbital rings */}
                        <div className="absolute inset-0 pointer-events-none opacity-10">
                          <div className="absolute top-1/2 left-[28%] -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] border border-[#00FF41]/20 rounded-full"></div>
                          <div className="absolute top-1/2 left-[28%] -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] border border-[#00FF41]/15 rounded-full"></div>
                          <div className="absolute top-1/2 left-[28%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#00FF41]/5 rounded-full"></div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Bottom stats */}
                  {/* <div className="absolute bottom-6 right-6 flex items-center gap-4">
                    <div className="px-4 py-2 bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-full">
                      <span className="text-xs text-slate-400 uppercase tracking-widest">
                        Academic Year {currentYear}
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Members Grid - Detailed View */}
            {currentYearMembers.length > 0 && (
              <div className="mt-20">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-3xl font-bold">Current Team Roster</h3>
                  <div className="px-4 py-2 bg-white/[0.03] backdrop-blur-md border border-[#00FF41]/20 rounded-full">
                    <span className="text-[#00FF41] text-sm font-bold uppercase tracking-wider">
                      {currentYearMembers.length} Members
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {currentYearMembers.map((member, index) => (
                    <div
                      key={member.id}
                      className="p-6 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-xl hover:border-[#00FF41]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,65,0.1)] group opacity-0 translate-y-8 animate-fadeUp"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-[#00FF41]/30 p-1 group-hover:border-[#00FF41] transition-all">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                          {member.avatar && !imageErrors[member.id] ? (
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-full h-full object-cover"
                              onError={() => setImageErrors(prev => ({ ...prev, [member.id]: true }))}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                              {member.name?.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-center mb-1">{member.name}</h4>
                      <p className="text-[#00FF41] text-sm text-center mb-3 uppercase tracking-wider">
                        {member.role}
                      </p>
                      {member.linkedin && (
                        <div className="flex gap-2 justify-center">
                          <a
                            href={member.linkedin}
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

export default MembersView;
