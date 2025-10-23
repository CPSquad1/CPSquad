"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BlogPost from "./BlogPost";
import BlogCard from "./BlogCard";
import FilterDropdown from "./FilterDropdown";
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
      <section className="relative pt-32 pb-12 px-8 min-h-[60vh] flex items-center">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-green-900/20 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight text-white drop-shadow-2xl">
              BLOGS_
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-mono max-w-2xl">
              Insights, tutorials, and stories from the competitive programming world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-8 mb-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
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
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16"
          >
            {filteredBlogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} onReadMore={handleReadMore} />
            ))}
          </motion.div>

          {/* No Results */}
          {filteredBlogs.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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