import React from "react";

const Button = ({ children, onClick, variant = "default" }) => {
  const base =
    "px-4 py-2 rounded-xl font-semibold transition shadow-md flex items-center gap-2";

  const styles = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    destructive: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
};

export default Button;
