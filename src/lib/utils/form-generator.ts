/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

import { FieldEventHandlers, FormFieldConfig } from "@/types/form-generator";

export const createFormSchema = (fields: FormFieldConfig[]) => {
  const schema: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    if (field.validation) {
      schema[field.name] = field.validation;
    } else {
      // Default validations based on field type
      switch (field.type) {
        case "input": {
          const inputField = field as Extract<
            FormFieldConfig,
            { type: "input" }
          >;
          if (inputField.inputType === "email") {
            schema[field.name] = z.string().email("Invalid email address");
          } else if (inputField.inputType === "number") {
            schema[field.name] = z.coerce.number();
          } else {
            schema[field.name] = z.string();
          }
          break;
        }
        case "textarea":
          schema[field.name] = z.string();
          break;
        case "select":
          schema[field.name] = z.string();
          break;
        case "multiselect":
          schema[field.name] = z.array(z.string());
          break;
        case "checkbox":
        case "switch":
          schema[field.name] = z.boolean();
          break;
        case "radio":
          schema[field.name] = z.string();
          break;
        case "date":
          schema[field.name] = z.date();
          break;
        case "file":
          schema[field.name] = z.any();
          break;
        default:
          schema[field.name] = z.any();
      }
    }

    // Add required validation if showRequired is true
    if (field.showRequired && schema[field.name]) {
      if (field.type === "multiselect") {
        schema[field.name] = (schema[field.name] as z.ZodArray<any>).min(
          1,
          "This field is required"
        );
      } else if (field.type === "checkbox" || field.type === "switch") {
        schema[field.name] = (schema[field.name] as z.ZodBoolean).refine(
          (val) => val === true,
          "This field is required"
        );
      } else {
        if (schema[field.name] instanceof z.ZodString) {
          schema[field.name] = (schema[field.name] as z.ZodString).min(
            1,
            "This field is required"
          );
        }
      }
    }
  });

  return z.object(schema);
};

export const createEventHandlers = (
  fieldEventHandlers?: FieldEventHandlers,
  formData?: any,
  baseHandlers: any = {}
) => ({
  ...baseHandlers,
  onBlur: (event: React.FocusEvent) => {
    baseHandlers.onBlur?.(event);
    fieldEventHandlers?.onBlur?.(event, formData);
  },
  onFocus: (event: React.FocusEvent) => {
    baseHandlers.onFocus?.(event);
    fieldEventHandlers?.onFocus?.(event, formData);
  },
  onChange: (value: any) => {
    baseHandlers.onChange?.(value);
    fieldEventHandlers?.onChange?.(value, formData);
  },
});
