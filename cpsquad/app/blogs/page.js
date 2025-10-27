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
        
        <div className="max-w-7xl mx-auto relative z-10 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center w-full">
            {/* Left: Title - Smaller */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-3"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
                BLOGS_
              </h1>
              <p className="text-sm md:text-base text-gray-200 font-mono mt-2 max-w-xs">
                Insights, tutorials, and stories from the competitive programming world.
              </p>
            </motion.div>

            {/* Right: Marquee Lines - Wider */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="lg:col-span-9 space-y-4"
            >
              <Marquee speed={35} direction="left">
                <div className="flex items-center space-x-6">
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-blue-500/30 border border-blue-400/20 backdrop-blur-sm">
                    ARTIFICIAL INTELLIGENCE
                  </span>
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-green-500 to-teal-600 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-green-500/30 border border-green-400/20 backdrop-blur-sm">
                    MACHINE LEARNING
                  </span>
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-orange-500/30 border border-orange-400/20 backdrop-blur-sm">
                    COMPETITIVE PROGRAMMING
                  </span>
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-slate-500 to-gray-600 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-slate-500/30 border border-slate-400/20 backdrop-blur-sm">
                    BLOCKCHAIN
                  </span>
                </div>
              </Marquee>
              
              <Marquee speed={40} direction="right">
                <div className="flex items-center space-x-6">
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-purple-500/30 border border-purple-400/20 backdrop-blur-sm">
                    FRONTEND DEVELOPMENT
                  </span>
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-cyan-500/30 border border-cyan-400/20 backdrop-blur-sm">
                    BACKEND DEVELOPMENT
                  </span>
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-emerald-500/30 border border-emerald-400/20 backdrop-blur-sm">
                    DATA STRUCTURES
                  </span>
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-pink-500 to-rose-600 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-pink-500/30 border border-pink-400/20 backdrop-blur-sm">
                    DEVOPS
                  </span>
                </div>
              </Marquee>
              
              <Marquee speed={38} direction="left">
                <div className="flex items-center space-x-6">
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-yellow-500 to-orange-600 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-yellow-500/30 border border-yellow-400/20 backdrop-blur-sm">
                    ALGORITHMS
                  </span>
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-red-500 to-pink-600 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-red-500/30 border border-red-400/20 backdrop-blur-sm">
                    GAME DEVELOPMENT
                  </span>
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-indigo-500/30 border border-indigo-400/20 backdrop-blur-sm">
                    ANDROID DEVELOPMENT
                  </span>
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-teal-500/30 border border-teal-400/20 backdrop-blur-sm">
                    CYBERSECURITY
                  </span>
                </div>
              </Marquee>
              
              <Marquee speed={42} direction="right">
                <div className="flex items-center space-x-6">
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-teal-500 to-cyan-600 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-teal-500/30 border border-teal-400/20 backdrop-blur-sm">
                    DYNAMIC PROGRAMMING
                  </span>
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-lime-500 to-green-600 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-lime-500/30 border border-lime-400/20 backdrop-blur-sm">
                    GRAPH ALGORITHMS
                  </span>
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-rose-500 to-red-600 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-rose-500/30 border border-rose-400/20 backdrop-blur-sm">
                    WEB DEVELOPMENT
                  </span>
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-violet-500 to-indigo-600 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-violet-500/30 border border-violet-400/20 backdrop-blur-sm">
                    DATABASES
                  </span>
                </div>
              </Marquee>
              
              <Marquee speed={36} direction="left">
                <div className="flex items-center space-x-6">
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-violet-500/30 border border-violet-400/20 backdrop-blur-sm">
                    BINARY SEARCH
                  </span>
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-amber-500 to-yellow-600 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-amber-500/30 border border-amber-400/20 backdrop-blur-sm">
                    SORTING ALGORITHMS
                  </span>
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-sky-500/30 border border-sky-400/20 backdrop-blur-sm">
                    CLOUD COMPUTING
                  </span>
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-emerald-500/30 border border-emerald-400/20 backdrop-blur-sm">
                    API DESIGN
                  </span>
                </div>
              </Marquee>
              
              <Marquee speed={44} direction="right">
                <div className="flex items-center space-x-6">
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-fuchsia-500 to-pink-600 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-fuchsia-500/30 border border-fuchsia-400/20 backdrop-blur-sm">
                    BACKTRACKING
                  </span>
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-emerald-500/30 border border-emerald-400/20 backdrop-blur-sm">
                    RECURSION
                  </span>
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-orange-500 to-amber-600 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-orange-500/30 border border-orange-400/20 backdrop-blur-sm">
                    TREE ALGORITHMS
                  </span>
                  <span className="text-sm md:text-lg font-black text-white bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-full uppercase tracking-wider shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-blue-500/30 border border-blue-400/20 backdrop-blur-sm">
                    NETWORKING
                  </span>
                </div>
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