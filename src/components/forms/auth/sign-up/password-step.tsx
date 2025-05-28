"use client";

import React, { useEffect, useTransition } from "react";
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
import { FormInput } from "../form-input";
import { useTimer } from "@/hooks/use-timer";
import { useRegistrationStore } from "@/zustand/stores/registration.store";
import { encryptPassword } from "@/lib/utils";
import toast from "@/components/global/toast";
import { getAccountAPI, onConfirmIdentity } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";
import { SignUpSchema } from "../schema";

const createPasswordSchema = (requireVerification: boolean) => {
  const baseSchema = SignUpSchema.pick({
    password: true,
  }).extend({
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." }),
  });

  const extendedSchema = requireVerification
    ? baseSchema.extend({
        verificationToken: z
          .string()
          .min(6, { message: "Verification token must have 6 digits" }),
      })
    : baseSchema;

  return extendedSchema.refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );
};

type BaseFormValues = {
  password: string;
  confirmPassword: string;
};

type ExtendedFormValues = BaseFormValues & {
  verificationToken: string;
};

type PasswordStepProps = {
  requireVerification: boolean;
};

const PasswordStep = ({ requireVerification }: PasswordStepProps) => {
  const [isPending, startTransition] = useTransition();
  const [isSendingToken, startSendingToken] = useTransition();
  const { timer, isActive, startTimer } = useTimer(30);

  const setData = useRegistrationStore((state) => state.setData);
  const email = useRegistrationStore((state) => state.email);
  const router = useRouter();

  useEffect(() => {
    if (requireVerification) {
      startTimer();
    }
  }, [requireVerification, startTimer]);

  const schema = createPasswordSchema(requireVerification);

  type FormValues = typeof requireVerification extends true
    ? ExtendedFormValues
    : BaseFormValues;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      ...(requireVerification
        ? ({ verificationToken: "" } as Partial<FormValues>)
        : {}),
    } as FormValues,
  });

  const handleSubmit = async (values: FormValues) => {
    const password = values.password;

    const verificationToken = requireVerification
      ? (values as ExtendedFormValues)?.verificationToken
      : "";

    startTransition(async () => {
      if (!email) {
        toast.error({ message: "Something went wrong!" });
        return;
      }

      if (requireVerification) {
        const { success, error } = await onConfirmIdentity({
          email,
          isBusiness: true,
          token: verificationToken,
        });

        if (!success && error) {
          toast.error({ message: error?.details?.message });
          return;
        }
      }

      const encryptedPassword = Array.from(
        await encryptPassword({ email, password })
      );

      setData({ pwd: encryptedPassword, password });

      router.push(ROUTES.SIGN_UP_COMPLETE);
    });
  };

  const handleResendToken = async () => {
    if (!email) {
      toast.error({ message: "Something went wrong!" });
      return;
    }
    startSendingToken(async () => {
      const { status, data } = await getAccountAPI({
        email: email,
        regMode: "classic",
        isBusiness: requireVerification,
      });

      if (!data && (status === 200 || status === 404)) {
        if (requireVerification) {
          toast.success({
            message: `Verification email sent to ${email}`,
          });
        }
        startTimer();
      } else {
        toast.error({
          message: "Something went wrong! Please try again later.",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 mt-8"
      >
        {requireVerification && (
          <FormField
            control={form.control}
            name={"verificationToken" as keyof FormValues}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-medium text-light-900 hidden">
                  Verification Token
                </FormLabel>
                <FormControl>
                  <FormInput
                    {...field}
                    placeholder="Verification Token"
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-medium text-light-900 hidden">
                Password
              </FormLabel>
              <FormControl>
                <FormInput
                  {...field}
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-medium text-light-900 hidden">
                Confirm Password
              </FormLabel>
              <FormControl>
                <FormInput
                  {...field}
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {requireVerification ? (
          <Button
            type="button"
            onClick={handleResendToken}
            className="text-base font-normal min-h-12 w-full rounded-[10px] bg-primary-500 px-4 py-3 !text-light-900 hover:bg-primary-500"
            disabled={isActive || isSendingToken}
          >
            {isSendingToken ? "Resending..." : "Resend Token"}{" "}
            {isActive ? <span>({timer}s)</span> : <></>}
          </Button>
        ) : (
          <></>
        )}
        <Button
          type="submit"
          disabled={isPending}
          className="text-base font-normal min-h-12 w-full rounded-[10px] bg-primary-500 px-4 py-3 !text-light-900 hover:bg-primary-500"
        >
          {isPending ? "Proceeding" : "Proceed"}
        </Button>
      </form>
    </Form>
  );
};

export default PasswordStep;
