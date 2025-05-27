import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please provide a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long. " })
    .max(100, { message: "Password cannot exceed 100 characters." }),
});

// Basic user information schema (shared between individual and business)
export const BaseSignupSchema = z.object({
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
  ctryCode: z.string().min(1, { message: "Country code is required." }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required." })
    .regex(/^\d+$/, { message: "Phone number can only contain digits." }),
  country: z.string().min(1, { message: "Country is required." }),
  postalCode: z.string().min(1, { message: "Postal code is required." }),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().min(1, { message: "City is required." }),
  state: z.string().min(1, { message: "State is required." }),
  isBusiness: z.boolean().default(false),
  referralCode: z.string().nullable().optional(),
  promoCode: z.string().nullable().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  regMode: z.string(),
});

// Business specific information schema
const BusinessInfoSchema = z.object({
  bizName: z.string().min(1, { message: "Business name is required." }), // !info: req
  bizType: z.string().min(1, { message: "Business type is required." }),
  website: z.string().optional(),
  tags: z.string().optional(),
});

// Individual user registration schema
export const IndividualSignUpSchema = BaseSignupSchema;

// Business user registration schema (extends the base schema)
export const BusinessSignUpSchema = BaseSignupSchema.extend({
  bizInfo: BusinessInfoSchema,
  accountStatus: z
    .enum(["ACTIVE", "INACTIVE", "PENDING"])
    .optional()
    .default("ACTIVE"),
  findUsId: z.number().optional(),
});

// Combined schema that handles both individual and business registrations
// export const SignUpSchema = z.discriminatedUnion("isBusiness", [
//   z
//     .object({
//       isBusiness: z.literal(false),
//     })
//     .merge(IndividualSignUpSchema),
//   z
//     .object({
//       isBusiness: z.literal(true),
//     })
//     .merge(BusinessSignUpSchema),
// ]);

// -------------------------------

const individualPayload = {
  email: "indivdual-tesclassi@yopmail.com",
  firstName: "Fynraa",
  lastName: "Tet",
  ctryCode: "+1",
  phone: "8736866461",
  country: "US",
  postalCode: "85001",
  addressLine1: "",
  addressLine2: "",
  city: "Phoenix",
  state: "AZ",
  isBusiness: false,
  referralCode: null,
  promoCode: null,
  lat: 33.4483771,
  lng: -112.0740373,
  pwd: ["ß", "Õ", "¨", "x", "©", "\f", "4", "µ", "v", "8", "Ò", "¾", "¡", "G"],
  regMode: "classic",
};

const businessPayload = {
  email: "arti.mishra123@yopmail.com",
  firstName: "Arti",
  lastName: "Mishra",
  ctryCode: "+1",
  phone: "2121212122",
  country: "US",
  postalCode: "55001",
  addressLine1:
    "Rewa Nagar Colony, shivalaya chowk near chankaya school jarjola road",
  addressLine2: "Rewa Nagar Colony",
  city: "Afton",
  state: "MN",
  isBusiness: true,
  referralCode: null,
  promoCode: null,
  lat: 44.9027452,
  lng: -92.78353729999999,
  pwd: [
    "%",
    "c",
    "Ü",
    "F",
    "R",
    "ù",
    "¾",
    "\u001c",
    "",
    "³",
    "ô",
    "Ö",
    "¶",
    "\r",
    "r",
    "Õ",
  ],
  regMode: "classic",

  // -------------------------------------

  bizInfo: {
    bizName: "Test Acc123",
    bizType: "Accounting",
    website: "test.com",
    tags: "",
  },
  accountStatus: "ACTIVE",
  findUsId: 8,
};

export const SignUpSchema = z.object({
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
  yob: z
    .string()
    .regex(/^\d+$/, { message: "Year of birth can only contain digits." })
    .max(4, { message: "Year of birth can only contain 4 digits" })
    .optional(),
  gender: z.enum(["M", "F", "ND", "OT"]).nullable().optional(),
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
});

export type SignUpSchemaProps = z.infer<typeof SignUpSchema>;

// -------------------------------------------------------------------------

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

export type IndividualFormData = z.infer<typeof IndividualFormSchema>;
export type BusinessFormData = z.infer<typeof BusinessFormSchema>;
export type SignUpFormData = IndividualFormData | BusinessFormData;

export type FormContext = "registration" | "profile";
export type UserType = "individual" | "business";
