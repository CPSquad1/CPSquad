"use client";
import React from "react";
import { useParams } from "next/navigation";
import { eventsData } from "@/app/lib/data/eventsDataClient";
import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiClock, FiUsers, FiDollarSign, FiFileText } from "react-icons/fi";

export default function EventDetailPage() {
  const params = useParams();
  const slug = params.slug;
  
  // Find the event by slug
  const event = eventsData.find(e => e.slug === slug);
  
  if (!event) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
          <Link href="/events" className="text-[#00FF41] hover:underline">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Back Button */}
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-8">
        <Link 
          href="/events" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00FF41] transition-colors group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Events
        </Link>
      </div>

      {/* Hero Image Section */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/50 to-transparent"></div>
        
        {/* Event Type Badge */}
        <div className="absolute top-8 left-8">
          <span className="px-4 py-2 bg-green-500/20 border border-green-400/40 text-green-300 rounded-full backdrop-blur-sm text-sm font-semibold uppercase tracking-wide">
            {event.eventType}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-12 max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 leading-tight">
          {event.title}
        </h1>

        {/* Event Meta Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Date */}
          <div className="bg-[#1e1e1e] border border-gray-800 rounded-lg p-6 hover:border-[#00FF41] transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <FiCalendar className="text-[#00FF41] text-xl" />
              <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wide">Date</h3>
            </div>
            <p className="text-white text-lg font-medium">{event.date}</p>
          </div>

          {/* Duration */}
          <div className="bg-[#1e1e1e] border border-gray-800 rounded-lg p-6 hover:border-[#00FF41] transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <FiClock className="text-[#00FF41] text-xl" />
              <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wide">Duration</h3>
            </div>
            <p className="text-white text-lg font-medium">{event.duration}</p>
          </div>

          {/* Participants */}
          {event.participants > 0 && (
            <div className="bg-[#1e1e1e] border border-gray-800 rounded-lg p-6 hover:border-[#00FF41] transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <FiUsers className="text-[#00FF41] text-xl" />
                <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wide">Participants</h3>
              </div>
              <p className="text-white text-lg font-medium">{event.participants} Students</p>
            </div>
          )}

          {/* Budget */}
          {event.budget > 0 && (
            <div className="bg-[#1e1e1e] border border-gray-800 rounded-lg p-6 hover:border-[#00FF41] transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <FiDollarSign className="text-[#00FF41] text-xl" />
                <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wide">Budget</h3>
              </div>
              <p className="text-white text-lg font-medium">₹{event.budget}</p>
            </div>
          )}
        </div>

        {/* Expert Section */}
        {event.expertName && event.expertName !== '-' && (
          <div className="bg-[#1e1e1e] border border-gray-800 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#00FF41]">Expert Speaker</h2>
            <div>
              <p className="text-xl font-semibold mb-2">{event.expertName}</p>
              {event.affiliation && event.affiliation !== '-' && (
                <p className="text-gray-400">{event.affiliation}</p>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="bg-[#1e1e1e] border border-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-[#00FF41]">About This Event</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            {event.excerpt}
          </p>
        </div>

        {/* Links Section */}
        {(event.linkOfData || event.brochure) && (
          <div className="bg-[#1e1e1e] border border-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-[#00FF41]">Resources</h2>
            <div className="flex flex-col gap-4">
              {event.linkOfData && (
                <a 
                  href={event.linkOfData}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-[#00FF41] transition-colors"
                >
                  <FiFileText />
                  <span>Event Data & Resources</span>
                </a>
              )}
              {event.brochure && (
                <a 
                  href={event.brochure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-[#00FF41] transition-colors"
                >
                  <FiFileText />
                  <span>Event Brochure</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Link 
            href="/events"
            className="inline-block px-8 py-3 bg-[#00FF41] text-black font-semibold rounded-md hover:bg-[#00DD35] transition-colors"
          >
            View More Events
          </Link>
        </div>
      </div>
    </div>
  );
}
