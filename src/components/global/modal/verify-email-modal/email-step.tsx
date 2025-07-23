"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PencilLine } from "lucide-react";
import React, { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import {
  onSendEmailVerificationCode,
  onUpdateEmail,
} from "@/actions/auth.actions";
import { BaseUserSchema } from "@/components/forms/auth/sign-up/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import Button from "../../buttons";
import Input from "../../input";
import toast from "../../toast";

type Props = {
  email: string;
  indvId: number;
  onUpdate: (newEmail: string) => void;
  onNext: () => void;
  onCancel: () => void;
};

const schema = BaseUserSchema.pick({ email: true });

const EmailStep = ({ email, indvId, onNext, onCancel, onUpdate }: Props) => {
  const [emailDisabled, setEmailDisabled] = useState<boolean>(true);
  const [updating, startUpdating] = useTransition();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email,
    },
    reValidateMode: "onBlur",
  });

  const handleCancel = () => {
    onCancel();
  };

  const handleUpdate = async (email: string) => {
    startUpdating(async () => {
      const isValid = await form.trigger("email");

      if (!isValid) {
        return;
      }

      const { success, data, error } = await onUpdateEmail({
        params: {
          indvId,
        },
        payload: {
          email,
        },
      });

      if (!success) {
        toast.error({
          message: error?.details?.message || "Failed to update email",
        });
        return;
      }

      if (data) {
        toast.success({
          message: `Your email has been successfully updated to ${email}`,
        });

        setEmailDisabled(true);
        onUpdate(email);
      }
    });
  };

  const handleSendVerificationToken = async (email: string) => {
    const { success, data, error } = await onSendEmailVerificationCode({
      payload: {
        email,
      },
    });

    if (!success) {
      toast.error({
        message: error?.details?.message || "Failed to send verification code.",
      });
      return;
    }

    if (data) {
      toast.success({
        message: "Verification code sent successfully.",
      });
      onNext();
    }
  };

  const handleSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    await handleSendVerificationToken(data.email);
  };

  return (
    <div className="flex w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <FormField
              key={"email"}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your email"
                      rightNode={
                        <PencilLine
                          size={20}
                          className="mr-3 cursor-pointer text-black-60"
                          onClick={() => setEmailDisabled(false)}
                        />
                      }
                      disabled={emailDisabled}
                    />
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
            {!emailDisabled ? (
              <Button
                variant="primary"
                stdHeight
                stdWidth
                onClick={async () => {
                  const email = form.getValues("email");
                  await handleUpdate(email);
                }}
                type="button"
                disabled={updating}
              >
                {updating ? "Updating" : "Update"}
              </Button>
            ) : (
              <Button
                variant="primary"
                stdHeight
                className="w-72"
                disabled={form.formState.isSubmitting}
                type="submit"
              >
                {form.formState.isSubmitting
                  ? "Sending Verification Token"
                  : "Send Verification Token"}
              </Button>
            )}
            <Button
              variant="primary-outlined"
              stdHeight
              stdWidth
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmailStep;
