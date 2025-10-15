"use client";

import { useState, useEffect } from "react";

const ScrollSidebar = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Define sections - you can customize these based on your page structure
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

      // Show sidebar after scrolling a bit
      setIsVisible(scrollTop > 100);

      // Calculate overall scroll progress (0 to 1)
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setScrollProgress(Math.min(progress, 1));

      // Determine active section based on scroll position
      const sectionElements = sections.map((section) =>
        document.getElementById(section.id)
      );

      let currentSection = 0;
      sectionElements.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          // If section is in the viewport center, mark as active
          if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.3) {
            currentSection = index;
          }
        }
      });

      setActiveSection(currentSection);
    };

    // Initial call after a short delay to ensure DOM is ready
    setTimeout(handleScroll, 100);

    // Add scroll listener
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
      const offset = 80; // Account for navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div 
      className={`fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="relative flex flex-col items-center" style={{ height: '300px' }}>
        {/* Main vertical line */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-white/30 rounded-full"></div>

        {/* Progress line that fills based on scroll */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] rounded-full bg-gradient-to-b from-emerald-400 via-green-500 to-emerald-600 shadow-lg shadow-green-500/50 transition-all duration-500 ease-out"
          style={{ height: `${scrollProgress * 100}%` }}
        ></div>

        {/* Section indicators (bars) */}
        <div className="relative h-full flex flex-col justify-between py-4">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="relative z-10 group cursor-pointer flex items-center py-2"
              onClick={() => scrollToSection(section.id)}
            >
              {/* Bar indicator */}
              <div
                className={`h-[2px] transition-all duration-500 ease-out rounded-full ${
                  index === activeSection
                    ? "bg-white w-16 shadow-lg shadow-white/50"
                    : index < activeSection
                    ? "bg-white/80 w-12 group-hover:w-14 group-hover:shadow-md group-hover:shadow-white/30"
                    : "bg-white/30 w-8 group-hover:bg-white/70 group-hover:w-12 group-hover:shadow-sm group-hover:shadow-white/20"
                }`}
              ></div>

              {/* Tooltip label */}
              <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none scale-95 group-hover:scale-100">
                <div className="bg-white text-black px-4 py-2 rounded-md text-sm font-mono whitespace-nowrap shadow-xl border border-gray-200">
                  {section.label}
                  {/* Arrow */}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-[1px]">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-white"></div>
                  </div>
                </div>
              </div>

              {/* Active indicator dot with pulse effect */}
              {index === activeSection && (
                <>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-400 rounded-full shadow-lg shadow-emerald-500/50"></div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll percentage indicator */}
      <div className="mt-6 text-center">
        <div className="text-white/70 text-xs font-mono font-semibold bg-white/10 px-3 py-1 rounded-full border border-white/20">
          {Math.round(scrollProgress * 100)}%
        </div>
      </div>
    </div>
  );
};

export default ScrollSidebar;
