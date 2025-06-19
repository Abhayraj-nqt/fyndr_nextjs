import React from "react";
import { z } from "zod";

import Input from "@/components/global/input";
import { createEventHandlers } from "@/lib/utils/form-generator";

import { DynamicNodeRenderer } from "../dynamic-node-renderer";
import { BaseFieldConfig, BaseFieldProps } from "./types";

export interface DateFieldConfig extends BaseFieldConfig {
  type: "date";
  validation?: z.ZodDate;
}

type DateFieldProps = BaseFieldProps<DateFieldConfig>;

export const DateField: React.FC<DateFieldProps> = ({
  field,
  register,
  formData,
  setValue,
  shouldDisable,
}) => {
  return (
    <Input
      type="date"
      placeholder={field.placeholder}
      disabled={shouldDisable}
      label={field.label}
      showRequired={field.showRequired}
      info={field.info}
      className={field.className}
      inputClassName={field.inputClassName}
      rightNode={
        field.rightNode ? (
          <DynamicNodeRenderer
            node={field.rightNode}
            formData={formData}
            setValue={setValue}
          />
        ) : undefined
      }
      topRightNode={
        field.topRightNode ? (
          <DynamicNodeRenderer
            node={field.topRightNode}
            formData={formData}
            setValue={setValue}
          />
        ) : undefined
      }
      {...(register
        ? register(
            field.name,
            createEventHandlers(field.eventHandlers, formData)
          )
        : {})}
    />
  );
};
