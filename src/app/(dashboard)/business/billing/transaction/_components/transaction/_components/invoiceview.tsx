"use client";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, { useEffect, useState } from "react";

import Buttons from "@/components/global/buttons/invoice-buttons";
import Bizcard from "@/components/global/invoice/bizcard";
import Overallreview from "@/components/global/invoice/overallreview";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/auth";
import { useInvoiceDetails, useUserReviewOverViews } from "@/hooks/invoice";
import {
  capitalize,
  getTotal,
  getTruncatedTitle,
  parseAddress,
  parseAddressInvoice,
  sumQuantities,
} from "@/lib/utils";
import { ReviewOverviews } from "@/types/api-response/review.response";
import {
  Address,
  Biz,
  fetchInvoice,
  GiftDetails,
  InvoiceOffer,
  Offer,
} from "@/types/api-response/transaction.response";

import GifteeDetails from "./giftedetails";
import Invoicetotal from "./invoicetotal";
import Offersdetails from "./offersdetails";

type InvoiceViewProps = {
  inv?: fetchInvoice[] | null;
  type: string | null;
};

dayjs.extend(utc);
dayjs.extend(timezone);
const Invoiceview: React.FC<InvoiceViewProps> = ({ inv, type }) => {
  console.log("inv", inv);
  const firstInvoice = inv?.[0];
  // Destructure from props or wherever 'firstInvoice' comes from
  const {
    objid,
    baseAmount,
    taxAmount,
    tipAmount,
    invoiceDt,
    fulfiled,
    currencySymbol,
    status,
    invoiceDetails,
    buyerFname,
    buyerLname,
    channel,
  } = firstInvoice;

  // 1. State hooks
  const [biz, setBiz] = useState<Biz | null>(null);
  const [billingAddress, setBillingAddress] = useState<Address | null>(null);
  const [brand, setBrand] = useState<string>("");
  const [last4, setLast4] = useState<string>("");
  const [billingEmail, setBillingEmail] = useState<string>("");
  const [purchaseLoc, setPurchaseLoc] = useState<Address | null>(null);
  const [disputeStatus, setDisputeStatus] = useState<string | null>(null);
  const [gifteeDetails, setGifteeDetails] = useState<GiftDetails | null>(null);
  const [vouchers, setVouchers] = useState<InvoiceOffer[] | null>(null);
  const [appointment, setAppointment] = useState<Offer[] | null>(null);
  const [fyndrCash, setFyndrCash] = useState<number>(0);
  const [businessId, setBusinessId] = useState<number | null>(null);
  const [promoImage, setPromoImage] = useState<string>("");
  const [invoiceId, setInvoiceId] = useState<number | null>(null);
  const [reviewOverviews, setReviewOverviews] = useState<ReviewOverviews>();
   const [seeAllComments, setSeeAllComments] = useState<boolean>(false);
  // 2. Fetch user
  const { user, isLoading: isUserLoading, error } = useUser();

  // 3. Prepare user values for useInvoiceDetails
  const bizid = user?.bizid ?? null;
  const indvid = user?.indvid ?? null;
  const userTimeZone = user?.userTimeZone;

  console.log(user?.isBusiness, "type");

  // 4. Fetch invoice details hook - this must be called unconditionally
  const { data: invoiceDetailsResp, isLoading: isInvoiceLoading } =
    useInvoiceDetails(objid, type, bizid, indvid);

  // 5. Populate state when invoiceDetailsResp is updated
  useEffect(() => {
    if (!invoiceDetailsResp) return;

    setBiz(invoiceDetailsResp.biz ?? null);
    setBillingEmail(invoiceDetailsResp.buyerEmail ?? "");
    setBillingAddress(invoiceDetailsResp.billingAddress ?? null);
    setPurchaseLoc(invoiceDetailsResp.businessLocationAddress ?? null);
    setDisputeStatus(invoiceDetailsResp.disputeStatus ?? null);
    setGifteeDetails(invoiceDetailsResp.gifteeDetails ?? null);
    setVouchers(invoiceDetailsResp.offers ?? null);
    setFyndrCash(invoiceDetailsResp.fyndrCash);
    setBusinessId(invoiceDetailsResp?.biz?.bizid ?? null);
    setPromoImage(invoiceDetailsResp?.fyndrLogo ?? "");
    setInvoiceId(invoiceDetailsResp?.invoiceId);
    setAppointment(
      (invoiceDetailsResp.invoiceDetails?.offers as Offer[]) ?? null
    );

    if (invoiceDetailsResp.payments) {
      setBrand(invoiceDetailsResp.payments.cardBrand);
      setLast4(invoiceDetailsResp.payments.cardLast4);
    }
  }, [invoiceDetailsResp]);

  const { data: reviewOverviewsresp, isLoading: reviewOverviewsLoading } =
    useUserReviewOverViews(invoiceDetailsResp?.biz?.bizid);

    console.log("review response", reviewOverviewsresp);
  useEffect(() => {
    if (!reviewOverviews) return;

    setReviewOverviews(reviewOverviewsresp);
    setBusinessId(reviewOverviewsresp?.bizId ?? null);
  }, [reviewOverviews]);

  console.log("invoice : D", invoiceDetailsResp);
   const startDate = invoiceDetails?.featured_start_date && new Date(invoiceDetails?.featured_start_date);
  const endDate =
    invoiceDetails?.featured_end_date &&
    new Date(invoiceDetails?.featured_end_date);

  console.log("end Date", endDate);
  // 6. Handle early returns AFTER hooks
  if (isUserLoading || isInvoiceLoading) return <div>Loading...</div>;
  if (error) return <div>Some error occurred</div>;
  if (!user) return <div>User not found</div>;
  if (!invoiceDetailsResp) return <div>No invoice data available</div>;

  console.log("biz", biz);
  console.log("invoice details Resp", invoiceDetailsResp);

  console.log("invoice D ", invoiceDetails);
  console.log("firstInvoice ", firstInvoice);

  const totalAmount = firstInvoice ? Number(getTotal(firstInvoice)) : 0.0;
  const date1 = new Date(invoiceDt);
  const date2 = new Date();

  const DifferenceInTime = date2.getTime() - date1.getTime();
  const DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24);
  // ... continue JSX render below

  console.log(type, "type ---");

  console.log("dispute", disputeStatus);

  console.log("details", invoiceDetails?.items || invoiceDetails?.offers);
  console.log("review response", reviewOverviewsresp)
  return (
    <>
      <div>
        {biz !== null && (
          <div>
            <Bizcard
              businessLogo={
                channel !== "cmpn_promo" ? biz?.mainLogo : promoImage
              }
              businessName={biz.bizName}
              businessWebsite={biz.website ?? ""}
              businessAddonUrl={biz.addonUrl ?? ""}
              businessAddress={parseAddress(biz)}
              businessPhone={biz.addonUrl ?? ""}
              channel={channel}
              invoiceId={invoiceId}
              giftDetails={gifteeDetails}
              vouchers={vouchers}
              reviewRatings={
                reviewOverviewsresp && (
                  <Overallreview
                    disable={true}
                    reviewsOverview={reviewOverviewsresp}
                    rating = {reviewOverviewsresp?.overallRating ?? 0 }
                    text =" out of 5"
                    totalRatings ={`(${reviewOverviewsresp?.totalRatings} Reviews)`}
                    onClick ={()=>{
                     setSeeAllComments(true);
                    }}
                  />
                )
              }
            />
          </div>
        )}
        <div className="flex rounded-[10px] border border-[#D3D6E1] px-3 pt-2">
          <div style={{ width: "100%" }}>
            <div className="mb-[8px] flex justify-between text-[#257CDB]">
              <span className="text-base font-semibold">Invoiced to:</span>
              <span className="text-base font-semibold">
                {buyerFname} {buyerLname}
              </span>
            </div>

            {(channel === "offers" || channel === "offer_appointment") && (
              <div className="mb-[8px] flex justify-between">
                <span className="text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                  Purchased as gift:
                </span>
                <span className="text-[14px] font-semibold leading-[20px] text-[#333333]">
                  {gifteeDetails !== null ? "Yes" : "No"}
                </span>
              </div>
            )}
            {channel === "catalog" && (
              <>
                <div className="mb-[8px] flex justify-between">
                  <span className="text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                    Delivered:
                  </span>
                  <span className="text-[14px] font-semibold leading-[20px] text-[#333333]">
                    {fulfiled ? capitalize(fulfiled) : "NA"}
                  </span>
                </div>
                <div className="mb-[8px] flex justify-between">
                  <span className="text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                    Delivery Time:
                  </span>
                  <span className="text-[14px] font-semibold leading-[20px] text-[#333333]">
                    {capitalize(invoiceDetails?.deliveryTime)}
                  </span>
                </div>
              </>
            )}

            {(channel === "cmpn_promo" || channel === "promo") && (
              <>
                <div className="mb-[8px] flex justify-between">
                  <span className="text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                    Campaign Name:
                  </span>
                  <span className="ml-4 flex-1 text-right text-[14px] font-semibold leading-[20px] text-[#333333]">
                    {invoiceDetails?.title?.includes(":")
                      ? getTruncatedTitle(
                          invoiceDetails.title.split(":")[1].trim()
                        )
                      : getTruncatedTitle(invoiceDetails?.title)}
                  </span>
                </div>

                {invoiceDetails?.promo_channels.includes("featured") && (
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
                        {`${invoiceDetails?.duration} ${
                          invoiceDetails?.duration === 1 ? "Month" : "Months"
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

                {(invoiceDetails?.promo_channels.includes("mobile_push") ||
                  invoiceDetails?.promo_channels.includes("email")) && (
                  <div className="mb-[8px] flex justify-between">
                    <span className="text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                      Promotion type:
                    </span>
                    <span className="text-[14px] font-semibold leading-[20px] text-[#333333]">
                      {invoiceDetails?.promo_channels
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
            <div className="mb-[8px] flex items-center justify-between">
              <span className="w-1/3 text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                Payment Status:
              </span>
              <span className="w-1/3 text-right text-[14px] font-semibold leading-[20px] text-[#333333]">
                {capitalize(status)}
              </span>
              {/* {status === "pending" && (
                <button
                  onClick={() => setModalVisible(true)}
                  className="w-1/3 text-right"
                >
                  <button
                    onClick={() => setModalVisible(true)}
                    className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    Mark as Paid
                  </button>
                </button>
              )} */}
            </div>

            {(channel !== "cmpn_promo" || channel !== "promo") && (
              <div className="mb-[8px] flex justify-between">
                <span className="text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                  Date Invoiced:
                </span>
                {userTimeZone && (
                  <span className="text-[14px] font-semibold leading-[20px] text-[#333333]">
                    {dayjs(invoiceDt).tz(userTimeZone).format("MMM DD, YYYY")}
                  </span>
                )}
              </div>
            )}

            {channel === "custom" && (
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                    Invoice #:
                  </span>
                  <span className="text-[14px] font-semibold leading-[20px] text-[#333333]">
                    {invoiceDetails.invoice_nbr}
                  </span>
                </div>

                {invoiceDetails.cust_message !== null && (
                  <div className="mb-2 flex justify-between">
                    <span className="text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                      Message:
                    </span>
                    <span className="text-[14px] font-normal leading-[20px] text-[#333333]">
                      {invoiceDetails.cust_message}
                    </span>
                  </div>
                )}

                <div className="mb-2 flex justify-between">
                  <span className="text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                    Associate Name:
                  </span>
                  <span className="text-[14px] font-semibold leading-[20px] text-[#333333]">
                    {invoiceDetails.server_name}
                  </span>
                </div>
              </div>
            )}

            {status === "paid" && brand !== undefined && brand !== "" && (
              <div className="mb-2 flex justify-between">
                <span className="text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                  Payment Method:
                </span>
                <span className="text-[14px] font-semibold leading-[20px] text-[#333333]">
                  {capitalize(brand)}
                </span>
              </div>
            )}
            {billingEmail !== "" && (
              <div className="mb-2 flex justify-between">
                <span className="text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                  Billing Email:
                </span>
                <span className="text-[14px] font-semibold leading-[20px] text-[#333333]">
                  {billingEmail}
                </span>
              </div>
            )}
            {billingAddress && Object.keys(billingAddress).length > 0 && (
              <div className="mb-[8px] flex justify-between">
                <span className="text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                  Billing Address:
                </span>
                <span className="text-right text-[14px] font-semibold leading-[20px] text-[#333333]">
                  {parseAddressInvoice(billingAddress)}
                </span>
              </div>
            )}
            {purchaseLoc && Object.keys(purchaseLoc).length > 0 && (
              <div className="mb-[8px] flex justify-between">
                <span className="text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                  Location:
                </span>
                <span className="text-right text-[14px] font-semibold leading-[20px] text-[#333333]">
                  {parseAddressInvoice(purchaseLoc)}
                </span>
              </div>
            )}

            {type === "payable" && disputeStatus !== null && (
              <div className="mb-[8px] flex justify-between">
                <span className="text-[14px] font-semibold leading-[20px] text-[#4D4D4D]">
                  Dispute Status:
                </span>
                <span className="text-[14px] font-semibold leading-[20px] text-red-600">
                  {disputeStatus
                    ? disputeStatus.charAt(0).toUpperCase() +
                      disputeStatus.slice(1).toLowerCase()
                    : ""}
                </span>
              </div>
            )}
            {/* {channel === "catalog" && (
              <Button onClick={() => alert("QR code")}>Show QR Code</Button>
            )} */}
          </div>
        </div>

        {
          /* {(channel === "catalog" || channel === "catalog_appointment") && renderListItems()} */
          console.log(invoiceDetails?.appointment_per_cart)
        }

        {gifteeDetails !== null && (
          <GifteeDetails giftDetails={gifteeDetails} />
        )}

        {invoiceDetails.offers && (
          <Offersdetails
            offersDetails={invoiceDetails.offers}
            channel={channel}
            vouchers={vouchers}
            appointments={appointment}
            currencySymbol={currencySymbol}
            taxAmount={taxAmount}
            userTimeZone={userTimeZone ?? null}
          />
        )}

        <div className="mt-3 rounded-[10px] border border-[#D3D6E1] p-3">
          <Invoicetotal
            channel={channel}
            invoiceDetails={invoiceDetails}
            currencySymbol={currencySymbol}
            baseAmount={baseAmount}
            taxAmount={taxAmount}
            fyndrCash={fyndrCash}
            tipAmount={tipAmount}
            totalAmount={totalAmount}
            isBusiness={user?.isBusiness}
            type={type}
            itemsDetails={invoiceDetails?.items || invoiceDetails?.offers}
            endDate={endDate}
          />
        </div>

        <Buttons
          btn1="Print"
          onClick1={() => window.print()}
          btn2={
            type === "payable" &&
            disputeStatus === null &&
            Math.round(DifferenceInDays) <= 30 &&
            "Raise a dispute"
          }
          onClick2={() => {
            // disputeReasons();
            // setText("");
            // setSelectedDispute("");
            // setRaiseDispute(true);
          }}
          showPopover={
            Math.round(DifferenceInDays) > 30 ||
            disputeStatus !== null ||
            businessId === user?.bizid
          }
        />
      </div>
    </>
  );
};

export default Invoiceview;
