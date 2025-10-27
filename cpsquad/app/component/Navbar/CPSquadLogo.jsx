const CPSquadLogo = ({ className = "h-10 w-10" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle */}
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="url(#gradient)"
        stroke="currentColor"
        strokeWidth="1"
        className="text-green-500"
      />
      
      {/* Code brackets */}
      <path
        d="M12 14L8 20L12 26"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-black"
      />
      <path
        d="M28 14L32 20L28 26"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-black"
      />
      
      {/* Center elements - representing competitive programming */}
      <circle
        cx="20"
        cy="16"
        r="1.5"
        fill="currentColor"
        className="text-black"
      />
      <circle
        cx="16"
        cy="20"
        r="1.5"
        fill="currentColor"
        className="text-black"
      />
      <circle
        cx="24"
        cy="20"
        r="1.5"
        fill="currentColor"
        className="text-black"
      />
      <circle
        cx="20"
        cy="24"
        r="1.5"
        fill="currentColor"
        className="text-black"
      />
      
      {/* Connecting lines */}
      <path
        d="M20 16L16 20L20 24L24 20L20 16Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        className="text-black"
      />
      
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CPSquadLogo;