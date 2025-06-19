"use client";

import React, { ChangeEvent, useState, useTransition } from "react";

import {
  onSendMobileVerificationCode,
  onVerifyMobile,
} from "@/actions/auth.actions";
import Button from "@/components/global/buttons";
import Input from "@/components/global/input";
import { Modal } from "@/components/global/modal";
import toast from "@/components/global/toast";
import { useTimer } from "@/hooks/use-timer";
import { RegModeProps } from "@/types/global";

type Props = {
  children: React.ReactNode;
  countryCode: string;
  email: string;
  isBusiness: boolean;
  phone: string;
  regMode: RegModeProps;
  onVerify?: (verified: boolean) => void;
  disabled?: boolean;
};

const MobileVerificationModal = ({
  children,
  countryCode,
  email,
  isBusiness,
  phone,
  regMode,
  onVerify,
  disabled = false,
}: Props) => {
  const { timer, isActive, startTimer } = useTimer(45);
  const [isVerifyingMobile, startVerifyingMobile] = useTransition();
  const [isSendingCode, startSendingCode] = useTransition();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    resetStates();
  };

  const resetStates = () => {
    setModalOpen(false);
    setCode("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleVerifyMobile = async () => {
    if (code.length !== 6) {
      return toast.error({
        message: "Verification code should have 6 digits.",
      });
    }

    startVerifyingMobile(async () => {
      const { success, data, error } = await onVerifyMobile({
        payload: {
          countryCode,
          email,
          phone,
          verificationCode: code,
        },
      });

      if (!success || error) {
        toast.error({
          message: error?.details?.details || "Verification failed!",
        });
      }

      if (success && data) {
        toast.success({
          message: data.message,
        });

        handleModalClose();
      }

      if (onVerify) {
        onVerify(success);
      }
    });
  };

  const handleSendVerificationToken = async () => {
    if (disabled) return;

    if (!phone || phone.length !== 10) {
      toast.error({
        message: "Phone number should have 10 digits.",
      });
      return;
    }

    if (/^\d+$/.test(phone) === false) {
      toast.error({
        message: "Phone number should only contain digits.",
      });
      return;
    }

    startSendingCode(async () => {
      const { success, data, error } = await onSendMobileVerificationCode({
        payload: {
          countryCode,
          email,
          isBusiness,
          phone,
          registerMode: regMode,
        },
      });
      if (!success && error) {
        toast.error({
          message: `${error.details?.message || "Something went wrong!"}`,
        });
      } else if (success && data) {
        startTimer();
        toast.success({
          message: data.message,
        });

        handleModalOpen();
      }
    });
  };

  return (
    <>
      <div onClick={handleSendVerificationToken}>
        {isSendingCode ? (
          <Button type="button" variant="primary">
            Loading
          </Button>
        ) : (
          children
        )}
      </div>
      <Modal
        title={"Enter Token"}
        open={modalOpen}
        onOpenChange={(open) => {
          if (!open) handleModalClose();
        }}
        closeOnOutsideClick={false}
      >
        <div className="flex flex-col gap-4">
          <p>
            Enter the verification token received on your mobile number{" "}
            {countryCode}
            {phone}
          </p>
          <div>
            <Input
              placeholder="Enter verification code"
              value={code}
              onChange={handleChange}
              rightNode={
                <Button
                  onClick={handleSendVerificationToken}
                  type="button"
                  variant="primary"
                  disabled={isActive || isSendingCode || isVerifyingMobile}
                >
                  {isSendingCode
                    ? "Sending"
                    : isActive
                      ? `Resend (${timer}s)`
                      : "Resend"}
                </Button>
              }
            />
          </div>
          <Button
            stdHeight
            stdWidth
            variant="primary"
            onClick={handleVerifyMobile}
            type="button"
            className="mt-2"
            disabled={isVerifyingMobile || isSendingCode}
          >
            {isVerifyingMobile ? "Verifying" : "Verify"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default MobileVerificationModal;
