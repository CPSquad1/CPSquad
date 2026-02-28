"use client";
import React, { useState } from "react";

const ContributorCard = ({ 
  name, 
  role, 
  avatar, 
  linkedin,
  position = { top: "50%", left: "50%" },
  size = "medium"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-20 h-20",
    large: "w-28 h-28",
    xlarge: "w-32 h-32"
  };

  const roleColors = {
    HOD: "text-[#00FF41] border-[#00FF41]/50",
    TM: "text-purple-400 border-purple-400/50",
    PR: "text-blue-400 border-blue-400/50",
    VPR: "text-[#00FF41] border-[#00FF41]/50",
    MAM: "text-cyan-400 border-cyan-400/50",
    Member: "text-gray-400 border-gray-400/50"
  };

  const roleColor = roleColors[role] || roleColors.Member;

  return (
    <div
      className="contributor-node absolute group/node cursor-pointer transition-all duration-500 z-10"
      style={position}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Avatar */}
      <div className={`relative ${sizeClasses[size]} rounded-full border-2 ${roleColor} p-1 group-hover/node:border-opacity-100 group-hover/node:shadow-[0_0_20px_rgba(0,255,65,0.6)] transition-all duration-300`}>
        <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden relative">
          {avatar && !imageError ? (
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-sm font-bold">
              {name?.charAt(0) || "?"}
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
      <div className={`tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-4 transition-all duration-300 pointer-events-none w-48 bg-black/90 backdrop-blur-md border ${roleColor.split(' ')[1]} p-4 rounded-lg z-50 ${isHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-2"}`}>
        <p className="text-white font-bold text-sm">{name}</p>
        <p className={`${roleColor.split(' ')[0]} text-xs font-medium uppercase`}>
          {role || "Member"}
        </p>
        {linkedin && (
          <div className="flex gap-2 mt-3">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded bg-white/10 hover:bg-white/20 transition-colors pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContributorCard;
