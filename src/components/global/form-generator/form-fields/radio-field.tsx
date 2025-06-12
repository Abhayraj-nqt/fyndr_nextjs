import React from "react";
import { Controller } from "react-hook-form";
import { z } from "zod";

import { SelectOption } from "@/components/global/input/select/select.types";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

import { BaseFieldConfig, BaseFieldProps } from "./types";

export interface RadioFieldConfig extends BaseFieldConfig {
  type: "radio";
  options: SelectOption[];
  validation?: z.ZodString;
}

type RadioFieldProps = BaseFieldProps<RadioFieldConfig>;

export const RadioField: React.FC<RadioFieldProps> = ({
  field,
  control,
  formData,
  shouldDisable,
}) => {
  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: controllerField }) => (
        <div className={cn("space-y-3", field.className)}>
          {field.label && (
            <Label className="flex items-center gap-2">
              {field.label}
              {field.showRequired && <span className="text-red-600">*</span>}
              {field.info}
            </Label>
          )}
          <RadioGroup
            value={controllerField.value}
            onValueChange={(value) => {
              controllerField.onChange(value);
              field.eventHandlers?.onChange?.(value, formData);
            }}
            disabled={shouldDisable}
          >
            {field.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}
    />
  );
};
