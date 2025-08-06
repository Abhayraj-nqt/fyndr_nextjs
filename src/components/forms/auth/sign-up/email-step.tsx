"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { onGetAccount } from "@/actions/auth.actions";
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
import SocialAuthForm from "../social-auth-form";

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

      const { status, success, data, error } = await onGetAccount({
        payload: {
          email: values.email,
          regMode: "classic",
          isBusiness: userType === "business",
        },
      });

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
                <FormLabel className="paragraph-medium hidden text-white">
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
          <div className="flex-center gap-2 ">
            <Button
              type="submit"
              disabled={isPending}
              className="min-h-12 w-full !rounded-10 bg-primary px-4 py-3 text-base font-normal !text-white hover:bg-primary"
            >
              {isPending ? "Proceeding" : "Proceed"}
            </Button>
            <span className="body-3 text-black-30">Or</span>
            <SocialAuthForm formType="SIGN_UP" />
          </div>
        </form>
      </Form>
    </>
  );
};

export default EmailStep;
