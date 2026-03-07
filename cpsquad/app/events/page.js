"use client";
import React, { useState, useEffect } from "react";
import EventCard from "@/component/EventCard/EventCard";
import ParticleBackground from "@/component/ParticleBackground/ParticleBackground";
import { fetchEvents } from "@/app/lib/fetchEvents";

export default function EventsPage() {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Fetch events from Google Sheets
  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await fetchEvents();
        setEventsData(data);
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadEvents();
  }, []);
  
  // Get unique event types for filtering
  const eventTypes = ["all", ...new Set(eventsData.map(event => event.eventType))];
  
  // Filter events based on selected category
  const filteredEvents = selectedCategory === "all" 
    ? eventsData 
    : eventsData.filter(event => event.eventType === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden">
        <ParticleBackground />
        
        {/* Animated Background Text */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-10">
          <div className="text-[8vw] sm:text-[6vw] md:text-[5vw] font-black whitespace-nowrap animate-scroll">
            <span className="text-[#00FF41]">COMPETITIVE PROGRAMMING </span>
            <span className="text-blue-500">CODING CONTESTS </span>
            <span className="text-purple-500">WORKSHOPS </span>
            <span className="text-red-500">DATA STRUCTURES </span>
            <span className="text-[#00FF41]">ALGORITHMS </span>
            <span className="text-blue-500">EXPERT TALKS </span>
            <span className="text-purple-500">SKILL DEVELOPMENT </span>
            <span className="text-red-500">TEAM BUILDING </span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="relative z-10 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4">
            EVENTS<span className="text-gray-500">_</span>
          </h1>
        </div>

        {/* Glow effect */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00FF41] opacity-20 blur-[150px]"></div>
      </section>

      {/* Filter Section */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-16 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <h2 className="text-xl sm:text-2xl font-bold">
              FILTER BY <span className="text-gray-500">•</span>
            </h2>
            
            <div className="relative w-full sm:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 bg-[#1e1e1e] border border-gray-700 rounded-md text-white cursor-pointer focus:outline-none focus:border-[#00FF41] transition-colors appearance-none"
              >
                {eventTypes.map((type) => (
                  <option key={type} value={type} className="bg-[#1e1e1e]">
                    {type === "all" ? "All Categories" : type}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00FF41]"></div>
              <p className="mt-4 text-gray-400">Loading events...</p>
            </div>
          )}

          {/* Events Grid */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                excerpt={event.excerpt}
                image={event.image}
                slug={event.slug}
                eventType={event.eventType}
                date={event.date}
                duration={event.duration}
                participants={event.participants}
              />
              ))}
            </div>
          )}

          {/* No Events Message */}
          {!loading && filteredEvents.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">No events found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
