import { IndividualFormSchema, BusinessFormSchema } from "./sign-up.schema";
import {
  FormType,
  FormMode,
  FormConfig,
  FieldConfig,
  FormData,
} from "./sign-up.types";

export const getFormConfig = (
  formType: FormType,
  formMode: FormMode,
  initialData: Partial<FormData>
): FormConfig => {
  const baseFields: FieldConfig[] = [
    {
      name: "email",
      label: "Email",
      type: "input",
      inputType: "email",
      placeholder: "Enter email",
      required: true,
      disabled: formMode === "profile",
    },
    {
      name: "firstName",
      label: "First Name",
      type: "input",
      placeholder: "Enter first name",
      required: true,
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "input",
      placeholder: "Enter last name",
      required: true,
    },
    {
      name: "country",
      label: "Country",
      type: "country",
      placeholder: "Select country",
      required: true,
    },
    {
      name: "phone",
      label: "Phone",
      type: "phone",
      placeholder: "Enter phone number",
      required: true,
      countryCodeField: "ctryCode",
    },
    {
      name: "postalCode",
      label: "Zip Code",
      type: "input",
      placeholder: "Enter zip code",
      required: true,
    },
    {
      name: "addressLine1",
      label: "Address Line 1",
      type: "input",
      placeholder: "Enter address",
      hidden: formMode === "profile",
    },
    {
      name: "addressLine2",
      label: "Address Line 2",
      type: "input",
      placeholder: "Enter address line 2",
      hidden: formMode === "profile",
    },
    {
      name: "city",
      label: "City",
      type: "input",
      placeholder: "City",
      required: true,
      disabled: true,
    },
    {
      name: "state",
      label: "State",
      type: "input",
      placeholder: "State",
      required: true,
      disabled: true,
    },
    {
      name: "referralCode",
      label: "Referral/Promo Code",
      type: "referral",
      placeholder: "Enter code",
      hidden: formMode === "profile",
    },
  ];

  const individualFields: FieldConfig[] = [
    {
      name: "yob",
      label: "Year of Birth",
      type: "input",
      inputType: "number",
      placeholder: "YYYY",
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      placeholder: "Select gender",
      options: [
        { value: "M", label: "Male", id: "male" },
        { value: "F", label: "Female", id: "female" },
        { value: "ND", label: "Non-binary", id: "nonbinary" },
        { value: "OT", label: "Other", id: "other" },
      ],
    },
  ];

  const businessFields: FieldConfig[] = [
    {
      name: "businessName",
      label: "Business Name",
      type: "input",
      placeholder: "Enter business name",
      required: true,
    },
    {
      name: "businessType",
      label: "Business Type",
      type: "select",
      placeholder: "Select type",
      required: true,
      options: [
        { value: "LLC", label: "LLC", id: "llc" },
        { value: "CORP", label: "Corporation", id: "corp" },
        { value: "PART", label: "Partnership", id: "part" },
        { value: "SOLE", label: "Sole Proprietorship", id: "sole" },
      ],
    },
    {
      name: "website",
      label: "Website",
      type: "input",
      inputType: "url",
      placeholder: "https://example.com",
    },
    {
      name: "tags",
      label: "Tags",
      type: "textarea",
      placeholder: "Enter tags separated by commas",
      rows: 3,
    },
    {
      name: "accountStatus",
      label: "Account Status",
      type: "select",
      placeholder: "Status",
      hidden: formMode === "registration",
      disabled: formMode === "profile",
      options: [
        { value: "ACTIVE", label: "Active", id: "active" },
        { value: "INACTIVE", label: "Inactive", id: "inactive" },
        { value: "PENDING", label: "Pending", id: "pending" },
      ],
    },
  ];

  const schema =
    formType === "individual" ? IndividualFormSchema : BusinessFormSchema;
  const typeFields =
    formType === "individual" ? individualFields : businessFields;
  const fields = [...baseFields, ...typeFields].filter(
    (field) => !field.hidden
  );

  const defaultValues = {
    country: "US",
    ctryCode: "+1",
    findUsId: 8,
    accountStatus: "ACTIVE",
    ...initialData,
  };

  return { schema, fields, defaultValues };
};
