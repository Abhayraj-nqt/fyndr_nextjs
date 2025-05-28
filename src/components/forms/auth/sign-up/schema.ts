import z from "zod";

export const BaseUserSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),
  firstName: z
    .string()
    .min(1, { message: "First name is required." })
    .max(50, { message: "First name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "First name can only contain letters and spaces.",
    }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required." })
    .max(50, { message: "Last name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Last name can only contain letters and spaces.",
    }),
  country: z.string().min(1, { message: "Country is required." }),
  ctryCode: z.string().min(1, { message: "Country code is required." }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required." })
    .regex(/^\d+$/, { message: "Phone number can only contain digits." }),
  postalCode: z
    .string()
    .min(1, { message: "Zip code is required." })
    .regex(/^\d+$/, { message: "Zip code can only contain digits." }),
  addressLine1: z.string(),
  addressLine2: z.string(),
  city: z.string().min(1, { message: "City is required." }),
  state: z.string().min(1, { message: "State is required." }),
  referralCode: z.string().nullable(),
  promoCode: z.string().nullable(),
  findUsId: z.number(),

  isBusiness: z.boolean(),
  regMode: z.string(),
  lat: z.number(),
  lng: z.number(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});

export const IndividualFormSchema = BaseUserSchema.omit({
  password: true,
  regMode: true,
  isBusiness: true,
}).extend({
  yob: z
    .string()
    .transform((val) => (val === "" ? null : val))
    .nullable()
    .refine((val) => val === null || (val.length === 4 && /^\d+$/.test(val)), {
      message: "Year of birth must be exactly 4 digits",
    })
    .default(null),
  gender: z.enum(["M", "F", "ND", "OT"]).nullable().default(null),
});

export const BusinessFormSchema = BaseUserSchema.omit({
  password: true,
  regMode: true,
  isBusiness: true,
}).extend({
  bizName: z.string().min(1, "Business name is required"),
  bizType: z.string().min(1, "Business type is required"),
  website: z.string().url("Invalid URL").or(z.literal("")).default(""),
  tags: z.array(z.string()).default([]), // Array of strings
  accountStatus: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE").optional(),
});

export type IndividualFormData = z.infer<typeof IndividualFormSchema>;
export type BusinessFormData = z.infer<typeof BusinessFormSchema>;
export type FormData = IndividualFormData | BusinessFormData;
