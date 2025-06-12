"use client";

import Select from "@/app/test/input/_components/select";
import { Modal } from "@/components/global/modal";
import Button from "@/components/global/buttons";
import { AdminUserProps } from "@/types/api-response/user.response";
import { updateBusinessName, updateStatus } from "@/actions/admin.actions";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Input from "@/components/global/input";

interface ActionsDialogProps {
  row: AdminUserProps | null;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

const statusOptions = [
  { value: "ACTIVE", label: "ACTIVE" },
  { value: "INACTIVE", label: "INACTIVE" },
  { value: "DELETED", label: "DELETED" },
  { value: "SUSPENDED", label: "SUSPENDED" },
];

const ActionsDialog = ({ row, onOpenChange, open }: ActionsDialogProps) => {
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [updateEmailModal, setUpdateEmailModal] = useState<boolean>(false);
  const [status, setStatus] = useState("");
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [updateBusinessNameModal, setUpdateBusinessNameModal] =
    useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");

  const updateUserStatus = async (id: number) => {
    await updateStatus(id, { accountStatus: status });
    setStatus("");
    setUpdateModalOpen(false);
    onOpenChange(false);
  };
  const handleEmailChange = (email: string) => {
    console.log(email);
  };
  const updateEmail = () => {};

  const handleUpdateBusinessName = async (id: number) => {
    await updateBusinessName(id, { businessName: businessName });
    setBusinessName("");
    setUpdateBusinessNameModal(false);
    onOpenChange(false);
  };

  useEffect(() => {
    setStatus(row?.status ?? "");
    setBusinessName(row?.businessName ?? "");
  }, [row]);

  return (
    <>
      {row?.business ? (
        <Modal onOpenChange={onOpenChange} open={open} title={"Actions"}>
          <div className="flex gap-4 flex-col">
            <div className="flex gap-2">
              {row?.businessLogo ? (
                <Image
                  src={
                    row?.businessLogo || "/images/fyndr-placeholder-gray.svg"
                  }
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
              <div className="flex flex-nowrap gap-2 w-1/2 flex-col">
                <p className="cursor-pointer text-blue-500">Login</p>
                <p className="cursor-pointer text-blue-500" onClick={() => setUpdateModalOpen(true)}>
                  Update Status
                </p>
                <p className="cursor-pointer text-blue-500">Check Stripe Status</p>
              </div>
              <div className="flex flex-nowrap gap-2 w-1/2 flex-col pl-6">
                <p className="cursor-pointer text-blue-500">Update Email Address</p>
                <p className="cursor-pointer text-blue-500" onClick={() => setUpdateBusinessNameModal(true)}>
                  Update Business Name
                </p>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        <Modal onOpenChange={onOpenChange} open={open} title={"Actions"}>
          <div className="flex flex-nowrap gap-2 w-1/2 flex-col">
            <div>Login</div>
            <div onClick={() => setUpdateModalOpen(true)}>Update Status</div>
          </div>
        </Modal>
      )}

      <Modal
        open={updateModalOpen}
        onOpenChange={setUpdateModalOpen}
        title="Update Status"
      >
        <div className="flex-center flex-col gap-3 p-4">
          <p>{row?.businessName}</p>
          <p>{row?.email}</p>

          <Select
            options={statusOptions}
            value={status}
            onValueChange={setStatus}
          />

          <Button
            variant="primary"
            onClick={() => row?.objId && updateUserStatus(row.objId)}
          >
            Save
          </Button>
        </div>
      </Modal>

      <Modal
        open={updateEmailModal}
        onOpenChange={setUpdateModalOpen}
        title="Update Email"
      >
        <Input value={row?.email} onChange={() => handleEmailChange(email)} />
        <Button disabled={validEmail} onClick={updateEmail} />
      </Modal>
      <Modal
        open={updateBusinessNameModal}
        onOpenChange={setUpdateBusinessNameModal}
        title="Update Business Name"
      >
        <div className="flex-center flex-col gap-4">
          <Input
            className="w-full"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
          <Button
            variant="primary"
            onClick={() => handleUpdateBusinessName(row?.objId ?? 0)}
          >
            Update
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ActionsDialog;
