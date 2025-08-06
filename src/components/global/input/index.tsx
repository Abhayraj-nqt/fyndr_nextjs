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

export default Input;
