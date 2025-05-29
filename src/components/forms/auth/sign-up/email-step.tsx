"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getAccountAPI } from "@/actions/auth.actions";
import toast from "@/components/global/toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRegistrationStore } from "@/zustand/stores/registration.store";

import { FormInput } from "../form-input";
import { BaseUserSchema } from "./schema";

const EmailSchema = BaseUserSchema.pick({
  email: true,
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

      const { status, success, data, error } = await getAccountAPI({
        email: values.email,
        regMode: "classic",
        isBusiness: userType === "business",
      });

      console.log({ status, success, data, error });

      if (!data && (status === 200 || status === 404)) {
        if (userType === "business") {
          toast.success({
            message: `Verification email sent to ${values.email}`,
          });
        }

        onNextStep();
      } else if (success && status === 200 && data) {
        toast.error({
          message: `This email address is already associated with an account. Please use a different email address to register.`,
        });
      } else {
        toast.error({
          message: error?.details?.message || "Something went wrong!",
        });
      }
    });
  };

  return (
    <>
      <div className="my-6 text-center text-lg font-medium">
        Register as {userType === "business" ? "a Business" : "an Individual"}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-medium hidden text-light-900">
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
            className="min-h-12 w-full rounded-[10px] bg-primary-500 px-4 py-3 text-base font-normal !text-light-900 hover:bg-primary-500"
          >
            {isPending ? "Proceeding" : "Proceed"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EmailStep;
