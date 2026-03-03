"use client";
import React, { useState } from "react";
import Link from "next/link";
import { LuDot } from "react-icons/lu";

const EventCard = ({
  id,
  title,
  excerpt,
  image,
  slug,
  eventType,
  date,
  duration,
  participants,
}) => {
  // State to track if image failed to load
  const [imageError, setImageError] = useState(false);
  
  // Check if image is the logo placeholder
  const isLogoPlaceholder = image && image.includes('/images/logo.png');
  
  // Use logo if image failed or is placeholder
  const shouldShowLogo = !image || imageError || isLogoPlaceholder;
  
  // console.log(`[EventCard] ${slug}: image=${image || 'NULL'}, shouldShowLogo=${shouldShowLogo}`);
  
  return (
    <div
      key={id}
      className="w-full relative h-[400px] sm:h-[480px] overflow-hidden mb-[50px]
      bg-[#1e1e1e]
      group transform transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
      opacity-0 translate-y-8 animate-fadeUp
      sm:hover:scale-[1.02] md:hover:scale-[1.04] hover:shadow-2xl
      border border-gray-800
      rounded-[5px]"
    >
      {shouldShowLogo ? (
        // Logo placeholder - smaller, centered
        <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center rounded-[5px]">
          <img
            className="w-32 h-32 object-contain opacity-30"
            src="/images/logo.png"
            alt={title}
          />
        </div>
      ) : (
        // Regular brochure image - full cover
        <img
          className="absolute inset-0 z-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110 rounded-[5px]"
          src={image}
          alt={title}
          onError={() => {
            // console.warn(`[EventCard] Image failed for ${slug}, using logo fallback`);
            setImageError(true);
          }}
        />
      )}

      <div
        className="absolute inset-0 bg-black/60 z-10 group-hover:bg-gradient-to-t from-[#00A63E]/10 to-[#00ff66]/46
 transition-all duration-500 rounded-[5px] group-hover:shadow-[0_0_20px_#00A63E50]"
      ></div>

      <div className="absolute top-5 left-5 z-20">
        <span
          className="px-3 py-1 text-xs font-semibold uppercase tracking-wide
    bg-green-500/20 border border-green-400/40 text-green-300
    rounded-full backdrop-blur-sm
    transition-all duration-300 ease-in-out
    group-hover:scale-110
    group-hover:shadow-[0_0_12px_#98fb98]
    group-hover:bg-green-500/30
    group-hover:text-white font-sans"
        >
          {eventType}
        </span>
      </div>

      <div className="absolute top-16 w-full text-center px-3 text-[18px] sm:text-[22px] text-white z-20 font-mono font-semibold tracking-wide">
        {title}
      </div>

      <div className="absolute bottom-5 w-full px-3 text-white z-20 font-sans text-center">
        <div className="w-full flex justify-center gap-1 text-gray-300 text-xs sm:text-xs z-20 font-sans opacity-90 mb-4">
          <span>{date}</span>
          <span className="flex justify-center items-center">
            <LuDot />
          </span>
          <span>{duration}</span>
          {participants && (
            <>
              <span className="flex justify-center items-center">
                <LuDot />
              </span>
              <span>{participants} Students</span>
            </>
          )}
        </div>
        <Link href={`/events/${slug}`}>
          <button
            className="px-3 py-1 sm:px-3 sm:py-2 border border-white/70 rounded-md text-sm tracking-wide
            bg-transparent text-white font-medium transition-all duration-300
            hover:bg-white hover:text-black hover:shadow-lg"
          >
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
