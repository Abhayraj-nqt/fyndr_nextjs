"use client";

import Button from "@/components/global/buttons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

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
              className="w-[96%] border border-gray-300 bg-white text-black hover:bg-white justify-start"
            >
              {field.value ? capitalize(field.value) : "Select Unit"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full bg-white text-black border border-gray-200 shadow-md">
            {SelectOptions.map((item) => (
              <DropdownMenuItem
                key={item}
                className="hover:bg-gray-100 text-black"
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
