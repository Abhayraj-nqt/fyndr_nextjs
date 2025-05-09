/* eslint-disable camelcase */
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import Image from "next/image";
import React from "react";

import { fetchPayables, fetchReceivables } from "@/actions/transaction.action";
import { fetchInvoice } from "@/types/api-response/transaction.response";

import CommonHeader from "./common-header";
type Props = {
  bizid: number;
  months: string;
  status: string;
  channel: string;
  indvid: number;
  search: string;
};

type StatusImages = {
  [channel: string]: {
    [status: string]: string;
  };
};

type ListProps = {
  rcptlist: fetchInvoice[];
  type: "payable" | "receivable";
};

const Transaction = async ({
  bizid,
  months,
  status,
  channel,
  indvid,
  search,
}: Props) => {
  const { success, data } = await fetchPayables({
    criteria: "individual",
    buyerId: indvid,
    days: Number(months) * 30,
    text: search,
  });
  if (!success || !data) return null;

  const { success: recvSuccess, data: recvData } = await fetchReceivables({
    criteria: "merchant",
    text: search,
    bizid,
    days: Number(months) * 30,
    channel,
    status,
  });

  if (!recvSuccess || !recvData) return null;
  const InvoiceList = ({ rcptlist, type }: ListProps) => {
    return (
      <div className="space-y-3 py-4">
        {rcptlist.map((item) => {
          const {
            invoiceDetails: { business_name },
            invoiceDt,
            currencySymbol,
            baseAmount,
            taxAmount,
            tipAmount,
            fyndrCash,
            status,
            invoiceDetails,
            channel,
            buyerFname,
            buyerLname,
          } = item;
          let rowTitle, body;
          if (type === "payable") {
            rowTitle = business_name;
            if ("cmpn_title" in invoiceDetails) {
              body = invoiceDetails.cmpn_title;
            } else if ("title" in invoiceDetails) {
              body = invoiceDetails.title;
            } else {
              body = "Campaign Promotion";
            }
          } else if (type === "receivable") {
            rowTitle = `${buyerFname} ${buyerLname}`;
            if (channel === "offers" && "cmpn_title" in invoiceDetails) {
              body = invoiceDetails.cmpn_title;
            } else if ("title" in invoiceDetails) {
              body = invoiceDetails.title;
            }
          }
          const totalAmount = baseAmount + taxAmount + tipAmount - fyndrCash;
          const formattedDate = new Date(invoiceDt).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "short",
              day: "numeric",
            }
          );

          const statusImages: StatusImages = {
            offers: {
              pending: "/icons/offer_yellow.svg",
              "in-process": "/icons/offer_yellow.svg",
              REFUNDED: "/icons/offerIcon.svg",
              paid: "/icons/offerIcon.svg",
              failed: "/icons/offer_red.svg",
              canceled: "/icons/offer_red.svg",
            },
            offer_appointment: {
              pending: "/icons/offer_appointmentYellow.svg",
              "in-process": "/icons/offer_appointmentYellow.svg",
              REFUNDED: "/icons/offer_appointmentGreen.svg",
              paid: "/icons/offer_appointmentGreen.svg",
              failed: "/icons/offer_appointmentRed.svg",
              canceled: "/icons/offer_appointmentRed.svg",
            },
            cmpn_promo: {
              pending: "/icons/promo_yellow.svg",
              "in-process": "/icons/promo_yellow.svg",
              REFUNDED: "/icons/promo_green.svg",
              paid: "/icons/promo_green.svg",
              failed: "/icons/promo_red.svg",
              canceled: "/icons/promo_red.svg",
            },
            catalog: {
              pending: "/icons/Store_yellow.svg",
              "in-process": "/icons/Store_yellow.svg",
              REFUNDED: "/icons/storeIcon.svg",
              paid: "/icons/storeIcon.svg",
              failed: "/icons/Store_red.svg",
              canceled: "/icons/Store_red.svg",
            },
            catalog_appointment: {
              pending: "/icons/store_appointmentYellow.svg",
              "in-process": "/icons/store_appointmentYellow.svg",
              REFUNDED: "/icons/store_appointmentGreen.svg",
              paid: "/icons/store_appointmentGreen.svg",
              failed: "/icons/store_appointmentRed.svg",
              canceled: "/icons/store_appointmentRed.svg",
            },
            events: {
              pending: "/icons/event_yellow.svg",
              "in-process": "/icons/event_yellow.svg",
              REFUNDED: "/icons/event_green.svg",
              paid: "/icons/event_green.svg",
              failed: "/icons/event_red.svg",
              canceled: "/icons/event_red.svg",
            },
            custom: {
              pending: "/icons/offer_yellow.svg",
              "in-process": "/icons/offer_yellow.svg",
              REFUNDED: "/icons/offerIcon.svg",
              paid: "/icons/offerIcon.svg",
              failed: "/icons/offer_red.svg",
              canceled: "/icons/offer_red.svg",
            },
          };
          const getImageForStatus = (
            channel: string,
            status: string
          ): string => {
            return statusImages[channel] && statusImages[channel][status];
          };
          const statusIcon = getImageForStatus(channel, status);
          return (
            <div
              key={item.objid}
              className="cursor-pointer rounded-lg border border-gray-200 p-4 shadow transition hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex w-72 min-w-12 items-center gap-2">
                  <Image src={statusIcon} alt="offer" height={48} width={48} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-800">
                      {rowTitle}
                    </p>
                    <p className="truncate text-xs text-gray-500">{body}</p>
                  </div>
                </div>
                <div className="w-40 shrink-0 whitespace-nowrap text-center text-sm text-gray-800">
                  {formattedDate}
                </div>
                <div className="w-36 shrink-0 whitespace-nowrap text-right">
                  <p className="text-sm font-medium text-gray-800">
                    {currencySymbol}
                    {totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Tabs defaultValue="payable" className="mt-3">
        <TabsList className="flex-between">
          <TabsTrigger
            value="receivable"
            className="px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
          >
            Receivables
          </TabsTrigger>
          <TabsTrigger
            value="payable"
            className="px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
          >
            My Purchase
          </TabsTrigger>
          <TabsTrigger
            value="order"
            className="px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
          >
            Orders
          </TabsTrigger>
        </TabsList>
        <TabsContent value="receivable">
          <CommonHeader type="receivable" />
          {recvSuccess && recvData.invoices.length > 0 ? (
            <InvoiceList rcptlist={recvData?.invoices} type="receivable" />
          ) : (
            <p className="py-4 text-center text-gray-500">
              No purchases found.
            </p>
          )}
        </TabsContent>

        <TabsContent value="payable">
          <CommonHeader type="payable" />
          {success && data.invoices.length > 0 ? (
            <InvoiceList rcptlist={data?.invoices} type="payable" />
          ) : (
            <p className="py-4 text-center text-gray-500">
              No purchases found.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Transaction;
