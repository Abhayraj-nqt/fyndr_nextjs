import React, { useState, useRef } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

type MultiSelectProps = {
  options: Option[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
};

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select",
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
    setSearchTerm("");
    setOpen(true); 
    inputRef.current?.focus(); 
  };

  const handleRemove = (value: string) => {
    onChange(selectedValues.filter((v) => v !== value));
  };

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
          className={`flex items-center min-h-[45px] px-3 py-3 rounded-lg border  bg-white text-sm cursor-text overflow-hidden ${className}`}
        >
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-shrink-0 max-w-full">
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
            className="flex-grow border-none outline-none bg-transparent text-[14px] text-[#d9d9d9] min-w-[50px] "
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
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map(({ value, label }) => (
              <label
                key={value}
                className="flex items-center px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
              >
                <Checkbox
                  checked={selectedValues.includes(value)}
                  onCheckedChange={() => handleToggle(value)}
                />
                <span className="ml-2 text-sm">{label}</span>
              </label>
            ))
          ) : (
            <div className="text-sm text-gray-500 px-2 py-1">No options</div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};