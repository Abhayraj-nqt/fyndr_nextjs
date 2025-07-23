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
  // location: CampaignLocation;
  // offer: CampaignOffer;
  // addedAt: Date;
  qty: number;
  amount: number;
  tax: number;
  total: number;
}

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

interface CartActions {
  // addItem: (
  //   offer: CampaignOffer,
  //   campaignId: number,
  //   location: CampaignLocation,
  //   amount: number,
  //   tax: number,
  //   total: number
  // ) => void;
  addItem: ({
    offerId,
    campaignId,
    amount,
    locationId,
    qty,
    tax,
    total,
  }: CartItem) => void;
  removeItem: (offerId: number) => void;
  updateQuantity: ({ offerId, qty }: Pick<CartItem, "offerId" | "qty">) => void;
  clearCart: () => void;
  getItemQuantity: (offerId: number) => number;
  getTotalItems: () => number;
  getTotalAmount: () => number;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        // State
        items: [],
        isLoading: false,
        error: null,

        // Actions
        // addItem: (offer, campaignId, location) => {
        //   set((state) => {
        //     const existingItemIndex = state.items.findIndex(
        //       (item: CartItem) => item.offerId === offer.objid
        //     );

        //     if (existingItemIndex >= 0) {
        //       // Update existing item
        //       const existingItem = state.items[existingItemIndex];
        //       const maxQty =
        //         offer.usageLimit >= 0 ? offer.usageLimit : Infinity;
        //       const newQuantity = Math.min(existingItem.quantity + 1, maxQty);

        //       state.items[existingItemIndex].quantity = newQuantity;
        //       state.items[existingItemIndex].selectedLocation =
        //         location || existingItem.selectedLocation;
        //     } else {
        //       // Add new item
        //       state.items.push({
        //         offerId: offer.objid,
        //         campaignId,
        //         offer,
        //         quantity: 1,
        //         selectedLocation: location,
        //         addedAt: new Date(),
        //       });
        //     }
        //     state.error = null;
        //   });
        // },

        addItem({ offerId, campaignId, amount, locationId, qty, tax, total }) {
          set((state) => {
            const existingItemIndex = state.items.findIndex(
              (item) => item.offerId === offerId
            );

            if (existingItemIndex >= 0) {
              // update existing item
              state.items[existingItemIndex] = {
                amount,
                campaignId,
                locationId,
                offerId,
                qty,
                tax,
                total,
              };
            } else {
              // add new item
              state.items.push({
                offerId,
                amount,
                campaignId,
                locationId,
                qty: 1,
                tax,
                total,
              });
              state.error = null;
            }
          });
        },

        removeItem: (offerId) => {
          set((state) => {
            state.items = state.items.filter(
              (item: CartItem) => item.offerId !== offerId
            );
            state.error = null;
          });
        },

        updateQuantity: ({ offerId, qty }) => {
          set((state) => {
            const itemIndex = state.items.findIndex(
              (item: CartItem) => item.offerId === offerId
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
            state.error = null;
          });
        },

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
        }),
      }
    ),
    {
      name: "campaign-cart-storage",
    }
  )
);
