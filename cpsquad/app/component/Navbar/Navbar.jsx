"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import MobileMenuButton from "./MobileMenu/MobileMenuButton";
import MobileMenu from "./MobileMenu/MobileMenu";

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);

    // Set initial state on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [isMenuOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${scrolled ? "bg-background/80 backdrop-blur-sm" : "bg-transparent"}`}>
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Logo />
          <NavLinks pathname={pathname} />
          <MobileMenuButton
            isMenuOpen={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </nav>
      </header>
      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu pathname={pathname} closeMenu={() => setIsMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;