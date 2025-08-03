import { DiscountType } from "../global";

// export type AppointmentSlotPayload = {
//   startTime: string;
//   endTime: string;
//   bookingDay: string;
//   locId: number;
//   objId: number;
// };

export type AppointmentSlot = {
  startTime: string;
  endTime: string;
  bookingDay: string;
  locId: number;
  objId: number;
};

export type AppointmentSlotPayload = Record<string, AppointmentSlot>;

export type Offer = {
  // appointment?: Record<string, AppointmentSlotPayload>[];
  appointment?: AppointmentSlotPayload[];
  discount_amount: number;
  discount_type: DiscountType;
  offer_id: number;
  offer_price: number;
  qty: number;
  qty_total: string;
  retail_price: number;
  row_tax: string;
  row_total: string;
  title: string;
  unit_tax: string;
  usage_limit: number;
  validity_period: "CMPN" | string;
};

export type InvoiceDetails = {
  business_country: string;
  business_name: string;
  cmpn_end_dt: number;
  cmpn_id: number;
  cmpn_title: string;
  fine_print: string;
  locId: number;
  loc_name: string;
  offers: Offer[];
  tax_rate: number;
};
