"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import NavLinks from "./NavLinks";
import Logo from "./Logo";

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Set initial state after hydration
    handleScroll();

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]); // Dependency array can be simplified, but this works

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Logo />
        <NavLinks pathname={pathname} />

      </nav>
    </header>
  );
};

export default Navbar;