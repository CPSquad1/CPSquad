"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import BlogCard from "../component/BlogCard/BlogCard.jsx";
import blogdata from "./lib/data/blogdata.js";
import Link from "next/link";
import ParticleBackground from "../component/ParticleBackground/ParticleBackground.jsx";
import HeroText from "../component/HeroText/HeroText.jsx";

export default function Home() {
  return (
    <div className="font-sans bg-[#0a0a0a] text-white">

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-20 relative overflow-hidden"
      >
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] rounded-full bg-[#00FF41] opacity-15 blur-[150px] md:blur-[200px]"></div>
        <ParticleBackground />
        <HeroText />
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-12 md:py-20 bg-black relative overflow-hidden"
      >
        <div className="absolute left-0 right-350 top-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[200px] sm:h-[400px] md:h-[600px] rounded-4xl bg-[#00FF41] opacity-40 blur-[150px] md:blur-[200px]"></div>
        <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 max-w-7xl w-full">
          <div className="w-full relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 sm:mb-8 md:mb-12 tracking-tight uppercase leading-tight">
              BUILD<span className="text-gray-500">_</span> CODE<span className="text-gray-500">_</span> DEPLOY<span className="text-gray-500">_</span>
              <br />
              ALGORITHMS. CONTESTS. <span className="text-[#00FF41]">SKILLS.</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-6 md:mb-8 leading-relaxed">
              At CP Squad, we bridge the gaps between ideas and reality. We combine our expertise in competitive programming to craft powerful problem-solving skills. Our club fosters a culture of continuous learning and exploration, ensuring we stay at the forefront of the ever-evolving computer science landscape. By prioritizing rigorous practice and scalable knowledge, we build what we envision.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
              As the official competitive programming club, we organize contests, workshops, and collaborative coding sessions to elevate algorithmic thinking and problem-solving abilities.
            </p>
          </div>
          <div className="w-full relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[
                {
                  number: "00",
                  icon: "10101",
                  title: "Competitive Programming",
                  description:
                    "From basic algorithms to advanced data structures, we're fluent in problem-solving across all platforms. Mastering competitive programming is our forte.",
                  hoverColor: "hover:bg-gradient-to-br hover:from-[#ff0077]/75 hover:to-[#ff0077]/75",
                },
                {
                  number: "01",
                  icon: ">$",
                  title: "Workshops & Contests",
                  description:
                    "From weekly contests to intensive bootcamps - we organize, participate, and excel in competitive programming events to ensure peak performance and growth.",
                  hoverColor: "hover:bg-gradient-to-br hover:from-[#0084FF]/75 hover:to-[#0084FF]/75",
                },
                {
                  number: "02",
                  icon: "AI",
                  title: "Skill Development",
                  description:
                    "With expertise spanning from basic concepts to advanced algorithms, we're well-equipped to elevate problem-solving skills and prepare for the future.",
                  hoverColor: "hover:bg-gradient-to-br hover:from-[#00FF41]/75 hover:to-[#00FF41]/75",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`bg-[#1e293b] p-6 sm:p-8 rounded-lg transition-all duration-500 group ${feature.hoverColor}`}
                >
                  <div className="text-right text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">{feature.number}</div>
                  <div className="flex items-center justify-center mb-6 sm:mb-8 h-24 sm:h-32">
                    <span className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-600 group-hover:text-gray-400 transition-colors duration-500"
                      style={{ fontFamily: 'monospace', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                      {feature.icon}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">{feature.title}</h3>
                  <p className="text-white text-xs sm:text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-12 md:py-20 bg-[#1a1d2e] relative overflow-hidden">
        {/* Green gradient glow on right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] rounded-full bg-[#00FF41] opacity-15 blur-[150px] md:blur-[200px]"></div>
        
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 relative z-10">
          {/* Left Side - About Text */}
          <div>
            <h3 className="text-sm md:text-base font-bold mb-4 md:mb-6 uppercase tracking-wider text-gray-400">
              ABOUT US •
            </h3>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 leading-tight uppercase">
              WE'RE CODERS, ENTHUSIASTS, GEEKS.<br />
              WE'RE <span className="text-[#00FF41]">CP SQUAD</span>_
            </h2>
          </div>

          {/* Right Side - Description and Stats */}
          <div className="flex flex-col justify-between">
            <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-8 md:mb-12">
              Fueled by a passion for programming and the field of Computer Science, our club doesn't just build bleeding-edge applications, we delve deeper into the frontiers of the field, pushing boundaries and exploring new technology together. Embracing the journey of constant growth and discovery is what defines us as CP Squad.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#00FF41] mb-2" 
                     style={{ fontFamily: 'monospace', textShadow: '0 0 20px rgba(0, 255, 65, 0.5)' }}>
                  50<span className="text-2xl sm:text-3xl md:text-4xl">+</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-400">contests</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#00FF41] mb-2" 
                     style={{ fontFamily: 'monospace', textShadow: '0 0 20px rgba(0, 255, 65, 0.5)' }}>
                  200<span className="text-2xl sm:text-3xl md:text-4xl">+</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-400">members</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#00FF41] mb-2" 
                     style={{ fontFamily: 'monospace', textShadow: '0 0 20px rgba(0, 255, 65, 0.5)' }}>
                  5<span className="text-2xl sm:text-3xl md:text-4xl">+</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-400 uppercase">Years<br />of experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
        <section id="blogs" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 sm:py-16 md:py-20">
        <div className="flex justify-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            OUR BLOGS_
          </h2>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:gap-10 
                grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {blogdata.slice(0, 3).map((item, id) => (
            <BlogCard
              key={item.id}
              title={item.title}
              excerpt={item.excerpt}
              image={item.image}
              slug={item.slug}
              category={item.category}
              date={item.date}
              author={item.author}
              readTime={item.readTime}
            />
          ))}
        </div>
        <Link href="/blogs">
          <div className="flex justify-center items-center mb-[80px] ">
            <button className="bg-gray-700 w-[150px] py-3 hover:bg-gray-800 transition-all duration-300">
              View more
            </button>
          </div>
        </Link>
        </section>
      {/* </section> */}
    </div>
  );
}
