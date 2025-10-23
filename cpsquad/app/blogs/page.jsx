"use client";
import React, { useState, useRef } from "react";
import BlogCard from "../component/BlogCard/BlogCard";
import blogdata from "../lib/data/blog.js";

const page = () => {
  const [cardsShown, setCardsShown] = useState(3);
  const blogRef = useRef(null);
  function handleCardsShown() {
    if (cardsShown === 3) {
      setCardsShown(blogdata.length);

    
      setTimeout(() => {
        if (blogRef.current) {
          const firstNewCard = blogRef.current.children[3]; // 4th card (0-based index)
          firstNewCard?.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); 
    } else if (cardsShown > 3) {
      setCardsShown(3);

      blogRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <div className="flex justify-center mt-5">
        <h2
          className="font-mono text-3xl font-semibold text-white text-center
                 tracking-wide drop-shadow-[0_0_15px_#00ff66]"
        >
          Our Blogs
        </h2>
      </div>

      <div
        ref={blogRef}
        className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:gap-[15px] md:gap-[30px] w-[85vw] md:w-[93vw] mx-auto mt-5 mb-[50px]"
      >
        {blogdata.slice(0, cardsShown).map((item, id) => (
          <BlogCard
            key={id}
            id={id}
            title={item.title}
            excerpt={item.excerpt}
            image={item.image}
            slug={item.slug}
          />
        ))}
      </div>

      <div className="flex justify-center items-center mb-[80px] ">
        <button
          onClick={handleCardsShown}
          className="bg-gray-700 w-[150px] py-3 hover:bg-gray-800 transition-all duration-300 font-sans"
        >
          {cardsShown === 3 ? "View more" : "View less"}
        </button>
      </div>
    </>
  );
};

export default page;
