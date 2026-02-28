"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchContributorsByYear } from "../../app/lib/fetchContributors.js";
import MemberCard from "../MemberCard/MemberCard.jsx";

const MembersView = () => {
  const [currentYearMembers, setCurrentYearMembers] = useState([]);
  const [currentYear, setCurrentYear] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
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
              {/* <div className="inline-block mb-6">
                <div className="px-6 py-2 bg-white/[0.03] backdrop-blur-md border border-[#00FF41]/20 rounded-full">
                  <span className="text-[#00FF41] text-sm font-bold uppercase tracking-widest">
                    Current Team
                  </span>
                </div>
              </div> */}
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
                  <span className="text-white text-sm">View All Contributors</span>
                  <svg className="w-4 h-4 text-[#00FF41] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </header>

        {/* Members Grid */}
        <main className="px-4 sm:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            {currentYearMembers.length === 0 ? (
              <div className="flex items-center justify-center min-h-[400px]">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-24">
                {currentYearMembers.map((member, index) => (
                  <MemberCard 
                    key={member.id}
                    member={member}
                    currentYear={currentYear}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MembersView;
