import React from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Select from "@/components/global/input/select";
import SelectCountry from "@/components/global/input/select-country";
import Button from "@/components/global/buttons";
import { FieldConfig } from "./sign-up.types";
import { FormType, FormMode } from "./sign-up.types";
import { useFormGenerator } from "./useFormGenerator";

interface FieldRendererProps {
  config: FieldConfig;
  control: Control<any>;
  states?: any;
  handlers?: any;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({
  config,
  control,
  states,
  handlers,
}) => {
  if (config.hidden) return null;

  const renderInput = () => {
    switch (config.type) {
      case "input":
        return (
          <Input
            type={config.inputType || "text"}
            placeholder={config.placeholder}
            disabled={config.disabled}
          />
        );

      case "textarea":
        return (
          <Textarea
            placeholder={config.placeholder}
            rows={config.rows}
            disabled={config.disabled}
          />
        );

      case "select":
        return (
          <Select
            placeholder={config.placeholder}
            options={config.options!}
            disabled={config.disabled}
          />
        );

      case "country":
        return (
          <SelectCountry
            placeholder={config.placeholder}
            onValueChange={handlers?.handleCountryChange}
          />
        );

      case "phone":
        return (
          <div className="flex gap-2">
            <Input className="w-20" disabled />
            <Input
              placeholder={config.placeholder}
              disabled={config.disabled}
            />
          </div>
        );

      case "referral":
        return (
          <div className="flex gap-2">
            <Input placeholder={config.placeholder} />
            <Button type="button" onClick={handlers?.handleVerifyCode}>
              {states?.isVerifyingCode
                ? "Verifying"
                : states?.isCodeVerified
                  ? "Verified"
                  : "Verify"}
            </Button>
          </div>
        );

      default:
        return (
          <Input placeholder={config.placeholder} disabled={config.disabled} />
        );
    }
  };

  return (
    <FormField
      control={control}
      name={config.name}
      render={({ field }) => (
        <FormItem className="flex flex-row gap-4 items-center">
          <FormLabel className="w-40 min-w-40 text-base text-[#4D4D4D]">
            {config.label}{" "}
            {config.required && <span className="text-red-600">*</span>}
          </FormLabel>
          <div className="w-full flex flex-col gap-1">
            <FormControl>
              {React.cloneElement(renderInput(), {
                ...field,
                value: field.value || "",
              })}
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

interface FormGeneratorProps {
  formType: FormType;
  formMode: FormMode;
  initialData?: Partial<FormData>;
  onSubmit: (data: FormData) => void;
  className?: string;
}

export const FormGenerator: React.FC<FormGeneratorProps> = ({
  formType,
  formMode,
  initialData,
  onSubmit,
  className = "",
}) => {
  const { form, config, states, updateState, handlers } = useFormGenerator({
    formType,
    formMode,
    initialData,
    onSubmit,
  });

  return (
    <form onSubmit={handlers.handleSubmit} className={`space-y-6 ${className}`}>
      {config.fields.map((fieldConfig) => (
        <FieldRenderer
          key={fieldConfig.name}
          config={fieldConfig}
          control={form.control}
          states={states}
          handlers={handlers}
        />
      ))}

      <div className="flex items-center gap-4">
        <div className="w-40 min-w-40" />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting
            ? "Submitting..."
            : formMode === "registration"
              ? "Register"
              : "Update"}
        </Button>
      </div>
    </form>
  );
};
