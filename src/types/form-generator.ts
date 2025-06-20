/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormFieldConfig } from "@/components/global/form-generator/form-fields";

export type {
  FormFieldConfig,
  InputFieldConfig,
  TextareaFieldConfig,
  SelectFieldConfig,
  MultiSelectFieldConfig,
  CheckboxFieldConfig,
  RadioFieldConfig,
  SwitchFieldConfig,
  DateFieldConfig,
  FileFieldConfig,
  BaseFieldConfig,
  FieldEventHandlers,
  DynamicNode,
  ConditionalBehavior,
} from "@/components/global/form-generator/form-fields";

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

// export interface FormGeneratorProps extends FormConfig {}
export type FormGeneratorProps = FormConfig;
