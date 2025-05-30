"use client";

import Image from "next/image";
import React from "react";

import { Modal } from "@/components/global/modal";
import { AdminUserProps } from "@/types/api-response/user.response";

interface ActionsDialogProps {
  row: AdminUserProps | null;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

const ActionsDialog = ({ row, onOpenChange, open }: ActionsDialogProps) => {
  return (
    <>
      <Modal onOpenChange={onOpenChange} open={open} title={"Actions"}>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            {row?.businessLogo ? (
              <Image
                src={row?.businessLogo || "/images/fyndr-placeholder-gray.svg"}
                alt="business-logo"
                height={50}
                width={50}
                className="size-10 rounded-lg"
              />
            ) : (
              <></>
            )}
            <div>
              <p>Business name: {row?.businessName}</p>
              <p>User name: {row?.name}</p>
            </div>
          </div>

          <div className="flex">
            <div className="flex w-1/2 flex-col flex-nowrap gap-2">
              <div>Login</div>
              <div>Update Status</div>
              <div>Check Stripe Status</div>
            </div>
            <div className="flex w-1/2 flex-col flex-nowrap gap-2 pl-6">
              <div>Update Email Address</div>
              <div>Update Business Name</div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ActionsDialog;
