import Link from "next/link";
import { motion } from "framer-motion";

const MobileNavLink = ({ href, pathname, closeMenu, children }) => {
    const isActive = pathname === href;
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };
    return (
        <motion.div variants={itemVariants}>
            <Link
                href={href}
                className={`text-3xl font-bold transition-colors ${isActive ? "text-green-500" : "text-white hover:text-green-500"}`}
                onClick={closeMenu}
            >
                {children}
            </Link>
        </motion.div>
    );
};

const MobileMenu = ({ pathname, closeMenu }) => {
  const links = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/members", label: "Members" },
    { href: "/blogs", label: "Blogs" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-40"
    >
      <motion.div
        className="h-full flex flex-col items-start justify-center space-y-8 px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {links.map((link) => (
          <MobileNavLink key={link.href} href={link.href} pathname={pathname} closeMenu={closeMenu}>
            {link.label}
          </MobileNavLink>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default MobileMenu;