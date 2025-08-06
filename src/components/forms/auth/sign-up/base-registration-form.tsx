/* eslint-disable @typescript-eslint/no-explicit-any */
// components/forms/BaseRegistrationForm.tsx
"use client";

import Link from "next/link";
import React from "react";
import type { FieldValues } from "react-hook-form";

import Button from "@/components/global/buttons";
import InputWrapper from "@/components/global/input/input-wrapper";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ROUTES from "@/constants/routes";
import { useBusinessForm } from "@/hooks/auth/use-business-form";
import { useIndividualForm } from "@/hooks/auth/use-individual-form";

import {
  FieldConfig,
  getIndividualFormFieldsConfig,
  getBusinessFormFieldsConfig,
} from "./config/base-field.config";
import FormFieldRenderer from "./form-field-renderer";
import { IndividualFormData, BusinessFormData } from "./schema";

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
          <div className="!my-10 flex flex-row items-center gap-4">
            <div className="hidden w-[9.5rem] min-w-[9.5rem] sm:flex"></div>
            <InputWrapper
              label="Where did you find us?"
              className="h-fit p-4 text-black-70"
            >
              <RadioGroup
                value={form.watch("findUsId")?.toString() || ""}
                defaultValue="8"
                onValueChange={(value) =>
                  form.setValue("findUsId", parseInt(value))
                }
                className="flex flex-wrap items-center gap-6 p-4"
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

        <div className="mb-4 flex items-center gap-4">
          <div className="hidden w-[9.5rem] min-w-[9.5rem] sm:flex"></div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              onCheckedChange={(checked) => setters.setAgreeOnTerms(!!checked)}
            />
            <Label
              htmlFor="terms"
              className="text-sm font-medium leading-none text-black-70 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree with{" "}
              <Link
                href={ROUTES.LEGAL_TERMS}
                className="text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fyndr&apos;s terms of use
              </Link>{" "}
              &{" "}
              <Link
                href={ROUTES.LEGAL_PRIVACY}
                className="text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Link>
            </Label>
          </div>
        </div>

        <div className="!mt-10 mb-4 flex items-center gap-4">
          <div className="hidden w-[9.5rem] min-w-[9.5rem] sm:flex"></div>
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
