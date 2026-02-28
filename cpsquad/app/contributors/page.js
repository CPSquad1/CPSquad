"use client";
import React, { useState, useEffect } from "react";
import YearCard from "../../component/YearCard/YearCard.jsx";
import ParticleBackground from "../../component/ParticleBackground/ParticleBackground.jsx";
import { fetchContributorsByYear } from "../lib/fetchContributors.js";

export default function ContributorsPage() {
  const [contributorsData, setContributorsData] = useState({});
  const [availableYears, setAvailableYears] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch all contributors grouped by year
  useEffect(() => {
    async function loadContributors() {
      try {
        const data = await fetchContributorsByYear();
        setContributorsData(data);
        
        // Get years that have contributors and sort descending (newest first)
        // Supports formats like "2025-26" by extracting the first year number
        const years = Object.keys(data)
          .filter(year => data[year].length > 0)
          .sort((a, b) => {
            // Extract first year number from formats like "2025-26" or "2025"
            const yearA = parseInt(a.match(/\d{4}/)?.[0] || a);
            const yearB = parseInt(b.match(/\d{4}/)?.[0] || b);
            return yearB - yearA; // Descending order (newest first)
          });
        
        setAvailableYears(years);
      } catch (error) {
        console.error('Failed to load contributors:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadContributors();
  }, []);
  
  // Calculate total contributors
  const totalContributors = Object.values(contributorsData).reduce(
    (total, yearData) => total + yearData.length,
    0
  );
  
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
  
  // No data state
  if (availableYears.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-slate-400 mb-2">No contributors found</p>
          <p className="text-sm text-slate-500">Add contributors to your Google Sheet to get started</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-x-hidden">
      {/* Particle Background */}
      {/* <ParticleBackground /> */}

      {/* Ambient glow effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00FF41]/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00FF41]/5 blur-[150px] rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-8">
        {/* Header */}
        <header className="max-w-7xl mx-auto mb-20 text-center">
          {/* <div className="inline-block mb-6">
            <div className="px-6 py-2 bg-white/[0.03] backdrop-blur-md border border-[#00FF41]/20 rounded-full">
              <span className="text-[#00FF41] text-sm font-bold uppercase tracking-widest">
                Team
              </span>
            </div>
          </div> */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-[#00FF41] to-white bg-clip-text text-transparent">
            Contributors
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Meet the brilliant minds behind CP Squad. Our contributors have shaped the community year after year.
          </p>
        </header>

        {/* Year Cards - Dynamically generated based on available data */}
        <div className="max-w-7xl mx-auto space-y-16">
          {availableYears.map((year, index) => {
            const isNewest = index === 0;
            const isOldest = index === availableYears.length - 1;
            
            return (
              <div 
                key={year}
                className="opacity-0 translate-y-8 animate-fadeUp" 
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <div className="mb-8 flex items-center gap-4">
                  <h2 className="text-4xl font-bold text-white">{year}</h2>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-[#00FF41]/50 to-transparent"></div>
                  {isNewest && (
                    <span className="text-sm text-slate-500 uppercase tracking-wider">Current</span>
                  )}
                  {isOldest && availableYears.length > 1 && (
                    <span className="text-sm text-slate-500 uppercase tracking-wider">Legacy</span>
                  )}
                </div>
                <YearCard year={year} contributors={contributorsData[year]} />
              </div>
            );
          })}
        </div>

        {/* Footer Stats */}
        <div className="max-w-7xl mx-auto mt-20 pt-12 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-xl">
              <div className="text-4xl font-black text-[#00FF41] mb-2">
                {totalContributors}
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">Total Contributors</div>
            </div>
            <div className="p-6 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-xl">
              <div className="text-4xl font-black text-[#00FF41] mb-2">
                {availableYears.length}
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">Years Active</div>
            </div>
            <div className="p-6 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-xl">
              <div className="text-4xl font-black text-[#00FF41] mb-2">∞</div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">Lines of Code</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
