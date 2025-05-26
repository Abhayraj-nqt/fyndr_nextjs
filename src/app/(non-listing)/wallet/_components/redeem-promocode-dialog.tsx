"use client";

import { useState } from "react";

// import { onRedeemPromoCode } from "@/actions/promocode.action";
import { Modal } from "@/components/global/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/auth";

type Props = {
  children?: React.ReactNode;
};

const RedeemPromocodeDialog = ({ children }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { user, isLoading, error } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;
  if (!user) return <div>Please sign in</div>;
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
        <div className="mt-4 flex gap-2">
          {/* <form action={onRedeemPromoCode}> */}
          <Input placeholder="Enter Promo Code" />
          <Button className="btn-primary">Verify</Button>
          {/* </form> */}
          <Button className="btn-primary-outlined" onClick={handleModalClose}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default RedeemPromocodeDialog;
