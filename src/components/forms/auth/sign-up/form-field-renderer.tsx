import { RotateCw } from "lucide-react";
import React from "react";
import { Control, FieldPath, FieldValues, Path } from "react-hook-form";

import MobileVerificationModal from "@/app/(non-listing)/(auth)/sign-up/complete/_components/mobile-verification-modal";
import Button from "@/components/global/buttons";
import Input from "@/components/global/input";
import Select from "@/components/global/input/select";
import SelectCountry from "@/components/global/input/select-country";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { FieldConfig } from "./config/base-field.config";
import SearchableSelect from "./searchable-select";
import TagInput from "./tag-input";

// Make the interface generic
interface FormFieldRendererProps<T extends FieldValues> {
  config: FieldConfig<T>;
  control: Control<T>;
  states: any;
  setters: any;
  handlers: any;
  data: any;
}

// Make the component generic
const FormFieldRenderer = <T extends FieldValues>({
  config,
  control,
  states,
  setters,
  handlers,
  data,
}: FormFieldRendererProps<T>) => {
  const renderField = () => {
    switch (config.fieldType) {
      case "input":
        return (
          <FormField
            control={control}
            name={config.name as Path<T>}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
                  {config.label}{" "}
                  {config.required && <span className="text-red-600">*</span>}
                </FormLabel>
                <div className="flex w-full flex-col gap-1">
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder={config.placeholder}
                      disabled={config.disabled}
                      type={config.type}
                      onBlur={config.onBlur}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        );

      case "select":
        return (
          <FormField
            control={control}
            name={config.name as Path<T>}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
                  {config.label}{" "}
                  {config.required && <span className="text-red-600">*</span>}
                </FormLabel>
                <div className="flex w-full flex-col gap-1">
                  <FormControl>
                    <Select
                      value={field.value || undefined}
                      onValueChange={field.onChange}
                      options={config.options}
                      placeholder={config.placeholder}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        );

      case "searchableSelect":
        return (
          <FormField
            control={control}
            name={config.name as Path<T>}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
                  {config.label}{" "}
                  {config.required && <span className="text-red-600">*</span>}
                </FormLabel>
                <div className="flex w-full flex-col gap-1">
                  <FormControl>
                    <SearchableSelect
                      value={field.value || ""}
                      onValueChange={field.onChange}
                      options={config.options || []}
                      placeholder={config.placeholder}
                      disabled={config.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        );

      case "country":
        return (
          <FormField
            control={control}
            name={config.name as Path<T>}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
                  {config.label}{" "}
                  {config.required && <span className="text-red-600">*</span>}
                </FormLabel>
                <div className="flex w-full flex-col gap-1">
                  <FormControl>
                    <SelectCountry
                      placeholder={config.placeholder}
                      value={field.value}
                      onValueChange={config.onValueChange}
                      disabled={config?.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        );

      case "phone":
        return (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D] sm:hidden">
              {config.label}{" "}
              {config.required && <span className="text-red-600">*</span>}
            </FormLabel>
            <div className="flex w-full flex-row items-center gap-2">
              <FormField
                control={control}
                name={config.countryCodeField as FieldPath<T>}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <FormLabel className="paragraph-medium hidden w-40 min-w-40 text-base text-[#4D4D4D] sm:block">
                      {config.label}{" "}
                      {config.required && (
                        <span className="text-red-600">*</span>
                      )}
                    </FormLabel>
                    <div className="flex w-full flex-col gap-1">
                      <FormControl>
                        <Input {...field} className="w-20" disabled />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={config.name as Path<T>}
                render={({ field }) => (
                  <FormItem className="mt-2 flex w-full flex-row items-center gap-2">
                    <div className="flex w-full flex-col gap-1">
                      <FormControl>
                        <Input
                          {...field}
                          disabled={config.disabled}
                          placeholder={config.placeholder}
                          type={config.type}
                          leftNode={
                            <MobileVerificationModal
                              email={data.email || ""}
                              countryCode={control._getWatch(
                                "ctryCode" as FieldPath<T>
                              )}
                              phone={control._getWatch("phone" as FieldPath<T>)}
                              regMode={data.regMode || "classic"}
                              isBusiness={data.isBusiness || false}
                              onVerify={setters.setIsMobileVerified}
                              disabled={states.isMobileVerified}
                            >
                              <Button
                                variant="primary"
                                type="button"
                                className={`${states.isMobileVerified ? "cursor-not-allowed bg-green-500 hover:bg-green-500" : ""}`}
                              >
                                {states.isMobileVerified
                                  ? "Verified"
                                  : "Verify"}
                              </Button>
                            </MobileVerificationModal>
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                    {states.isMobileVerified && (
                      <div
                        onClick={() => setters.setIsMobileVerified(false)}
                        className="!m-0 cursor-pointer rounded-full bg-primary-500 p-2 text-white"
                      >
                        <RotateCw size={15} />
                      </div>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case "referral":
        return (
          <div className="w-full flex-row items-center gap-2">
            <FormField
              control={control}
              name={config.name as Path<T>}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
                    {config.label}
                  </FormLabel>
                  <div className="flex w-full flex-row items-center gap-2">
                    <div className="flex w-full flex-col gap-1">
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder={config.placeholder}
                          disabled={config.disabled}
                          leftNode={
                            <Button
                              variant="primary"
                              type="button"
                              onClick={handlers.handleVerifyCode}
                              className={`${states.isCodeVerified ? "cursor-not-allowed bg-green-500 hover:bg-green-500" : ""} disabled:cursor-not-allowed`}
                            >
                              {states.isVerifyingCode
                                ? "Verifying"
                                : states.isCodeVerified
                                  ? "Verified"
                                  : "Verify"}
                            </Button>
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                    {states.isCodeVerified && (
                      <div
                        onClick={() => setters.setIsCodeVerified(false)}
                        className="!m-0 w-fit cursor-pointer rounded-full bg-primary-500 p-2 text-white"
                      >
                        <RotateCw size={15} />
                      </div>
                    )}
                  </div>
                </FormItem>
              )}
            />
          </div>
        );

      case "tag":
        return (
          <FormField
            control={control}
            name={config.name as Path<T>}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
                  {config.label}{" "}
                  {config.required && <span className="text-red-600">*</span>}
                </FormLabel>
                <div className="flex w-full flex-col gap-1">
                  <FormControl>
                    <TagInput
                      value={field.value || []}
                      onChange={field.onChange}
                      placeholder={config.placeholder}
                      disabled={config.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        );

      default:
        return null;
    }
  };

  return renderField();
};

export default FormFieldRenderer;
