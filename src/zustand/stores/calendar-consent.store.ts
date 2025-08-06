// zustand/stores/calendar-consent.store.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CalendarTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  scope: string;
}

interface CalendarConsentState {
  hasCalendarAccess: boolean;
  tokens: CalendarTokens | null;
  isConsentModalOpen: boolean;
  isRequestingConsent: boolean;

  // Actions
  setCalendarTokens: (tokens: CalendarTokens) => void;
  clearCalendarTokens: () => void;
  openConsentModal: () => void;
  closeConsentModal: () => void;
  setRequestingConsent: (requesting: boolean) => void;
  checkTokenValidity: () => boolean;
  isCalendarAccessGranted: () => boolean;
}

export const useCalendarConsentStore = create<CalendarConsentState>()(
  devtools(
    // persist(
    (set, get) => ({
      hasCalendarAccess: false,
      tokens: null,
      isConsentModalOpen: false,
      isRequestingConsent: false,

      setCalendarTokens: (tokens) => {
        set({
          tokens,
          hasCalendarAccess: true,
          isConsentModalOpen: false,
          isRequestingConsent: false,
        });
      },

      clearCalendarTokens: () => {
        set({
          tokens: null,
          hasCalendarAccess: false,
          isConsentModalOpen: false,
          isRequestingConsent: false,
        });
      },

      openConsentModal: () => {
        set({ isConsentModalOpen: true });
      },

      closeConsentModal: () => {
        set({ isConsentModalOpen: false, isRequestingConsent: false });
      },

      setRequestingConsent: (requesting) => {
        set({ isRequestingConsent: requesting });
      },

      checkTokenValidity: () => {
        const { tokens } = get();
        if (!tokens) return false;

        return Date.now() < tokens.expiresAt;
      },

      isCalendarAccessGranted: () => {
        const { tokens, checkTokenValidity } = get();
        return !!(tokens && checkTokenValidity());
      },
    }),
    // {
    //   name: "calendar-consent-store",
    //   partialize: (state) => ({
    //     tokens: state.tokens,
    //     hasCalendarAccess: state.hasCalendarAccess,
    //   }),
    // }
    // ),
    { name: "Calendar-Token-Store" }
  )
);
