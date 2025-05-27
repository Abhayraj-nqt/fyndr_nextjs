"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormInput } from "./form-input";
import { useRegistrationStore } from "@/zustand/stores/registration.store";
import toast from "@/components/global/toast";
import { getAccountAPI } from "@/actions/auth.actions";

const EmailSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),
});

type EmailStepProps = {
  userType: "business" | "individual";
  onNextStep: () => void;
};

const EmailStep = ({ userType, onNextStep }: EmailStepProps) => {
  const [isPending, startTransition] = useTransition();
  const setData = useRegistrationStore((state) => state.setData);

  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof EmailSchema>) => {
    startTransition(async () => {
      setData({
        email: values.email,
        isBusiness: userType === "business",
        regMode: "classic",
      });

      if (userType === "business") {
        const { status, success, data, error, headers } = await getAccountAPI({
          email: values.email,
          regMode: "classic",
          isBusiness: true,
        });

        console.log({ status, success, data, error, headers });

        if (success && status === 200) {
          toast.error({
            message: `This email address is already associated with an account. Please use a different email address to register.`,
          });
        }

        if (!success && status === 404) {
          toast.success({
            message: `Verification email sent to ${values.email}`,
          });

          onNextStep();
        }
      } else {
        onNextStep();
      }
    });
  };

  return (
    <>
      <div className="text-lg font-medium my-6 text-center">
        Register as {userType === "business" ? "a Business" : "an Individual"}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-medium text-light-900 hidden">
                  Email Address
                </FormLabel>
                <FormControl>
                  <FormInput
                    {...field}
                    placeholder="Email"
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending}
            className="text-base font-normal min-h-12 w-full rounded-[10px] bg-primary-500 px-4 py-3 !text-light-900 hover:bg-primary-500"
          >
            {isPending ? "Proceeding" : "Proceed"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EmailStep;
