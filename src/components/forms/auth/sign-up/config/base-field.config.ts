/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IndividualFormData,
  BusinessFormData,
} from "@/components/forms/auth/sign-up/schema";
import { GENDER } from "@/constants";

export interface BaseFieldConfig<T = any> {
  name: keyof T;
  label: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  type?: "text" | "tel" | "email" | "url";
}

export interface InputFieldConfig<T = any> extends BaseFieldConfig<T> {
  fieldType: "input";
  onBlur?: () => void;
}

export interface SelectFieldConfig<T = any> extends BaseFieldConfig<T> {
  fieldType: "select";
  options: Array<{ value: string; label: string }>;
}

export interface SearchableSelectFieldConfig<T = any>
  extends BaseFieldConfig<T> {
  fieldType: "searchableSelect";
  options: Array<{ value: string; label: string }>;
}

export interface CountryFieldConfig<T = any> extends BaseFieldConfig<T> {
  fieldType: "country";
  onValueChange: (country: any) => void;
}

export interface PhoneFieldConfig<T = any> extends BaseFieldConfig<T> {
  fieldType: "phone";
  countryCodeField: keyof T;
  leftNode?: React.ReactNode;
  rightNode?: React.ReactNode;
}

export interface ReferralFieldConfig<T = any> extends BaseFieldConfig<T> {
  fieldType: "referral";
  leftNode?: React.ReactNode;
  rightNode?: React.ReactNode;
}

export interface TagFieldConfig<T = any> extends BaseFieldConfig<T> {
  fieldType: "tag";
}

export type FieldConfig<T = any> =
  | InputFieldConfig<T>
  | SelectFieldConfig<T>
  | CountryFieldConfig<T>
  | PhoneFieldConfig<T>
  | ReferralFieldConfig<T>
  | TagFieldConfig<T>
  | SearchableSelectFieldConfig<T>;

// Base field configurations that are common to all forms
export const getBaseFieldConfigs = <T>(
  handlers: any,
  states: any
): FieldConfig<T>[] => [
  {
    fieldType: "input",
    name: "email" as keyof T,
    label: "Email Address",
    required: true,
    placeholder: "Email",
    disabled: true,
    type: "email",
  },
  {
    fieldType: "input",
    name: "firstName" as keyof T,
    label: "First Name",
    required: true,
    placeholder: "Enter your first name",
  },
  {
    fieldType: "input",
    name: "lastName" as keyof T,
    label: "Last Name",
    required: true,
    placeholder: "Enter your last name",
  },
  {
    fieldType: "country",
    name: "country" as keyof T,
    label: "Country",
    required: true,
    placeholder: "Select your country",
    onValueChange: handlers.handleCountryChange,
    disabled: !!states?.isBusiness,
  },
  {
    fieldType: "phone",
    name: "phone" as keyof T,
    label: "Phone Number",
    required: true,
    placeholder: "Enter your phone number",
    type: "tel",
    countryCodeField: "ctryCode" as keyof T,
    disabled: states.isMobileVerified,
  },
  {
    fieldType: "input",
    name: "postalCode" as keyof T,
    label: "Zip Code",
    required: true,
    placeholder: "Enter zip code",
    onBlur: handlers.handleGetCityAndState,
  },
  {
    fieldType: "input",
    name: "addressLine1" as keyof T,
    label: states?.isBusiness ? "Business Address 1" : "Address 1",
    placeholder: "Address line 1",
    required: states?.isBusiness,
  },
  {
    fieldType: "input",
    name: "addressLine2" as keyof T,
    label: "Address 2",
    placeholder: "Address line 2",
  },
  {
    fieldType: "input",
    name: "city" as keyof T,
    label: "City",
    required: true,
    placeholder: "City",
    disabled: true,
  },
  {
    fieldType: "input",
    name: "state" as keyof T,
    label: "State",
    required: true,
    placeholder: "State",
    disabled: true,
  },
  {
    fieldType: "referral",
    name: "referralCode" as keyof T,
    label: "Referral/Promo Code",
    placeholder: "Referral/Promo Code",
    disabled: states.isCodeVerified,
  },
];

// Individual-specific field configurations
export const getIndividualSpecificFieldConfigs =
  (): FieldConfig<IndividualFormData>[] => [
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
  ];

// Business-specific field configurations
export const getBusinessSpecificFieldConfigs = (
  businessTypes: Array<{ value: string; label: string }> = []
): FieldConfig<BusinessFormData>[] => [
  {
    fieldType: "input",
    name: "bizName",
    label: "Business Name",
    required: true,
    placeholder: "Enter your business name",
  },
  {
    fieldType: "searchableSelect", // Changed from "select" to "searchableSelect"
    name: "bizType",
    label: "Business Type",
    required: true,
    placeholder: "Search or select industry",
    options: businessTypes,
  },
  {
    fieldType: "input",
    name: "website",
    label: "Website",
    placeholder: "https://www.example.com",
    type: "url",
  },
  {
    fieldType: "tag",
    name: "tags",
    label: "Tags",
    placeholder: "Tags will be used to search your business",
  },
];

// Factory function to create complete field configurations
export const createFormFieldConfig = <T>(
  type: "individual" | "business",
  handlers: any,
  states: any,
  data?: any
): FieldConfig<T>[] => {
  const baseFields = getBaseFieldConfigs<T>(handlers, states);

  if (type === "individual") {
    const individualFields = getIndividualSpecificFieldConfigs();
    // Insert individual-specific fields after lastName
    const insertIndex =
      baseFields.findIndex((field) => field.name === "lastName") + 1;
    return [
      ...baseFields.slice(0, insertIndex),
      ...(individualFields as FieldConfig<T>[]),
      ...baseFields.slice(insertIndex),
    ];
  }

  if (type === "business") {
    const businessFields = getBusinessSpecificFieldConfigs(
      data?.businessTypes || []
    );
    // Insert business-specific fields after lastName, but keep tags near the end
    const insertIndex =
      baseFields.findIndex((field) => field.name === "lastName") + 1;
    const referralIndex = baseFields.findIndex(
      (field) => field.name === "referralCode"
    );

    // Separate tags from other business fields
    const tagsField = businessFields.find((field) => field.name === "tags");
    const otherBusinessFields = businessFields.filter(
      (field) => field.name !== "tags"
    );

    return [
      ...baseFields.slice(0, insertIndex),
      ...(otherBusinessFields as FieldConfig<T>[]),
      ...baseFields.slice(insertIndex, referralIndex),
      ...(tagsField ? [tagsField as FieldConfig<T>] : []),
      ...baseFields.slice(referralIndex),
    ];
  }

  return baseFields;
};

// Convenience functions for specific form types
export const getIndividualFormFieldsConfig = (
  handlers: any,
  states: any,
  data: any
): FieldConfig<IndividualFormData>[] => {
  return createFormFieldConfig<IndividualFormData>(
    "individual",
    handlers,
    states,
    data
  );
};

export const getBusinessFormFieldsConfig = (
  handlers: any,
  states: any,
  data: any
): FieldConfig<BusinessFormData>[] => {
  return createFormFieldConfig<BusinessFormData>(
    "business",
    handlers,
    states,
    data
  );
};
