"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";

import { Modal } from "@/components/global/modal";
import { OfferPurchaseProps } from "@/types/offersummary";

interface ActionsDialogProps {
  row: OfferPurchaseProps | null;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

const ActionsDialog = ({ row, onOpenChange, open }: ActionsDialogProps) => {
  const [status, setStatus] = useState<string>(row?.redeemptionStatus ?? "");
const [curVal, setCurVal] = useState<number>(0);

useEffect(() => {
  if (row?.currentValue != null) {
    setCurVal(row.currentValue);
  }
}, [row?.currentValue]);

    console.log("current valye" , row?.currentValue);
  return (
    <>
      <Modal onOpenChange={onOpenChange} open={open} title={"Vouchers"}>
        <div className="p-[12px_12px_0_12px border border-[#D3D6E1] rounded-[10px]">
          <div className="flex justify-center align-middle">
            <QRCode
              value={`${row?.voucherCode}`}
              size={300}
              logoWidth={80}
              ecLevel="H"
              quietZone={10}
              fgColor={status === "redeemed" ? "#ccc" : "#000"}
              logoImage={"/images/blueFyndr.png"}
            />
          </div>

          <div className="flex flex-col  justify-center items-center my-2">
            <span className="text-[#666666] text-base font-semibold">{`Fyndr Generated Voucher ID: ${row?.voucherCode}`}</span>
            {row?.isVoucher && (
              <span className="text-[#666666] text-base font-semibold">{`Business Generated Voucher ID: ${row?.customVoucherCode}`}</span>
            )}
          </div>
        </div>
        
          {row?.currentValue > 0 && row?.redeemptionStatus !=="redeemed" && (
<div className="p-[12px] border border-[#D3D6E1] rounded-[10px] flex justify-between mt-4">
       <span className="text-[#4D4D4D] text-sm font-semibold leading-5">Unused Value</span>
       <span>{`${row?.currencySymbol}${curVal}`}</span>
    </div>
          )}
      
      </Modal>
    </>
  );
};

export default ActionsDialog;
