// components/forms/BaseRegistrationForm.tsx
"use client";

import React from "react";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import Button from "@/components/global/buttons";
import InputWrapper from "@/components/global/input/input-wrapper";
import ROUTES from "@/constants/routes";
import FormFieldRenderer from "./form-field-renderer";
import { FieldConfig } from "./config/base-field.config";

// Generic props interface
interface BaseRegistrationFormProps<T> {
  form: any; // UseFormReturn<T> - simplified for example
  states: {
    isVerifyingCode: boolean;
    isMobileVerified: boolean;
    isCodeVerified: boolean;
    agreeOnTerms: boolean;
    findUsOptionsLoading: boolean;
  };
  setters: {
    setIsMobileVerified: (value: boolean) => void;
    setIsCodeVerified: (value: boolean) => void;
    setAgreeOnTerms: (value: boolean) => void;
  };
  handlers: {
    handleSubmit: () => void;
    handleCountryChange: (country: any) => Promise<void>;
    handleGetCityAndState: () => Promise<void>;
    handleVerifyCode: () => Promise<void>;
  };
  data: {
    findUsOptions: any[];
    email: string;
    regMode: string;
    isBusiness: boolean;
  };
  fieldConfigs: FieldConfig<T>[];
  submitButtonText?: string;
  submittingText?: string;
}

// Generic base registration form component
import type { FieldValues } from "react-hook-form";

export const BaseRegistrationForm = <T extends FieldValues>({
  form,
  states,
  setters,
  handlers,
  data,
  fieldConfigs,
  submitButtonText = "Register",
  submittingText = "Registering...",
}: BaseRegistrationFormProps<T>) => {
  return (
    <Form {...form}>
      <form onSubmit={handlers.handleSubmit} className="space-y-6">
        {fieldConfigs.map((config) => (
          <FormFieldRenderer
            key={config.name as string}
            config={config}
            control={form.control}
            states={states}
            setters={setters}
            handlers={handlers}
            data={data}
          />
        ))}

        {!states.findUsOptionsLoading && data.findUsOptions.length > 0 && (
          <div className="!my-10 flex flex-row gap-4 items-center">
            <div className="w-[9.5rem] min-w-[9.5rem] hidden sm:flex"></div>
            <InputWrapper
              label="Where did you find us?"
              className="h-fit p-4 text-[#4D4D4D]"
            >
              <RadioGroup
                value={form.watch("findUsId")?.toString() || ""}
                defaultValue="8"
                onValueChange={(value) =>
                  form.setValue("findUsId", parseInt(value))
                }
                className="flex items-center gap-6 flex-wrap p-4"
              >
                {data.findUsOptions
                  .filter((item: any) => item.active)
                  .map((item: any) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={item.id.toString()}
                        id={`findus-${item.id}`}
                      />
                      <Label htmlFor={`findus-${item.id}`}>
                        {item.options}
                      </Label>
                    </div>
                  ))}
              </RadioGroup>
            </InputWrapper>
          </div>
        )}

        <div className="flex items-center gap-4 mb-4">
          <div className="w-[9.5rem] min-w-[9.5rem] hidden sm:flex"></div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              onCheckedChange={(checked) => setters.setAgreeOnTerms(!!checked)}
            />
            <Label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#4D4D4D]"
            >
              I agree with{" "}
              <Link
                href={ROUTES.LEGAL_TERMS}
                className="text-primary-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fyndr's terms of use
              </Link>{" "}
              &{" "}
              <Link
                href={ROUTES.LEGAL_privacy}
                className="text-primary-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Link>
            </Label>
          </div>
        </div>

        <div className="!mt-10 flex items-center gap-4 mb-4">
          <div className="w-[9.5rem] min-w-[9.5rem] hidden sm:flex"></div>
          <Button
            type="submit"
            variant="primary"
            className="w-fit"
            stdWidth
            stdHeight
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? submittingText : submitButtonText}
          </Button>
        </div>
      </form>
    </Form>
  );
};

// Specific Individual Form Component
import { IndividualFormData } from "./schema";
import { useIndividualForm } from "@/hooks/auth/useBaseRegistrationForm";
import { getIndividualFormFieldsConfig } from "./config/base-field.config";

interface IndividualFormProps {
  onSubmit: (data: IndividualFormData & { isBusiness: boolean }) => void;
}

export const IndividualForm = ({ onSubmit }: IndividualFormProps) => {
  const { form, states, setters, handlers, data } = useIndividualForm({
    onSubmit,
  });
  const fieldConfigs = getIndividualFormFieldsConfig(handlers, states, data);

  return (
    <BaseRegistrationForm
      form={form}
      states={states}
      setters={setters}
      handlers={handlers}
      data={data}
      fieldConfigs={fieldConfigs}
      submitButtonText="Register"
      submittingText="Registering..."
    />
  );
};

// Specific Business Form Component
import { BusinessFormData } from "@/components/forms/auth/sign-up/schema";
import { useBusinessForm } from "@/hooks/auth/useBaseRegistrationForm";
import { getBusinessFormFieldsConfig } from "./config/base-field.config";

interface BusinessFormProps {
  onSubmit: (data: BusinessFormData & { isBusiness: boolean }) => void;
}

export const BusinessForm = ({ onSubmit }: BusinessFormProps) => {
  const { form, states, setters, handlers, data } = useBusinessForm({
    onSubmit,
  });

  const fieldConfigs = getBusinessFormFieldsConfig(handlers, states, data);

  return (
    <BaseRegistrationForm
      form={form}
      states={states}
      setters={setters}
      handlers={handlers}
      data={data}
      fieldConfigs={fieldConfigs}
      submitButtonText="Register"
      submittingText="Registering..."
    />
  );
};
