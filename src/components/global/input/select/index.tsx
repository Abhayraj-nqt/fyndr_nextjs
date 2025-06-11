/* eslint-disable max-lines */
"use client";

import { Check, ChevronDown } from "lucide-react";
import React, { useState, useRef, useLayoutEffect } from "react";

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

import { MultiSelectDisplay } from "./multi-select-display";
import { OptionIcon } from "./option-icon";
import { Props } from "./select.types";
import { useSelectState } from "./use-select-state";

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
  const [popoverWidth, setPopoverWidth] = useState<number>();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const {
    currentValue,
    currentValues,
    currentSingleValue,
    selectedOptions,
    handleSelect,
    handleRemoveItem,
  } = useSelectState({
    value,
    defaultValue,
    multi,
    onValueChange,
    options,
  });

  useLayoutEffect(() => {
    if (open && triggerRef.current) {
      setPopoverWidth(triggerRef.current.offsetWidth);
    }
  }, [open]);

  const onSelect = (optionValue: string) => {
    handleSelect(optionValue);
    if (!multi) {
      setOpen(false);
    }
    setSearchValue("");
  };

  const getDisplayValue = () => {
    if (multi) return undefined;
    if (!currentSingleValue) return undefined;
    const selectedOption = options.find(
      (opt) => opt.value === currentSingleValue
    );
    return selectedOption;
  };

  // Filter options based on search value (search by label, not value)
  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      )
    : options;

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
                        className=""
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
                    <OptionIcon icon={option.icon} label={option.label} />
                  </div>
                  <span className="truncate">{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </ShadcnSelect>
      </InputWrapper>
    );
  }

  return (
    <InputWrapper
      className={className}
      disabled={disabled}
      info={info}
      label={label}
      showRequired={showRequired}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="hover:bg-white">
          <Button
            ref={triggerRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between text-left font-normal input-primary",
              `input-primary border-none shadow-none outline-none ring-0 focus:ring-0 ${inputClassName}`,
              !currentValue && "text-muted-foreground",
              inputClassName
            )}
            disabled={disabled}
          >
            <div className="flex-1 overflow-hidden text-left">
              {multi ? (
                <MultiSelectDisplay
                  selectedOptions={selectedOptions}
                  maxSelectedDisplay={maxSelectedDisplay}
                  placeholder={placeholder}
                  onRemoveItem={handleRemoveItem}
                />
              ) : (
                (() => {
                  const selected = getDisplayValue();
                  return selected ? (
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="flex items-center justify-center">
                        <OptionIcon
                          icon={selected.icon}
                          label={selected.label}
                        />
                      </div>
                      <span className="truncate">{selected.label}</span>
                    </div>
                  ) : (
                    placeholder
                  );
                })()
              )}
            </div>
            <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="p-0"
          align="start"
          style={{ width: popoverWidth }}
        >
          <Command shouldFilter={false}>
            {searchable && (
              <CommandInput
                placeholder={searchPlaceholder}
                value={searchValue}
                onValueChange={setSearchValue}
              />
            )}
            <CommandList>
              <CommandEmpty>{noOptionsText}</CommandEmpty>
              <CommandGroup className="custom-scrollbar">
                {filteredOptions.map((option) => {
                  const isSelected = multi
                    ? currentValues.includes(option.value)
                    : currentSingleValue === option.value;

                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      onSelect={() => onSelect(option.value)}
                      className="flex items-center gap-2"
                    >
                      <div className="flex flex-1 items-center gap-2">
                        <OptionIcon icon={option.icon} label={option.label} />
                        <span className="truncate">{option.label}</span>
                      </div>
                      {isSelected && <Check className="size-4" />}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

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
