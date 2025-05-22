import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

// Define the shape of business info
interface BusinessInfo {
  bizName?: string;
  bizType?: string;
  website?: string;
  tags?: string;
}

// Define the registration state shape
interface RegistrationState {
  // Base info
  email?: string;
  firstName?: string;
  lastName?: string;
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
  regMode?: string;
  referralCode?: string | null;
  promoCode?: string | null;

  // Location
  lat?: number;
  lng?: number;

  // Password (stored as array for consistency with your example)
  pwd?: any[];

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
            ctryCode: undefined,
            phone: undefined,
            country: undefined,
            postalCode: undefined,
            addressLine1: undefined,
            addressLine2: undefined,
            city: undefined,
            state: undefined,
            isBusiness: undefined,
            regMode: undefined,
            referralCode: undefined,
            promoCode: undefined,
            lat: undefined,
            lng: undefined,
            pwd: undefined,
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
