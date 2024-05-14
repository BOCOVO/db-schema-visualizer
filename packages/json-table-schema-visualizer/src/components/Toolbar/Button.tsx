import { type ButtonHTMLAttributes } from "react";

interface ToolbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  title: string;
}

const ToolbarButton = ({
  onClick,
  title,
  children,
  className = "",
  ...props
}: ToolbarButtonProps) => {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`flex items-center p-1 text-gray-800 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ToolbarButton;
