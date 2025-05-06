"use client";

import { InvoiceSummary } from "@/types/api-response/transaction.response";
const offerIcon = "/icons/offerIcon.svg";
const paidInvoiceIcon = "/icons/paidInvoice.svg";
const pendingInvoiceIcon = "/icons/pendingInvoice.svg";
const storeIcon = "/icons/storeIcon.svg";

const getDecimalNum = (num: number): string => {
  return num.toFixed(2);
};

const getDateNew = (date: string, timezone: string): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString(undefined, { timeZone: timezone });
};

type Props = {
  summarydata: InvoiceSummary;
};

const SummaryCard = ({ summarydata }: Props) => {
  return (
    <>
      {summarydata?.totalAmountByInvoiceStatuses.paid !== 0 ? (
        <div className="flex space-x-4 mt-4">
          {summarydata &&
            Number(summarydata.totalAmountByInvoiceStatuses.paid) > 0 && (
              <div
                className="bg-white p-4 shadow-md rounded-lg cursor-pointer w-1/4 h-[190px]"
                onClick={() => {}}
              >
                <div className="flex-between">
                  <div>
                    <img
                      src={paidInvoiceIcon}
                      alt="Paid"
                      className="w-12 h-12"
                    />
                  </div>
                  <div className="text-right">
                    <span className="block text-sm text-gray-500">
                      From {getDateNew(summarydata.userRegistrationDt, "UTC")}
                      <span className="block">till present</span>
                    </span>
                  </div>
                </div>
                <div className="text-xl font-medium mt-10">
                  {summarydata.currencySymbol}
                  {getDecimalNum(summarydata.totalAmountByInvoiceStatuses.paid)}
                </div>
                <div className="text-sm text-gray-500">Paid Invoices</div>
              </div>
            )}

          {summarydata &&
            Number(summarydata.totalAmountByInvoiceStatuses.pending) > 0 && (
              <div
                className="bg-white p-4 shadow-md rounded-lg cursor-pointer w-1/4 h-[190px]"
                onClick={() => {}}
              >
                <div className="flex-between">
                  <div>
                    <img
                      src={pendingInvoiceIcon}
                      alt="Pending"
                      className="w-12 h-12"
                    />
                  </div>
                  <div className="text-right">
                    <span className="block text-sm text-gray-500">
                      From {getDateNew(summarydata.userRegistrationDt, "UTC")}
                      <span className="block">till present</span>
                    </span>
                  </div>
                </div>
                <div className="text-xl font-medium mt-10">
                  {summarydata.currencySymbol}
                  {getDecimalNum(
                    summarydata.totalAmountByInvoiceStatuses.pending
                  )}
                </div>
                <div className="text-sm text-gray-500">Pending Invoices</div>
              </div>
            )}

          {summarydata &&
            Number(
              summarydata.totalAmountByInvoiceChannels.offers +
                summarydata.totalAmountByInvoiceChannels.events
            ) > 0 && (
              <div
                className="bg-white p-4 shadow-md rounded-lg cursor-pointer w-1/4 h-[190px]"
                onClick={() => {}}
              >
                <div className="flex-between">
                  <div>
                    <img src={offerIcon} alt="Offer" className="w-12 h-12" />
                  </div>
                  <div className="text-right">
                    <span className="block text-sm text-gray-500">
                      From {getDateNew(summarydata.userRegistrationDt, "UTC")}
                      <span className="block">till present</span>
                    </span>
                  </div>
                </div>
                <div className="text-xl font-medium mt-10">
                  {summarydata.currencySymbol}
                  {getDecimalNum(
                    summarydata.totalAmountByInvoiceChannels.offers +
                      summarydata.totalAmountByInvoiceChannels.events
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  Paid Offers & Events
                </div>
              </div>
            )}

          {summarydata &&
            Number(summarydata.totalAmountByInvoiceChannels.catalog) > 0 && (
              <div
                className="bg-white p-4 shadow-md rounded-lg cursor-pointer w-1/4 h-[190px]"
                onClick={() => {}}
              >
                <div className="flex-between">
                  <div>
                    <img src={storeIcon} alt="Catalog" className="w-12 h-12" />
                  </div>
                  <div className="text-right">
                    <span className="block text-sm text-gray-500">
                      From {getDateNew(summarydata.userRegistrationDt, "UTC")}
                      <span className="block">till present</span>
                    </span>
                  </div>
                </div>
                <div className="text-xl font-medium mt-10">
                  {summarydata.currencySymbol}
                  {getDecimalNum(
                    summarydata.totalAmountByInvoiceChannels.catalog
                  )}
                </div>
                <div className="text-sm text-gray-500">Total Store Sales</div>
              </div>
            )}
        </div>
      ) : (
        <div className="h-12 flex items-center justify-center">
          <span>{`No data available for the Past Months"}.`}</span>
        </div>
      )}
    </>
  );
};

export default SummaryCard;
