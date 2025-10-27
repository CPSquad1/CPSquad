"use client";

import { motion } from "framer-motion";

const BlogPost = ({ blog, onBack }) => {
  return (
    <div className="font-sans bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a] text-white min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-blue-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none"></div>
      {/* Header */}
      <div className="relative pt-20 pb-12 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.button
            onClick={onBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ x: -5, transition: { duration: 0.2 } }}
            className="group flex items-center gap-3 text-green-400 hover:text-green-300 mb-12 transition-all duration-300 font-medium text-lg"
          >
            <span className="group-hover:animate-pulse">←</span>
            <span className="relative">
              Back to Blogs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </span>
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-sm bg-gradient-to-r from-green-500 to-emerald-400 text-black px-4 py-2 rounded-full font-bold shadow-lg hover:shadow-green-500/25 transition-all duration-300 inline-block transform hover:scale-105">
                {blog.category}
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-7xl font-black mb-8 tracking-tight leading-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-white via-gray-100 to-green-400 bg-clip-text text-transparent">
                {blog.title}
              </span>
            </motion.h1>
            
            <motion.div 
              className="flex flex-wrap items-center gap-6 text-gray-300 mb-10 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="flex items-center gap-2 hover:text-green-400 transition-colors duration-300">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                By <span className="font-semibold text-white">{blog.author}</span>
              </span>
              <span className="text-green-500 font-bold">•</span>
              <span className="hover:text-green-400 transition-colors duration-300">{blog.date}</span>
              <span className="text-green-500 font-bold">•</span>
              <span className="flex items-center gap-2 hover:text-green-400 transition-colors duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                {blog.readTime}
              </span>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {blog.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="text-sm bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200 px-4 py-2 rounded-full border border-gray-600 hover:border-green-500 hover:text-green-400 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-green-500/20"
                >
                  #{tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="relative px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="blog-content relative"
          >
            {/* Content Decoration */}
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-green-500 via-blue-500 to-purple-500 rounded-full opacity-30"></div>
            
            <div 
              className="relative pl-8"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </motion.div>
        </div>
      </div>
      
      {/* Navigation */}
      <motion.div 
        className="relative px-8 py-12 bg-gradient-to-r from-[#111111] via-[#1a1a1a] to-[#111111] border-t border-gray-800"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-blue-500/5"></div>
        <div className="max-w-4xl mx-auto relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <motion.button
              onClick={onBack}
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-400 hover:to-emerald-300 text-black font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/30 overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <span className="relative flex items-center gap-2">
                <span className="group-hover:animate-bounce">←</span>
                Back to All Blogs
              </span>
            </motion.button>
            
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full cursor-pointer transition-colors duration-300 hover:shadow-lg hover:shadow-green-500/20"
              >
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full cursor-pointer transition-colors duration-300 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <style jsx>{`
        .blog-content {
          color: #e5e7eb;
          line-height: 1.8;
          font-size: 1.125rem;
          font-weight: 400;
          letter-spacing: 0.025em;
        }
        
        .blog-content h1 {
          color: #ffffff;
          font-size: 2.5rem;
          font-weight: 800;
          margin: 3rem 0 1.5rem 0;
          background: linear-gradient(135deg, #ffffff 0%, #22c55e 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
        }
        
        .blog-content h1::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #22c55e, #10b981, #059669);
          border-radius: 2px;
          animation: shimmer 2s ease-in-out infinite;
        }
        
        .blog-content h2 {
          color: #ffffff;
          font-size: 2rem;
          font-weight: 700;
          margin: 2.5rem 0 1.25rem 0;
          position: relative;
          padding-left: 1rem;
        }
        
        .blog-content h2::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 60%;
          background: linear-gradient(180deg, #22c55e, #10b981);
          border-radius: 2px;
        }
        
        .blog-content h3 {
          color: #22c55e;
          font-size: 1.5rem;
          font-weight: 600;
          margin: 2rem 0 1rem 0;
          position: relative;
          transition: color 0.3s ease;
        }
        
        .blog-content h3:hover {
          color: #10b981;
        }
        
        .blog-content p {
          margin-bottom: 1.75rem;
          text-align: justify;
          transition: all 0.3s ease;
        }
        
        .blog-content p:hover {
          color: #f3f4f6;
          padding-left: 0.5rem;
        }
        
        .blog-content ul, .blog-content ol {
          margin: 2rem 0;
          padding-left: 2.5rem;
        }
        
        .blog-content li {
          margin-bottom: 0.75rem;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .blog-content ul li::before {
          content: '▸';
          color: #22c55e;
          font-weight: bold;
          position: absolute;
          left: -1.5rem;
        }
        
        .blog-content li:hover {
          color: #f3f4f6;
          padding-left: 0.5rem;
        }
        
        .blog-content strong {
          color: #22c55e;
          font-weight: 700;
          background: linear-gradient(135deg, #22c55e, #10b981);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: all 0.3s ease;
        }
        
        .blog-content strong:hover {
          background: linear-gradient(135deg, #10b981, #059669);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .blog-content pre {
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          border: 1px solid #374151;
          border-radius: 0.75rem;
          padding: 1.5rem;
          margin: 2rem 0;
          overflow-x: auto;
          font-family: 'Fira Code', 'Cascadia Code', monospace;
          position: relative;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }
        
        .blog-content pre:hover {
          border-color: #22c55e;
          box-shadow: 0 10px 25px rgba(34, 197, 94, 0.1);
          transform: translateY(-2px);
        }
        
        .blog-content pre::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 30px;
          background: linear-gradient(90deg, #1f2937, #374151, #1f2937);
          border-radius: 0.75rem 0.75rem 0 0;
          border-bottom: 1px solid #4b5563;
        }
        
        .blog-content pre::after {
          content: '⚫ ⚫ ⚫';
          position: absolute;
          top: 8px;
          left: 12px;
          font-size: 8px;
          color: #6b7280;
        }
        
        .blog-content code {
          background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
          color: #22c55e;
          padding: 0.375rem 0.75rem;
          border-radius: 0.5rem;
          font-family: 'Fira Code', 'Cascadia Code', monospace;
          font-size: 0.9em;
          border: 1px solid #374151;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        
        .blog-content code:hover {
          background: linear-gradient(135deg, #2a2a2a, #3a3a3a);
          border-color: #22c55e;
          transform: scale(1.02);
        }
        
        .blog-content pre code {
          background: transparent;
          padding: 0;
          border: none;
          font-size: 0.95em;
          color: #e5e7eb;
        }
        
        .blog-content blockquote {
          background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
          border-left: 4px solid #22c55e;
          margin: 2rem 0;
          padding: 1.5rem 2rem;
          border-radius: 0 0.5rem 0.5rem 0;
          font-style: italic;
          position: relative;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        
        .blog-content blockquote::before {
          content: '"';
          position: absolute;
          top: -10px;
          left: 15px;
          font-size: 3rem;
          color: #22c55e;
          font-weight: bold;
        }
        
        .blog-content a {
          color: #22c55e;
          text-decoration: none;
          position: relative;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .blog-content a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #22c55e, #10b981);
          transition: width 0.3s ease;
        }
        
        .blog-content a:hover {
          color: #10b981;
        }
        
        .blog-content a:hover::after {
          width: 100%;
        }
        
        .blog-content img {
          border-radius: 0.75rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          margin: 2rem 0;
          max-width: 100%;
          height: auto;
        }
        
        .blog-content img:hover {
          transform: scale(1.02);
          box-shadow: 0 15px 35px rgba(34, 197, 94, 0.1);
        }
        
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        
        .blog-content th, .blog-content td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #374151;
        }
        
        .blog-content th {
          background: linear-gradient(90deg, #22c55e, #10b981);
          color: #000;
          font-weight: 600;
        }
        
        .blog-content tr:hover {
          background: rgba(34, 197, 94, 0.05);
        }
        
        @keyframes shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .blog-content > * {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .blog-content > *:nth-child(2) { animation-delay: 0.1s; }
        .blog-content > *:nth-child(3) { animation-delay: 0.2s; }
        .blog-content > *:nth-child(4) { animation-delay: 0.3s; }
        .blog-content > *:nth-child(5) { animation-delay: 0.4s; }
        
        /* Scrollbar Styling */
        .blog-content::-webkit-scrollbar {
          width: 8px;
        }
        
        .blog-content::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 4px;
        }
        
        .blog-content::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #22c55e, #10b981);
          border-radius: 4px;
        }
        
        .blog-content::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #10b981, #059669);
        }
      `}</style>
    </div>
  );
};

export default BlogPost;