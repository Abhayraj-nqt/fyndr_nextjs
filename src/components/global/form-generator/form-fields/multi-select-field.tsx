import React from "react";
import { Controller } from "react-hook-form";
import { z } from "zod";

import Select from "@/components/global/input/select/index";
import { SelectOption } from "@/components/global/input/select/select.types";

import { BaseFieldConfig, BaseFieldProps } from "./types";

export interface MultiSelectFieldConfig extends BaseFieldConfig {
  type: "multiselect";
  options: SelectOption[];
  searchable?: boolean;
  searchPlaceholder?: string;
  noOptionsText?: string;
  maxSelectedDisplay?: number;
  iconClassName?: string;
  validation?: z.ZodArray<z.ZodString>;
}

type MultiSelectFieldProps = BaseFieldProps<MultiSelectFieldConfig>;

export const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
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
          maxSelectedDisplay={field.maxSelectedDisplay}
          multi={true}
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
