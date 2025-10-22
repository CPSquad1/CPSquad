const FilterButton = ({ filter, currentFilter, onClick, children }) => {
  const isActive = currentFilter === filter;
  return (
    <button
      onClick={() => onClick(filter)}
      className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
        isActive
          ? "bg-green-500 text-black"
          : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
};

export default FilterButton;