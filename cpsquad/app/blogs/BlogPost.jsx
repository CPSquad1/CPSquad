"use client";

import { motion } from "framer-motion";

const BlogPost = ({ blog, onBack }) => {
  return (
    <div className="font-sans bg-[#0a0a0a] text-white min-h-screen">
      {/* Header */}
      <div className="pt-20 pb-8 px-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-green-400 hover:text-green-300 mb-8 transition-colors"
          >
            ← Back to Blogs
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <span className="text-sm bg-green-500 text-black px-3 py-1 rounded-full font-semibold">
                {blog.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {blog.title}
            </h1>
            
            <div className="flex items-center gap-4 text-gray-400 mb-8">
              <span>By {blog.author}</span>
              <span>•</span>
              <span>{blog.date}</span>
              <span>•</span>
              <span>{blog.readTime}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>
      
      {/* Navigation */}
      <div className="px-8 py-8 bg-[#111111]">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded transition-colors"
          >
            ← Back to All Blogs
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .blog-content {
          color: #e5e5e5;
          line-height: 1.8;
          font-size: 1.125rem;
        }
        .blog-content h2 {
          color: #ffffff;
          font-size: 1.875rem;
          font-weight: 700;
          margin: 2rem 0 1rem 0;
          border-bottom: 2px solid #22c55e;
          padding-bottom: 0.5rem;
        }
        .blog-content h3 {
          color: #22c55e;
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1.5rem 0 0.75rem 0;
        }
        .blog-content p {
          margin-bottom: 1.5rem;
        }
        .blog-content ul, .blog-content ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        .blog-content strong {
          color: #22c55e;
          font-weight: 600;
        }
        .blog-content pre {
          background: #1a1a1a;
          border: 1px solid #374151;
          border-radius: 0.5rem;
          padding: 1rem;
          margin: 1.5rem 0;
          overflow-x: auto;
          font-family: 'Fira Code', monospace;
        }
        .blog-content code {
          background: #1a1a1a;
          color: #22c55e;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-family: 'Fira Code', monospace;
        }
        .blog-content pre code {
          background: transparent;
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default BlogPost;