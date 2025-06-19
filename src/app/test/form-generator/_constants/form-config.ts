import { z } from "zod";

import { FormConfig } from "@/types/form-generator";

export const USER_REGISTRATION_FORM: FormConfig = {
  fields: [
    {
      name: "firstName",
      type: "input",
      inputType: "text",
      label: "First Name",
      placeholder: "Enter your first name",
      showRequired: true,
      validation: z.string().min(2, "First name must be at least 2 characters"),
    },
    {
      name: "lastName",
      type: "input",
      inputType: "text",
      label: "Last Name",
      placeholder: "Enter your last name",
      showRequired: true,
      validation: z.string().min(2, "Last name must be at least 2 characters"),
    },
    {
      name: "email",
      type: "input",
      inputType: "email",
      label: "Email Address",
      placeholder: "Enter your email",
      showRequired: true,
      validation: z.string().email("Invalid email address"),
    },
    {
      name: "phone",
      type: "input",
      inputType: "tel",
      label: "Phone Number",
      placeholder: "Enter your phone number",
    },
    {
      name: "country",
      type: "select",
      label: "Country",
      placeholder: "Select your country",
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
      name: "interests",
      type: "multiselect",
      label: "Interests",
      placeholder: "Select your interests",
      searchable: true,
      maxSelectedDisplay: 2,
      options: [
        { value: "tech", label: "Technology" },
        { value: "sports", label: "Sports" },
        { value: "music", label: "Music" },
        { value: "travel", label: "Travel" },
        { value: "cooking", label: "Cooking" },
      ],
    },
    {
      name: "bio",
      type: "textarea",
      label: "Bio",
      placeholder: "Tell us about yourself",
      rows: 4,
    },
    {
      name: "birthDate",
      type: "date",
      label: "Date of Birth",
      showRequired: true,
    },
    {
      name: "newsletter",
      type: "checkbox",
      label: "Subscribe to newsletter",
    },
    {
      name: "notifications",
      type: "switch",
      label: "Enable Notifications",
      checkedTitle: "On",
      uncheckedTitle: "Off",
    },
    {
      name: "gender",
      type: "radio",
      label: "Gender",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
    },
  ],
  submitButtonText: "Create Account",
  showResetButton: true,
  onSubmit: async (data) => {
    console.log("Form submitted:", data);
    // Handle form submission
  },
  defaultValues: {
    newsletter: false,
    notifications: true,
  },
};

export const CONTACT_FORM: FormConfig = {
  fields: [
    {
      name: "name",
      type: "input",
      inputType: "text",
      label: "Full Name",
      placeholder: "Enter your full name",
      showRequired: true,
    },
    {
      name: "email",
      type: "input",
      inputType: "email",
      label: "Email",
      placeholder: "Enter your email",
      showRequired: true,
    },
    {
      name: "subject",
      type: "select",
      label: "Subject",
      placeholder: "Select a subject",
      showRequired: true,
      options: [
        { value: "general", label: "General Inquiry" },
        { value: "support", label: "Technical Support" },
        { value: "billing", label: "Billing Question" },
        { value: "feedback", label: "Feedback" },
      ],
    },
    {
      name: "message",
      type: "textarea",
      label: "Message",
      placeholder: "Enter your message",
      rows: 6,
      showRequired: true,
    },
    {
      name: "attachments",
      type: "file",
      label: "Attachments",
      accept: ".pdf,.doc,.docx,.txt",
      multiple: true,
    },
  ],
  submitButtonText: "Send Message",
  onSubmit: async (data) => {
    console.log("Contact form submitted:", data);
  },
};
