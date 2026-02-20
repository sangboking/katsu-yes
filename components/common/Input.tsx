import React from 'react';

interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  as?: 'input' | 'textarea';
  type?: 'text' | 'number';
  rows?: number;
}

const Input = ({
  as: Component = 'input',
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  rows,
}: InputProps) => {
  const baseStyles = 'w-full p-2 border border-gray-300 rounded resize-none';

  const props = {
    placeholder,
    value,
    onChange,
    className: `${baseStyles} ${className}`,
    ...(Component === 'input' ? { type } : { rows }),
  };

  return <Component {...props} />;
};

export default Input;
