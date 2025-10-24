"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BlogPost from "./BlogPost";
import BlogCard from "./BlogCard";
import FilterDropdown from "./FilterDropdown";
import Marquee from "./Marquee";
import { blogPosts, categories } from "./blogData";

export default function BlogsPage() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showFullPost, setShowFullPost] = useState(false);

  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
    setShowFullPost(true);
  };

  const handleBackToBlogs = () => {
    setShowFullPost(false);
    setSelectedBlog(null);
  };

  const filteredBlogs = currentFilter === "all" 
    ? blogPosts 
    : blogPosts.filter(blog => blog.category.toLowerCase() === currentFilter);

  // Show full blog post if selected
  if (showFullPost && selectedBlog) {
    return <BlogPost blog={selectedBlog} onBack={handleBackToBlogs} />;
  }

  return (
    <div className="font-sans bg-[#0a0a0a] text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-8 min-h-[60vh]">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-green-900/20 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left: Title */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white drop-shadow-2xl">
                BLOGS_
              </h1>
              <p className="text-lg md:text-xl text-gray-200 font-mono mt-4 max-w-md">
                Insights, tutorials, and stories from the competitive programming world.
              </p>
            </motion.div>

            {/* Right: Marquee Lines */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="space-y-6"
            >
              <Marquee speed={35} direction="left">
                <span className="text-2xl md:text-3xl font-bold text-gray-300 uppercase tracking-wider px-8">
                  Competitive Programming • Algorithms • Data Structures •
                </span>
              </Marquee>
              
              <Marquee speed={40} direction="right">
                <span className="text-2xl md:text-3xl font-bold text-gray-400 uppercase tracking-wider px-8">
                  Problem Solving • Contests • Tutorials •
                </span>
              </Marquee>
              
              <Marquee speed={38} direction="left">
                <span className="text-2xl md:text-3xl font-bold text-gray-300 uppercase tracking-wider px-8">
                  ICPC • Codeforces • LeetCode • Practice •
                </span>
              </Marquee>
              
              <Marquee speed={42} direction="right">
                <span className="text-2xl md:text-3xl font-bold text-gray-400 uppercase tracking-wider px-8">
                  Dynamic Programming • Graphs • Greedy •
                </span>
              </Marquee>
              
              <Marquee speed={36} direction="left">
                <span className="text-2xl md:text-3xl font-bold text-gray-300 uppercase tracking-wider px-8">
                  Binary Search • Sorting • Two Pointers •
                </span>
              </Marquee>
              
              <Marquee speed={44} direction="right">
                <span className="text-2xl md:text-3xl font-bold text-gray-400 uppercase tracking-wider px-8">
                  Backtracking • Recursion • Trees • Strings •
                </span>
              </Marquee>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-8 mb-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-between items-center"
          >
            <h2 className="text-2xl font-bold text-gray-300">
              FILTER BY
            </h2>
            <FilterDropdown
              currentFilter={currentFilter}
              categories={categories}
              onFilterChange={setCurrentFilter}
            />
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
            {filteredBlogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} onReadMore={handleReadMore} />
            ))}
          </div>

          {/* No Results */}
          {filteredBlogs.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center py-20"
            >
              <h3 className="text-2xl font-bold mb-4">No blogs found</h3>
              <p className="text-gray-400">
                Try adjusting your filter or check back soon for new content.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}