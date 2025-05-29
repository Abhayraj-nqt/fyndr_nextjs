import { Button as ShadcnButton } from "@/components/ui/button";
import type { ButtonProps as ShadcnButtonProps } from "@/components/ui/button";

type CustomVariant =
  | "primary"
  | "primary-outlined"
  | "primary-dark"
  | "primary-dark-outlined";

interface ButtonProps extends Omit<ShadcnButtonProps, "variant"> {
  variant?: CustomVariant;
  stdHeight?: boolean;
  stdWidth?: boolean;
}

const Button = ({
  variant,
  className,
  stdHeight = false,
  stdWidth = false,
  ...rest
}: ButtonProps) => {
  const customClass = (() => {
    switch (variant) {
      case "primary":
        return "bg-primary-500 text-white hover:bg-primary-500 hover:text-white";
      case "primary-outlined":
        return "border border-primary-500 text-primary-500 bg-white hover:text-primary-500 hover:border-primary-500 hover:bg-white";
      case "primary-dark":
        return "bg-primary-900 text-white hover:bg-primary-900 hover:text-white";
      case "primary-dark-outlined":
        return "border border-primary-900 text-primary-900 bg-white hover:border-primary-900 hover:text-primary-900 hover:bg-white";
      default:
        return "";
    }
  })();

  return (
    <ShadcnButton
      {...rest}
      className={`self-center rounded-[10px] px-4 py-3 text-base font-normal shadow-none ${stdHeight ? "min-h-11" : ""} ${stdWidth ? "min-w-36" : ""} ${customClass} ${className ?? ""}`}
    />
  );
};

export default Button;
