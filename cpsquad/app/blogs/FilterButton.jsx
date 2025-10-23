const FilterButton = ({ filter, currentFilter, onClick, children }) => {
  const isActive = currentFilter === filter;
  return (
    <button
      onClick={() => onClick(filter)}
      className={`px-4 py-2 text-sm font-medium border transition-all duration-300 ${
        isActive
          ? "bg-white text-black border-white"
          : "bg-transparent text-gray-300 border-gray-600 hover:border-gray-400 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
};

export default FilterButton;