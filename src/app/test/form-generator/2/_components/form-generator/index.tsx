import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { FieldRenderer } from "./field-renderer";
import { FormGeneratorProps } from "../../types/form.generator";
import { createFormSchema } from "../../utils/form-validations";

export const FormGenerator: React.FC<FormGeneratorProps> = ({
  fields,
  submitButtonText = "Submit",
  resetButtonText = "Reset",
  onSubmit,
  defaultValues = {},
  className,
  fieldClassName,
  buttonClassName,
  showSubmitButton = true,
  showResetButton = false,
}) => {
  const schema = createFormSchema(fields);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onFormSubmit = async (data: Record<string, unknown>) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  const onReset = () => {
    reset(defaultValues);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className={cn("space-y-6", className)}
    >
      {fields.map((field) => (
        <FieldRenderer
          key={field.name}
          field={field}
          control={control}
          register={register}
          errors={errors}
          className={fieldClassName}
          setValue={setValue}
          getValues={getValues}
        />
      ))}

      {(showSubmitButton || showResetButton) && (
        <div className="flex gap-4">
          {showSubmitButton && (
            <Button
              type="submit"
              disabled={isSubmitting}
              className={buttonClassName}
            >
              {isSubmitting ? "Submitting..." : submitButtonText}
            </Button>
          )}
          {showResetButton && (
            <Button
              type="button"
              variant="outline"
              onClick={onReset}
              className={buttonClassName}
            >
              {resetButtonText}
            </Button>
          )}
        </div>
      )}
    </form>
  );
};
