// components/modals/calendar-consent-modal.tsx
"use client";

import { Calendar, Shield, Clock } from "lucide-react";
import React from "react";

import Button from "@/components/global/buttons";
import { Modal } from "@/components/global/modal";
import { requestCalendarConsent } from "@/lib/utils/calendar-consent";
import { useCalendarConsentStore } from "@/zustand/stores/calendar-consent.store";

interface CalendarConsentModalProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const CalendarConsentModal = ({
  onSuccess,
  onError,
}: CalendarConsentModalProps) => {
  const {
    isConsentModalOpen,
    isRequestingConsent,
    closeConsentModal,
    setRequestingConsent,
    setCalendarTokens,
  } = useCalendarConsentStore();

  const handleGrantAccess = async () => {
    try {
      setRequestingConsent(true);

      const tokens = await requestCalendarConsent({
        onSuccess: (tokens) => {
          const expiresAt = Date.now() + (tokens.expiresIn || 3600) * 1000;
          setCalendarTokens({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            expiresAt,
            scope: "calendar",
          });
          onSuccess?.();
        },
        onError: (error) => {
          setRequestingConsent(false);
          onError?.(error);
        },
      });
    } catch (error) {
      setRequestingConsent(false);
      onError?.(error as Error);
    }
  };

  const handleDecline = () => {
    closeConsentModal();
  };

  return (
    <Modal
      open={isConsentModalOpen}
      onOpenChange={(open) => !open && closeConsentModal()}
      title="Calendar Access Permission"
      closeOnOutsideClick={false}
      contentClassName="!max-w-md"
    >
      <div className="flex flex-col gap-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-blue-100">
            <Calendar className="size-8 text-blue-600" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            Connect Your Google Calendar
          </h3>
          <p className="mb-4 text-gray-600">
            To automatically add appointments to your calendar, we need
            permission to access your Google Calendar.
          </p>
        </div>

        {/* Benefits */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="size-5 shrink-0 text-green-600" />
            <span className="text-sm text-gray-700">
              Automatically add appointments to your calendar
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="size-5 shrink-0 text-green-600" />
            <span className="text-sm text-gray-700">
              Get reminders for upcoming appointments
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="size-5 shrink-0 text-green-600" />
            <span className="text-sm text-gray-700">
              Secure access with Google's OAuth
            </span>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-600">
            <strong>Privacy:</strong> We only access your calendar to add
            appointments. We never read, modify, or delete your existing events.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="primary"
            onClick={handleGrantAccess}
            disabled={isRequestingConsent}
            className="flex-1"
          >
            {isRequestingConsent ? (
              <>
                <div className="mr-2 size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Connecting...
              </>
            ) : (
              "Grant Access"
            )}
          </Button>
          <Button
            variant="primary-outlined"
            onClick={handleDecline}
            disabled={isRequestingConsent}
            className="flex-1"
          >
            Skip for Now
          </Button>
        </div>

        {/* Skip option */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            You can always enable calendar access later in your settings.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default CalendarConsentModal;
