import { RefreshIcon } from "@heroicons/react/outline";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  Icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
  size?: "md" | "sm";
  theme?: "primary" | "secondary";
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
    size === "md" ? "px-6 py-4 text-xl font-medium" : "px-4 py-2 text-base";
  const iconSizeClass = size === "md" ? "w-7 h-7" : "w-6 h-6";

  const buttonThemeClass =
    theme === "primary"
      ? "bg-brand/70 text-white shadow-[0_0_2rem_transparent] hover:bg-brand hover:shadow-brand/40"
      : "bg-transparent border-2 border-brand-gray/20 hover:bg-brand-gray-2 hover:text-white";

  const iconLoadingClass = isLoading ? "animate-bounce" : "";

  const buttonDisabledClass = disabled
    ? "!bg-brand-gray !text-brand-gray-1 opacity-50 cursor-not-allowed !hover:bg-brand-gray"
    : "";

  return (
    <button
      disabled={disabled || isLoading}
      className={`${buttonSizeClass} ${buttonThemeClass} ${buttonDisabledClass} h-fit flex justify-between items-center rounded-lg  leading-none duration-300 ${className}`}
      {...props}
    >
      {Icon && <Icon className={`${iconSizeClass} ${iconLoadingClass} mr-2`} />}
      {children}
      {isLoading && <RefreshIcon className={`ml-2 w-6 h-6 animate-spin`} />}
    </button>
  );
};

export default Button;
