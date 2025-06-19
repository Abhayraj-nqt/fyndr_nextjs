import { Modal } from "@/components/global/modal";
import React from "react";
import { ADD_USER_FORM } from "./add-user-config";
import { createFormSchema } from "@/lib/utils/form-generator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldRenderer } from "@/components/global/form-generator/form-field-renderer";
import Button from "@/components/global/buttons";
// import { Button } from "@/components/ui/button";
interface AddUserProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

const AddUser = ({ onOpenChange, open }: AddUserProps) => {
  const {
    fields,
    onSubmit,
    submitButtonText,
    showResetButton,
    defaultValues = {},
  } = ADD_USER_FORM;

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

  return (
    <Modal onOpenChange={onOpenChange} open={open} title="Add User" width="60vw">
      <div className="flex flex-col max-h-[80vh]">
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="overflow-y-auto p-6 no-scrollbar"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field) => (
              <FormFieldRenderer
                key={field.name}
                field={field}
                control={control}
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
              />
            ))}
          </div>
          <div className="mt-6 flex justify-end">
          <Button variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : submitButtonText}
          </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddUser;
