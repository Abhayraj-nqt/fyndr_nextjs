"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // assumes you have this structure
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = {
  label: string;
  value: string;
};

interface MultiSelectDropdownProps {
  options: Option[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder,
  className,
}) => {
  const toggleValue = (val: string, checked: boolean) => {
    const updated = checked
      ? [...selectedValues, val]
      : selectedValues.filter((v) => v !== val);
    onChange(updated);
  };

  const displayText =
    selectedValues?.length > 0
      ? options
          .filter((opt) => selectedValues?.includes(opt.value))
          .map((opt) => opt.label)
          .join(", ")
      : placeholder;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          // "w-full rounded-md border px-3 py-2 text-left text-sm shadow-sm bg-white dark:bg-slate-950 dark:border-slate-800",
          "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-slate-100 data-[state=open]:bg-slate-100 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus:bg-slate-800 dark:data-[state=open]:bg-slate-800",
          className
        )}
      >
        <span>{displayText}</span>
        <ChevronDown className="ml-2 inline-block w-4 h-4 float-right" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        {options?.map(({ label, value }) => (
          <DropdownMenuCheckboxItem
            key={value}
            checked={selectedValues?.includes(value)}
            onCheckedChange={(checked) =>
              toggleValue(value, Boolean(checked))
            }
          >
            {label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
