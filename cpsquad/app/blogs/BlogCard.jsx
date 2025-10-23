"use client";

import { motion } from "framer-motion";

const BlogCard = ({ blog, index, onReadMore }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={() => onReadMore(blog)}
    >
      {/* Blog Image */}
      <div className="relative aspect-video mb-4 overflow-hidden">
        <div className="w-full h-full bg-[url('/images/blog-bg.jpg')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>
          <div className="absolute bottom-4 left-4">
            <span className="text-xs bg-white text-black px-2 py-1 font-medium uppercase tracking-wider">
              {blog.category}
            </span>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="mb-4">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-gray-300 transition-colors duration-300">
          {blog.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-3">
          {blog.excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.readTime}</span>
          <span>•</span>
          <span>{blog.author}</span>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;