import React from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
import InputWrapper from "./input-wrapper";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  disabled?: boolean;
  showRequired?: boolean;
  info?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  leftNode?: React.ReactNode;
};

const Input = ({
  className,
  disabled = false,
  info,
  label,
  showRequired,
  inputClassName,
  leftNode,
  ...inputProps
}: Props) => {
  return (
    <InputWrapper
      className={className}
      disabled={disabled}
      info={info}
      label={label}
      showRequired={showRequired}
      leftNode={leftNode}
    >
      <ShadcnInput
        className={`input-primary ${inputClassName}`}
        disabled={disabled}
        {...inputProps}
      />
    </InputWrapper>
  );
};

// INPUT_PRIMARY: no-focus text-base font-normal py-[10px] px-3 placeholder border-none text-[#4D4D4D] shadow-none outline-none disabled:bg-[#F2F2F2] bg-white placeholder:text-[#999999] dark:placeholder:text-[#999999]

export default Input;
