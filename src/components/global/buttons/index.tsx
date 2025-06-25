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
        return "bg-primary text-white hover:bg-primary hover:text-white";
      case "primary-outlined":
        return "border border-primary text-primary bg-white hover:text-primary hover:border-primary hover:bg-white";
      case "primary-dark":
        return "bg-secondary text-white hover:bg-secondary hover:text-white";
      case "primary-dark-outlined":
        return "border border-secondary text-secondary bg-white hover:border-secondary hover:text-secondary hover:bg-white";
      default:
        return "";
    }
  })();

  return (
    <ShadcnButton
      {...rest}
      className={`self-center !rounded-10 px-4 py-3 text-base font-normal shadow-none disabled:!cursor-not-allowed ${stdHeight ? "min-h-11" : ""} ${stdWidth ? "min-w-36" : ""} ${customClass} ${className ?? ""}`}
    />
  );
};

export default Button;
