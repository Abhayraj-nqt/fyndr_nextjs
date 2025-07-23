import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import {
  CampaignLocation,
  CampaignOffer,
} from "@/types/campaign/campaign.types";

export interface CartItem {
  offerId: number;
  campaignId: number;
  locationId: number;
  qty: number;
  amount: number;
  tax: number;
  total: number;
  offer: CampaignOffer; // Store offer details for easy access
}

export interface CampaignLocationState {
  campaignId: number;
  selectedLocation: CampaignLocation | null;
  availableLocations: CampaignLocation[];
}

interface CartState {
  items: CartItem[];
  campaignLocations: Record<number, CampaignLocationState>; // campaignId -> location state
  isLoading: boolean;
  error: string | null;
  locationModalState: {
    isOpen: boolean;
    campaignId: number | null;
    pendingAction: (() => void) | null; // Action to execute after location selection
  };
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
  requiresLocationSelection: (
    campaignId: number,
    availableLocations: CampaignLocation[]
  ) => boolean;

  // Modal management
  openLocationModal: (campaignId: number, pendingAction: () => void) => void;
  closeLocationModal: () => void;
  executeLocationModalAction: (selectedLocation: CampaignLocation) => void;

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

        // Core Cart Operations
        addItem: (item) => {
          set((state) => {
            const existingItemIndex = state.items.findIndex(
              (cartItem) => cartItem.offerId === item.offerId
            );

            if (existingItemIndex >= 0) {
              // Update existing item
              state.items[existingItemIndex] = {
                ...item,
                offer: item.offer,
              };
            } else {
              // Add new item
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

        requiresLocationSelection: (campaignId, availableLocations) => {
          const currentLocation = get().getCampaignLocation(campaignId);
          return !currentLocation && availableLocations.length > 1;
        },

        // Modal Management
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
            // First set the location
            const campaignLocationState = get().campaignLocations[campaignId];
            if (campaignLocationState) {
              get().setCampaignLocation(
                campaignId,
                selectedLocation,
                campaignLocationState.availableLocations
              );
            }

            // Then execute the pending action
            pendingAction();

            // Close modal
            get().closeLocationModal();
          }
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
        name: "campaign-cart-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          items: state.items,
          campaignLocations: state.campaignLocations,
        }),
      }
    ),
    {
      name: "campaign-cart-storage",
    }
  )
);
