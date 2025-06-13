import React from "react";
import { Controller } from "react-hook-form";
import { z } from "zod";

import Switch from "@/components/global/input/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { BaseFieldConfig, BaseFieldProps } from "./types";

export interface SwitchFieldConfig extends BaseFieldConfig {
  type: "switch";
  checkedTitle?: string;
  uncheckedTitle?: string;
  titleClassName?: string;
  thumbClassName?: string;
  checkedTitleClassName?: string;
  uncheckedTitleClassName?: string;
  validation?: z.ZodBoolean;
}

type SwitchFieldProps = BaseFieldProps<SwitchFieldConfig>;

export const SwitchField: React.FC<SwitchFieldProps> = ({
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
        <div
          className={cn("flex items-center justify-between", field.className)}
        >
          {field.label && (
            <Label htmlFor={field.name} className="flex items-center gap-2">
              {field.label}
              {field.showRequired && <span className="text-red-600">*</span>}
              {field.info}
            </Label>
          )}
          <Switch
            id={field.name}
            checked={controllerField.value}
            onCheckedChange={(checked) => {
              controllerField.onChange(checked);
              field.eventHandlers?.onChange?.(checked, formData);
            }}
            disabled={shouldDisable}
            checkedTitle={field.checkedTitle}
            uncheckedTitle={field.uncheckedTitle}
            titleClassName={field.titleClassName}
            thumbClassName={field.thumbClassName}
            checkedTitleClassName={field.checkedTitleClassName}
            uncheckedTitleClassName={field.uncheckedTitleClassName}
          />
        </div>
      )}
    />
  );
};
