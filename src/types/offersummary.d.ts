export type Remarks = {
   
    currentValue: number;
    lat: null | number;
    lng: null | number;
    message: null;
    redeemedValue: 12;
    status: "partially-redeemed" | string;
    time: string;
    updatedBy: string;
  };


type OfferPurchaseProps = {
  buyerName: string;
  buyerPhone: string;
  currencySymbol: currencySymbol;
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
  isVoucher?: boolean; 
  customVoucherCode?: string;
  slotEndTime: null;
  slotStartTime: null;
  remarks: Remarks[];
};


