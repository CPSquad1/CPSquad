"use client";

import Link from "next/link";
import { 
  FaInstagram, 
  FaLinkedin, 
  FaGithub 
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Team", href: "/team" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact Us", href: "/contact" },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/cpsquad_vitb/",
      icon: FaInstagram,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/cp-squad/",
      icon: FaLinkedin,
    },
    {
      name: "GitHub",
      href: "https://github.com/CPSquad1",
      icon: FaGithub,
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#0a0a0a] to-[#111111] text-white border-t border-gray-800">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      
      <div className="relative container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Club Info Section */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
              CP SQUAD_
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-mono">
              Building competitive programmers,<br />
              one problem at a time.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide">
              Quick Links_
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 font-mono text-sm md:text-base inline-block hover:translate-x-1 transform"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide">
              Connect With Us_
            </h3>
            <div className="flex justify-center md:justify-end gap-6 mb-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                    aria-label={social.name}
                  >
                    <Icon className="w-6 h-6 md:w-7 md:h-7" />
                  </a>
                );
              })}
            </div>
            <p className="text-gray-500 text-xs md:text-sm font-mono">
              Follow us for updates
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6">
          {/* Copyright Section */}
          <div className="text-center">
            <p className="text-gray-400 text-sm md:text-base font-mono">
              © {currentYear} CP Squad. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-2 font-mono">
              Made with ❤️ by CP Squad Team
            </p>
          </div>
        </div>
      </div>

      {/* Bottom shadow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-50"></div>
    </footer>
  );
};

export default Footer;
