/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Control, UseFormRegister, FieldErrors } from "react-hook-form";

export interface FieldEventHandlers {
  onBlur?: (event: React.FocusEvent, formData: any) => void;
  onFocus?: (event: React.FocusEvent, formData: any) => void;
  onChange?: (value: any, formData: any) => void;
  onClick?: (event: React.MouseEvent, formData: any) => void;
}

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

// Base props interface for all field components
export interface BaseFieldProps<T extends BaseFieldConfig> {
  field: T;
  control?: Control<any>;
  register?: UseFormRegister<any>;
  errors?: FieldErrors;
  formData: any;
  setValue: any;
  shouldDisable: boolean;
}
