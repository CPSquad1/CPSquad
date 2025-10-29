"use client";

import Link  from "next/link";
import { Button } from "../component/ui/button";

const BlogSection = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0b0b]">
      {/* 🔹 Animated Laser Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,102,0.08),_transparent_70%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,_rgba(0,255,102,0.05)_0px,_rgba(0,255,102,0.05)_1px,_transparent_1px,_transparent_20px)] blur-[2px] opacity-70 animate-slowPulse"></div>
        <div className="absolute inset-0 bg-[url('/images/blog-bg.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      </div>

      {/* 🔹 Content */}
      <div className="relative z-10 text-center space-y-6 px-6 animate-fadeUp">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white drop-shadow-[0_0_10px_rgba(0,255,102,0.3)]">
          Explore Our <span className="text-[#00ff66]">Blog</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Discover insightful articles on web development, design, and technology
        </p>
        <Link href="/blogs">
          <Button
            className="bg-[#00A63E] hover:bg-[#00ff66] text-white px-8 py-6 text-lg rounded-lg shadow-lg 
            hover:shadow-[0_0_25px_rgba(0,255,102,0.4)] transition-all duration-300"
          >
            View All Blogs
          </Button>
        </Link>
      </div>

      {/* 🔹 Optional Floating Lights */}
      <div className="absolute w-[300px] h-[300px] bg-[#00ff66]/10 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-[250px] h-[250px] bg-[#00A63E]/10 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
    </div>
  );
};

export default BlogSection;

