"use client";

import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useUser } from "@/hooks/auth";

import { Modal } from "..";
import EmailStep from "./email-step";
import PasswordStep from "./password-step";
import SignInStep from "./sign-in-step";
import VerificationStep from "./verification-step";

type Props = {
  onVerify?: () => void;
  trigger: React.ReactNode;
};

type ModalStep = 1 | 2 | 3 | 4;

const VerifyEmailModal = ({ onVerify, trigger }: Props) => {
  const { data: session, update } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<ModalStep>(1);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [isEmailUpdated, setIsEmailUpdated] = useState(false);

  // Use the hook with the pending email if it exists
  const { user, isLoading, error, updateUserWithEmail, refetch } = useUser({
    email: pendingEmail,
    // syncWithStore: false,
  });

  const effectiveEmail = useMemo(() => {
    return pendingEmail || user?.email || session?.user?.email || "";
  }, [pendingEmail, user?.email, session?.user?.email]);

  const resetState = useCallback(() => {
    setStep(1);
    setPendingEmail(null);
    setIsEmailUpdated(false);
  }, []);

  const handleModalChange = useCallback(
    (open: boolean) => {
      setModalOpen(open);
      if (!open) {
        resetState();
      }
    },
    [resetState]
  );

  const handleEmailUpdate = useCallback(
    async (newEmail: string) => {
      try {
        setIsEmailUpdated(true);
        setPendingEmail(newEmail);

        // Fetch user data with the new email
        await updateUserWithEmail(newEmail);
        await update({
          user: {
            ...session?.user,
            email: newEmail,
          },
        });

        console.log("Email updated successfully:", newEmail);
      } catch (error) {
        console.error("Failed to update email:", error);
        // Reset state on error
        setIsEmailUpdated(false);
        setPendingEmail(null);
      }
    },
    [session?.user, update, updateUserWithEmail]
  );

  useEffect(() => {
    console.log({ session });
  }, [session]);

  const handleNextStep = useCallback(() => {
    setStep(2);
  }, []);

  const handleCancel = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleVerificationNext = useCallback(async () => {
    if (isEmailUpdated) {
      setStep(3);
    } else {
      setStep(4);
      await refetch();
    }
  }, [isEmailUpdated, refetch]);

  const handlePasswordNext = useCallback(() => {
    console.log("Password step completed");
    onVerify?.();
    setStep(4);
  }, [onVerify]);

  const getModalTitle = useCallback((): string => {
    switch (step) {
      case 3:
        return "Reset Password";
      case 4:
        return isEmailUpdated ? "Sign-in to continue" : "Email Verified";
      default:
        return "Verify Email";
    }
  }, [isEmailUpdated, step]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("User fetch error:", error);
    return <div>Error loading user data</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <EmailStep
            email={effectiveEmail}
            indvId={user.indvid}
            onNext={handleNextStep}
            onCancel={handleCancel}
            onUpdate={handleEmailUpdate}
          />
        );

      case 2:
        return (
          <VerificationStep
            email={effectiveEmail}
            isBusiness={Boolean(user?.isBusiness)}
            isEmailUpdated={isEmailUpdated}
            onNext={handleVerificationNext}
          />
        );

      case 3:
        return (
          <PasswordStep email={effectiveEmail} onNext={handlePasswordNext} />
        );

      case 4:
        return (
          <SignInStep
            isEmailUpdated={isEmailUpdated}
            onClose={() => setModalOpen(false)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      trigger={trigger}
      open={modalOpen}
      onOpenChange={handleModalChange}
      title={<p>{getModalTitle()}</p>}
      width="690px"
      closeOnOutsideClick={false}
      showCloseButton={false}
    >
      {renderStep()}
    </Modal>
  );
};

export default VerifyEmailModal;
