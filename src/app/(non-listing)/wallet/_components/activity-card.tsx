import Image from "next/image";
import React from "react";

import DateComponent from "@/components/global/date-component";
import { WALET_TRANSACTION_DATA } from "@/constants/wallet";
import { parseAmount } from "@/lib/utils/parser/index";
import { WalletTransactionsProps } from "@/types/wallet/wallet.types";

type Props = {
  transaction: WalletTransactionsProps;
};

const ActivityCard = ({ transaction }: Props) => {
  const data = WALET_TRANSACTION_DATA.get(transaction.reason);

  return (
    <div className="flex flex-col gap-4 border-b border-dashed pb-4 text-black-80 lg:flex-row">
      <div className="flex items-center gap-4">
        <Image
          src={data?.icon || ""}
          height={35}
          width={35}
          alt={"transaction"}
          className="size-8"
        />
        <DateComponent
          date={transaction.transactionDt}
          className="body-regular w-32"
        />
      </div>
      <div className="flex w-full flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-1">
        <div className="flex flex-nowrap items-center gap-1">
          <p className="body-regular">{data?.text}</p>
          <p className="body-semibold">{transaction?.promoCode}</p>
        </div>
        <div className="body-regular flex w-full flex-nowrap justify-between gap-8 sm:w-auto sm:justify-start lg:justify-between">
          {transaction?.businessName && (
            <p className="">Business: {transaction?.businessName}</p>
          )}
          {transaction.invoiceId && (
            <p className="body-semibold underline">
              ID: {transaction?.invoiceId}
            </p>
          )}
        </div>
      </div>
      <div
        className={`${data?.amountColor} paragraph-semibold flex w-32 items-center text-right lg:justify-end ${transaction.reason === "FYNDR_CASH_EXPIRED" || transaction.reason === "REDEEMED" ? "text-red-700" : "text-green-700"}`}
      >
        {transaction.amount > 0
          ? `+$${parseAmount(transaction.amount)}`
          : `$${parseAmount(transaction.amount)}`}
      </div>
    </div>
  );
};

export default ActivityCard;
