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
  /**
   * Whether to allow closing the modal when clicking outside
   * @default true
   */
  closeOnOutsideClick?: boolean;

  footerClassName?: string;
  headerClassName?: string;
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
      closeOnOutsideClick = true,
      footerClassName = "",
      headerClassName = "",
    },
    ref
  ) => {
    const [isControlledOpen, setIsControlledOpen] = useState(false);

    // Determine if we're using internal or external state
    const isOpen = open !== undefined ? open : isControlledOpen;

    // Handle state changes in a centralized way
    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        if (open === undefined) {
          setIsControlledOpen(newOpen);
        }
        if (onOpenChange) {
          onOpenChange(newOpen);
        }
      },
      [open, onOpenChange]
    );

    // Handle outside clicks
    const handleOutsideClick = useCallback(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (event: any) => {
        // If we're not allowing outside clicks or if loading, prevent closing
        if (!closeOnOutsideClick || primaryAction?.loading) {
          event.preventDefault();
        }
      },
      [closeOnOutsideClick, primaryAction?.loading]
    );

    // Close the modal explicitly (for close button)
    const handleClose = useCallback(() => {
      handleOpenChange(false);
    }, [handleOpenChange]);

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
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent
          ref={ref}
          className={cn(
            "p-0 max-h-[80vh] flex flex-col gap-0 rounded-10",
            contentClassName
          )}
          onPointerDownOutside={handleOutsideClick}
          onEscapeKeyDown={handleOutsideClick}
          {...customStyles}
        >
          <div className="flex items-start justify-between">
            {shouldShowHeader && (
              <DialogHeader
                className={`flex-1 border-b p-4 ${headerClassName}`}
              >
                {title && (
                  <DialogTitle className="h3-semibold font-medium text-secondary">
                    {title}
                  </DialogTitle>
                )}
                {description && (
                  <DialogDescription>{description}</DialogDescription>
                )}
              </DialogHeader>
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
                aria-label="Close"
              >
                {closeIcon || <X className="size-4" />}
              </button>
            )}
          </div>
          <div className="no-scrollbar flex-1 overflow-y-auto p-4">
            {children}
          </div>

          {shouldShowFooter && (
            <DialogFooter
              className={` flex  flex-col-reverse p-4 sm:flex-row sm:justify-end sm:space-x-2  ${footerClassName}`}
            >
              {secondaryAction && (
                <Button
                  variant={secondaryAction.variant || "outline"}
                  onClick={secondaryAction.onClick}
                  disabled={secondaryAction.disabled}
                  className={`btn-primary-outlined ${secondaryAction.className}`}
                >
                  {secondaryAction.label}
                </Button>
              )}
              {primaryAction && (
                <Button
                  variant={primaryAction.variant || "default"}
                  onClick={primaryAction.onClick}
                  disabled={primaryAction.disabled || primaryAction.loading}
                  className={`btn-primary ${primaryAction.className}`}
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
