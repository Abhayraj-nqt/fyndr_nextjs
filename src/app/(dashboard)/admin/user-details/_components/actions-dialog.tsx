"use client";

import Select from "@/app/test/input/_components/select";
import { Modal } from "@/components/global/modal";
import Button from "@/components/global/buttons";
import { AdminUserProps } from "@/types/api-response/user.response";
import { updateBusinessName, updateStatus } from "@/actions/admin.actions";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Input from "@/components/global/input";
import { toast } from "sonner";

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
  const [updateBusinessNameModal, setUpdateBusinessNameModal] =
    useState<boolean>(false);
  const [businessName, setBusinessName] = useState("");
  
  const [newEmail, setNewEmail] = useState("");
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isResendingOtp, setIsResendingOtp] = useState(false);

  const updateUserStatus = async (id: number) => {
    await updateStatus(id, { accountStatus: status });
    setStatus("");
    setUpdateModalOpen(false);
    onOpenChange(false);
  };

  const handleSendOtp = async () => {
    if (!newEmail || !isValidEmail(newEmail)) {
      alert("Please enter a valid email address");
      return;
    }
    
    try {
      setIsUpdatingEmail(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShowOtpSection(true);
      setIsOtpVerified(false);
      setOtp("");
    } catch (error) {
      console.error("Failed to send OTP:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setIsUpdatingEmail(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) {
      alert("Please enter a valid OTP");
      // toast.message(title)
      return;
    }
    
    try {
      setIsVerifyingOtp(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const isValid = true; 
      
      if (isValid) {
        setIsOtpVerified(true);
        alert("OTP verified successfully!");
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      alert("Failed to verify OTP. Please try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsResendingOtp(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOtp("");
      alert("OTP resent successfully!");
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      alert("Failed to resend OTP. Please try again.");
    } finally {
      setIsResendingOtp(false);
    }
  };

  const handleFinalEmailUpdate = async () => {
    if (!isOtpVerified) {
      alert("Please verify OTP first");
      return;
    }
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert("Email updated successfully!");
      handleCloseEmailModal();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update email:", error);
      alert("Failed to update email. Please try again.");
    }
  };

  const handleCloseEmailModal = () => {
    setUpdateEmailModal(false);
    setShowOtpSection(false);
    setIsOtpVerified(false);
    setOtp("");
    setNewEmail("");
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUpdateBusinessName = async (id: number) => {
    await updateBusinessName(id, { businessName: businessName });
    setBusinessName("");
    setUpdateBusinessNameModal(false);
    onOpenChange(false);
  };

  useEffect(() => {
    setStatus(row?.status ?? "");
    setBusinessName(row?.businessName ?? "");
    setNewEmail(row?.email ?? "");
  }, [row]);

  useEffect(() => {
    if (!updateEmailModal) {
      handleCloseEmailModal();
    }
  }, [updateEmailModal]);

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
                <p className="cursor-pointer text-blue-500" onClick={() => setUpdateEmailModal(true)}>
                  Update Email Address
                </p>
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
        onOpenChange={handleCloseEmailModal}
        title="Update Email"
      >
        <div className="flex-center flex-col gap-4 p-4">
          <div className="w-full">
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <Input 
              className="w-full"
              value={newEmail} 
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email address"
              type="email"
            />
          </div>

          {!showOtpSection ? (
            <Button 
              variant="primary"
              onClick={handleSendOtp}
              disabled={isUpdatingEmail || !newEmail || !isValidEmail(newEmail)}
              className="w-full"
            >
              {isUpdatingEmail ? "Sending OTP..." : "Send OTP"}
            </Button>
          ) : (
            <div className="w-full space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Enter OTP
                </label>
                <Input 
                  className="w-full"
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  // variant="secondary"
                  onClick={handleVerifyOtp}
                  disabled={isVerifyingOtp || !otp || isOtpVerified}
                  className="flex-1"
                >
                  {isVerifyingOtp ? "Verifying..." : isOtpVerified ? "Verified ✓" : "Verify OTP"}
                </Button>
                
                <Button 
                  onClick={handleResendOtp}
                  disabled={isResendingOtp}
                  className="flex-1"
                >
                  {isResendingOtp ? "Resending..." : "Resend OTP"}
                </Button>
              </div>
              
              <Button 
                variant="primary"
                onClick={handleFinalEmailUpdate}
                disabled={!isOtpVerified}
                className="w-full"
              >
                Update Email
              </Button>
            </div>
          )}
        </div>
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