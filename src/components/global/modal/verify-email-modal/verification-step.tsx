"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import {
  onConfirmIdentity,
  onSendEmailVerificationCode,
} from "@/actions/auth.actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useTimer } from "@/hooks/use-timer";

import Button from "../../buttons";
import Input from "../../input";
import toast from "../../toast";

type Props = {
  onNext: () => void;
  email: string;
  isBusiness: boolean;
  isEmailUpdated: boolean;
};
const schema = z.object({
  token: z.string().min(6, "Token must have 6 digits"),
});

const VerificationStep = ({
  onNext,
  email,
  isBusiness,
  isEmailUpdated,
}: Props) => {
  const { isActive, startTimer, timer } = useTimer(30);

  console.log({ email });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const handleResendToken = async () => {
    const { success, data, error } = await onSendEmailVerificationCode({
      payload: {
        email,
      },
    });

    if (!success) {
      toast.error({
        message: error?.details?.message || "Failed to send token",
      });
      return;
    }

    if (data) {
      startTimer();
      toast.success({
        message: "Verification code sent successfully",
      });
    }
  };

  const handleVerifyToken = async (token: string) => {
    const { success, data, error } = await onConfirmIdentity({
      payload: {
        email,
        token,
        isBusiness,
      },
    });

    if (!success) {
      toast.error({
        message: error?.details?.message || "Failed to verify token",
      });
      return;
    }

    if (data) {
      toast.success({
        message: isEmailUpdated
          ? "Your email has been verified, Please change your password!"
          : "Your email has been verified",
      });

      onNext();
    }
  };

  const handleSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    await handleVerifyToken(data.token);
  };

  useEffect(() => {
    startTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <FormField
              key={"token"}
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Enter verification token" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="body-3 text-black-50">
              Note: Once verified you cannot edit or change your email address.
            </p>
          </div>
          <div className="flex-center my-2 gap-2">
            <Button
              variant="primary"
              stdHeight
              stdWidth
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Verifying" : "Verify"}
            </Button>
            <Button
              variant="primary-outlined"
              stdHeight
              stdWidth
              onClick={handleResendToken}
              disabled={isActive}
              type="button"
            >
              {isActive ? `Resend Token in ${timer}s` : "Resend token"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VerificationStep;
