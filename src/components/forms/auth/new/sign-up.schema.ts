import z from "zod";

export const BaseUserSchema = {
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
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().min(1, { message: "City is required." }),
  state: z.string().min(1, { message: "State is required." }),
  referralCode: z.string().nullable().optional(),
  promoCode: z.string().nullable().optional(),
  findUsId: z.number().optional(),

  isBusiness: z.boolean(),
  regMode: z.string(),
  lat: z.number().optional(),
  lng: z.number().optional(),
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
};

export const IndividualFormSchema = z.object({
  ...BaseUserSchema,
  yob: z
    .string()
    .regex(/^\d+$/)
    .max(4, { message: "Year of birth can only contain 4 digits" })
    .optional(),
  gender: z.enum(["M", "F", "ND", "OT"]).nullable().optional(),
});

export const BusinessFormSchema = z.object({
  ...BaseUserSchema,
  bizName: z.string().min(1, "Business name is required"),
  bizType: z.string().min(1, "Business type is required"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  tags: z.string().optional(),
  accountStatus: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});
