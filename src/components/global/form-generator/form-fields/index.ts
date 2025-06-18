import { CheckboxFieldConfig } from "./checkbox-field";
import { DateFieldConfig } from "./date-field";
import { FileFieldConfig } from "./file-field";
import { InputFieldConfig } from "./input-field";
import { MultiSelectFieldConfig } from "./multi-select-field";
import { RadioFieldConfig } from "./radio-field";
import { SelectFieldConfig } from "./select-field";
import { SwitchFieldConfig } from "./switch-field";
import { TextareaFieldConfig } from "./text-area-field";

export { InputField, type InputFieldConfig } from "./input-field";
export { TextareaField, type TextareaFieldConfig } from "./text-area-field";
export { SelectField, type SelectFieldConfig } from "./select-field";
export {
  MultiSelectField,
  type MultiSelectFieldConfig,
} from "./multi-select-field";
export { CheckboxField, type CheckboxFieldConfig } from "./checkbox-field";
export { RadioField, type RadioFieldConfig } from "./radio-field";
export { SwitchField, type SwitchFieldConfig } from "./switch-field";
export { DateField, type DateFieldConfig } from "./date-field";
export { FileField, type FileFieldConfig } from "./file-field";

export type {
  BaseFieldConfig,
  BaseFieldProps,
  FieldEventHandlers,
  DynamicNode,
  ConditionalBehavior,
} from "./types";

export { createEventHandlers } from "@/lib/utils/form-generator";

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
