import { GENDER } from "@/constants";
import { IndividualFormData } from "@/hooks/auth/useIndividualForm";

export interface BaseFieldConfig {
  name: keyof IndividualFormData;
  label: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  type?: "text" | "tel" | "email";
}

export interface InputFieldConfig extends BaseFieldConfig {
  fieldType: "input";
  onBlur?: () => void;
}

export interface SelectFieldConfig extends BaseFieldConfig {
  fieldType: "select";
  options: Array<{ value: string; label: string }>;
}

export interface CountryFieldConfig extends BaseFieldConfig {
  fieldType: "country";
  onValueChange: (country: any) => void;
}

export interface PhoneFieldConfig extends BaseFieldConfig {
  fieldType: "phone";
  countryCodeField: keyof IndividualFormData;
  leftNode?: React.ReactNode;
  rightNode?: React.ReactNode;
}

export interface ReferralFieldConfig extends BaseFieldConfig {
  fieldType: "referral";
  leftNode?: React.ReactNode;
  rightNode?: React.ReactNode;
}

export type FieldConfig =
  | InputFieldConfig
  | SelectFieldConfig
  | CountryFieldConfig
  | PhoneFieldConfig
  | ReferralFieldConfig;

export const getFormFieldsConfig = (
  handlers: any,
  states: any,
  data: any
): FieldConfig[] => [
  {
    fieldType: "input",
    name: "email",
    label: "Email Address",
    required: true,
    placeholder: "Email",
    disabled: true,
    type: "email",
  },
  {
    fieldType: "input",
    name: "firstName",
    label: "First Name",
    required: true,
    placeholder: "Enter your first name",
  },
  {
    fieldType: "input",
    name: "lastName",
    label: "Last Name",
    required: true,
    placeholder: "Enter your last name",
  },
  {
    fieldType: "input",
    name: "yob",
    label: "Year of Birth",
    placeholder: "Year of Birth (YYYY)",
  },
  {
    fieldType: "select",
    name: "gender",
    label: "Gender",
    placeholder: "Select your gender",
    options: GENDER,
  },
  {
    fieldType: "country",
    name: "country",
    label: "Country",
    required: true,
    placeholder: "Select your country",
    onValueChange: handlers.handleCountryChange,
  },
  {
    fieldType: "phone",
    name: "phone",
    label: "Phone Number",
    required: true,
    placeholder: "Enter your phone number",
    type: "tel",
    countryCodeField: "ctryCode",
    disabled: states.isMobileVerified,
  },
  {
    fieldType: "input",
    name: "postalCode",
    label: "Zip Code",
    required: true,
    placeholder: "Enter zip code",
    onBlur: handlers.handleGetCityAndState,
  },
  {
    fieldType: "input",
    name: "addressLine1",
    label: "Address 1",
    placeholder: "Address Line 1",
  },
  {
    fieldType: "input",
    name: "addressLine2",
    label: "Address 2",
    placeholder: "Address Line 2",
  },
  {
    fieldType: "input",
    name: "city",
    label: "City",
    required: true,
    placeholder: "City",
    disabled: true,
  },
  {
    fieldType: "input",
    name: "state",
    label: "State",
    required: true,
    placeholder: "State",
    disabled: true,
  },
  {
    fieldType: "referral",
    name: "referralCode",
    label: "Referral/Promo Code",
    placeholder: "Referral/Promo Code",
    disabled: states.isCodeVerified,
  },
];
