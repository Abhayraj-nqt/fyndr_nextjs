import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { FormData, FormMode, FormType } from "./sign-up.types";
import { getFormConfig } from "./formConfig";

interface UseFormGeneratorProps {
  formType: FormType;
  formMode: FormMode;
  initialData?: Partial<FormData>;
  onSubmit: (data: FormData) => void;
  customHandlers?: Record<string, () => void>;
}

export const useFormGenerator = ({
  formType,
  formMode,
  initialData = {},
  onSubmit,
  customHandlers = {},
}: UseFormGeneratorProps) => {
  const [states, setStates] = useState({
    isMobileVerified: false,
    isCodeVerified: false,
    agreeOnTerms: false,
    isVerifyingCode: false,
  });

  const config = getFormConfig(formType, formMode, initialData);

  const form = useForm({
    resolver: zodResolver(config.schema),
    defaultValues: config.defaultValues,
  });

  const updateState = (key: keyof typeof states, value: boolean) => {
    setStates((prev) => ({ ...prev, [key]: value }));
  };

  const handlers = {
    handleSubmit: form.handleSubmit((data) => {
      if (formMode === "registration" && !states.agreeOnTerms) {
        throw new Error("Please agree to terms and conditions");
      }
      onSubmit(data);
    }),
    ...customHandlers,
  };

  return { form, config, states, updateState, handlers };
};
