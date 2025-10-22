"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const BlogCard = ({ blog, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden hover:border-green-500 transition-all duration-300 group"
    >
      <div className="aspect-video bg-gradient-to-br from-green-500/20 to-blue-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="text-xs bg-green-500 text-black px-2 py-1 rounded font-semibold">
            {blog.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.readTime}</span>
          <span>•</span>
          <span>{blog.author}</span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
          {blog.title}
        </h3>
        
        <p className="text-gray-400 mb-4 line-clamp-3">
          {blog.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <button className="text-green-400 hover:text-green-300 font-semibold text-sm transition-colors">
            Read More →
          </button>
        </div>
      </div>
    </motion.article>
  );
};

const FilterButton = ({ filter, currentFilter, onClick, children }) => {
  const isActive = currentFilter === filter;
  return (
    <button
      onClick={() => onClick(filter)}
      className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
        isActive
          ? "bg-green-500 text-black"
          : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
};

export default function BlogsPage() {
  const [currentFilter, setCurrentFilter] = useState("all");

  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Competitive Programming",
      excerpt: "A comprehensive guide for beginners to start their competitive programming journey. Learn about the essential platforms, practice strategies, and fundamental algorithms.",
      author: "Alex Chen",
      date: "Oct 15, 2024",
      readTime: "8 min read",
      category: "Tutorial",
      tags: ["Beginner", "CP", "Algorithms"],
    },
    {
      id: 2,
      title: "Dynamic Programming Patterns Every CP Should Know",
      excerpt: "Master the most common dynamic programming patterns used in competitive programming contests. From knapsack to digit DP, we cover it all.",
      author: "Sarah Kim",
      date: "Oct 12, 2024",
      readTime: "12 min read",
      category: "Algorithm",
      tags: ["DP", "Advanced", "Patterns"],
    },
    {
      id: 3,
      title: "CP Squad's First Hackathon: A Huge Success!",
      excerpt: "Recap of our inaugural 48-hour hackathon where teams built innovative solutions to real-world problems. Amazing projects and great collaboration!",
      author: "Mike Johnson",
      date: "Oct 10, 2024",
      readTime: "5 min read",
      category: "Event",
      tags: ["Hackathon", "Community", "Projects"],
    },
    {
      id: 4,
      title: "Graph Theory: From Basics to Advanced Techniques",
      excerpt: "Deep dive into graph algorithms essential for competitive programming. Cover BFS, DFS, shortest paths, and advanced topics like network flows.",
      author: "Emma Davis",
      date: "Oct 8, 2024",
      readTime: "15 min read",
      category: "Algorithm",
      tags: ["Graphs", "Advanced", "Theory"],
    },
    {
      id: 5,
      title: "Interview with ICPC World Finalist",
      excerpt: "Exclusive interview with our club alumnus who made it to the ICPC World Finals. Learn about their journey, preparation strategies, and advice.",
      author: "David Wilson",
      date: "Oct 5, 2024",
      readTime: "10 min read",
      category: "Interview",
      tags: ["ICPC", "Success Story", "Inspiration"],
    },
    {
      id: 6,
      title: "Building a Study Plan for Competitive Programming",
      excerpt: "Structure your learning with our proven study plan. From daily practice routines to contest strategies, maximize your CP growth.",
      author: "Lisa Zhang",
      date: "Oct 2, 2024",
      readTime: "7 min read",
      category: "Tutorial",
      tags: ["Study Plan", "Practice", "Strategy"],
    },
  ];

  const categories = ["all", "tutorial", "algorithm", "event", "interview"];

  const filteredBlogs = currentFilter === "all" 
    ? blogPosts 
    : blogPosts.filter(blog => blog.category.toLowerCase() === currentFilter);

  return (
    <div className="font-sans bg-[#0a0a0a] text-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            BLOGS_
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 font-mono mb-8 max-w-3xl mx-auto"
          >
            Insights, tutorials, and stories from the competitive programming world.
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-8 mb-12">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {categories.map((category) => (
              <FilterButton
                key={category}
                filter={category}
                currentFilter={currentFilter}
                onClick={setCurrentFilter}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </FilterButton>
            ))}
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredBlogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </motion.div>

          {/* No Results */}
          {filteredBlogs.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold mb-4">No blogs found</h3>
              <p className="text-gray-400">
                Try adjusting your filter or check back soon for new content.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-16 bg-[#111111]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            WANT TO CONTRIBUTE?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-400 mb-8"
          >
            Share your knowledge with the community. Write about algorithms, contest experiences, or anything CP-related.
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded transition-colors"
          >
            Submit Your Article
          </motion.button>
        </div>
      </section>
    </div>
  );
}