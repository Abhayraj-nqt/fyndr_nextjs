export type InvoiceSummary = {
  totalAmountByInvoiceStatuses: {
    paid: number;
    pending: number;
  };
  totalAmountByInvoiceChannels: {
    offers: number;
    events: number;
    catalog: number;
  };
  currencySymbol: string;
  userRegistrationDt: string;
};

export type Appointment = {
  [date: string]: {
    bookingDay?: string;
    endTime?: string;
    locId?: number;
    startTime?: string;
    objId?: number;
  };
};

export type Offer = {
  offer_id: number;
  offer_price: number;
  qty: number;
  retail_price: number;
  title: string;
  usage_limit: number;
  discount_type: "%" | "flat";
  discount_amount: number;
  validity_period: "CMPN" | "OFFER";
  qty_total: string;
  row_tax: string;
  row_total: string;
  unit_tax: string;
  appointment?: Appointment[];
};

export type OfferResponse = {
  business_name: string;
  business_country: string;
  cmpn_id: number;
  cmpn_end_dt: string;
  cmpn_title: string;
  fine_print: string;
  tax_rate: number;
  loc_name: string;
  locId: number;
  offers: Offer[];
};

export type PromoResponse = {
  title: string;
  cmpn_id: number;
  business_name: string;
  business_country: string;
  criteria: {
    locList: {
      [key: string]: {
        id: number;
        addressName: string;
        lat: number;
        lng: number;
        radius: number;
        total: number;
      };
    };
  };
  schedule_time: string;
  promo_channels: string;
  featured_start_date: string;
  featured_end_date: string | null;
  duration: number | null;
};

export type ParentLocation = {
  objid: number;
  qrid: number;
  bizid: number;
  locName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  lat: number;
  lng: number;
  createdDt: string | null;
  updatedDt: string | null;
  ctryCode: string;
  status: string;
  locType: string | null;
  parentLocation: ParentLocation | null;
  deliveryWithin: string | null;
  deliveryOptions: string;
  timeZone: string;
  workingHours: string;
  distance: string | null;
  catalogueId: string | null;
  biz: any;
  workingHoursAndSlots: any;
};

export type Mitem = {
  objid: number;
  name: string;
  stdTax: boolean;
  taxPercent: number | null;
  img_url: string;
  appointment?: Appointment[];
};

export type Item = {
  catalogue_item_id: string;
  details: {
    key: string;
    objid: number;
    price: number;
    unitPrice: number;
    qty: number;
    total: number;
    unit: string;
    whole: any | null;
    addon: any[];
    mitem: Mitem;
    currencySymbol: string;
    currency: string;
    instruction: string | null;
    wholeDetails: any;
    addonDetails: any[];
    taxRate: number;
    tax: string;
  };
};

export type CatalogResponse = {
  business_name: string;
  business_country: string;
  locName: string;
  locId: number;
  parentLocation: ParentLocation;
  catalogueId: number;
  catalogueName: string;
  title: string;
  invoice_nbr: string;
  cust_message: string | null;
  server_name: string;
  items: Item[];
  appointment_per_cart: Appointment;
  deliveryTime: string;
};

export type CustomResponse = {
  business_name: string;
  business_country: string;
  title: string;
  invoice_nbr: string;
  server_name: string;
  cust_message: string;
  item_or_service: string;
  img_url: string | null;
};

export type fetchInvoice = {
  objid: number;
  invoiceDt: string;
  invoiceDetails:
    | OfferResponse
    | CatalogResponse
    | PromoResponse
    | CustomResponse;
  taxAmount: number;
  baseAmount: number;
  tipAmount: number;
  discountAmount: number;
  currency: string;
  currencySymbol: string;
  buyerId: number;
  merchantId: string;
  status: string;
  channel: string;
  buyerCountry: string;
  buyerState: string;
  buyerPostalCode: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerFname: string;
  buyerLname: string;
  includesTax: boolean | null;
  bizid: number;
  fyndrCash: number;
  isOfferGifted: boolean;
  isDisputed: boolean;
  isVoucher: boolean;
  dueDate: string | null;
};

export type fetchInvoiceResponse = {
  count: number;
  invoices: fetchInvoice[];
  last: boolean;
};
