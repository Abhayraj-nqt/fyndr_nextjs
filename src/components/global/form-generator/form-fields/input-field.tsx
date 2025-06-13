import React from "react";
// import { Control, UseFormRegister, FieldErrors } from "react-hook-form";
import { z } from "zod";

import Input from "@/components/global/input";
import { createEventHandlers } from "@/lib/utils/form-generator";

import { DynamicNodeRenderer } from "../dynamic-node-renderer";
import { BaseFieldProps, BaseFieldConfig } from "./types";

export interface InputFieldConfig extends BaseFieldConfig {
  type: "input";
  inputType?: "text" | "email" | "password" | "number" | "tel" | "url";
  validation?: z.ZodString | z.ZodNumber;
}

type InputFieldProps = BaseFieldProps<InputFieldConfig>;

export const InputField: React.FC<InputFieldProps> = ({
  field,
  register,
  formData,
  setValue,
  shouldDisable,
}) => {
  return (
    <Input
      type={field.inputType || "text"}
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
        ? register(field.name, {
            ...createEventHandlers(field.eventHandlers, formData),
          })
        : {})}
    />
  );
};
