"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z, ZodType } from "zod";

import { FormInput } from "@/components/forms/auth/form-input";
import { toast } from "@/components/global/toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ROUTES from "@/constants/routes";
import { ActionResponse } from "@/types/global";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  formType,
}: AuthFormProps<T>) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = (await onSubmit(data)) as ActionResponse;

    if (result?.success) {
      toast.success({
        message:
          formType === "SIGN_IN"
            ? "Signed in successfully"
            : "Signed up successfully",
      });

      router.replace(ROUTES.CALLBACK_SIGN_IN);
    } else {
      toast.error({
        message: result.error?.message || "Something went wrong form",
      });
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-8 space-y-4"
      >
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-medium hidden text-white">
                  {field.name === "email"
                    ? "Email Address"
                    : field.name.charAt(0).toLowerCase() + field.name.slice(1)}
                </FormLabel>
                <FormControl>
                  <FormInput
                    type={field.name === "password" ? "password" : "text"}
                    {...field}
                    placeholder={`${field.name.charAt(0).toUpperCase() + field.name.slice(1)}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          disabled={form.formState.isSubmitting}
          className="mt-10 min-h-12 w-full rounded-[10px] bg-primary px-4 py-3 text-base font-normal !text-white hover:bg-primary"
        >
          {form.formState.isSubmitting
            ? buttonText === "Sign In"
              ? "Signing In..."
              : "Signing Up..."
            : buttonText}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;
