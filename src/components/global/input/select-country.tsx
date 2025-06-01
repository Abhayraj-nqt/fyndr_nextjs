import Image from "next/image";
import React from "react";

import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRIES } from "@/constants";

import InputWrapper from "./input-wrapper";

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
          className={`input-primary border-none shadow-none outline-none ring-0 focus:ring-0 ${inputClassName}`}
        >
          <SelectValue
            placeholder={placeholder}
            className="placeholder:text-black-40"
          >
            {selectedCountry && (
              <div className="flex items-center gap-2">
                <Image
                  src={selectedCountry.flagURL}
                  alt={`${selectedCountry.label} flag`}
                  height={20}
                  width={20}
                  className="h-4 w-5 rounded-sm object-cover"
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
                <Image
                  src={country.flagURL}
                  alt={`${country.label} flag`}
                  height={20}
                  width={20}
                  className="h-4 w-5 rounded-sm object-cover"
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
