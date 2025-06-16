/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { z } from "zod";

import { SelectOption } from "@/components/global/input/select/select.types";

export type FormFieldType =
  | "input"
  | "textarea"
  | "select"
  | "multiselect"
  | "checkbox"
  | "radio"
  | "switch"
  | "date"
  | "file";

export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url";

// Enhanced event handlers type
export interface FieldEventHandlers {
  onBlur?: (event: React.FocusEvent, formData: any) => void;
  onFocus?: (event: React.FocusEvent, formData: any) => void;
  onChange?: (value: any, formData: any) => void;
  onClick?: (event: React.MouseEvent, formData: any) => void;
}

// Enhanced node configurations
export interface DynamicNode {
  type: "button" | "switch" | "icon" | "custom";
  props?: any;
  onClick?: (formData: any, setValue: any) => void;
  render?: (formData: any, setValue: any) => React.ReactNode;
}

export interface ConditionalBehavior {
  dependsOn: string; // field name to watch
  condition: (value: any, formData: any) => boolean;
  effect: "disable" | "hide" | "show" | "enable";
}

export interface BaseFieldConfig {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  showRequired?: boolean;
  info?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  rightNode?: DynamicNode;
  topRightNode?: DynamicNode;
  eventHandlers?: FieldEventHandlers;
  conditionalBehavior?: ConditionalBehavior[];
}

export interface InputFieldConfig extends BaseFieldConfig {
  type: "input";
  inputType?: InputType;
  validation?: z.ZodString | z.ZodNumber;
}

export interface TextareaFieldConfig extends BaseFieldConfig {
  type: "textarea";
  rows?: number;
  validation?: z.ZodString;
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: "select";
  options: SelectOption[];
  searchable?: boolean;
  searchPlaceholder?: string;
  noOptionsText?: string;
  validation?: z.ZodString;
  iconClassName?: string;
}

export interface MultiSelectFieldConfig extends BaseFieldConfig {
  type: "multiselect";
  options: SelectOption[];
  searchable?: boolean;
  searchPlaceholder?: string;
  noOptionsText?: string;
  maxSelectedDisplay?: number;
  validation?: z.ZodArray<z.ZodString>;
  iconClassName?: string;
}

export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: "checkbox";
  validation?: z.ZodBoolean;
}

export interface RadioFieldConfig extends BaseFieldConfig {
  type: "radio";
  options: SelectOption[];
  validation?: z.ZodString;
}

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

export interface DateFieldConfig extends BaseFieldConfig {
  type: "date";
  validation?: z.ZodDate;
}

export interface FileFieldConfig extends BaseFieldConfig {
  type: "file";
  accept?: string;
  multiple?: boolean;
  validation?: z.ZodAny;
}

export type FormFieldConfig =
  | InputFieldConfig
  | TextareaFieldConfig
  | SelectFieldConfig
  | MultiSelectFieldConfig
  | CheckboxFieldConfig
  | RadioFieldConfig
  | SwitchFieldConfig
  | DateFieldConfig
  | FileFieldConfig;

export interface FormConfig {
  fields: FormFieldConfig[];
  submitButtonText?: string;
  resetButtonText?: string;
  onSubmit?: (data: Record<string, any>) => void | Promise<void>;
  defaultValues?: Record<string, any>;
  className?: string;
  fieldClassName?: string;
  buttonClassName?: string;
  showSubmitButton?: boolean;
  showResetButton?: boolean;
}

export interface FormGeneratorProps extends FormConfig {
  // Additional props for the form generator component
}
