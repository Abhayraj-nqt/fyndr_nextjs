import { z } from "zod";
import { BusinessFormSchema, IndividualFormSchema } from "./sign-up.schema";
import { FieldPath } from "react-hook-form";

export type IndividualFormData = z.infer<typeof IndividualFormSchema>;
export type BusinessFormData = z.infer<typeof BusinessFormSchema>;
export type FormData = IndividualFormData | BusinessFormData;

export type FormType = "individual" | "business";
export type FormMode = "registration" | "profile";

export interface FieldConfig {
  name: FieldPath<any>;
  label: string;
  type: "input" | "select" | "country" | "phone" | "referral" | "textarea";
  inputType?: "text" | "email" | "url" | "number";
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  options?: Array<{ value: string; label: string; id: string }>;
  validation?: any;
  countryCodeField?: string;
  rows?: number;
}

export interface FormConfig {
  schema: z.ZodSchema<any>;
  fields: FieldConfig[];
  defaultValues: Partial<FormData>;
}
