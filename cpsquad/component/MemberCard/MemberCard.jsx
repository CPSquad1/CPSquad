"use client";
import React, { useState } from "react";

const MemberCard = ({ member, currentYear, index }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="group relative flex flex-col items-center opacity-0 translate-y-8 animate-fadeUp"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Avatar container with curved text */}
      <div className="relative mb-6">
        {/* Curved text container */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-[280px] h-[140px] pointer-events-none overflow-visible z-10">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 200 100">
            <defs>
              <path
                id={`curve-${member.id}`}
                d="M 20,80 A 80,80 0 0,1 180,80"
              />
            </defs>
            <text 
              className="fill-white text-[14px] font-bold uppercase tracking-[0.2em] opacity-90 group-hover:opacity-100 transition-opacity duration-300" 
              textAnchor="middle"
            >
              <textPath href={`#curve-${member.id}`} startOffset="50%">
                {member.name || 'Member'}
              </textPath>
            </text>
          </svg>
        </div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-[#00FF41]/20 rounded-full blur-3xl opacity-0 scale-50 group-hover:scale-100 group-hover:opacity-40 transition-all duration-500"></div>

        {/* Center circular photo */}
        <div className="relative z-20 w-48 h-48 md:w-52 md:h-52 rounded-full p-1 border border-white/10 overflow-hidden">
          <div className="w-full h-full rounded-full overflow-hidden relative">
            {member.avatar && !imageError ? (
              <img
                src={member.avatar}
                alt={member.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                <span className="text-6xl font-bold text-white">
                  {member.name?.charAt(0) || '?'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom section with role and LinkedIn */}
      <div className="flex flex-col items-center gap-3">
        {/* Role text */}
        <p className="text-xs uppercase tracking-[0.3em] text-[#00FF41] font-bold">
          {member.role}
        </p>

        {/* LinkedIn icon with glass effect - no border */}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-lg backdrop-blur-sm hover:bg-[#00FF41]/20 transition-all duration-300"
            aria-label={`${member.name} LinkedIn Profile`}
          >
            <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

export default MemberCard;

