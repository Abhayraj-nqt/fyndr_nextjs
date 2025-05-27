type OfferPurchaseProps = {
  buyerName: string;
  buyerPhone: string;
  currencySymbol: string;
  currentValue: number;
  fyndrCash: number;
  invoiceDt: string; 
  invoiceId: number;
  objid: number;
  offerId: number;
  offerPrice: number;
  offerTitle: string;
  redeemptionStatus: "unused" | "redeemed" | "partially-redeemed" | string; // adjust if fixed set known
  redemptionDt: string | null;
  redemptionTime: string | null;
  remarks: string | null;
  retailPrice: number;
  validTill: string; 
  voucherCode: string;
  appointment: {
    bookingDate: null | string | unknown;
    slotStartTime: null | string | unknown;
    slotEndTime: null | string | unknown;
    bookingDay: null | string | unknown;
  };
  bookingDate: null;
  bookingDay: null;
  slotEndTime: null;
  slotStartTime: null;
  remark: {
    currentValue: number;
    lat: null | number;
    lng: null | number;
    message: null;
    redeemedValue: 12;
    status: "partially-redeemed" | string;
    time: string;
    updatedBy: string;
  }[];
};
