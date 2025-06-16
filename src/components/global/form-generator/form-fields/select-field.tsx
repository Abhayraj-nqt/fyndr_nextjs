import React from "react";
import { Controller } from "react-hook-form";
import { z } from "zod";

import Select from "@/components/global/input/select/index";
import { SelectOption } from "@/components/global/input/select/select.types";

import { BaseFieldConfig, BaseFieldProps } from "./types";

export interface SelectFieldConfig extends BaseFieldConfig {
  type: "select";
  options: SelectOption[];
  searchable?: boolean;
  searchPlaceholder?: string;
  noOptionsText?: string;
  iconClassName?: string;
  validation?: z.ZodString;
}

type SelectFieldProps = BaseFieldProps<SelectFieldConfig>;

export const SelectField: React.FC<SelectFieldProps> = ({
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
        <Select
          label={field.label}
          placeholder={field.placeholder}
          disabled={shouldDisable}
          showRequired={field.showRequired}
          info={field.info}
          className={field.className}
          inputClassName={field.inputClassName}
          iconClassName={field.iconClassName}
          options={field.options}
          searchable={field.searchable}
          searchPlaceholder={field.searchPlaceholder}
          noOptionsText={field.noOptionsText}
          value={controllerField.value}
          onValueChange={(value) => {
            controllerField.onChange(value);
            field.eventHandlers?.onChange?.(value, formData);
          }}
          name={field.name}
        />
      )}
    />
  );
};
