/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { onDisputeRefund } from "@/actions/dispute.action";
import Button from "@/components/global/buttons";
import Input from "@/components/global/input";
import { Modal } from "@/components/global/modal";
import toast from "@/components/global/toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { DisputeDetailsProps } from "@/types/api-response/dispute.response";

interface DisputeRefundProps {
  row: DisputeDetailsProps | null;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}
interface RefundDisputeData {
  disputeId: number;
  refundAmt: number;
  paymentId: number;
  reason: string;
  refundApplicationFee: boolean;
  reverseTransfer: boolean;
  remarks: string;
}
const DisputeRefund = ({ row, onOpenChange, open }: DisputeRefundProps) => {
  const amount = row?.amount || 0;
  const [selectedReasonn, setSelectedReason] = useState<string | null>(null);
  const [refundAmount, setRefundAmount] = useState<number>(0);

  const [reverseTransferr, setReverseTransfer] = useState<boolean>(true);
  const [refundApplicationFeee, setRefundApplicationFee] =
    useState<boolean>(false);
  const [textArea, setTextArea] = useState<string>("");
  console.log("row", row);
  const refundReasons = [
    { value: "duplicate", label: "Duplicate" },
    { value: "fraudulent", label: "Fraudulent" },
    { value: "requested_by_customer", label: "Requested By Customer" },
    { value: "Other", label: "Other" },
  ];
  useEffect(() => {
    if (row?.amount) {
      setRefundAmount(row.amount);
    }
  }, [row]);
  useEffect(() => {
    if (!open) {
      setSelectedReason(null);
      setRefundAmount(refundAmount);
      setReverseTransfer(true);
      setRefundApplicationFee(false);
      setTextArea("");
    }
  }, [open, row]);

  const refundDisputeApi = async (data: RefundDisputeData) => {
    console.log("data", data);
    const response = await onDisputeRefund({
      disputeId: data.disputeId,
      refundAmt: data.refundAmt,
      paymentId: data.paymentId,
      reason: data.reason,
      refundApplicationFee: data.refundApplicationFee,
      reverseTransfer: data.reverseTransfer,
      remarks: data.remarks,
    });
    if (response.success) {
      toast.success({ message: "Refund processed successfully" });
      onOpenChange(false);
    } else {
      toast.error({
        message: response.error?.details?.message || "Refund failed",
      });
    }
  };

  return (
    <div>
      <Modal onOpenChange={onOpenChange} open={open} title={"Refund Payment"}>
        <div className="m-5">
          <div className="mb-5 w-full justify-center">
            <div className="flex w-full justify-center ">
              Refunds take 5-10 days to appear on a customer’s
            </div>
            <div className="flex w-full justify-center ">
              statement. Stripe’s Fees for the original payment won’t be
            </div>
            <div className="flex w-full justify-center ">
              returned, but there are no additional fees for the refund.
            </div>
          </div>
          <div className="w-full border border-gray-300" />
          <div className=" w-full border border-gray-300"></div>
          <div className="my-5 flex flex-row">
            <div className="mt-1 justify-center pr-5 align-middle ">
              {" "}
              Refund
            </div>
            <Input
              type="number"
              placeholder="Refund Amount"
              value={refundAmount}
              rightNode={"USD"}
              onChange={(e) => setRefundAmount(Number(e.target.value))}
            />
          </div>
          <div>
            <div className=" flex flex-row">
              <Checkbox
                checked={reverseTransferr}
                onCheckedChange={(checked) =>
                  setReverseTransfer(Boolean(checked))
                }
                className="mt-1"
              />
              <span className="pl-3">Reverse the associated transfer</span>
            </div>
            <div className="flex flex-row ">
              <Checkbox
                checked={refundApplicationFeee}
                onCheckedChange={(checked) =>
                  setRefundApplicationFee(Boolean(checked))
                }
                className="mt-1"
              />
              <span className="pl-3">Refund the application fee</span>
            </div>
          </div>

          <div className="my-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="primary" className="w-full justify-between">
                  {refundReasons.find((r) => r.value === selectedReasonn)
                    ?.label || "Select refund reason"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {refundReasons.map((reason) => (
                  <DropdownMenuItem
                    key={reason.value}
                    onClick={() => setSelectedReason(reason.value)}
                    className="w-60 cursor-pointer"
                  >
                    {reason.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-5">
            <Textarea
              rows={5}
              placeholder="Add more details about this refund."
              value={textArea}
              onChange={(e) => setTextArea(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button
              variant="primary"
              className="mr-5 mt-5 bg-primary text-white"
              onClick={() => {
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>

            <Button
              variant="primary"
              className="mt-5 bg-primary text-white"
              onClick={() => {
                if (refundAmount === null || refundAmount <= 0) {
                  toast.error({ message: "Amount must be greater than 0" });
                } else if (refundAmount > amount) {
                  toast.error({
                    message: "Refund amount must not exceed actual amount",
                  });
                } else if (!selectedReasonn) {
                  toast.error({ message: "Please select a refund reason" });
                } else if (row) {
                  refundDisputeApi({
                    disputeId: row.disputeId,
                    paymentId: row.paymentId,
                    refundAmt: refundAmount,
                    reason: selectedReasonn,
                    reverseTransfer: reverseTransferr,
                    refundApplicationFee: refundApplicationFeee,
                    remarks: textArea,
                  }).then(() => {
                    onOpenChange(false);
                  });
                }
              }}
            >
              Refund
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DisputeRefund;
