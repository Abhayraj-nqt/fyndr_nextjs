import z from "zod";

// export const OfferSchema = z.object({
//   title: z.string().min(1, "Please Enter Title"),
//   voucher: z.string().optional(),
//   discount: z.string().optional(),

//   amount: z.string({ invalid_type_error: "Amount must be a number" }),

//   offerLimit: z.number().optional(),

//   offerPrice: z.number({ invalid_type_error: "Offer Price must be a number" }),

//   perUserLimit: z.string(),

//   taxPercent: z
//     .string({
//       invalid_type_error: "Tax Percent must be a greater or equal to 0",
//     })
//     .optional(),

//   repurchasePeriod: z
//     .string({
//       invalid_type_error:
//         "Repurchase Period must be a greater than or equal to 0",
//     })
//     .optional(),
// });

export const OfferSchema = z.object({
  title: z.string().min(1, "Please Enter Title"),

  amount: z.string({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number",
  }),

  discountType: z.string().optional(),

  retailPrice: z.coerce
    .number({
      required_error: "Retail Price is required",
      invalid_type_error: "Retail Price must be a number",
    })
    .min(0, "Retail Price must be greater than or equal to 0"),

  offerPrice: z.union([
    z.string({ invalid_type_error: "Offer Price must be a number" }),
    z.number(),
  ]),

  offersAvailable: z
    .union([z.string(), z.number(), z.null()])
    .optional()
    .nullable(),

  offerLimit: z.union([z.string(), z.number()]).optional().nullable(),

  currency: z.string().optional(),
  currencySymbol: z.string().optional(),

  status: z.enum(["active", "inactive"]),

  isNew: z.boolean().optional(),

  offerType: z.string(),

  usageLimit: z.union([z.string(), z.number()]),

  validityPeriod: z.string(),

  stdTax: z.boolean(),

  taxPercent: z
    .string({
      invalid_type_error: "Tax Percent must be a number",
    })
    .optional(),

  isBookingEnabled: z.boolean().optional(),

  displayOrder: z.union([z.string(), z.number()]).optional(),

  repurchasePeriod: z.coerce
    .number({
      invalid_type_error: "Repurchase Period must be a positive number",
    })
    .optional(),

  voucherFile: z.any().nullable().optional(),
  voucherFileName: z.string().nullable().optional(),
  isVoucher: z.boolean().nullable().optional(),
  couponCode: z.string().optional().nullable(),
  offerSold: z.string().optional().nullable(),
});
