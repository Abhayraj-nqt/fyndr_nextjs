import { Check, ChevronsUpDown, X } from "lucide-react";
import React, { useState, useMemo, useCallback } from "react";

import InputWrapper from "@/components/global/input/input-wrapper";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type BaseProps = {
  label?: string;
  disabled?: boolean;
  showRequired?: boolean;
  info?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  options: SelectOption[];
  name?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  noOptionsText?: string;
  maxSelectedDisplay?: number;
};

type SingleSelectProps = BaseProps & {
  multi?: false;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
};

type MultiSelectProps = BaseProps & {
  multi: true;
  value?: string[];
  onValueChange?: (values: string[]) => void;
  defaultValue?: string[];
};

type Props = SingleSelectProps | MultiSelectProps;

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
  searchable = false,
  multi = false,
  searchPlaceholder = "Search options...",
  noOptionsText = "No options found",
  maxSelectedDisplay = 3,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Use controlled value if provided, otherwise use internal state
  const [internalValue, setInternalValue] = useState<string | string[]>(
    multi ? (defaultValue as string[]) || [] : (defaultValue as string) || ""
  );

  const currentValue = value !== undefined ? value : internalValue;
  const currentValues = multi ? (currentValue as string[]) : [];
  const currentSingleValue = multi ? "" : (currentValue as string);

  // Get selected options for display
  const selectedOptions = useMemo(() => {
    if (!multi) return [];
    return options.filter((option) => currentValues.includes(option.value));
  }, [options, currentValues, multi]);

  // Handle value changes
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

  // Handle option selection
  const handleSelect = useCallback(
    (optionValue: string) => {
      if (multi) {
        const isSelected = currentValues.includes(optionValue);
        const newValues = isSelected
          ? currentValues.filter((v) => v !== optionValue)
          : [...currentValues, optionValue];

        handleValueChange(newValues);
        // Keep popover open for multi-select
      } else {
        handleValueChange(optionValue);
        setOpen(false);
      }
      setSearchValue("");
    },
    [multi, currentValues, handleValueChange]
  );

  // Remove selected item in multi-select
  const handleRemoveItem = useCallback(
    (optionValue: string, event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const newValues = currentValues.filter((v) => v !== optionValue);
      handleValueChange(newValues);
    },
    [currentValues, handleValueChange]
  );

  // Render selected items for multi-select
  const renderSelectedItems = () => {
    if (!multi || selectedOptions.length === 0) {
      return placeholder;
    }

    const displayOptions = selectedOptions.slice(0, maxSelectedDisplay);
    const remainingCount = selectedOptions.length - maxSelectedDisplay;

    return (
      <div className="flex min-h-[20px] flex-wrap items-center gap-1">
        {displayOptions.map((option) => (
          <div
            key={option.value}
            className="text-secondary-foreground inline-flex items-center gap-1 rounded-sm bg-secondary px-2 py-0.5 text-sm"
          >
            <span className="max-w-[120px] truncate">{option.label}</span>
            <button
              type="button"
              onClick={(e) => handleRemoveItem(option.value, e)}
              className="hover:bg-secondary-foreground/20 inline-flex size-3 items-center justify-center rounded-full transition-colors"
              tabIndex={-1}
            >
              <X size={10} />
            </button>
          </div>
        ))}
        {remainingCount > 0 && (
          <span className="text-muted-foreground text-xs">
            +{remainingCount} more
          </span>
        )}
      </div>
    );
  };

  // Get display value for single select
  const getDisplayValue = () => {
    if (multi) return undefined;
    if (!currentSingleValue) return undefined;

    const selectedOption = options.find(
      (opt) => opt.value === currentSingleValue
    );
    return selectedOption?.label;
  };

  // For simple select without search, use ShadcnSelect
  if (!searchable && !multi) {
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
          onValueChange={handleValueChange as (value: string) => void}
          name={name}
          disabled={disabled}
        >
          <SelectTrigger className={cn("input-primary", inputClassName)}>
            <SelectValue placeholder={placeholder} />
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
  }

  // Use Combobox for searchable and/or multi-select
  return (
    <InputWrapper
      className={className}
      disabled={disabled}
      info={info}
      label={label}
      showRequired={showRequired}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between text-left font-normal input-primary",
              !currentValue && "text-muted-foreground",
              inputClassName
            )}
            disabled={disabled}
          >
            <div className="flex-1 overflow-hidden text-left">
              {multi ? (
                selectedOptions.length > 0 ? (
                  <div className="w-full overflow-x-auto">
                    {renderSelectedItems()}
                  </div>
                ) : (
                  <span className="text-muted-foreground">{placeholder}</span>
                )
              ) : (
                getDisplayValue() || placeholder
              )}
            </div>
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0" align="start">
          <Command>
            {searchable && (
              <CommandInput
                placeholder={searchPlaceholder}
                value={searchValue}
                onValueChange={setSearchValue}
              />
            )}
            <CommandList>
              <CommandEmpty>{noOptionsText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = multi
                    ? currentValues.includes(option.value)
                    : currentSingleValue === option.value;

                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      onSelect={() => handleSelect(option.value)}
                      className="flex items-center gap-2"
                    >
                      <div className="flex flex-1 items-center gap-2">
                        {multi && (
                          <div
                            className={cn(
                              "flex h-4 w-4 items-center justify-center rounded-sm border",
                              isSelected
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-muted-foreground"
                            )}
                          >
                            {isSelected && <Check className="size-3" />}
                          </div>
                        )}
                        <span className="truncate">{option.label}</span>
                      </div>
                      {!multi && isSelected && <Check className="size-4" />}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Hidden input for form submission */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={
            multi ? JSON.stringify(currentValue) : (currentValue as string)
          }
        />
      )}
    </InputWrapper>
  );
};

export default Select;
