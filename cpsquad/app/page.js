"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import BlogCard from "./component/BlogCard/BlogCard";
import blogdata from "./lib/data/blogdata.js";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center p-8"
      >
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            CP SQUAD_
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-mono mb-8">
            Building competitive programmers, one problem at a time.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#about"
              className="px-8 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded transition-colors"
            >
              Learn More
            </a>
            <a
              href="#features"
              className="px-8 py-3 border border-white/30 hover:border-white/60 text-white font-semibold rounded transition-colors"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center p-8 bg-[#111111]"
      >
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
            ABOUT US_
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-6 leading-relaxed">
            We're coders, enthusiasts, geeks. We're CP Squad - a community
            dedicated to building competitive programming skills and fostering a
            culture of continuous learning.
          </p>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            Fueled by a passion for programming and problem-solving, our club
            doesn't just build skills, we delve deeper into algorithms, data
            structures, and competitive programming strategies.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="min-h-screen flex items-center justify-center p-8"
      >
        <div className="max-w-6xl w-full">
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center tracking-tight">
            WHAT WE DO_
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Competitive Programming",
                description:
                  "Regular contests, practice sessions, and algorithm workshops to sharpen your coding skills.",
                icon: "💻",
              },
              {
                title: "Community Events",
                description:
                  "Hackathons, coding competitions, and collaborative learning sessions with peers.",
                icon: "🚀",
              },
              {
                title: "Skill Development",
                description:
                  "Learn from industry experts, improve problem-solving abilities, and build your portfolio.",
                icon: "📚",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] p-8 rounded-lg border border-gray-800 hover:border-green-500 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="w-[85vw] mx-auto">
        <div className="flex justify-center mt-5 ">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
            OUR BLOGS_
          </h2>
        </div>

        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:gap-[15px] md:gap-[30px]  mx-auto mt-5 mb-[50px] max-w-[1200px]">
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
    </div>
  );
}
