"use client";

import { Label } from "@radix-ui/react-label";
import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";

import Input from "@/components/global/input";
import { Modal } from "@/components/global/modal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { statusList } from "@/lib/utils";
import { OfferPurchaseProps } from "@/types/offersummary";

import RedeemRemarks from "./remarks";

interface ActionsDialogProps {
  row: OfferPurchaseProps | null;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  type?: string;
}

const ActionsDialog = ({
  row,
  onOpenChange,
  open,
  type,
}: ActionsDialogProps) => {
  const [status, setStatus] = useState<string>("");
  const [curVal, setCurVal] = useState<number>(0);
  const [remark, setRemark] = useState<string>("");
  const [redeemedAmtError, setRedeemedAmtError] = useState<string>("");
  const [redeemedAmt, setRedeemedAmt] = useState<number>(0);

  const INVOICE_TEXT = "leading-5 text-[#4D4D4D] text-sm font-semibold";
  const INVOICE_VALUE = "text-[14px] leading-[20px] font-normal text-[#333333]";

  useEffect(() => {
    if (row?.currentValue != null) {
      setCurVal(row.currentValue);
    }
    if (row?.redeemptionStatus) {
      setStatus(row.redeemptionStatus);
    }
  }, [row?.currentValue, row?.redeemptionStatus]);

  const handleChgAmt = (val: number) => {
    setRedeemedAmtError("");
    setRedeemedAmt(val);
    const balance = parseFloat((Number(row?.currentValue) - val).toFixed(2));
    setCurVal(balance);
    if (balance < 0) {
      setRedeemedAmtError("Unused value can't be negative");
    }
  };

  console.log("status", row?.redeemptionStatus);

  console.log("current valye", row?.currentValue);
  return (
    <>
      <Modal onOpenChange={onOpenChange} open={open} title={"Vouchers"}>
        <div className="rounded-[10px] border border-[#D3D6E1] p-[12px_12px_0_12px]">
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

          <div className="my-2 flex  flex-col items-center justify-center">
            <span className="text-base font-semibold text-[#666666]">{`Fyndr Generated Voucher ID: ${row?.voucherCode}`}</span>
            {row?.isVoucher && (
              <span className="text-base font-semibold text-[#666666]">{`Business Generated Voucher ID: ${row?.customVoucherCode}`}</span>
            )}
          </div>
        </div>

        {row?.currentValue != null &&
          row.currentValue > 0 &&
          row?.redeemptionStatus !== "redeemed" && (
            <div className="mt-4 flex justify-between rounded-[10px] border border-[#D3D6E1] p-[12px]">
              <span className="text-sm font-semibold leading-5 text-[#4D4D4D]">
                Unused Value
              </span>
              <span>{`${row?.currencySymbol}${curVal}`}</span>
            </div>
          )}

        <RedeemRemarks
          remarks={row?.remarks}
          redemptionTime={row?.redemptionTime}
        />

        {type === "receivable" && row?.redeemptionStatus !== "redeemed" && (
          <div className="mt-4 rounded-[10px] border border-[#D3D6E1] p-[12px]">
            <RadioGroup value={status} onValueChange={(val) => setStatus(val)}>
              {statusList.map((item) => (
                <div
                  key={item.value}
                  className="mb-2 flex items-center space-x-2"
                >
                  <RadioGroupItem
                    id={`status-${item.value}`}
                    value={item.value}
                    className="size-4"
                  />
                  <Label
                    htmlFor={`status-${item.value}`}
                    className={INVOICE_TEXT}
                  >
                    {item.display}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {status === "partially-redeemed" && (
              <>
                <div className="mt-2 flex flex-col gap-2">
                  <div>
                    <Input
                      placeholder="Amount redeemed"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*\.?\d*$/.test(value)) {
                          handleChgAmt(Number(value));
                        }
                      }}
                      value={redeemedAmt}
                    />
                    <span className="size-[15px]  pl-1 leading-6 text-[red]">
                      {redeemedAmtError}
                    </span>
                  </div>
                  <div>
                    <Input
                      placeholder="Remarks"
                      onChange={(e) => {
                        setRemark(e.target.value);
                      }}
                      value={remark}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default ActionsDialog;
