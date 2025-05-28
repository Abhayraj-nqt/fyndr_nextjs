import dayjs from "dayjs";
import { Underline } from "lucide-react";
import React from "react";

import DefaultCard from "@/components/global/cards/default-card";
import { Button } from "@/components/ui/button";
import {
  capitalize,
  ChannelOffer,
  getChannelName,
  getDisplayStatus,
  getFormattedDtNew,
  getStatusColor,
  Status,
} from "@/lib/utils";
import {
  Appointment,
  InvoiceOffer,
  Offer,
} from "@/types/api-response/transaction.response";

type OffersDetails = {
  offersDetails: Offer[];
  channel: ChannelOffer;
  vouchers: InvoiceOffer[] | null;
  appointments: Offer[] | null;
  currencySymbol: string;
  taxAmount: number;
  userTimeZone: string  | null
};

interface ExtendedInvoiceOffer extends InvoiceOffer {
  appointments?: Appointment[];
  index?: number;
  qty?: number | boolean;
}
const Offersdetails: React.FC<OffersDetails> = ({
  offersDetails,
  channel,
  vouchers,
  appointments,
  currencySymbol,
  taxAmount,
  userTimeZone,
}) => {
  return (
    <>
      {offersDetails &&
        offersDetails.map((row) => {
          console.log("this is row ", row);
          const {
            offer_id: offerId,
            retail_price: retailPrice,
            offer_price: offerPrice,
          } = row;
          const vhrs =
            channel === "events"
              ? offersDetails.filter((offer) => offer.offer_id === offerId)
              : vouchers?.filter((voucher) => voucher.offerId === offerId);
          console.log("vhrs", vhrs);
          return (
            vhrs &&
            vhrs.map((vhrRaw, index) => {
              const vhr = vhrRaw as ExtendedInvoiceOffer;
              let res;

              if (appointments && appointments?.length > 0) {
                res = appointments.filter(
                  (item) => item.offer_id === vhr.offerId
                );
                vhr.appointments = res[0]?.appointment;
                vhr.index = index;
                vhr.qty = channel !== "events" && res[0]?.qty;
              }

              //   vhr.currencySymbol = currencySymbol;
              const { redeemptionStatus, validTill } = vhr;

              return (
                <div
                  key={`${offerId}-${index}`}
                  className="my-4 w-full rounded-lg border border-[#D3D6E1] p-4"
                >
                  <div className="mb-3 flex justify-between">
                    <span className="text-[16px] font-semibold text-[#257CDB]">
                      {capitalize(getChannelName(channel))}
                    </span>
                  </div>
                  {/* Channel Name */}
                  <div className="mb-2 flex justify-between">
                    <span className="text-[14px] font-semibold text-[#4D4D4D]">
                      {capitalize(getChannelName(channel))} Name:
                    </span>
                    <span className="text-[14px] text-[#333333]">
                      {row?.title}
                    </span>
                  </div>
                  {vhr?.appointments &&
                    vhr?.appointments[index] &&
                    Object.entries(vhr?.appointments[index]).map(
                      ([appointmentDate, timeObj]: any, i) => (
                        <div key={`appointment-${i}`} className="w-full">
                          <div className="mb-2 flex justify-between">
                            <span className="text-[14px] font-semibold text-[#4D4D4D]">
                              Appointment:
                            </span>
                            <span className="text-[14px] text-[#333333]">
                              {dayjs(appointmentDate).format("MMM DD, YYYY")}
                            </span>
                          </div>
                          =
                          <div className="mb-2 flex justify-between">
                            <span className="text-[14px] font-semibold text-[#4D4D4D]">
                              Start Time:
                            </span>
                            <span className="text-[14px] text-[#333333]">
                              {dayjs(
                                timeObj?.startTime?.slice(0, 5),
                                "HH:mm"
                              ).format("hh:mm A")}
                            </span>
                          </div>
                          =
                          <div className="mb-2 flex justify-between">
                            <span className="text-[14px] font-semibold text-[#4D4D4D]">
                              End Time:
                            </span>
                            <span className="text-[14px] text-[#333333]">
                              {dayjs(
                                timeObj?.endTime?.slice(0, 5),
                                "HH:mm"
                              ).format("hh:mm A")}
                            </span>
                          </div>
                        </div>
                      )
                    )}

                  <div className="mb-2 flex justify-between">
                    <span className="text-[14px] font-semibold text-[#4D4D4D]">
                      Retail Price:
                    </span>
                    <span className="text-[14px] text-[#333333]">
                      {currencySymbol}
                      {retailPrice}
                    </span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-[14px] font-semibold text-[#4D4D4D]">
                      Offer Price:
                    </span>
                    <span className="text-[14px] text-[#333333]">
                      {currencySymbol}
                      {offerPrice}
                    </span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-[14px] font-semibold text-[#4D4D4D]">
                      Tax:
                    </span>
                    <span className="text-[14px] text-[#333333]">
                      {currencySymbol}
                      {taxAmount}
                    </span>
                  </div>
                  {channel !== "events" && (
                    <>
                      <div className="mb-2 flex justify-between">
                        <span className="text-[14px] font-semibold text-[#4D4D4D]">
                          Status:
                        </span>
                        <span
                          className="text-[14px] font-semibold"
                          style={{
                            color: getStatusColor(redeemptionStatus as Status),
                          }}
                        >
                          {getDisplayStatus(redeemptionStatus as Status)}
                        </span>
                      </div>

                      <div className="mb-2 flex justify-between">
                        <span className="text-[14px] font-semibold text-[#4D4D4D]">
                          Valid Till:
                        </span>
                        <span className="text-[14px] text-[#ED0C10]">
                          {getFormattedDtNew(validTill, userTimeZone ?? "UTC")}
                        </span>
                      </div>

                      {vhr.isVoucher && (
                        <div className="mb-2 flex justify-between">
                          <span className="text-[14px] font-semibold text-[#4D4D4D]">
                            Business Generated Voucher ID:
                          </span>
                          <span className="text-[14px] text-[#333333]">
                            {vhr?.customVoucherCode}
                          </span>
                        </div>
                      )}

                      {/* Fyndr Generated Voucher with Action */}
                      {/* <div className="mb-2 flex justify-between">
                        <span className="text-[14px] font-semibold text-[#4D4D4D]">
                          Fyndr Generated Voucher ID:
                        </span>
                        <Button
                          className="text-[14px] text-blue-600 underline"
                          onClick={() => {
                            setSelectedVoucher(vhr);
                            setScreen("edit");
                          }}
                        >
                          <div className="text-[14px] font-normal leading-[20px] text-[#333333]">
                            {vhr
                              ? `VHR-${(vhr.objid + "").padStart(10, 0)}`
                              : ""}
                          </div>
                        </Button>
                      </div> */}
                      {vhr.appointments &&
                        vhr.appointments.length > 0 &&
                        vhr.appointments[index] === undefined && (
                          <div className="mb-8 justify-between">
                            <div>
                              <span className="size-[16px] font-semibold text-[#257CDB]">
                                Scheduled Later
                              </span>
                            </div>
                          </div>
                        )}
                    </>
                  )}
                </div>
              );
            })
          );
        })}
    </>
  );
};

export default Offersdetails;
