import { channel } from "diagnostics_channel";

import React, { useEffect, useState } from "react";

import Bizcard from "@/components/global/invoice/bizcard";
import Overallreview from "@/components/global/invoice/overallreview";
import { Modal } from "@/components/global/modal";
import { useUser } from "@/hooks/auth";
import { useInvoiceDetails, useUserReviewOverViews } from "@/hooks/invoice";
import { ChannelOffer, parseAddress } from "@/lib/utils";
import { ReviewOverviews } from "@/types/api-response/review.response";
import {
  Address,
  Biz,
  CatalogResponse,
  GiftDetails,
  InvoiceOffer,
  Offer,
} from "@/types/api-response/transaction.response";
import InvoiceBasicInfo from "../../../invoiceview/invoice-basic-info";

type PrintActionProps = {
  row: OrdersResponse | null;
  onOpenChange: () => void;
  open: boolean;
  title: string;
};

const PrintAction = ({ row, onOpenChange, open, title }: PrintActionProps) => {
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
  const [disputeOpen, setDisputeOpen] = useState<boolean>(false);
  const [channel, setChannel] = useState<string>("");
  const [buyerFname ,setBuyerFname] = useState<string>("");
  const [buyerLname ,setBuyerLname] = useState<string>("");
  const [invoiceDt , setInvoiceDt] = useState<string>("");
  const [invoiceDetails , setInvoiceDetails] =  useState<CatalogResponse>({});

  const { user, isLoading: isUserLoading, error } = useUser();

  const bizid = user?.bizid ?? null;
  const indvid = user?.indvid ?? null;
  const userTimeZone = user?.userTimeZone;

  const objid = row?.invoiceId ?? null;

  console.log(objid, "objid");
  console.log(indvid, "indcid");
  const {
    data: invoiceDetailsResp,
    isLoading: isInvoiceLoading,
    refetch,
  } = useInvoiceDetails(objid, bizid, indvid, "receivable");

  console.log("invoice details resp in orders", invoiceDetailsResp);

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
    setChannel(invoiceDetailsResp?.channel);
    setBuyerFname(invoiceDetailsResp?.buyerFname);
    setBuyerLname(invoiceDetailsResp?.buyerLname);
    setInvoiceDt(invoiceDetailsResp?.invoiceDt);
    setInvoiceDetails(invoiceDetailsResp?.invoiceDetails);
    setAppointment(
      (invoiceDetailsResp.invoiceDetails?.offers as Offer[]) ?? null
    );

    if (invoiceDetailsResp.payments) {
      setBrand(invoiceDetailsResp.payments.cardBrand);
      setLast4(invoiceDetailsResp.payments.cardLast4);
    }
  }, [invoiceDetailsResp]);

  const { data: reviewOverviewsresp } = useUserReviewOverViews(
    invoiceDetailsResp?.biz?.bizid
  );

  useEffect(() => {
    if (!reviewOverviews) return;

    setReviewOverviews(reviewOverviewsresp);
    setBusinessId(reviewOverviewsresp?.bizId ?? null);
  }, [reviewOverviews]);
  return (
    <Modal open={open} onOpenChange={onOpenChange} title={title}>
      {biz && (
        <Bizcard
          businessLogo={channel !== "cmpn_promo" ? biz?.mainLogo : promoImage}
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
                rating={reviewOverviewsresp?.overallRating ?? 0}
                text=" out of 5"
                totalRatings={`(${reviewOverviewsresp?.totalRatings} Reviews)`}
              />
            )
          }
        />
      )}

      <InvoiceBasicInfo
          buyerFname={buyerFname}
          buyerLname={buyerLname}
          channel={channel}
          gifteeDetails={gifteeDetails}
          fulfiled={fulfiled}
          status={status}
          endDate={endDate}
          startDate={startDate}
          invoiceDetails={invoiceDetails}
          userTimeZone={userTimeZone}
          invoiceDt={invoiceDt}
          brand={brand}
          billingEmail={billingEmail}
          billingAddress={billingAddress}
          purchaseLoc={purchaseLoc}
          type={type}
          disputeStatus={disputeStatus}
          objid={inv?.[0]?.objid}
        />


    </Modal>
  );
};

export default PrintAction;
