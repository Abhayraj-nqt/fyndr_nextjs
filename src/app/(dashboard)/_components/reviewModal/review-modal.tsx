import React from "react";

import { Modal } from "@/components/global/modal";

type ReviewModalProps = {
  open: boolean;
  onOpenChange: (open:boolean) => void;
};

const ReviewModal = ({ open, onOpenChange }: ReviewModalProps) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Reviews">{"this is rievw modal"}</Modal>
  );
};

export default ReviewModal;
