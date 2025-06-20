import z from "zod";

export const itemSchema = z.object({
  name: z.string().min(1, "Please Enter Name"),
  description: z.string().optional(),
  image: z
    .array(
      z.object({
        img: z.any(),
        index: z.number(),
        extn: z.string(),
        imgUri: z.string(),
      })
    )
    .optional(),
  sku: z.string().optional(),
  unit: z.string().min(1, "Please Select"),
  stdTax: z.boolean().optional(),
  taxPercent: z
    .string({
      invalid_type_error:
        "Please enter the tax percentage or enable standard tax",
    })
    .min(0, "Tax cannot be negative")
    .optional(),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Please Enter Name"),
  description: z.string().optional(),
  image: z
    .array(
      z.object({
        img: z.any(),
        index: z.number(),
        extn: z.string(),
        imgUri: z.string(),
      })
    )
    .optional(),
});

export const modifierSchema = z.object({
  modName: z.string().min(1, "Please Enter Name"),
  description: z.string().optional(),
  image: z
    .array(
      z.object({
        img: z.any(),
        index: z.number(),
        extn: z.string(),
        imgUri: z.string(),
      })
    )
    .optional(),
  modType: z.string().optional(),
});
