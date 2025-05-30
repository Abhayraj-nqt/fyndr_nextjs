import React from "react";

import InfoTooltip from "../tooltip/info-tooltip";

type Props = {
  children: React.ReactNode;
  leftNode?: React.ReactNode;
  label?: string;
  disabled?: boolean;
  showRequired?: boolean;
  info?: React.ReactNode;
  className?: string;
};

const InputWrapper = ({
  children,
  leftNode,
  label,
  disabled = false,
  info = null,
  showRequired = false,
  className = "",
}: Props) => {
  return (
    <div
      className={`relative flex h-[46px] grow items-center gap-1 rounded-[10px] border border-[#D3D6E1] p-1 text-[#7F7F7F] ${!disabled ? "bg-white" : "bg-[#F2F2F2]"} ${className}`}
    >
      {label && (
        <div
          className={`absolute -top-px left-[18px] z-[2] m-0 h-px ${!disabled ? "bg-white" : "bg-[#F2F2F2]"}`}
        >
          <div className="relative left-0 top-[-14px] z-20 bg-transparent px-2 text-base font-normal placeholder:text-[#999999]">
            <span className="flex-center h-[26px] gap-2">
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
      {leftNode || null}
    </div>
  );
};

export default InputWrapper;
