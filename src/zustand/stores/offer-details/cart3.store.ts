/* eslint-disable max-lines */
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import {
  CampaignLocation,
  CampaignOffer,
} from "@/types/campaign/campaign.types";
import { AppointmentSlotPayload } from "@/types/invoice/invoice.types";

export interface CartItem {
  offerId: number;
  campaignId: number;
  locationId: number;
  qty: number;
  amount: number;
  tax: number;
  total: number;
  offer: CampaignOffer;
  appointments?: AppointmentSlotPayload[]; // For booking-enabled offers
}

export interface CampaignLocationState {
  campaignId: number;
  selectedLocation: CampaignLocation | null;
  availableLocations: CampaignLocation[];
}

export interface AppointmentBookingState {
  isOpen: boolean;
  campaignId: number | null;
  offerId: number | null;
  pendingQty: number | null;
  currentSlotIndex: number; // For sequential slot booking
  bookedSlots: AppointmentSlotPayload[]; // Already booked slots
  pendingAction: (() => void) | null;
}

// export interface AppointmentBookingState2 {

// }

interface CartState {
  items: CartItem[];
  campaignLocations: Record<number, CampaignLocationState>;
  isLoading: boolean;
  error: string | null;

  // Modal states
  locationModalState: {
    isOpen: boolean;
    campaignId: number | null;
    pendingAction: (() => void) | null;
  };

  appointmentModalState: AppointmentBookingState;
}

interface CartActions {
  // Core cart operations
  addItem: (item: Omit<CartItem, "offer"> & { offer: CampaignOffer }) => void;
  removeItem: (offerId: number) => void;
  updateQuantity: (params: { offerId: number; qty: number }) => void;
  clearCart: () => void;

  // Location management
  setCampaignLocation: (
    campaignId: number,
    location: CampaignLocation,
    availableLocations: CampaignLocation[]
  ) => void;
  getCampaignLocation: (campaignId: number) => CampaignLocation | null;
  getCampaignLocations: (campaignId: number) => CampaignLocation[];
  requiresLocationSelection: (
    campaignId: number,
    availableLocations: CampaignLocation[]
  ) => boolean;

  // Location modal management
  openLocationModal: (campaignId: number, pendingAction: () => void) => void;
  closeLocationModal: () => void;
  executeLocationModalAction: (selectedLocation: CampaignLocation) => void;

  // Appointment booking management
  openAppointmentModal: (
    campaignId: number,
    offerId: number,
    pendingQty: number,
    pendingAction: () => void
  ) => void;
  closeAppointmentModal: () => void;
  addAppointmentSlot: (slot: AppointmentSlotPayload) => void;
  executeAppointmentModalAction: (mode: "next" | "schedule-later") => void;
  resetAppointmentBooking: () => void;

  // Utility functions
  requiresAppointmentBooking: (
    offer: CampaignOffer,
    campaignLocation: CampaignLocation | null
  ) => boolean;

  // Getters
  getItemQuantity: (offerId: number) => number;
  getTotalItems: () => number;
  getTotalAmount: () => number;
  getItemsByCampaign: (campaignId: number) => CartItem[];
  getCartItem: (offerId: number) => CartItem | null;

  // State management
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial State
        items: [],
        campaignLocations: {},
        isLoading: false,
        error: null,

        locationModalState: {
          isOpen: false,
          campaignId: null,
          pendingAction: null,
        },

        appointmentModalState: {
          isOpen: false,
          campaignId: null,
          offerId: null,
          pendingQty: null,
          currentSlotIndex: 0,
          bookedSlots: [],
          pendingAction: null,
        },

        // Core Cart Operations
        addItem: (item) => {
          set((state) => {
            const existingItemIndex = state.items.findIndex(
              (cartItem) => cartItem.offerId === item.offerId
            );

            if (existingItemIndex >= 0) {
              state.items[existingItemIndex] = {
                ...item,
                offer: item.offer,
              };
            } else {
              state.items.push({
                ...item,
                offer: item.offer,
              });
            }
            state.error = null;
          });
        },

        removeItem: (offerId) => {
          set((state) => {
            state.items = state.items.filter(
              (item) => item.offerId !== offerId
            );
            state.error = null;
          });
        },

        updateQuantity: ({ offerId, qty }) => {
          set((state) => {
            const itemIndex = state.items.findIndex(
              (item) => item.offerId === offerId
            );

            if (itemIndex >= 0) {
              if (qty <= 0) {
                state.items.splice(itemIndex, 1);
              } else {
                state.items[itemIndex].qty = qty;
              }
            }
            state.error = null;
          });
        },

        clearCart: () => {
          set((state) => {
            state.items = [];
            state.campaignLocations = {};
            state.error = null;
          });
        },

