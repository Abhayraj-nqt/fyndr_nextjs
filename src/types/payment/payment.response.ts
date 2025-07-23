export type VerifyPaymentResponse = {
  success: boolean;
  pay: { payment_method: "visa" | string };
};
