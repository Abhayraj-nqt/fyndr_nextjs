"use client";

import React from "react";

import Button from "@/components/global/buttons";
import { Modal } from "@/components/global/modal";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
};

const LocationChangeWarningModal = ({
  onCancel,
  onConfirm,
  onOpenChange,
  open,
}: Props) => {
  return (
    <Modal
      title={<div>Warning</div>}
      open={open}
      onOpenChange={(open) => onOpenChange(open)}
      closeOnOutsideClick={false}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="body-1-medium text-black-80">
            Do you want to change location?
          </div>
          <div className="body-3 text-black-80">
            Changing location will delete all the scheduled appointments in your
            cart.
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" stdHeight stdWidth onClick={onConfirm}>
            Confirm
          </Button>
          <Button
            variant="primary-outlined"
            stdHeight
            stdWidth
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LocationChangeWarningModal;
