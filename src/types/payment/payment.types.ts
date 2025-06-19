export type PaymentMethod = {
  brand: string | "visa";
  country: string | "FR";
  created: number;
  default: string | "y";
  exp_month: number;
  exp_year: number;
  id: string;
  last4: string;
};
