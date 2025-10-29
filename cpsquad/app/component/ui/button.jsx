import React from "react";

const Button = ({
  children,
  onClick,
  className = "",
  variant = "default",
  size = "md",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";

  const variants = {
    default: "bg-green-500 text-white hover:bg-green-600",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
    ghost: "text-gray-700 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const styles = `${base} ${variants[variant] || ""} ${
    sizes[size] || ""
  } ${className}`;

  return (
    <button onClick={onClick} className={styles} {...props}>
      {children}
    </button>
  );
};

export { Button };