        // Location Management
        setCampaignLocation: (campaignId, location, availableLocations) => {
          set((state) => {
            state.campaignLocations[campaignId] = {
              campaignId,
              selectedLocation: location,
              availableLocations,
            };
          });
        },

        getCampaignLocation: (campaignId) => {
          const campaignLocationState = get().campaignLocations[campaignId];
          return campaignLocationState?.selectedLocation || null;
        },
        getCampaignLocations(campaignId) {
          const campaignLocationState = get().campaignLocations[campaignId];
          return campaignLocationState?.availableLocations || [];
        },

        requiresLocationSelection: (campaignId, availableLocations) => {
          const currentLocation = get().getCampaignLocation(campaignId);
          return !currentLocation && availableLocations.length > 1;
        },

        // Location Modal Management
        openLocationModal: (campaignId, pendingAction) => {
          set((state) => {
            state.locationModalState = {
              isOpen: true,
              campaignId,
              pendingAction,
            };
          });
        },

        closeLocationModal: () => {
          set((state) => {
            state.locationModalState = {
              isOpen: false,
              campaignId: null,
              pendingAction: null,
            };
          });
        },

        executeLocationModalAction: (selectedLocation) => {
          const { campaignId, pendingAction } = get().locationModalState;

          if (campaignId && pendingAction) {
            const campaignLocationState = get().campaignLocations[campaignId];
            if (campaignLocationState) {
              get().setCampaignLocation(
                campaignId,
                selectedLocation,
                campaignLocationState.availableLocations
              );
            }

            pendingAction();
            get().closeLocationModal();
          }
        },

        // Appointment Booking Management
        openAppointmentModal: (
          campaignId,
          offerId,
          pendingQty,
          pendingAction
        ) => {
          set((state) => {
            state.appointmentModalState = {
              isOpen: true,
              campaignId,
              offerId,
              pendingQty,
              currentSlotIndex: 0,
              bookedSlots: [],
              pendingAction,
            };
          });
        },

        closeAppointmentModal: () => {
          set((state) => {
            state.appointmentModalState = {
              isOpen: false,
              campaignId: null,
              offerId: null,
              pendingQty: null,
              currentSlotIndex: 0,
              bookedSlots: [],
              pendingAction: null,
            };
          });
        },

        addAppointmentSlot: (slot) => {
          set((state) => {
            state.appointmentModalState.bookedSlots.push(slot);
            state.appointmentModalState.currentSlotIndex++;
          });
        },

        executeAppointmentModalAction: (mode) => {
          const {
            campaignId,
            offerId,
            pendingQty,
            bookedSlots,
            pendingAction,
          } = get().appointmentModalState;

          if (!campaignId || !offerId || !pendingQty || !pendingAction) return;

          set((state) => {
            if (mode === "schedule-later") {
              // Close modal and execute pending action without slots
              if (pendingAction) {
                pendingAction();
              }
            } else if (mode === "next") {
              // Execute pending action with booked slots
              const existingItemIndex = state.items.findIndex(
                (item) => item.offerId === offerId
              );

              if (existingItemIndex >= 0) {
                state.items[existingItemIndex].appointments = bookedSlots;
              }

              if (pendingAction) {
                pendingAction();
              }
            }
          });

          get().closeAppointmentModal();
        },

        resetAppointmentBooking: () => {
          set((state) => {
            state.appointmentModalState.currentSlotIndex = 0;
            state.appointmentModalState.bookedSlots = [];
          });
        },

        // TODO: Need to review: Utility Functions
        requiresAppointmentBooking: (offer, campaignLocation) => {
          return !!(
            offer.isBookingEnabled && campaignLocation?.campaignBookingEnabled
          );
        },

        // Getters
        getItemQuantity: (offerId) => {
          const item = get().items.find((item) => item.offerId === offerId);
          return item?.qty || 0;
        },

        getTotalItems: () => {
          return get().items.reduce((total, item) => total + item.qty, 0);
        },

        getTotalAmount: () => {
          return get().items.reduce((total, item) => total + item.total, 0);
        },

        getItemsByCampaign: (campaignId) => {
          return get().items.filter((item) => item.campaignId === campaignId);
        },

        getCartItem: (offerId) => {
          return get().items.find((item) => item.offerId === offerId) || null;
        },

        // State Management
        setLoading: (loading) => {
          set((state) => {
            state.isLoading = loading;
          });
        },

        setError: (error) => {
          set((state) => {
            state.error = error;
          });
        },
      })),
      {
        name: "campaign-cart-storage-3",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          items: state.items,
          campaignLocations: state.campaignLocations,
        }),
      }
    ),
    {
      name: "campaign-cart-storage-3",
    }
  )
);
