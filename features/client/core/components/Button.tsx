import { RefreshIcon } from "@heroicons/react/outline";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  Icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
  size?: "md" | "sm";
  theme?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
};

const Button: React.FC<Props> = ({
  children,
  Icon,
  disabled,
  size = "md",
  theme = "primary",
  isLoading = false,
  className = "",
  ...props
}) => {
  const buttonSizeClass =
    size === "md" ? "px-6 py-4 text-xl font-medium" : "px-5 py-3 text-lg";
  const iconSizeClass = size === "md" ? "w-7 h-7" : "w-6 h-6";

  const buttonThemeClass =
    theme === "primary"
      ? "bg-brand/70 border border-brand/60 text-white shadow-[0_0_2rem_transparent] hover:bg-brand hover:border-brand hover:shadow-brand/40"
      : theme === "secondary"
      ? "bg-transparent border-2 border-brand-gray/20 hover:bg-brand-gray-2 hover:text-white"
      : "bg-transparent border-2 border-red-600/30 hover:bg-red-600/50 hover:text-white";

  const iconLoadingClass = isLoading ? "animate-bounce" : "";

  const buttonDisabledClass =
    "disabled:!bg-brand-gray disabled:!text-brand-gray-2 disabled:opacity-50 disabled:!border-brand-gray disabled:cursor-not-allowed disabled:shadow-none disabled:!hover:bg-brand-gray";

  return (
    <button
      disabled={disabled || isLoading}
      className={`${buttonSizeClass} ${buttonThemeClass} ${buttonDisabledClass} h-fit flex justify-between items-center rounded-lg leading-none duration-300 ${className}`}
      {...props}
    >
      {Icon && <Icon className={`${iconSizeClass} ${iconLoadingClass} mr-2`} />}
      {children}
      {isLoading && <RefreshIcon className={`ml-2 w-6 h-6 animate-spin`} />}
    </button>
  );
};

export default Button;
