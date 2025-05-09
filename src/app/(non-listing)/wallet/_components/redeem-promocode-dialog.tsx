"use client";

import { useState } from "react";

import { Modal } from "@/components/global/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  children?: React.ReactNode;
};

const RedeemPromocodeDialog = ({ children }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <>
      <div onClick={handleModalOpen}>{children}</div>
      <Modal
        title={"Redeem Promocode"}
        open={modalOpen}
        onOpenChange={(open) => {
          if (!open) handleModalClose();
        }}
      >
        <Input placeholder="Enter Promo Code" />

        <div className="mt-4 flex gap-2">
          <Button className="btn-primary">Verify</Button>
          <Button className="btn-primary-outlined" onClick={handleModalClose}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default RedeemPromocodeDialog;
