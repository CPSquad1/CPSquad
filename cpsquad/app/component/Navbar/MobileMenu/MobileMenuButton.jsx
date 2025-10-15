import { motion } from "framer-motion";

const MobileMenuButton = ({ isMenuOpen, onClick }) => {
  return (
    <div className="md:hidden">
      <button
        onClick={onClick}
        className="text-white focus:outline-none"
        aria-label="Toggle menu"
      >
        <motion.svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          animate={isMenuOpen ? "open" : "closed"}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            variants={{
              closed: { d: "M4 6h16M4 12h16M4 18h16" },
              open: { d: "M6 18L18 6M6 6l12 12" },
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.svg>
      </button>
    </div>
  );
};

export default MobileMenuButton;