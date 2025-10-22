"use client";

import { useState } from "react";
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

  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Competitive Programming",
      excerpt: "A comprehensive guide for beginners to start their competitive programming journey. Learn about the essential platforms, practice strategies, and fundamental algorithms.",
      content: `
        <h2>Introduction</h2>
        <p>Competitive programming is an exciting field that combines problem-solving skills with algorithmic thinking. Whether you're a complete beginner or looking to improve your skills, this guide will help you get started on the right track.</p>
        
        <h2>Essential Platforms</h2>
        <p>Here are the most popular platforms to begin your journey:</p>
        <ul>
          <li><strong>Codeforces:</strong> One of the most popular platforms with regular contests and a great community.</li>
          <li><strong>AtCoder:</strong> Known for high-quality problems and excellent editorials.</li>
          <li><strong>LeetCode:</strong> Perfect for interview preparation and building fundamentals.</li>
          <li><strong>CodeChef:</strong> Offers long challenges and shorter contests.</li>
        </ul>
        
        <h2>Practice Strategy</h2>
        <p>Consistency is key in competitive programming. Here's a structured approach:</p>
        <ol>
          <li>Start with easy problems to build confidence</li>
          <li>Focus on understanding algorithms rather than memorizing</li>
          <li>Participate in virtual contests to simulate real conditions</li>
          <li>Review editorials and learn from others' solutions</li>
        </ol>
        
        <h2>Fundamental Algorithms</h2>
        <p>Master these core concepts first:</p>
        <ul>
          <li>Time and space complexity analysis</li>
          <li>Basic data structures (arrays, stacks, queues)</li>
          <li>Sorting algorithms</li>
          <li>Binary search</li>
          <li>Two pointers technique</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Remember, competitive programming is a marathon, not a sprint. Stay consistent, practice regularly, and don't get discouraged by difficult problems. Join our CP Squad community for support and motivation!</p>
      `,
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
      content: `
        <h2>Introduction to Dynamic Programming</h2>
        <p>Dynamic Programming (DP) is one of the most important techniques in competitive programming. It's used to solve optimization problems by breaking them down into simpler subproblems.</p>
        
        <h2>1. Linear DP</h2>
        <p>The simplest form of DP where the state depends on previous states in a linear fashion.</p>
        <pre><code>// Example: Fibonacci sequence
dp[i] = dp[i-1] + dp[i-2]</code></pre>
        
        <h2>2. Knapsack DP</h2>
        <p>Used for optimization problems involving selecting items with constraints.</p>
        <ul>
          <li><strong>0/1 Knapsack:</strong> Each item can be taken at most once</li>
          <li><strong>Unbounded Knapsack:</strong> Items can be taken multiple times</li>
          <li><strong>Bounded Knapsack:</strong> Each item has a limited quantity</li>
        </ul>
        
        <h2>3. Interval DP</h2>
        <p>Problems involving intervals or ranges, often solved by considering all possible ways to divide the interval.</p>
        <pre><code>// Example: Matrix Chain Multiplication
dp[i][j] = min(dp[i][k] + dp[k+1][j] + cost(i,k,j)) for all k</code></pre>
        
        <h2>4. Tree DP</h2>
        <p>DP on trees where we compute values for subtrees and combine them.</p>
        <ul>
          <li>Root the tree at any node</li>
          <li>Compute DP values for children first</li>
          <li>Combine children's values to get parent's value</li>
        </ul>
        
        <h2>5. Digit DP</h2>
        <p>Used for problems involving constraints on digits of numbers.</p>
        <p>State usually includes: current position, tight constraint, and problem-specific parameters.</p>
        
        <h2>Practice Problems</h2>
        <p>Start with these classic problems:</p>
        <ol>
          <li>Coin Change (Linear DP)</li>
          <li>Longest Increasing Subsequence (Linear DP)</li>
          <li>0/1 Knapsack (Knapsack DP)</li>
          <li>Matrix Chain Multiplication (Interval DP)</li>
          <li>Tree Diameter (Tree DP)</li>
        </ol>
      `,
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
      content: `
        <h2>Event Overview</h2>
        <p>Last weekend, CP Squad organized its first-ever 48-hour hackathon, and what an incredible experience it was! Over 150 participants from various universities came together to collaborate, innovate, and compete.</p>
        
        <h2>The Challenge Themes</h2>
        <p>We had four main tracks for participants to choose from:</p>
        <ul>
          <li><strong>Education Technology:</strong> Solutions to improve learning experiences</li>
          <li><strong>Healthcare Innovation:</strong> Tech solutions for healthcare challenges</li>
          <li><strong>Environmental Sustainability:</strong> Apps and tools for environmental awareness</li>
          <li><strong>Social Impact:</strong> Technology for social good</li>
        </ul>
        
        <h2>Winning Projects</h2>
        <h3>🥇 First Place: EcoTracker</h3>
        <p>A mobile app that gamifies environmental conservation by tracking daily eco-friendly activities and connecting users with local environmental initiatives.</p>
        
        <h3>🥈 Second Place: MedAssist AI</h3>
        <p>An AI-powered healthcare assistant that helps patients manage medications and provides symptom tracking with intelligent recommendations.</p>
        
        <h3>🥉 Third Place: CodeMentor</h3>
        <p>A peer-to-peer learning platform specifically designed for competitive programming, featuring real-time collaboration and mentorship matching.</p>
        
        <h2>Event Highlights</h2>
        <ul>
          <li>42 teams registered and completed projects</li>
          <li>Amazing keynote from Google software engineer</li>
          <li>24/7 mentorship from industry professionals</li>
          <li>Pizza, energy drinks, and lots of coffee!</li>
          <li>Networking sessions with tech companies</li>
        </ul>
        
        <h2>Community Impact</h2>
        <p>The hackathon wasn't just about competition—it was about building our community. We saw incredible collaboration between students from different backgrounds and skill levels. Many participants formed lasting friendships and even started working on projects together beyond the event.</p>
        
        <h2>What's Next?</h2>
        <p>Based on the overwhelming positive feedback, we're already planning our next hackathon for spring 2025. Stay tuned for more details!</p>
        
        <p>Special thanks to our sponsors: TechCorp, InnovateNow, and CodeBase Inc. for making this event possible.</p>
      `,
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
      content: `
        <h2>Introduction to Graph Theory</h2>
        <p>Graph theory is fundamental to competitive programming. Understanding graphs and their algorithms is crucial for solving many complex problems efficiently.</p>
        
        <h2>Graph Representation</h2>
        <h3>Adjacency List</h3>
        <pre><code>vector<vector<int>> adj(n);
adj[u].push_back(v); // Add edge u -> v</code></pre>
        
        <h3>Adjacency Matrix</h3>
        <pre><code>vector<vector<int>> adj(n, vector<int>(n, 0));
adj[u][v] = 1; // Add edge u -> v</code></pre>
        
        <h2>Basic Traversal Algorithms</h2>
        <h3>Depth-First Search (DFS)</h3>
        <p>Used for exploring graphs, finding connected components, and detecting cycles.</p>
        <pre><code>void dfs(int node, vector<bool>& visited) {
    visited[node] = true;
    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, visited);
        }
    }
}</code></pre>
        
        <h3>Breadth-First Search (BFS)</h3>
        <p>Perfect for finding shortest paths in unweighted graphs.</p>
        <pre><code>void bfs(int start) {
    queue<int> q;
    vector<bool> visited(n, false);
    q.push(start);
    visited[start] = true;
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}</code></pre>
        
        <h2>Shortest Path Algorithms</h2>
        <h3>Dijkstra's Algorithm</h3>
        <p>For single-source shortest paths with non-negative weights.</p>
        
        <h3>Bellman-Ford Algorithm</h3>
        <p>Handles negative weights and detects negative cycles.</p>
        
        <h3>Floyd-Warshall Algorithm</h3>
        <p>All-pairs shortest paths for small graphs.</p>
        
        <h2>Advanced Topics</h2>
        <h3>Minimum Spanning Tree</h3>
        <ul>
          <li><strong>Kruskal's Algorithm:</strong> Sort edges and use Union-Find</li>
          <li><strong>Prim's Algorithm:</strong> Greedy approach with priority queue</li>
        </ul>
        
        <h3>Network Flows</h3>
        <ul>
          <li><strong>Maximum Flow:</strong> Ford-Fulkerson, Edmonds-Karp</li>
          <li><strong>Minimum Cut:</strong> Max-flow min-cut theorem</li>
          <li><strong>Bipartite Matching:</strong> Special case of maximum flow</li>
        </ul>
        
        <h2>Practice Strategy</h2>
        <ol>
          <li>Master basic traversal algorithms first</li>
          <li>Solve shortest path problems</li>
          <li>Practice MST and topological sorting</li>
          <li>Move to advanced topics like flows</li>
        </ol>
      `,
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
      content: `
        <h2>Meet Our Champion</h2>
        <p>Today we're interviewing <strong>Alex Rodriguez</strong>, a CP Squad alumnus who recently competed at the ICPC World Finals in Dhaka, Bangladesh. Alex's team finished in the top 20 globally!</p>
        
        <h2>The Journey to World Finals</h2>
        <p><strong>Q: Tell us about your path to the World Finals.</strong></p>
        <p><strong>Alex:</strong> It started three years ago when I joined CP Squad as a freshman. I was intimidated at first—everyone seemed so much better than me. But the club's supportive environment helped me improve rapidly. We practiced together every week, participated in local contests, and gradually worked our way up through regionals.</p>
        
        <p><strong>Q: What was the most challenging part of your preparation?</strong></p>
        <p><strong>Alex:</strong> Team coordination was harder than individual skill development. In ICPC, you have three people sharing one computer, so you need to strategize who codes what and when. We spent months perfecting our teamwork and communication.</p>
        
        <h2>Preparation Strategy</h2>
        <p><strong>Q: How did you structure your practice routine?</strong></p>
        <p><strong>Alex:</strong> We had a systematic approach:</p>
        <ul>
          <li><strong>Individual practice:</strong> 2-3 hours daily on platforms like Codeforces and AtCoder</li>
          <li><strong>Team practice:</strong> 3 mock contests per week using past ICPC problems</li>
          <li><strong>Topic focus:</strong> One week dedicated to specific algorithms (DP, graphs, geometry)</li>
          <li><strong>Contest analysis:</strong> Detailed review of every contest we participated in</li>
        </ul>
        
        <h2>The World Finals Experience</h2>
        <p><strong>Q: How was the actual World Finals?</strong></p>
        <p><strong>Alex:</strong> Incredible and nerve-wracking! The competition hall was massive, with teams from 60+ countries. The problems were extremely challenging—we solved 5 out of 12, which was enough for a decent ranking. The atmosphere was electric, and meeting competitors from around the world was inspiring.</p>
        
        <h2>Advice for Current Students</h2>
        <p><strong>Q: What advice would you give to current CP Squad members?</strong></p>
        <p><strong>Alex:</strong> Several key points:</p>
        <ol>
          <li><strong>Start early:</strong> The earlier you begin, the more time you have to develop skills</li>
          <li><strong>Practice consistently:</strong> Daily practice beats occasional marathon sessions</li>
          <li><strong>Learn from failures:</strong> Every wrong submission teaches you something</li>
          <li><strong>Build a team early:</strong> Team chemistry takes time to develop</li>
          <li><strong>Enjoy the process:</strong> The journey is more important than the destination</li>
        </ol>
        
        <h2>Looking Ahead</h2>
        <p><strong>Q: What's next for you?</strong></p>
        <p><strong>Alex:</strong> I'm starting my software engineering career at Microsoft, but I'll stay involved with CP Squad as a mentor. I want to help the next generation of competitive programmers achieve their goals.</p>
        
        <p><strong>Final words:</strong> "Believe in yourself and trust the process. Every great competitive programmer started as a beginner. With dedication and the right community support, amazing things are possible!"</p>
      `,
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
      content: `
        <h2>Why You Need a Study Plan</h2>
        <p>Random practice without structure leads to plateaus. A well-designed study plan ensures consistent progress and covers all essential topics systematically.</p>
        
        <h2>Phase 1: Foundation Building (Months 1-3)</h2>
        <h3>Week 1-4: Programming Fundamentals</h3>
        <ul>
          <li>Master your chosen programming language (C++/Java/Python)</li>
          <li>Learn STL/Collections thoroughly</li>
          <li>Practice basic I/O operations</li>
          <li>Solve 100+ easy problems on any platform</li>
        </ul>
        
        <h3>Week 5-8: Basic Algorithms</h3>
        <ul>
          <li>Sorting algorithms (merge sort, quick sort)</li>
          <li>Binary search and its variations</li>
          <li>Two pointers technique</li>
          <li>Basic string algorithms</li>
        </ul>
        
        <h3>Week 9-12: Data Structures</h3>
        <ul>
          <li>Arrays and matrices</li>
          <li>Stacks and queues</li>
          <li>Priority queues/heaps</li>
          <li>Sets and maps</li>
        </ul>
        
        <h2>Phase 2: Intermediate Topics (Months 4-8)</h2>
        <h3>Dynamic Programming</h3>
        <ul>
          <li>Classical DP problems (knapsack, LIS, LCS)</li>
          <li>DP on grids</li>
          <li>Interval DP</li>
          <li>Digit DP</li>
        </ul>
        
        <h3>Graph Algorithms</h3>
        <ul>
          <li>DFS and BFS</li>
          <li>Shortest path algorithms</li>
          <li>Minimum spanning tree</li>
          <li>Topological sorting</li>
        </ul>
        
        <h3>Number Theory</h3>
        <ul>
          <li>Prime numbers and sieve</li>
          <li>GCD and LCM</li>
          <li>Modular arithmetic</li>
          <li>Fast exponentiation</li>
        </ul>
        
        <h2>Phase 3: Advanced Topics (Months 9+)</h2>
        <ul>
          <li>Advanced DP (tree DP, bitmask DP)</li>
          <li>Network flows</li>
          <li>Segment trees and Fenwick trees</li>
          <li>String algorithms (KMP, Z-algorithm)</li>
          <li>Computational geometry</li>
        </ul>
        
        <h2>Daily Routine</h2>
        <h3>Weekdays (2-3 hours)</h3>
        <ul>
          <li><strong>30 min:</strong> Review previous day's topics</li>
          <li><strong>60 min:</strong> Learn new concept/algorithm</li>
          <li><strong>60 min:</strong> Solve 2-3 problems on the topic</li>
          <li><strong>30 min:</strong> Read editorials and alternative solutions</li>
        </ul>
        
        <h3>Weekends (4-5 hours)</h3>
        <ul>
          <li>Participate in online contests</li>
          <li>Solve harder problems from contest archives</li>
          <li>Review and analyze contest performance</li>
        </ul>
        
        <h2>Contest Strategy</h2>
        <ol>
          <li><strong>Read all problems first</strong> (15-20 minutes)</li>
          <li><strong>Solve easiest problems first</strong></li>
          <li><strong>Implement carefully</strong> to avoid debugging</li>
          <li><strong>Manage time wisely</strong> - don't get stuck on one problem</li>
          <li><strong>Submit often</strong> - partial points are better than no points</li>
        </ol>
        
        <h2>Tracking Progress</h2>
        <ul>
          <li>Maintain a practice log</li>
          <li>Track rating progress on platforms</li>
          <li>Record contest performances</li>
          <li>Identify weak areas for focused practice</li>
        </ul>
        
        <h2>Resources</h2>
        <ul>
          <li><strong>Books:</strong> "Competitive Programming" by Steven Halim</li>
          <li><strong>Platforms:</strong> Codeforces, AtCoder, CSES Problem Set</li>
          <li><strong>Visualization:</strong> VisuAlgo for algorithm visualization</li>
          <li><strong>Community:</strong> Join CP Squad's Discord for discussions!</li>
        </ul>
      `,
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

  // Show full blog post if selected
  if (showFullPost && selectedBlog) {
    return <BlogPost blog={selectedBlog} onBack={handleBackToBlogs} />;
  }

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