/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useWatch,
} from "react-hook-form";

import {
  FormFieldConfig,
  InputField,
  TextareaField,
  SelectField,
  MultiSelectField,
  CheckboxField,
  RadioField,
  SwitchField,
  DateField,
  FileField,
} from "./form-fields";

interface FieldRendererProps {
  field: FormFieldConfig;
  control: Control<any>;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  className?: string;
  setValue: any;
  getValues: any;
}

export const FormFieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  control,
  register,
  errors,
  className,
  setValue,
}) => {
  // Watch form data for conditional behavior and dynamic nodes
  const formData = useWatch({ control });

  // Evaluate conditional behavior
  const shouldHide = field.conditionalBehavior?.some(
    (behavior) =>
      behavior.effect === "hide" &&
      behavior.condition(formData[behavior.dependsOn], formData)
  );

  const shouldDisable =
    field.disabled ||
    field.conditionalBehavior?.some(
      (behavior) =>
        behavior.effect === "disable" &&
        behavior.condition(formData[behavior.dependsOn], formData)
    );

  if (shouldHide) {
    return null;
  }

  const renderField = () => {
    const baseProps = {
      field,
      control,
      register,
      formData,
      setValue,
      shouldDisable: !!shouldDisable,
    };

    switch (field.type) {
      case "input":
        return <InputField {...baseProps} field={field} />;
      case "textarea":
        return <TextareaField {...baseProps} field={field} />;
      case "select":
        return <SelectField {...baseProps} field={field} />;
      case "multiselect":
        return <MultiSelectField {...baseProps} field={field} />;
      case "checkbox":
        return <CheckboxField {...baseProps} field={field} />;
      case "radio":
        return <RadioField {...baseProps} field={field} />;
      case "switch":
        return <SwitchField {...baseProps} field={field} />;
      case "date":
        return <DateField {...baseProps} field={field} />;
      case "file":
        return <FileField {...baseProps} field={field} />;
      default:
        return null;
    }
  };

  return (
    <div className={className}>
      {renderField()}
      {errors[field.name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[field.name]?.message as string}
        </p>
      )}
    </div>
  );
};
