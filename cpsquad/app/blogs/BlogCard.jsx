"use client";

import { motion } from "framer-motion";

const BlogCard = ({ blog, index, onReadMore }) => {
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
          
          <button 
            onClick={() => onReadMore(blog)}
            className="text-green-400 hover:text-green-300 font-semibold text-sm transition-colors whitespace-nowrap cursor-pointer"
          >
            Read More →
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;