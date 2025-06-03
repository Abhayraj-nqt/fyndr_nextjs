import { useState, useMemo, useCallback } from "react";

import {
  Props,
  SelectOption,
  SingleSelectProps,
  MultiSelectProps,
} from "./select.types";

export const useSelectState = ({
  value,
  defaultValue,
  multi = false,
  onValueChange,
  options,
}: Props & { options: SelectOption[] }) => {
  const [internalValue, setInternalValue] = useState<string | string[]>(
    multi ? (defaultValue as string[]) || [] : (defaultValue as string) || ""
  );

  const currentValue = value !== undefined ? value : internalValue;
  const currentValues = multi ? (currentValue as string[]) : [];
  const currentSingleValue = multi ? "" : (currentValue as string);

  const selectedOptions = useMemo(() => {
    if (!multi) return [];
    return options.filter((option) => currentValues.includes(option.value));
  }, [options, currentValues, multi]);

  const handleValueChange = useCallback(
    (newValue: string | string[]) => {
      if (multi) {
        const newValues = newValue as string[];
        setInternalValue(newValues);
        (onValueChange as MultiSelectProps["onValueChange"])?.(newValues);
      } else {
        const singleValue = newValue as string;
        setInternalValue(singleValue);
        (onValueChange as SingleSelectProps["onValueChange"])?.(singleValue);
      }
    },
    [multi, onValueChange]
  );

  const handleSelect = useCallback(
    (optionValue: string) => {
      if (multi) {
        const isSelected = currentValues.includes(optionValue);
        const newValues = isSelected
          ? currentValues.filter((v) => v !== optionValue)
          : [...currentValues, optionValue];
        handleValueChange(newValues);
      } else {
        handleValueChange(optionValue);
      }
    },
    [multi, currentValues, handleValueChange]
  );

  const handleRemoveItem = useCallback(
    (optionValue: string, event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const newValues = currentValues.filter((v) => v !== optionValue);
      handleValueChange(newValues);
    },
    [currentValues, handleValueChange]
  );

  return {
    currentValue,
    currentValues,
    currentSingleValue,
    selectedOptions,
    handleSelect,
    handleRemoveItem,
  };
};
