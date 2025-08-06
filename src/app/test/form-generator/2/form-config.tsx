/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Info,
  Facebook,
  Instagram,
  Settings2,
  User2,
  Linkedin,
  Wallet,
  Store,
  Heart,
  Box,
  Map,
} from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import z from "zod";

import { FormConfig } from "@/types/form-generator";

export const generateFormConfig = ({
  switchControlValue,
  setSwitchControlValue,
  handleModalState,
}: {
  switchControlValue: boolean;
  setSwitchControlValue: Dispatch<SetStateAction<boolean>>;
  handleModalState: () => void;
}) => {
  const comprehensiveFormConfig: FormConfig = {
    fields: [
      // Input with button at right node that opens modal
      {
        name: "username",
        type: "input",
        inputType: "text",
        label: "Username",
        placeholder: "Enter your username",
        showRequired: true,
        validation: z.string().min(3, "Username must be at least 3 characters"),
        rightNode: {
          type: "button",
          props: {
            children: "Check",
            variant: "outline",
            size: "sm",
          },
          onClick: (formData, setValue) => {
            console.log("Opening modal with form data:", formData);
            // setIsModalOpen(true);
            handleModalState();
          },
        },
      },

      // Input with switch at top right node that controls input state
      {
        name: "notificationEmail",
        type: "input",
        inputType: "email",
        label: "Notification Email",
        placeholder: "Enter email for notifications",
        topRightNode: {
          type: "switch",
          props: {
            checked: switchControlValue,
            checkedTitle: "On",
            uncheckedTitle: "Off",
            name: "emailToggle",
          },
          onClick: (formData, setValue) => {
            const newValue = !switchControlValue;
            setSwitchControlValue(newValue);
            if (!newValue) {
              setValue("notificationEmail", ""); // Clear the email when disabled
            }
          },
        },
        conditionalBehavior: [
          {
            dependsOn: "emailToggle",
            condition: () => !switchControlValue,
            effect: "disable",
          },
        ],
      },

      // Input with onBlur event handler
      {
        name: "phoneNumber",
        type: "input",
        inputType: "tel",
        label: "Phone Number",
        placeholder: "Enter your phone number",
        eventHandlers: {
          onBlur: (event, formData) => {
            console.log("onBlur is working");
            console.log(
              "Current phone value:",
              (event.target as HTMLInputElement).value
            );
            console.log("Full form data:", formData);
          },
          onFocus: (event, formData) => {
            console.log("Phone number focused");
          },
        },
      },

      // Input with info tooltip
      {
        name: "socialSecurityNumber",
        type: "input",
        inputType: "text",
        label: "Social Security Number",
        placeholder: "XXX-XX-XXXX",
        info: (
          <div className="flex items-center gap-1">
            <Info className="size-4" />
            <span>Your SSN is used for verification purposes only</span>
          </div>
        ),
        validation: z
          .string()
          .regex(/^\d{3}-\d{2}-\d{4}$/, "Invalid SSN format"),
      },

      // Multiselect with searchable functionality
      {
        name: "skills",
        type: "multiselect",
        label: "Technical Skills",
        placeholder: "Select your skills",
        searchable: true,
        searchPlaceholder: "Search skills...",
        maxSelectedDisplay: 3,
        showRequired: true,
        options: [
          { value: "react", label: "React", icon: <Facebook /> },
          { value: "typescript", label: "TypeScript", icon: <Instagram /> },
          { value: "nodejs", label: "Node.js", icon: <Settings2 /> },
          { value: "python", label: "Python", icon: <User2 /> },
          { value: "java", label: "Java", disabled: true, icon: <Linkedin /> },
          { value: "sql", label: "SQL", icon: <Map /> },
          { value: "aws", label: "AWS", icon: <Wallet /> },
          { value: "docker", label: "Docker", icon: <Store /> },
          { value: "kubernetes", label: "Kubernetes", icon: <Heart /> },
          { value: "graphql", label: "GraphQL", icon: <Box /> },
        ],
        validation: z
          .array(z.string())
          .min(1, "Please select at least one skill"),
      },

      // Regular select with searchable
      {
        name: "country",
        type: "select",
        label: "Country",
        placeholder: "Select your country",
        searchable: true,
        searchPlaceholder: "Search countries...",
        showRequired: true,
        iconClassName: "h-4 w-5",

        options: [
          {
            value: "us",
            label: "United States",
            // icon: "/icons/country/us.svg",
            icon: (
              <Image
                src={"/icons/country/us.svg"}
                height={20}
                width={20}
                className="h-4 w-5"
                alt=""
              />
            ),
          },
          {
            value: "uk",
            label: "United Kingdom",
            icon: "/icons/country/gb.svg",
          },
          { value: "ca", label: "Canada", icon: "/icons/country/ca.svg" },
          { value: "au", label: "Australia", icon: "/icons/country/au.svg" },
          { value: "de", label: "Germany", icon: "/icons/country/us.svg" },
          { value: "fr", label: "France", icon: "/icons/country/us.svg" },
          { value: "jp", label: "Japan", icon: "/icons/country/us.svg" },
          { value: "in", label: "India", icon: "/icons/country/in.svg" },
        ],
      },

      // Textarea with event handlers
      {
        name: "bio",
        type: "textarea",
        label: "Biography",
        placeholder: "Tell us about yourself...",
        rows: 4,
        eventHandlers: {
          onBlur: (event, formData) => {
            console.log(
              "Bio blur event:",
              (event.target as HTMLTextAreaElement).value
            );
          },
          onChange: (value, formData) => {
            console.log("Bio changed to:", value);
          },
        },
      },

      // Checkbox with conditional behavior
      {
        name: "agreeToTerms",
        type: "checkbox",
        label: "I agree to the Terms and Conditions",
        showRequired: true,
        // validation: z
        //   .boolean()
        //   .refine((val) => val === true, "You must agree to the terms"),
        validation: z.boolean(),
      },

      // Radio buttons
      {
        name: "experienceLevel",
        type: "radio",
        label: "Experience Level",
        showRequired: true,
        options: [
          { value: "junior", label: "Junior (0-2 years)" },
          { value: "mid", label: "Mid-level (3-5 years)" },
          { value: "senior", label: "Senior (6+ years)" },
          { value: "lead", label: "Lead/Principal" },
        ],
      },

      // Switch component
      {
        name: "newsletter",
        type: "switch",
        label: "Subscribe to Newsletter",
        checkedTitle: "Yes",
        uncheckedTitle: "No",
      },

      // Date input
      {
        name: "birthDate",
        type: "date",
        label: "Date of Birth",
        showRequired: true,
      },

      // File input
      {
        name: "resume",
        type: "file",
        label: "Upload Resume",
        accept: ".pdf,.doc,.docx",
        info: <span>Upload your resume in PDF or Word format</span>,
      },
    ],
    onSubmit: async (data) => {
      console.log("Form submitted:", data);
      // Handle form submission
    },
    submitButtonText: "Create Account",
    showResetButton: true,
  };

  return comprehensiveFormConfig;
};
