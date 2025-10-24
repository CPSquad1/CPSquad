"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FilterDropdown = ({ currentFilter, categories, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterSelect = (filter) => {
    onFilterChange(filter);
    setIsOpen(false);
  };

  const getCurrentFilterLabel = () => {
    return currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-3 px-4 py-2 border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white transition-all duration-300 min-w-[150px]"
      >
        <span className="text-sm font-medium">{getCurrentFilterLabel()}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-gray-600 z-50"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterSelect(category)}
                className={`w-full px-4 py-3 text-left text-sm transition-colors duration-200 ${
                  currentFilter === category
                    ? "bg-white text-black"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default FilterDropdown;