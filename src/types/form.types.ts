import { Control, FieldValues } from "react-hook-form";

export interface FormFieldRendererProps<
  FieldConfigProps = any,
  FormControlProps extends FieldValues = any,
> {
  config: FieldConfigProps;
  control: Control<FormControlProps>;
  states: any;
  setters: any;
  handlers: any;
  data: any;
}
