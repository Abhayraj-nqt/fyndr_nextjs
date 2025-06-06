import React, { useState } from "react";

import { onDisputeRefund } from "@/actions/dispute.action";
import { Modal } from "@/components/global/modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DisputeDetailsProps } from "@/types/api-response/dispute.response";

interface DisputeRefundProps {
  row: DisputeDetailsProps | null;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

const DisputeRefund = ({ row, onOpenChange, open }: DisputeRefundProps) => {
  const amount = row?.amount || 0;
  const [selectedReasonn, setSelectedReason] = useState<string | null>(null);
  const [refundAmount, setRefundAmount] = useState<number>(row?.amount || 0);
  const [reverseTransferr, setReverseTransfer] = useState<boolean>(true);
  const [refundApplicationFeee, setRefundApplicationFee] =
    useState<boolean>(false);
  const [textArea, setTextArea] = useState<string>("");

  const refundReasons = [
    "Duplicate",
    "Fraudulent",
    "Customer Request",
    "Other",
  ];

  const refundDisputeApi = async (data) => {
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
      console.log("working");
    }
  };

  return (
    <div>
      <Modal onOpenChange={onOpenChange} open={open} title={"Dispute Refund"}>
        <div className="m-10">
          <div className="mb-5 w-full justify-center">
            <div>Refunds take 5-10 days to appear on a customer’s</div>
            <div>
              statement. Stripe’s Fees for the original payment won’t be
            </div>
            <div>
              returned, but there are no additional fees for the refund.
            </div>
          </div>
          <div className="w-full border border-gray-300" />
          <div className=" w-full border border-gray-300"></div>
          <div className="my-5 flex flex-row">
            <div className="justify-center pr-5 align-middle "> Refund</div>
            <Input
              type="number"
              placeholder="Refund Amount"
              value={refundAmount}
              onChange={(e) => setRefundAmount(Number(e.target.value))}
            />
          </div>
          <div>
            <div className="flex flex-row">
              <Checkbox
                checked={reverseTransferr}
                onCheckedChange={(checked) =>
                  setReverseTransfer(Boolean(checked))
                }
              />
              <span>Reverse the associated transfer</span>
            </div>
            <div className="flex flex-row">
              <Checkbox
                checked={refundApplicationFeee}
                onCheckedChange={(checked) =>
                  setRefundApplicationFee(Boolean(checked))
                }
              />
              <span>Refund the application fee</span>
            </div>
          </div>

          <div className="my-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {selectedReasonn || "Select refund reason"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {refundReasons.map((reason) => (
                  <DropdownMenuItem
                    key={reason}
                    onClick={() => setSelectedReason(reason)}
                  >
                    {reason}
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
              className="mr-5 mt-5 bg-primary"
              onClick={() => {
                resetFields();
                onOpenChange(false); // close modal
              }}
            >
              Cancel
            </Button>

            <Button className="mt-5 bg-primary" onClick={handleRefund}>
              Refund
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DisputeRefund;
