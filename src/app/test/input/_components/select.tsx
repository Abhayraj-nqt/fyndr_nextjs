import { X, Check, ChevronDown, Search } from "lucide-react";
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import InputWrapper from "@/components/global/input/input-wrapper";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  ...props
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [internalValue, setInternalValue] = useState<string | string[]>(
    multi ? (defaultValue as string[]) || [] : (defaultValue as string) || ""
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const selectedItemsRef = useRef<HTMLDivElement>(null);

  // Use controlled value if provided, otherwise use internal state
  const currentValue = value !== undefined ? value : internalValue;
  const currentValues = multi ? (currentValue as string[]) : [];
  const currentSingleValue = multi ? "" : (currentValue as string);

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchTerm.trim()) return options;

    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm, searchable]);

  // Get selected options for multi-select display
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

  // Handle single option selection
  const handleSingleSelect = useCallback(
    (optionValue: string) => {
      handleValueChange(optionValue);
      setIsOpen(false);
      setSearchTerm("");
    },
    [handleValueChange]
  );

  // Handle multi option selection
  const handleMultiSelect = useCallback(
    (optionValue: string) => {
      const isSelected = currentValues.includes(optionValue);
      const newValues = isSelected
        ? currentValues.filter((v) => v !== optionValue)
        : [...currentValues, optionValue];

      handleValueChange(newValues);

      // Don't close dropdown in multi-select mode
      if (searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    },
    [currentValues, handleValueChange, searchable]
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

  // Handle search input change
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  // Handle dropdown toggle
  const handleToggleDropdown = useCallback(() => {
    if (disabled) return;

    setIsOpen(!isOpen);

    if (!isOpen && searchable && searchInputRef.current) {
      // Focus search input when opening
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [disabled, isOpen, searchable]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Clear search when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  // Render selected items for multi-select
  const renderSelectedItems = () => {
    if (!multi || selectedOptions.length === 0) {
      return <span className="truncate text-black-40">{placeholder}</span>;
    }

    const displayOptions = selectedOptions.slice(0, maxSelectedDisplay);
    const remainingCount = selectedOptions.length - maxSelectedDisplay;

    return (
      <div
        ref={selectedItemsRef}
        className="scrollbar-hide flex flex-1 items-center gap-1 overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {displayOptions.map((option) => (
          <div
            key={option.value}
            className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-md bg-blue-100 px-2 py-1 text-sm text-blue-800"
          >
            <span className="max-w-[100px] truncate">{option.label}</span>
            <button
              type="button"
              onClick={(e) => handleRemoveItem(option.value, e)}
              className="z-10 inline-flex size-4 items-center justify-center rounded-full transition-colors hover:bg-blue-200"
              tabIndex={-1}
            >
              <X size={12} />
            </button>
          </div>
        ))}
        {remainingCount > 0 && (
          <span className="shrink-0 whitespace-nowrap text-sm text-gray-500">
            +{remainingCount} more
          </span>
        )}
      </div>
    );
  };

  // For non-multi, non-searchable mode, use the original ShadcnSelect
  if (!multi && !searchable) {
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
          onValueChange={onValueChange as (value: string) => void}
          name={name}
          defaultValue={defaultValue as string}
          disabled={disabled}
        >
          <SelectTrigger
            className={`input-primary border-none shadow-none outline-none ring-0 focus:ring-0 ${inputClassName}`}
          >
            <SelectValue
              placeholder={placeholder}
              className="placeholder:text-black-40"
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
  }

  // Custom implementation for searchable and/or multi-select
  return (
    <InputWrapper
      className={className}
      disabled={disabled}
      info={info}
      label={label}
      showRequired={showRequired}
    >
      <div ref={containerRef} className="relative">
        <div
          className={`input-primary flex min-h-[40px] cursor-pointer items-center justify-between gap-2 border-none shadow-none outline-none ring-0 focus:ring-0 ${
            disabled ? "cursor-not-allowed opacity-50" : ""
          } ${inputClassName}`}
          onClick={handleToggleDropdown}
        >
          <div className="flex min-w-0 flex-1 items-center">
            {multi ? (
              renderSelectedItems()
            ) : (
              <span
                className={
                  currentSingleValue ? "text-foreground" : "text-black-40"
                }
              >
                {currentSingleValue
                  ? options.find((opt) => opt.value === currentSingleValue)
                      ?.label
                  : placeholder}
              </span>
            )}
          </div>

          <ChevronDown
            size={16}
            className={`shrink-0 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {isOpen && (
          <div className="absolute z-50 mt-1 max-h-60 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
            {searchable && (
              <div className="border-b border-gray-200 p-2">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder={searchPlaceholder}
                    className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-center text-sm text-gray-500">
                  {noOptionsText}
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = multi
                    ? currentValues.includes(option.value)
                    : currentSingleValue === option.value;

                  return (
                    <div
                      key={option.value}
                      className={`flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-gray-100 ${
                        option.disabled ? "cursor-not-allowed opacity-50" : ""
                      } ${isSelected ? "bg-blue-50" : ""}`}
                      onClick={() => {
                        if (option.disabled) return;

                        if (multi) {
                          handleMultiSelect(option.value);
                        } else {
                          handleSingleSelect(option.value);
                        }
                      }}
                    >
                      <span className="flex-1 truncate">{option.label}</span>
                      {isSelected && (
                        <Check
                          size={16}
                          className="ml-2 shrink-0 text-blue-600"
                        />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

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
