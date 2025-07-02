import { z } from "zod";

export const InvoiceFormSchema = z
  .object({
    type: z.enum(["email", "mobile"], {
      required_error: "Please select a contact method.",
    }),

    email: z.string().optional().or(z.literal("")),

    mobile: z.string().optional().or(z.literal("")),
    title: z.string().min(1, "Title is required"),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    serviceName: z.string().optional(),
    invoiceId : z.string().min(1,"Invoice # is required"),
    serverName: z.string().optional(),
    msg : z.string().optional(),
    baseAmount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => /^\d*\.?\d*$/.test(val), {
      message: "Only positive numbers are allowed",
    }),
    duedate: z.string().optional(),
   tipAllowed: z.boolean().optional(),
   isTaxIncluded: z.boolean().optional(),
   isImageIncluded:z.string().optional(),

  })
  .refine(
    (data) => {
      if (data.type === "email") {
        return (
          data.email &&
          data.email.length > 0 &&
          z.string().email().safeParse(data.email).success
        );
      }
      return true;
    },
    {
      message: "Valid email is required",
      path: ["email"],
    }
  )
  .refine(
    (data) => {
      if (data.type === "mobile") {
        return (
          data.mobile &&
          data.mobile.length === 10 &&
          /^\d{10}$/.test(data.mobile)
        );
      }
      return true;
    },
    {
      message: "Mobile number must be exactly 10 digits",
      path: ["mobile"],
    }
  );

export type InvoiceFormData = z.infer<typeof InvoiceFormSchema>;
