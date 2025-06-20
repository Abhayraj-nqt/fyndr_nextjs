import React from "react";

import { FormGenerator } from "@/components/global/form-generator";

import {
  USER_REGISTRATION_FORM,
  CONTACT_FORM,
} from "../_constants/form-config";

export const FormExample: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">User Registration Form</h2>
        <FormGenerator {...USER_REGISTRATION_FORM} />
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">Contact Form</h2>
        <FormGenerator {...CONTACT_FORM} />
      </div>
    </div>
  );
};
