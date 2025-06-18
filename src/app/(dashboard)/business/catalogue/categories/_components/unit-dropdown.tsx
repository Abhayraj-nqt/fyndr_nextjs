"use client";

import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

import Button from "@/components/global/buttons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SelectOptions = [
  "each",
  "kg",
  "mg",
  "pound",
  "ounce",
  "ml",
  "litre",
  "set",
  "box",
  "pair",
];

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const UnitDropdown = () => {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <Controller
      name="unit"
      control={control}
      render={({ field }) => (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              className="w-[96%] justify-start border border-gray-300 bg-white text-black hover:bg-white"
            >
              {field.value ? capitalize(field.value) : "Select Unit"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full border border-gray-200 bg-white text-black shadow-md">
            {SelectOptions.map((item) => (
              <DropdownMenuItem
                key={item}
                className="text-black hover:bg-gray-100"
                onSelect={(e) => {
                  e.preventDefault();
                  field.onChange(item);
                  setOpen(false);
                }}
              >
                {capitalize(item)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    />
  );
};

export default UnitDropdown;
