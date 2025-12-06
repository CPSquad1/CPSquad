"use client";

import Link from "next/link";
import { 
  FaInstagram, 
  FaLinkedin, 
  FaGithub 
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
    <footer id="footer" className="relative bg-black text-white border-t border-gray-800 overflow-hidden">
      {/* Green gradient glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] rounded-full bg-[#00FF41] opacity-15 blur-[150px] md:blur-[200px]"></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          
          {/* Left Section - Connect Info */}
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 uppercase tracking-wider">
              CONNECT
            </h3>
            <div className="space-y-3 md:space-y-4 text-gray-300 mb-6 md:mb-8">
              <p className="text-sm md:text-base leading-relaxed">
                Sunlabs, Octagon,<br />
                NIT Trichy, Tamil Nadu,<br />
                India
              </p>
              <div className="space-y-2">
                <p className="text-sm md:text-base">cpsquad@nitt.edu</p>
                <p className="text-sm md:text-base">cpsquad.nitt@gmail.com</p>
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-500">
              © {currentYear} CP Squad. All Rights Reserved.
            </p>
          </div>

          {/* Right Section - ASCII Logo & Social */}
          <div className="relative z-10 flex flex-col items-center lg:items-end">
            <div className="mb-6 md:mb-8 text-center lg:text-right">
              <p className="text-xs md:text-sm text-gray-400 mb-4">
                MADE WITH <span className="text-red-500">❤</span> BY
              </p>
              <pre className="text-[#00FF41] font-mono text-[6px] xs:text-[7px] sm:text-[8px] md:text-[10px] lg:text-xs leading-tight md:leading-snug whitespace-pre overflow-x-auto"
                   style={{
                     textShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
                     fontFamily: 'monospace'
                   }}>
{` ____  ____   ____   ___  _   _    _    ____  
/ ___||  _ \\ / ___| / _ \\| | | |  / \\  |  _ \\ 
| |    | |_) |\\___ \\| | | | | | | / _ \\ | | | |
| |___ |  __/  ___) | |_| | |_| |/ ___ \\| |_| |
 \\____||_|    |____/ \\___/ \\___//_/   \\_\\____/`}
              </pre>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-4 md:gap-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#00FF41] flex items-center justify-center text-[#00FF41] hover:bg-[#00FF41] hover:text-black transition-all duration-300 transform hover:scale-110"
                    aria-label={social.name}
                    style={{ boxShadow: '0 0 10px rgba(0, 255, 65, 0.3)' }}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
