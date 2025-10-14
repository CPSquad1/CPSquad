"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import NavLinks from "./NavLinks";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png" //TODO: replace with actual logo once made available
            alt="CPSquadLogo"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <NavLinks pathname={pathname} />

        {/* Mobile Menu Button (Placeholder) */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            {/* Icon for hamburger menu will go here */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;