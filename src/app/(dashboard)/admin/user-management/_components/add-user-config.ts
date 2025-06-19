import { z } from "zod";

import { FormConfig } from "@/types/form-generator";

export const ADD_USER_FORM: FormConfig = {
  fields: [
    {
      name: "firstName",
      type: "input",
      inputType: "text",
      label: "First Name",
      showRequired: true,
      validation: z.string().min(2, "First name must be at least 2 characters"),
    },
    {
      name: "lastName",
      type: "input",
      inputType: "text",
      label: "Last Name",
      showRequired: true,
      validation: z.string().min(2, "Last name must be at least 2 characters"),
    },
    {
      name: "email",
      type: "input",
      inputType: "email",
      label: "Email Address",
      showRequired: true,
      validation: z.string().email("Invalid email address"),
    },
    {
      name: "phone",
      type: "input",
      inputType: "tel",
      label: "Phone Number",
      showRequired: true,
    },
    {
      name: "countryCode",
      type: "input",
      disabled: true,
      label: "Country Code",
      showRequired: true,
    },
    {
      name: "country",
      type: "select",
      label: "Country",
      placeholder: "Country",
      searchable: true,
      showRequired: true,
      options: [
        { value: "us", label: "United States" },
        { value: "uk", label: "United Kingdom" },
        { value: "ca", label: "Canada" },
        { value: "au", label: "Australia" },
      ],
    },
    {
      name: "addressLine1",
      type: "input",
      label: "Address",
    },
    {
      name: "addressLine2",
      type: "input",
      label: "Street",
    },
    {
      name: "postalCode",
      type: "input",
      label: "Zip Code",
    },
    {
      name: "state",
      type: "input",
      label: "State",
      showRequired: true,
    },
    {
      name: "city",
      type: "input",
      label: "City",
      showRequired: true,
    },
    {
      name: "pwd",
      type: "input",
      showRequired: true,
      label: "Password",
    },
    {
      name: "role",
      type: "select",
      options: [
        { value: "SUPER_ADMIN", label: "Super Admin" },
        { value: "FYNDR_MANAGER", label: "Manager" },
        { value: "FYNDR_SUPPORT", label: "Support" },
      ],
    },
  ],
  submitButtonText: "Submit",
  onSubmit: async (data) => {
    console.log("Form submitted:", data);
    // Handle form submission
  },
  defaultValues:{
    countryCode:"+1"
  }
};
