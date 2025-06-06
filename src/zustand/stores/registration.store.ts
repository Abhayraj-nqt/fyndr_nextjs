import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

// Define the shape of business info
interface BusinessInfo {
  bizName?: string;
  bizType?: string;
  website?: string;
  tags?: string;
}

// Define gender type to match your payload
type Gender = "M" | "F" | "ND" | "OT" | null;

// Define registration mode type
type RegMode = "classic" | "google" | "facebook" | "apple";

// Define the registration state shape to match your payload structure
interface RegistrationState {
  // Base info
  email?: string;
  firstName?: string;
  lastName?: string;
  yob?: string;
  gender?: Gender;
  ctryCode?: string;
  phone?: string;
  country?: string;
  postalCode?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;

  // Flags and metadata
  isBusiness?: boolean;
  regMode?: RegMode;
  referralCode?: string | null;
  promoCode?: string | null;

  // Location
  lat?: number;
  lng?: number;

  // Password (stored as array for consistency with your example)
  pwd?: string[] | null;
  password?: string;

  // Business specific info
  bizInfo?: BusinessInfo;
  accountStatus?: "ACTIVE" | "INACTIVE" | "PENDING";
  findUsId?: number;

  // Actions
  setData: (data: Partial<RegistrationState>) => void;
  reset: () => void;
}

export const useRegistrationStore = create<RegistrationState>()(
  devtools(
    persist(
      (set) => ({
        // Default values that align with form expectations
        isBusiness: false,
        regMode: "classic",

        // Actions
        setData: (data) =>
          set((state) => {
            // Special handling for bizInfo to merge properly
            if (data.bizInfo && state.bizInfo) {
              return {
                ...state,
                ...data,
                bizInfo: {
                  ...state.bizInfo,
                  ...data.bizInfo,
                },
              };
            }

            return { ...state, ...data };
          }),

        reset: () =>
          set({
            email: undefined,
            firstName: undefined,
            lastName: undefined,
            yob: undefined,
            gender: null,
            country: undefined,
            ctryCode: undefined,
            phone: undefined,
            postalCode: undefined,
            addressLine1: undefined,
            addressLine2: undefined,
            city: undefined,
            state: undefined,
            referralCode: null,
            promoCode: null,
            isBusiness: false,
            regMode: "classic",
            lat: undefined,
            lng: undefined,
            pwd: null,
            bizInfo: undefined,
            accountStatus: undefined,
            findUsId: undefined,
          }),
      }),
      {
        name: "registration-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
