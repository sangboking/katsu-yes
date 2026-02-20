import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const Button = ({ children, onClick, className = '' }: ButtonProps) => {
  const baseStyles = 'w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600';

  return (
    <button onClick={onClick} className={`${baseStyles} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
