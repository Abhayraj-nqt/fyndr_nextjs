import React from "react";
import InfoTooltip from "../tooltip/info-tooltip";
import { Input as ShadcnInput } from "@/components/ui/input";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  disabled?: boolean;
  showRequired?: boolean;
  info?: React.ReactNode;
  className?: string;
  inputClassName?: string;
};

const Input = ({
  className,
  disabled,
  info,
  label,
  showRequired,
  inputClassName,
  ...inputProps
}: Props) => {
  return (
    <div
      className={`relative flex h-[46px] grow items-center gap-1 rounded-[10px] border border-[#D3D6E1] ${!disabled ? "bg-white" : "bg-[#F2F2F2]"} ${className}`}
    >
      {label && (
        <div
          className={`absolute -top-[1px] left-[18px] m-0 z-[2] h-[1px] ${!disabled ? "bg-white" : "bg-[#F2F2F2]"}`}
        >
          <div className="relative left-0 -top-[24px] bg-transparent py-[10px] px-2 z-20 font-normal text-base placeholder:text-[#999999]">
            <span className="text-[#7F7F7F] h-[26px] flex-center gap-2">
              <span className="flex gap-1">
                <span>{label}</span>
                {showRequired && <span className="text-red-600">*</span>}
              </span>
              {info && <InfoTooltip>{info}</InfoTooltip>}
            </span>
          </div>
        </div>
      )}
      <ShadcnInput
        className={`input-primary ${inputClassName}`}
        disabled={disabled}
        {...inputProps}
      />
    </div>
  );
};

// INPUT_PRIMARY: no-focus text-base font-normal py-[10px] px-3 placeholder border-none text-[#4D4D4D] shadow-none outline-none disabled:bg-[#F2F2F2] bg-white placeholder:text-[#999999] dark:placeholder:text-[#999999]

export default Input;
