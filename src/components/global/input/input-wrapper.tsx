import React from "react";
import InfoTooltip from "../tooltip/info-tooltip";

type Props = {
  children: React.ReactNode;
  label?: string;
  disabled?: boolean;
  showRequired?: boolean;
  info?: React.ReactNode;
  className?: string;
};

const InputWrapper = ({
  children,
  label,
  disabled = false,
  info = null,
  showRequired = false,
  className = "",
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
      {children}
    </div>
  );
};

export default InputWrapper;
