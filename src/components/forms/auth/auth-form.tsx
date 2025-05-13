"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";
import { toast } from "@/hooks/use-toast";
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
      toast({
        title: "Success",
        description:
          formType === "SIGN_IN"
            ? "Signed in successfully"
            : "Signed up successfully",
      });

      router.replace(ROUTES.CALLBACK_SIGN_IN);
    } else {
      toast({
        title: `Error ${result?.status}`,
        description: result?.error?.message,
        variant: "destructive",
      });
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <div className="w-full rounded-lg bg-dark-100 p-8 md:w-3/4 md:max-w-lg ">
      <h1 className="h1-bold">Login to Continue</h1>
      <div className="paragraph-regular">
        <span>Don&apos;t have an account?</span>
        <Button
          asChild
          variant={"ghost"}
          className="bg-transparent p-2 text-primary-500 underline hover:bg-transparent hover:text-primary-500"
        >
          <Link href={ROUTES.SIGN_UP}>Sign up</Link>
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-8 space-y-6"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="paragraph-medium text-light-900">
                    {field.name === "email"
                      ? "Email Address"
                      : field.name.charAt(0).toLowerCase() +
                        field.name.slice(1)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={field.name === "password" ? "password" : "text"}
                      {...field}
                      className="paragraph-regular no-focus min-h-12 rounded-lg border bg-light-900 text-dark-100"
                      placeholder={`Enter your ${field.name}`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            disabled={form.formState.isSubmitting}
            className="paragraph-medium min-h-12 w-full rounded-2 bg-primary-500 px-4 py-3 font-inter !text-light-900 hover:bg-primary-500"
          >
            {form.formState.isSubmitting
              ? buttonText === "Sign In"
                ? "Signing In..."
                : "Signing Up..."
              : buttonText}
          </Button>
        </form>
      </Form>
      <div className="body-regular mt-2 text-center">
        <span>Forgot your password?</span>
        <Button
          asChild
          variant={"ghost"}
          className="bg-transparent p-2 text-primary-500 underline hover:bg-transparent hover:text-primary-500"
        >
          <Link href={ROUTES.RESET_PASSWORD}>Reset Password</Link>
        </Button>
      </div>
    </div>
  );
};

export default AuthForm;
