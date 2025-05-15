import React from "react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const buttonStyles = {
  default:
    "bg-accent hover:bg-opacity-90 text-white font-medium shadow-sm transition-colors",
  secondary:
    "bg-secondary hover:bg-gray-200 text-foreground font-medium border border-gray-300",
  ghost: "text-accent hover:text-accent/80 underline underline-offset-4",
};

const buttonSizes = {
  sm: "py-1 px-3 text-sm",
  md: "py-2 px-4 text-base",
  lg: "py-3 px-6 text-lg",
};

const Button = ({
  className,
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${buttonStyles[variant]} ${buttonSizes[size]} rounded-md ${className}`}
      {...props}
    />
  );
};

export default Button;