import Image from "next/image";
import React from "react";

import { Modal } from "@/components/global/modal";
import { DisputeDetailsProps } from "@/types/api-response/dispute.response";

interface DisputeReasionProps {
  row: DisputeDetailsProps | null;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}
const DisputeReasion = ({ row, onOpenChange, open }: DisputeReasionProps) => {
  return (
    <>
      <Modal onOpenChange={onOpenChange} open={open} title={"Dispute Reason"}>
        <div className="flex flex-row">
          <div
            className={`${row?.images && row?.images[0]?.img_url ? "h-[200] w-1/2" : "h-[200] w-full"}   max-h-[170] overflow-y-auto rounded-10 border border-secondary-20 p-2`}
          >
            {row?.disputeReason}
          </div>
          {row?.images && row?.images[0]?.img_url ? (
            <div className="ml-5 rounded-10">
              <Image
                src={row?.images[0].img_url as string}
                width={300}
                height={300}
                alt="image"
                className="max-h-[170] rounded-10"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </Modal>
    </>
  );
};

export default DisputeReasion;
