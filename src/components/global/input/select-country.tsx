import React from "react";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputWrapper from "./input-wrapper";
import { COUNTRIES } from "@/constants";

export type CountryData = {
  value: string;
  label: string;
  flagURL: string;
  countryCode: string;
};

type Props = {
  label?: string;
  disabled?: boolean;
  showRequired?: boolean;
  info?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  value?: string;
  onValueChange?: (countryData: CountryData) => void;
  name?: string;
  defaultValue?: string;
};

const SelectCountry = ({
  className,
  disabled = false,
  info,
  label,
  showRequired,
  inputClassName,
  placeholder = "Select a country",
  value,
  onValueChange,
  name,
  defaultValue,
}: Props) => {
  const handleCountryChange = (selectedValue: string) => {
    const selectedCountry = COUNTRIES.find(
      (country) => country.value === selectedValue
    );
    if (selectedCountry && onValueChange) {
      onValueChange(selectedCountry);
    }
  };

  const selectedCountry = COUNTRIES.find((country) => country.value === value);

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
        onValueChange={handleCountryChange}
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
          >
            {selectedCountry && (
              <div className="flex items-center gap-2">
                <img
                  src={selectedCountry.flagURL}
                  alt={`${selectedCountry.label} flag`}
                  className="w-5 h-4 object-cover rounded-sm"
                />
                <span>{selectedCountry.label}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {COUNTRIES.map((country) => (
            <SelectItem
              key={country.value}
              value={country.value}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <img
                  src={country.flagURL}
                  alt={`${country.label} flag`}
                  className="w-5 h-4 object-cover rounded-sm"
                />
                <span>{country.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>
    </InputWrapper>
  );
};

export default SelectCountry;
