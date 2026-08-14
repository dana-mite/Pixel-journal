import { ReactNode } from 'react';

// Define the blueprint for our props
interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;