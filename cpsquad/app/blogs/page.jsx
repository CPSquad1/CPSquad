"use client";
import BlogCard from "../component/BlogCard/BlogCard";
import blogdata from "../lib/data/blogdata"; // adjust path if your data file is elsewhere

export default function BlogsPage() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-[25px] sm:px-6 lg:px-8">
      {/* 🔹 Foreground content */}
      <div className="relative z-10 w-full max-w-[1200px] text-center text-white">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 drop-shadow-[0_0_12px_#00ff88]">
          ALL BLOGS_
        </h2>

        <div className="grid gap-6 sm:gap-8 lg:gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 mb-12">
          {blogdata.map((item) => (
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
      </div>
    </section>
  );
}
