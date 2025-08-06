import {
  IndividualFormData,
  IndividualFormSchema,
} from "@/components/forms/auth/sign-up/schema";

import { useBaseRegistrationForm } from "./use-base-registration-form";

export const useIndividualForm = ({
  onSubmit,
}: {
  onSubmit: (data: IndividualFormData & { isBusiness: boolean }) => void;
}) => {
  return useBaseRegistrationForm({
    schema: IndividualFormSchema,
    defaultValues: {
      yob: null,
      gender: null,
    },
    onSubmit,
    isBusiness: false,
  });
};
