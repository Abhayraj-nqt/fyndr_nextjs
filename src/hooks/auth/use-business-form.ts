import {
  BusinessFormData,
  BusinessFormSchema,
} from "@/components/forms/auth/sign-up/schema";

import { useBaseRegistrationForm } from "./use-base-registration-form";
import { useBusinessTypes } from "../others";

export const useBusinessForm = ({
  onSubmit,
}: {
  onSubmit: (data: BusinessFormData & { isBusiness: boolean }) => void;
}) => {
  const { businessTypes, isLoading: businessTypesLoading } = useBusinessTypes();

  const baseHook = useBaseRegistrationForm<BusinessFormData>({
    schema: BusinessFormSchema,
    defaultValues: {
      bizName: "",
      bizType: "",
      website: "",
      tags: [],
      accountStatus: "ACTIVE" as const,
      addressLine1: "",
    },
    onSubmit,
    isBusiness: true,
  });

  const formattedBusinessTypes = businessTypes?.map((type) => {
    return {
      value: type.name,
      label: type.name,
    };
  });

  return {
    ...baseHook,
    states: {
      ...baseHook.states,
      businessTypesLoading,
    },
    data: {
      ...baseHook.data,
      businessTypes: formattedBusinessTypes || [],
    },
  };
};
