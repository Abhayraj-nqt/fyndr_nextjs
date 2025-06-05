"use client";

import dayjs from "dayjs";
import { Underline } from "lucide-react";
import React, { useEffect, useState } from "react";

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
import { OfferPurchaseProps } from "@/types/offersummary";
import ActionsDialog from "@/app/(dashboard)/_components/redeemptionModal/actions-dialog";
import { useUser } from "@/hooks/auth";

type OffersDetails = {
  offersDetails: Offer[];
  channel: ChannelOffer;
  vouchers: InvoiceOffer[] | null;
  appointments: Offer[] | null;
  currencySymbol: string;
  taxAmount: number;
  userTimeZone: string | null;
  type: string;
  refetch: () => void;
};

const Offersdetails: React.FC<OffersDetails> = ({
  offersDetails,
  channel,
  vouchers,
  appointments,
  currencySymbol,
  taxAmount,
  userTimeZone,
  type,
  refetch,
}) => {
  const { user } = useUser();

  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const indvid = user?.indvid;


  const [redeemOpen, setRedeemOpen] = useState<boolean>(false);
  const [selectedVoucher, setSelectedVoucher] = useState<InvoiceOffer | null>(
    null
  );

  return (
    <>
      {offersDetails &&
        offersDetails.map((row) => {
          const {
            offer_id: offerId,
            retail_price: retailPrice,
            offer_price: offerPrice,
          } = row;
          type FilteredOffer = Offer | InvoiceOffer;

          const vhrs: FilteredOffer[] =
            channel === "events"
              ? offersDetails.filter((offer) => offer.offer_id === offerId)
              : vouchers?.filter((voucher) => voucher.offerId === offerId) ||
                [];

          return (
            vhrs &&
            vhrs.map((vhrRaw, index) => {
              const vhr = vhrRaw;
              let res;

              // if ("appointment" in vhr && vhr?.appointment && vhr?.appointment?.length > 0) {
              //   res = vhr?.appointment.filter(
              //     (item) => item.offer_id === vhr.offerId
              //   );
              //   vhr.appointment = res[0]?.appointment;
              //   vhr.index = index;
              //   vhr.qty = channel !== "events" && res[0]?.qty;
              // }

              //   vhr.currencySymbol = currencySymbol;
              let redeemptionStatus, validTill;

              if ("offerId" in vhr) {
                // vhr is InvoiceOffer
                redeemptionStatus = vhr.redeemptionStatus;
                validTill = vhr.validTill;
              }

              console.log("this is redeemp", redeemptionStatus);

              console.log("start time", appointments);

              return (
                <div
                  key={`${offerId}-${index}`}
                  className="my-4 w-full rounded-lg border border-secondary-20 p-4"
                >
                  <div className="mb-3 flex justify-between">
                    <span className="text-[16px] font-semibold text-primary">
                      {capitalize(getChannelName(channel))}
                    </span>
                  </div>
                  {/* Channel Name */}
                  <div className="mb-2 flex justify-between">
                    <span className="text-[14px] font-semibold text-black-70">
                      {capitalize(getChannelName(channel))} Name:
                    </span>
                    <span className="text-[14px] text-black-80">
                      {row?.title}
                    </span>
                  </div>
                  {"appointment" in vhr &&
                    vhr?.appointment &&
                    vhr?.appointment[index] &&
                    Object.entries(vhr?.appointment[index]).map(
                      ([appointmentDate, timeObj]: any, i) => (
                        <div key={`appointment-${i}`} className="w-full">
                          <div className="mb-2 flex justify-between">
                            <span className="text-[14px] font-semibold text-black-70">
                              Appointment:
                            </span>
                            <span className="text-[14px] text-black-80">
                              {dayjs(appointmentDate).format("MMM DD, YYYY")}
                            </span>
                          </div>
                          <div className="mb-2 flex justify-between">
                            <span className="text-[14px] font-semibold text-black-70">
                              Start Time:
                            </span>
                            <span className="text-[14px] text-black-80">
                              {dayjs(
                                timeObj?.startTime?.slice(0, 5),
                                "HH:mm"
                              ).format("hh:mm A")}
                            </span>
                          </div>
                          <div className="mb-2 flex justify-between">
                            <span className="text-[14px] font-semibold text-black-70">
                              End Time:
                            </span>
                            <span className="text-[14px] text-black-80">
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
                    <span className="text-[14px] font-semibold text-black-70">
                      Retail Price:
                    </span>
                    <span className="text-[14px] text-black-80">
                      {currencySymbol}
                      {retailPrice}
                    </span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-[14px] font-semibold text-black-70">
                      Offer Price:
                    </span>
                    <span className="text-[14px] text-black-80">
                      {currencySymbol}
                      {offerPrice}
                    </span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-[14px] font-semibold text-black-70">
                      Tax:
                    </span>
                    <span className="text-[14px] text-black-80">
                      {currencySymbol}
                      {taxAmount}
                    </span>
                  </div>
                  {channel !== "events" && (
                    <>
                      <div className="mb-2 flex justify-between">
                        <span className="text-[14px] font-semibold text-black-70">
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
                        <span className="text-[14px] font-semibold text-black-70">
                          Valid Till:
                        </span>
                        <span className="text-[14px] text-[#ED0C10]">
                          {getFormattedDtNew(validTill, userTimeZone ?? "UTC")}
                        </span>
                      </div>

                      {"isVoucher" in vhr && vhr.isVoucher && (
                        <div className="mb-2 flex justify-between">
                          <span className="text-[14px] font-semibold text-black-70">
                            Business Generated Voucher ID:
                          </span>
                          <span className="text-[14px] text-black-80">
                            {vhr?.customVoucherCode}
                          </span>
                        </div>
                      )}

                      {/* Fyndr Generated Voucher with Action */}
                      <div className="mb-2 flex justify-between">
                        <span className="text-[14px] font-semibold text-[#4D4D4D]">
                          Fyndr Generated Voucher ID:
                        </span>
                        <Button
                          className="h-[46px] rounded-10 border border-[#257CDB] bg-[#F4F8FD] text-[#257CDB] hover:bg-[#F4F8FD]"
                          onClick={() => {
                            if ("objid" in vhr) {
                              setSelectedVoucher(vhr);
                            }
                            setRedeemOpen(true);
                          }}
                        >
                          <div className="text-[14px] font-normal leading-[20px] text-[#257CDB]">
                            {"objid" in vhr && vhr
                              ? `VHR-${(vhr.objid + "").padStart(10, 0)}`
                              : ""}
                          </div>
                        </Button>
                      </div>
                      {"offer_id" in vhr &&
                        vhr.appointment &&
                        vhr.appointment.length > 0 &&
                        vhr.appointment[index] === undefined && (
                          <div className="mb-8 justify-between">
                            <div>
                              <span className="size-[16px] font-semibold text-primary">
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

      <ActionsDialog
        open={redeemOpen}
        onOpenChange={() => setRedeemOpen(false)}
        type={type}
        row={selectedVoucher}
        title="Redeem Voucher"
        currencySymbol={currencySymbol}
        fname={firstName}
        lname={lastName}
        indvid={indvid}
        refetch={refetch}
      />
    </>
  );
};

export default Offersdetails;
