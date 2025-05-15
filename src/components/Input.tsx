import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFocus = () => {
      inputRef.current?.select();
    };

    return (
      <input
        ref={inputRef}
        onFocus={handleFocus}
        className={`w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;