"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { onResetPassword } from "@/actions/auth.actions";
import { FormInput } from "@/components/forms/auth/form-input";
import { BaseUserSchema } from "@/components/forms/auth/sign-up/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { encryptPassword } from "@/lib/utils/auth";

import Button from "../../buttons";
import toast from "../../toast";

const schema = BaseUserSchema.pick({ password: true })
  .extend({
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type Props = {
  email: string;
  onNext: () => void;
};

const PasswordStep = ({ email, onNext }: Props) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const handleUpdatePassword = async (password: string) => {
    const encryptedPassword = Array.from(
      await encryptPassword({ email, password })
    );

    const { success, data, error } = await onResetPassword({
      payload: {
        email,
        pwd: encryptedPassword,
      },
    });

    if (!success) {
      toast.error({
        message: error?.details?.message || "Failed to reset password",
      });
      return;
    }

    if (data) {
      toast.success({
        message: "Password updated successfully",
      });
      onNext();
    }
  };

  const handleSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    await handleUpdatePassword(data.password);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <p className="body-3 text-black-50">
        After updating your email address, a password reset is necessary.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <FormField
              key={"password"}
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="password"
                      placeholder="Create new password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              key={"confirmPassword"}
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="password"
                      placeholder="Confirm password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-center gap-2">
            <Button
              variant="primary"
              stdHeight
              stdWidth
              type="submit"
              disabled={form.formState.isSubmitting}
              className="my-2"
            >
              {form.formState.isSubmitting ? "Saving" : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PasswordStep;
