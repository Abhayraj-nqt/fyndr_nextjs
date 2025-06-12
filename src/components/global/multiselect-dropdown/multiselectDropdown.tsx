"use client";
import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

import { X, Check } from "lucide-react";
interface Option {
  value: string;
  label: string;
}
type MultiSelectProps = {
  options: Option[];
  onChange?: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  paramKey: string;
};
export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  onChange,
  placeholder = "Select",
  className = "",
  paramKey,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [selectedValues, setSelectedValues] = useState<string[]>(
    searchParams.getAll(paramKey)
  );
  const updateURL = (newValues: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    
    params.delete(paramKey);
    
    newValues.forEach(value => {
      params.append(paramKey, value);
    });
    
    router.push(`${pathname}?${params.toString()}`);
  };
  const handleToggle = (value: string) => {
    let newValues: string[];
    
    if (selectedValues.includes(value)) {
      newValues = selectedValues.filter((v) => v !== value);
    } else {
      newValues = [...selectedValues, value];
    }
    
    setSelectedValues(newValues);
    updateURL(newValues);
    
    onChange?.(newValues);
    
    setSearchTerm("");
    setOpen(true);
    inputRef.current?.focus();
  };
  const handleRemove = (value: string) => {
    const newValues = selectedValues.filter((v) => v !== value);
    setSelectedValues(newValues);
    updateURL(newValues);
    onChange?.(newValues);
  };
  useEffect(() => {
    const urlValues = searchParams.getAll(paramKey);
    if (JSON.stringify(urlValues) !== JSON.stringify(selectedValues)) {
      setSelectedValues(urlValues);
      onChange?.(urlValues);
    }
  }, [searchParams, paramKey]);
  const filteredOptions = options.filter((opt) =>
    opt?.label?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          onClick={() => {
            setOpen(true);
            inputRef.current?.focus();
          }}
          className={`flex items-center min-h-[45px] px-3 py-3 rounded-lg border bg-white text-sm cursor-text overflow-hidden ${className}`}
        >
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide no-scrollbar flex-shrink-0 max-w-full">
            {selectedValues.map((val) => {
              const opt = options.find((o) => o.value === val);
              return (
                <Badge
                  key={val}
                  className="flex items-center gap-1 px-2 py-1 bg-[#E6E6E6] text-[#4D4D4D] hover:bg-[#E6E6E6] whitespace-nowrap flex-shrink-0"
                >
                  <span>{opt?.label || val}</span>
                  <X
                    size={12}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(val);
                    }}
                  />
                </Badge>
              );
            })}
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            className={`flex-grow border-none outline-none bg-transparent text-[14px] text-[#d9d9d9] min-w-[50px] ${
              selectedValues.length > 0 ? 'opacity-0 w-0' : ''
            }`}
            placeholder={selectedValues.length === 0 ? placeholder : ""}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-60 p-2"
        sideOffset={4}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto scrollbar-hide">
          {filteredOptions.length > 0 ? (
            filteredOptions.map(({ value, label }) => (
              <div
                key={value}
                onClick={() => handleToggle(value)}
                className="flex items-center justify-between px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
              >
                <span className="text-sm">{label}</span>
                {selectedValues.includes(value) && (
                  <Check size={16} className="text-green-600" />
                )}
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500 px-2 py-1">No options</div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};