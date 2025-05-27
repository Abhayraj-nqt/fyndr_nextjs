import React from "react";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputWrapper from "./input-wrapper";

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type Props = {
  label?: string;
  disabled?: boolean;
  showRequired?: boolean;
  info?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  defaultValue?: string;
};

const Select = ({
  className,
  disabled = false,
  info,
  label,
  showRequired,
  inputClassName,
  placeholder = "Select an option",
  options,
  value,
  onValueChange,
  name,
  defaultValue,
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
        value={value}
        onValueChange={onValueChange}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
      >
        <SelectTrigger
          className={`input-primary outline-none ring-0 border-none shadow-none focus:ring-0 ${inputClassName}`}
        >
          <SelectValue
            placeholder={placeholder}
            className="placeholder:text-[#999999]"
          />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>
    </InputWrapper>
  );
};

export default Select;
