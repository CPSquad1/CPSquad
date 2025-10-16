"use client";

import { useState, useEffect } from "react";

const ScrollSidebar = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Define sections
  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "features", label: "Features" },
    { id: "footer", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Calculate scroll progress
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setScrollProgress(Math.min(progress, 1));

      const sectionElements = sections.map((section) =>
        document.getElementById(section.id)
      );

      let currentSection = 0;
      sectionElements.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.3) {
            currentSection = index;
          }
        }
      });

      setActiveSection(currentSection);
    };

    setTimeout(handleScroll, 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="fixed right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-40">
      <div className="relative flex flex-col items-center" style={{ height: '200px' }}>
        {/* Main vertical white line in center */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1.5px] h-full bg-white"></div>

        {/* Section indicators */}
        <div className="relative h-full flex flex-col justify-between py-3">
          {sections.map((section, index) => (
            <>
              <div
                key={section.id}
                className="relative group cursor-pointer flex items-center justify-center"
                onClick={() => scrollToSection(section.id)}
              >
                {/* Bar - extends from center line with expand animation */}
                <div className="flex items-center">
                  {/* Left bar with expand animation */}
                  <div 
                    className={`bg-white transition-all duration-500 ease-in-out ${
                      activeSection === index
                        ? "w-8 sm:w-10 md:w-12 h-[2.5px]"
                        : "w-3 sm:w-4 md:w-5 h-[1.5px]"
                    }`}
                  ></div>
                  
                  {/* Center gap for vertical line */}
                  <div className="w-[1.5px]"></div>
                </div>

                {/* Tooltip - desktop only */}
                <div className="hidden lg:block absolute right-full mr-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  <div className="bg-white text-black px-2 py-1 rounded text-xs font-mono">
                    {section.label}
                  </div>
                </div>
              </div>

              {/* Small decorative bars between major sections (except after last section) */}
              {index < sections.length - 1 && (
                <div className="flex flex-col gap-3 py-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-center">
                      <div className="w-1.5 sm:w-2 md:w-2.5 h-[1px] bg-white/50"></div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ))}
        </div>
      </div>

      {/* Scroll percentage indicator */}
      <div className="mt-4 text-center">
        <div className="text-white text-xs font-mono bg-black/50 px-3 py-1 rounded-full border border-white/30">
          {Math.round(scrollProgress * 100)}%
        </div>
      </div>
    </div>
  );
};

export default ScrollSidebar;
