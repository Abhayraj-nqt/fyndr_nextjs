import z from "zod";

export const OfferSchema = z.object({
  title: z.string().min(1, "Please Enter Title"),
  voucher: z.string().optional(),
  discount: z.string().optional(),

  amount: z.string({ invalid_type_error: "Amount must be a number" }),

  offerLimit: z.string().optional(),

  offerPrice: z.string({ invalid_type_error: "Offer Price must be a number" }),

  perUserLimit: z.string(),

  taxPercent: z
    .string({
      invalid_type_error: "Tax Percent must be a greater or equal to 0",
    })
    .optional(),

  repurchasePeriod: z
    .string({
      invalid_type_error:
        "Repurchase Period must be a greater than or equal to 0",
    })
    .optional(),
});
