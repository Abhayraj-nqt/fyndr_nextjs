"use client";

import React from "react";

import InputWrapper from "@/components/global/input/input-wrapper";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { OptionIcon } from "./option-icon";
import { SelectOption } from "./select.types";

type Props = {
  label?: string;
  disabled?: boolean;
  showRequired?: boolean;
  info?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  options: SelectOption[];
  name?: string;
  iconClassName?: string;
  getDisplayValue: () => SelectOption | undefined;
  currentSingleValue: string;
  handleSelect: (optionValue: string) => void;
};

const SimpleSelect = ({
  className,
  disabled = false,
  info,
  label,
  showRequired,
  inputClassName,
  placeholder = "Select an option",
  options,
  name,
  iconClassName = "",
  getDisplayValue,
  currentSingleValue,
  handleSelect,
}: Props) => {
  return (
    <InputWrapper
      className={className}
      disabled={disabled}
      info={info}
      label={label}
      showRequired={showRequired}
    >
      <ShadcnSelect
        value={currentSingleValue}
        onValueChange={handleSelect}
        name={name}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn(
            `input-primary border-none shadow-none outline-none ring-0 focus:ring-0 ${inputClassName}`
          )}
        >
          <SelectValue placeholder={placeholder}>
            {(() => {
              const selected = getDisplayValue();
              return selected ? (
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex items-center justify-center">
                    <OptionIcon
                      icon={selected.icon}
                      label={selected.label}
                      className={iconClassName}
                    />
                  </div>
                  <span className="truncate">{selected.label}</span>
                </div>
              ) : null;
            })()}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center">
                  <OptionIcon
                    icon={option.icon}
                    label={option.label}
                    className={iconClassName}
                  />
                </div>
                <span className="truncate">{option.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>
    </InputWrapper>
  );
};

export default SimpleSelect;
