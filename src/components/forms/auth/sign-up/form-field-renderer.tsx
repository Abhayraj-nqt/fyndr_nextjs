import React from "react";
import { Control, FieldPath, FieldValues, Path } from "react-hook-form";
import { RotateCw } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Button from "@/components/global/buttons";
import Input from "@/components/global/input";
import Select from "@/components/global/input/select";
import SelectCountry from "@/components/global/input/select-country";
import MobileVerificationModal from "@/app/(non-listing)/(auth)/sign-up/complete/_components/mobile-verification-modal";
import { FieldConfig } from "./config/base-field.config";
import TagInput from "./tag-input";
import SearchableSelect from "./searchable-select";

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
              <FormItem className="flex sm:flex-row flex-col gap-2 sm:items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                  {config.label}{" "}
                  {config.required && <span className="text-red-600">*</span>}
                </FormLabel>
                <div className="w-full flex flex-col gap-1">
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
              <FormItem className="flex sm:flex-row flex-col gap-2 sm:items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                  {config.label}{" "}
                  {config.required && <span className="text-red-600">*</span>}
                </FormLabel>
                <div className="w-full flex flex-col gap-1">
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
              <FormItem className="flex sm:flex-row flex-col gap-2 sm:items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                  {config.label}{" "}
                  {config.required && <span className="text-red-600">*</span>}
                </FormLabel>
                <div className="w-full flex flex-col gap-1">
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
              <FormItem className="flex sm:flex-row flex-col gap-2 sm:items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                  {config.label}{" "}
                  {config.required && <span className="text-red-600">*</span>}
                </FormLabel>
                <div className="w-full flex flex-col gap-1">
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
          <div className="flex sm:flex-row flex-col gap-2 sm:items-center">
            <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base sm:hidden">
              {config.label}{" "}
              {config.required && <span className="text-red-600">*</span>}
            </FormLabel>
            <div className="flex flex-row gap-2 items-center w-full">
              <FormField
                control={control}
                name={config.countryCodeField as FieldPath<T>}
                render={({ field }) => (
                  <FormItem className="flex sm:flex-row flex-col gap-2 sm:items-center">
                    <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base hidden sm:block">
                      {config.label}{" "}
                      {config.required && (
                        <span className="text-red-600">*</span>
                      )}
                    </FormLabel>
                    <div className="w-full flex flex-col gap-1">
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
                  <FormItem className="flex flex-row gap-2 items-center mt-2 w-full">
                    <div className="w-full flex flex-col gap-1">
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
                                className={`${states.isMobileVerified ? "bg-green-500 hover:bg-green-500 cursor-not-allowed" : ""}`}
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
                        className="p-2 rounded-full bg-primary-500 text-white cursor-pointer !m-0"
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
          <div className="flex-row gap-2 items-center w-full">
            <FormField
              control={control}
              name={config.name as Path<T>}
              render={({ field }) => (
                <FormItem className="flex sm:flex-row flex-col gap-2 sm:items-center">
                  <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                    {config.label}
                  </FormLabel>
                  <div className="w-full flex flex-row gap-2 items-center">
                    <div className="w-full flex flex-col gap-1">
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
                              className={`${states.isCodeVerified ? "bg-green-500 hover:bg-green-500 cursor-not-allowed" : ""} disabled:cursor-not-allowed`}
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
                        className="p-2 rounded-full bg-primary-500 text-white cursor-pointer !m-0 w-fit"
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
              <FormItem className="flex sm:flex-row flex-col gap-2 sm:items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                  {config.label}{" "}
                  {config.required && <span className="text-red-600">*</span>}
                </FormLabel>
                <div className="w-full flex flex-col gap-1">
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
