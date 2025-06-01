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
  rightNode?: React.ReactNode;
  topRightNode?: React.ReactNode;
};

const Input = ({
  className,
  disabled = false,
  info,
  label,
  showRequired,
  inputClassName,
  rightNode,
  topRightNode,
  ...inputProps
}: Props) => {
  return (
    <InputWrapper
      className={className}
      disabled={disabled}
      info={info}
      label={label}
      showRequired={showRequired}
      rightNode={rightNode}
      topRightNode={topRightNode}
    >
      <ShadcnInput
        className={`input-primary ${inputClassName}`}
        disabled={disabled}
        {...inputProps}
      />
    </InputWrapper>
  );
};

// INPUT_PRIMARY: no-focus text-base font-normal py-[10px] px-3 placeholder border-none text-black-70 shadow-none outline-none disabled:bg-black-0.5 bg-white placeholder:text-black-40 dark:placeholder:text-black-40

export default Input;
