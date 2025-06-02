"use client";


import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React from "react";

import { useUser } from "@/hooks/auth";
import { getFormattedDtNew } from "@/lib/utils";
import { Remarks } from "@/types/offersummary";

dayjs.extend(utc);
dayjs.extend(timezone);

type RemarksProps = {
  remarks?: Remarks[];               // optional
  redemptionTime?: string | null;    // optional
  currencySymbol?: string;   
};

const INVOICE_TEXT = "leading-5 text-[#4D4D4D] text-sm font-semibold";
const INVOICE_VALUE = "text-[14px] leading-[20px] font-normal text-[#333333]";

const RedeemRemarks = ({
  remarks,
  redemptionTime,
  currencySymbol,
}: RemarksProps) => {
  const { user } = useUser();
  const userTimeZone = user?.userTimeZone;

  return (
    <>
    {remarks && remarks.map((remark, index) => (
      <div   key={index} className="mt-4 rounded-[10px] border border-[#D3D6E1] p-3">
        {remark?.time && userTimeZone && (
          <span className="text-sm font-normal leading-4 text-[#333333]">
            {getFormattedDtNew(remark.time, userTimeZone)}
          </span>
        )}

        {redemptionTime && (
          <div className="flex justify-between">
            <span className={INVOICE_TEXT}>Redemption Time:</span>
            <span className={INVOICE_VALUE}>
              {dayjs
                .utc(`1970-01-01T${redemptionTime}`)
                .tz(userTimeZone || dayjs.tz.guess())
                .format("hh:mm A")}
            </span>
          </div>
        )}

        {remark?.redeemedValue !== null && (
          <div className="flex justify-between">
            <span className={INVOICE_TEXT}>Redeemed Value:</span>
            <span className={INVOICE_VALUE}>
              {currencySymbol}
              {remark?.redeemedValue}
            </span>
          </div>
        )}
        {remark?.updatedBy !== null && (
          <div className="mt-2 flex justify-between">
            <span className={INVOICE_TEXT}>Updated by:</span>
            <span className={INVOICE_VALUE}>{remark?.updatedBy}</span>
          </div>
        )}
      </div>
       ))}
    </>
  );
};

export default RedeemRemarks;
