// src/components/ui/modal/modal.tsx
"use client";

import { X } from "lucide-react";
import { ReactNode, forwardRef, useCallback, useState } from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type BaseModalProps = {
  /**
   * Controls whether the modal is open
   */
  open?: boolean;
  /**
   * Callback fired when open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Modal body content
   */
  children: ReactNode;
  /**
   * Whether to show a close button in the top right corner
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Custom close icon to replace the default X icon
   */
  closeIcon?: ReactNode;
  /**
   * Additional classes for the modal content
   */
  contentClassName?: string;
  /**
   * Custom width for the modal (e.g. "500px", "30rem", "50%")
   */
  width?: string;
};

type TriggeredModalProps = BaseModalProps & {
  /**
   * Element that triggers the modal
   */
  trigger: ReactNode;
};

type ModalWithTitleProps = {
  /**
   * Modal title
   */
  title?: ReactNode;
  /**
   * Modal description
   */
  description?: ReactNode;
  /**
   * Whether to show the header with title and description
   * @default true when title is provided
   */
  showHeader?: boolean;
};

type ModalWithActionsProps = {
  /**
   * Primary action button
   */
  primaryAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
    variant?: ButtonProps["variant"];
    className?: string;
  };
  /**
   * Secondary action button
   */
  secondaryAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    variant?: ButtonProps["variant"];
    className?: string;
  };
  /**
   * Whether to show the footer with action buttons
   * @default true when actions are provided
   */
  showFooter?: boolean;
  /**
   * Additional footer content
   */
  footerContent?: ReactNode;
};

/**
 * Reusable modal component built on shadcn/ui Dialog
 */
export type ModalProps = BaseModalProps &
  Partial<TriggeredModalProps> &
  ModalWithTitleProps &
  ModalWithActionsProps;

/**
 * Modal component with standardized header, content, and footer sections
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onOpenChange,
      title,
      description,
      showHeader,
      primaryAction,
      secondaryAction,
      showFooter,
      footerContent,
      children,
      trigger,
      showCloseButton = true,
      closeIcon,
      contentClassName,
      width,
    },
    ref
  ) => {
    const [isControlledOpen, setIsControlledOpen] = useState(false);

    // Determine if we're using internal or external state
    const isOpen = open !== undefined ? open : isControlledOpen;
    const setIsOpen = useCallback(
      (newOpen: boolean) => {
        if (open === undefined) {
          setIsControlledOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [open, onOpenChange]
    );

    // Determine whether to show header based on props
    const shouldShowHeader =
      showHeader !== undefined ? showHeader : Boolean(title || description);

    // Determine whether to show footer based on props
    const shouldShowFooter =
      showFooter !== undefined
        ? showFooter
        : Boolean(primaryAction || secondaryAction || footerContent);

    // Create style object for custom width if provided
    const customStyles = width ? { style: { width, maxWidth: "100vw" } } : {};

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent
          ref={ref}
          className={cn("p-0 gap-0 rounded-10", contentClassName)}
          onInteractOutside={(e) => {
            // Prevent closing on outside click during loading state
            if (primaryAction?.loading) {
              e.preventDefault();
            }
          }}
          {...customStyles}
        >
          <div className="flex items-start justify-between">
            {shouldShowHeader && (
              <DialogHeader className="flex-1 border-b p-4">
                {title && (
                  <DialogTitle className="h3-semibold text-primary-900">
                    {title}
                  </DialogTitle>
                )}
                {description && (
                  <DialogDescription>{description}</DialogDescription>
                )}
              </DialogHeader>
            )}
            {showCloseButton && (
              <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
                {closeIcon || <X className="size-4" />}
                <span className="sr-only">Close</span>
              </DialogClose>
            )}
          </div>
          <div className="p-4">{children}</div>
          {shouldShowFooter && (
            <DialogFooter className="flex flex-col-reverse p-4 sm:flex-row sm:justify-end sm:space-x-2">
              {secondaryAction && (
                <Button
                  variant={secondaryAction.variant || "outline"}
                  onClick={secondaryAction.onClick}
                  disabled={secondaryAction.disabled}
                  className={secondaryAction.className}
                >
                  {secondaryAction.label}
                </Button>
              )}
              {primaryAction && (
                <Button
                  variant={primaryAction.variant || "default"}
                  onClick={primaryAction.onClick}
                  disabled={primaryAction.disabled || primaryAction.loading}
                  className={primaryAction.className}
                >
                  {primaryAction.loading ? "Loading..." : primaryAction.label}
                </Button>
              )}
              {footerContent}
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  }
);

Modal.displayName = "Modal";
