"use client";

import { CheckCircle, XCircle, AlertCircle, InfoIcon } from "lucide-react";
import { ReactNode } from "react";
import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner";

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface ToastProps {
  message: string;
  description?: string;
  duration?: number;
  position?: ToastPosition;
  onClose?: () => void;
}

interface ToasterProps {
  position?: ToastPosition;
  duration?: number;
  closeButton?: boolean;
}

interface ToastContentStyle {
  icon: ReactNode;
  background: string;
  border: string;
}

export function Toaster({
  position = "top-right",
  duration = 3000,
  closeButton = true,
}: ToasterProps = {}) {
  return (
    <SonnerToaster
      position={position}
      toastOptions={{
        duration,
        className: "ant-toast-custom",
        style: {
          fontSize: "14px",
          borderRadius: "10px",
          paddingInline: "16px",
          paddingBlock: "10px",
          boxShadow:
            "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
        },
      }}
      closeButton={closeButton}
    />
  );
}

// Toast styling constants
const TOAST_STYLES: Record<string, ToastContentStyle> = {
  success: {
    icon: <CheckCircle className="size-5 text-[#52c41a]" />,
    background: "#f6ffed",
    border: "1px solid #b7eb8f",
  },
  error: {
    icon: <XCircle className="size-5 text-[#ff4d4f]" />,
    background: "#fff2f0",
    border: "1px solid #ffccc7",
  },
  warning: {
    icon: <AlertCircle className="size-5 text-[#faad14]" />,
    background: "#fffbe6",
    border: "1px solid #ffe58f",
  },
  info: {
    icon: <InfoIcon className="size-5 text-[#1677ff]" />,
    background: "#e6f4ff",
    border: "1px solid #91caff",
  },
};

export const toast = {
  // Success toast
  success: ({
    message,
    description,
    duration = 3000,
    position,
    onClose,
  }: ToastProps): string | number => {
    return sonnerToast(message, {
      duration,
      position,
      onDismiss: onClose,
      icon: TOAST_STYLES.success.icon,
      style: {
        background: TOAST_STYLES.success.background,
        border: TOAST_STYLES.success.border,
        color: "#000000d9",
      },
      description,
    });
  },

  // Error toast
  error: ({
    message,
    description,
    duration = 3000,
    position,
    onClose,
  }: ToastProps): string | number => {
    return sonnerToast(message, {
      duration,
      position,
      onDismiss: onClose,
      icon: TOAST_STYLES.error.icon,
      style: {
        background: TOAST_STYLES.error.background,
        border: TOAST_STYLES.error.border,
        color: "#000000d9",
      },
      description,
    });
  },

  // Warning toast
  warning: ({
    message,
    description,
    duration = 3000,
    position,
    onClose,
  }: ToastProps): string | number => {
    return sonnerToast(message, {
      duration,
      position,
      onDismiss: onClose,
      icon: TOAST_STYLES.warning.icon,
      style: {
        background: TOAST_STYLES.warning.background,
        border: TOAST_STYLES.warning.border,
        color: "#000000d9",
      },
      description,
    });
  },

  // Info toast
  info: ({
    message,
    description,
    duration = 3000,
    position,
    onClose,
  }: ToastProps): string | number => {
    return sonnerToast(message, {
      duration,
      position,
      onDismiss: onClose,
      icon: TOAST_STYLES.info.icon,
      style: {
        background: TOAST_STYLES.info.background,
        border: TOAST_STYLES.info.border,
        color: "#000000d9",
      },
      description,
    });
  },

  // Loading toast
  loading: ({
    message,
    description,
    duration = Infinity,
    position,
    onClose,
  }: ToastProps): string | number => {
    return sonnerToast.loading(message, {
      description,
      duration,
      position,
      onDismiss: onClose,
    });
  },

  // Dismiss specific or all toasts
  dismiss: (toastId?: string | number) => {
    sonnerToast.dismiss(toastId);
  },
};

export default toast;
