import { capitalize, getTruncatedTitle } from '@/lib/utils';
import { CatalogResponse, CustomResponse, OfferResponse, PromoResponse } from '@/types/api-response/transaction.response';
import dayjs from 'dayjs';

import React from 'react'


type InvoicePromodetailsProps = {

    channel : string
     title : string
     promoChannels :string
     duration : number | null
     startDate : string
     userTimeZone : string | undefined
     endDate : string
     invoiceDt :string
}

const InvoicePromodetails = ({channel ,title ,promoChannels,duration ,userTimeZone ,startDate ,endDate ,invoiceDt} : InvoicePromodetailsProps) => {
  return (
    <div>
             {(channel === "cmpn_promo" || channel === "promo") && (
                      <>
                        <div className="mb-[8px] flex justify-between">
                          <span className="text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                            Campaign Name:
                          </span>
                          <span className="ml-4 flex-1 text-right text-[14px] font-semibold leading-[20px] text-[#333333]">
                            {title.includes(":")
                              ? getTruncatedTitle(
                                  title.split(":")[1].trim()
                                )
                              : getTruncatedTitle(title)}
                          </span>
                        </div>
        
                        {promoChannels.includes("featured") && (
                          <>
                            <div className="mb-[8px] flex justify-between">
                              <span className="text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                                Featured:
                              </span>
                              <span className="text-[14px] font-semibold leading-[20px] text-[#333333]">
                                Yes
                              </span>
                            </div>
        
                            <div className="mb-[8px] flex justify-between">
                              <span className="text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                                Featured Duration:
                              </span>
                              <span className="text-[14px] font-semibold leading-[20px] text-[#333333]">
                                {`${duration} ${
                                  duration === 1 ? "Month" : "Months"
                                }`}
                              </span>
                            </div>
        
                            <div className="mb-[8px] flex justify-between">
                              <span className="text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                                Featured Start Date:
                              </span>
                              <span className="text-[14px] font-semibold leading-[20px] text-[#333333]">
                                {dayjs.tz(startDate, userTimeZone).format("MMM DD, YYYY")}
                              </span>
                            </div>
        
                            <div className="mb-[8px] flex justify-between">
                              <span className="text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                                Featured End Date:
                              </span>
                              <span className="text-[14px] font-semibold leading-[20px] text-[#333333]">
                                {dayjs.tz(endDate, userTimeZone).format("MMM DD, YYYY")}
                              </span>
                            </div>
                          </>
                        )}
        
                        {(promoChannels.includes("mobile_push") ||
                          promoChannels.includes("email")) && (
                          <div className="mb-[8px] flex justify-between">
                            <span className="text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                              Promotion type:
                            </span>
                            <span className="text-[14px] font-semibold leading-[20px] text-[#333333]">
                              {promoChannels
                                .split(",")
                                .filter(
                                  (ch: string) => ch !== "in_app" && ch !== "featured"
                                )
                                .map((ch: string) =>
                                  ch === "mobile_push" ? "Phone" : capitalize(ch)
                                )
                                .join(", ")}
                            </span>
                          </div>
                        )}
        
                        <div className="mb-[8px] flex justify-between">
                          <span className="text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                            Promotion Date:
                          </span>
                          <span className="text-[14px] font-semibold leading-[20px] text-[#333333]">
                            {dayjs.tz(invoiceDt, userTimeZone).format("MMM DD, YYYY")}
                          </span>
                        </div>
        
                        <div className="mb-[8px] flex justify-between">
                          <span className="text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                            Promotion Time:
                          </span>
                          <span className="text-[14px] font-semibold leading-[20px] text-[#333333]">
                            {dayjs.tz(invoiceDt, userTimeZone).format("hh:mm A")}
                          </span>
                        </div>
                      </>
                    )}
    </div>
  )
}

export default InvoicePromodetails