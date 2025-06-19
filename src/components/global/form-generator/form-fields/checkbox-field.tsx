import React from "react";
import { Controller } from "react-hook-form";
import { z } from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { BaseFieldConfig, BaseFieldProps } from "./types";

export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: "checkbox";
  validation?: z.ZodBoolean;
}

type CheckboxFieldProps = BaseFieldProps<CheckboxFieldConfig>;

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
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
        <div className={cn("flex items-center space-x-2", field.className)}>
          <Checkbox
            id={field.name}
            checked={controllerField.value}
            onCheckedChange={(checked) => {
              controllerField.onChange(checked);
              field.eventHandlers?.onChange?.(checked, formData);
            }}
            disabled={shouldDisable}
          />
          {field.label && (
            <Label htmlFor={field.name} className="flex items-center gap-2">
              {field.label}
              {field.showRequired && <span className="text-red-600">*</span>}
              {field.info}
            </Label>
          )}
        </div>
      )}
    />
  );
};
