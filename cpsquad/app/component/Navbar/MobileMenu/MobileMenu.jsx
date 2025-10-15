import Link from "next/link";
import { motion } from "framer-motion";

const MobileNavLink = ({ href, pathname, closeMenu, children }) => {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`text-3xl font-bold transition-colors ${
        isActive ? "text-accent" : "text-white hover:text-accent"
      }`}
      onClick={closeMenu}
    >
      {children}
    </Link>
  );
};

const MobileMenu = ({ pathname, closeMenu }) => {
  const links = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/members", label: "Members" },
    { href: "/blogs", label: "Blogs" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden fixed inset-0 bg-background/95 backdrop-blur-md z-40"
    >
      <button
        onClick={closeMenu}
        className="absolute top-4 right-6 text-white focus:outline-none"
        aria-label="Close menu"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <div className="h-full flex flex-col items-start justify-center space-y-8 px-8">
        {links.map((link) => (
          <MobileNavLink key={link.href} href={link.href} pathname={pathname} closeMenu={closeMenu}>
            {link.label}
          </MobileNavLink>
        ))}
      </div>
    </motion.div>
  );
};

export default MobileMenu;