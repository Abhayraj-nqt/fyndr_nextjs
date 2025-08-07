export type MakePaymentResponse = {
  success: boolean;
  pay: { payment_method: "visa" | string };
};
