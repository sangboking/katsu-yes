import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  className = "",
  disabled = false,
}: ButtonProps) => {
  const baseStyles =
    "w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
