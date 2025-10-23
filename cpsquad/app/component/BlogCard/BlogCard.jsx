"use client";
import React from "react";
import Link from "next/link";

const BlogCard = ({ id, title, excerpt, image, slug }) => {
  return (
    <div
      key={id}
      className="relative h-[400px] sm:h-[500px] overflow-hidden mb-[50px]
      bg-[#1e1e1e]
      group transform transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
      opacity-0 translate-y-8 animate-fadeUp
      hover:scale-[1.04] hover:shadow-2xl
      border border-gray-800
      rounded-[5px]"
    >
      <img
        className="absolute inset-0 z-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110 rounded-[5px]"
        src={image}
        alt={title}
      />

      <div
        className="absolute inset-0 bg-black/60 z-10 group-hover:bg-gradient-to-t from-[#00A63E]/10 to-[#00ff66]/46
 transition-all duration-500 rounded-[5px] group-hover:shadow-[0_0_20px_#00A63E50]"
      ></div>

      <div className="absolute top-5 w-full text-center px-3 text-[22px] text-white z-20 font-mono font-semibold tracking-wide">
        {title}
      </div>

      <div className="absolute bottom-5 w-full px-3 text-white z-20 font-sans text-center">
        <p className="text-sm sm:text-base leading-relaxed mb-4">{excerpt}</p>

        <Link href={`/blogs/${slug}`}>
          <button
            className="px-6 py-2 border border-white/70 rounded-md text-sm tracking-wide
            bg-transparent text-white font-medium transition-all duration-300
            hover:bg-white hover:text-black hover:shadow-lg"
          >
            Read More →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
