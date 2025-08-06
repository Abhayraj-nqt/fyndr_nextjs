import React from "react";
import { z } from "zod";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { createEventHandlers } from "@/lib/utils/form-generator";

import { BaseFieldConfig, BaseFieldProps } from "./types";

export interface TextareaFieldConfig extends BaseFieldConfig {
  type: "textarea";
  rows?: number;
  validation?: z.ZodString;
}

type TextareaFieldProps = BaseFieldProps<TextareaFieldConfig>;

export const TextareaField: React.FC<TextareaFieldProps> = ({
  field,
  register,
  formData,
  shouldDisable,
}) => {
  return (
    <div className={cn("space-y-2", field.className)}>
      {field.label && (
        <Label htmlFor={field.name} className="flex items-center gap-2">
          {field.label}
          {field.showRequired && <span className="text-red-600">*</span>}
          {field.info}
        </Label>
      )}
      <Textarea
        id={field.name}
        placeholder={field.placeholder}
        disabled={shouldDisable}
        rows={field.rows}
        className={field.inputClassName}
        {...(register
          ? register(
              field.name,
              createEventHandlers(field.eventHandlers, formData)
            )
          : {})}
      />
    </div>
  );
};
