/* eslint-disable max-lines */
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { CampaignOffer } from "@/types/campaign/campaign.types";
import { AppointmentSlotPayload } from "@/types/invoice/invoice.types";

export type OfferCartAppointmentSlot = AppointmentSlotPayload & {
  date: Date;
};

export type OfferCartItem = {
  offerId: number;
  qty: number;
  amount: number;
  tax: number;
  total: number;
  offer: CampaignOffer;
  appointments: OfferCartAppointmentSlot[];
};

export type OfferCartState = {
  items: OfferCartItem[];
  campaignId: number | null;
  campaignName: string | null;
  locationId: number | null;
  bizId: number | null;
  bizName: string | null;

  locationModalState: {
    isOpen: boolean;
    pendingAction: (() => void) | null;
  };

  appointmentModalState: {
    isOpen: boolean;
    pendingAction: ((appointment?: OfferCartAppointmentSlot) => void) | null;
  };

  selectedOfferId: number | null;
  selectedOfferName: string | null;
  isLoading: boolean;
  error: string | null;
};

export type OfferCartAction = {
  addCartItem: (item: OfferCartItem) => void;
  removeCartItem: (offerId: number) => void;
  updateQuantity: (params: { offerId: number; qty: number }) => void;
  removeLastAppointment: (offerId: number) => void;
  clearCart: () => void;

  setLocationId: (locationId: number) => void;
  setCampaignId: (campaignId: number) => void;
  setCampaignName: (name: string) => void;
  setBizName: (bizName: string) => void;
  setBizId: (bizId: number) => void;
  setSelectedOfferId: (offerId: number | null) => void;
  setSelectedOfferName: (offerName: string | null) => void;

  openLocationModal: (pendingAction: () => void) => void;
  closeLocationModal: () => void;

  openAppointmentModal: (
    pendingAction: (appointment?: OfferCartAppointmentSlot) => void
  ) => void;
  closeAppointmentModal: () => void;

  executeLocationModalAction: (locationId: number) => void;
  executeAppointmentModalAction: (
    offerId: number,
    mode: "next" | "schedule-later",
    bookedSlots: OfferCartAppointmentSlot[] | undefined
  ) => void;
  resetAppointmentBooking: () => void;

  getItemQuantity: (offerId: number) => number;
  getTotalItems: () => number;
  getTotalAmount: () => number;
  getCartItem: (offerId: number) => OfferCartItem | null;
  getCartItems: () => OfferCartItem[];
  getCampaignId: () => number | null;
  getLocationId: () => number | null;
  getBizId: () => number | null;
  getCampaignName: () => string | null;
  getBizName: () => string | null;
  getSelectedOfferId: () => number | null;
  getSelectedOfferName: () => string | null;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

type OfferCartStore = OfferCartState & OfferCartAction;

export const useOfferCartStore = create<OfferCartStore>()(
  devtools(
    immer((set, get) => ({
      // initial state
      items: [],
      campaignId: null,
      campaignName: null,
      locationId: null,
      bizId: null,
      bizName: null,

      locationModalState: {
        isOpen: false,
        pendingAction: null,
      },

      appointmentModalState: {
        isOpen: false,
        pendingAction: null,
      },

      isLoading: false,
      error: null,
      selectedOfferId: null,
      selectedOfferName: null,

      addCartItem(item) {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (cartItem) => cartItem.offerId === item.offerId
          );

          if (existingItemIndex >= 0) {
            const existingItem = state.items[existingItemIndex];
            console.log({ "existingItem: ": existingItem, "newItem: ": item });

            state.items[existingItemIndex] = {
              ...item,
              offer: item.offer,
              appointments: existingItem.appointments || [],
            };

            if (item.appointments && item.appointments.length > 0) {
              const newAppointment = item.appointments[0];
              const existingAppointments =
                state.items[existingItemIndex].appointments || [];

              state.items[existingItemIndex].appointments = [
                ...existingAppointments,
                newAppointment,
              ];
            }
          } else {
            state.items.push({
              ...item,
              offer: item.offer,
              appointments: item.appointments || [], // Ensure appointments is always an array
            });
          }

          state.error = null;
        });
      },

      removeCartItem(offerId) {
        console.log("remove cart item called");

        set((state) => {
          state.items = state.items.filter((item) => item.offerId !== offerId);
          state.error = null;
        });
      },

      updateQuantity({ offerId, qty }) {
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

      removeLastAppointment(offerId) {
        set((state) => {
          const itemIndex = state.items.findIndex(
            (item) => item.offerId === offerId
          );

          if (
            itemIndex >= 0 &&
            state.items[itemIndex].appointments.length > 0
          ) {
            state.items[itemIndex].appointments.pop();
          }
        });
      },

      clearCart() {
        set((state) => {
          state.items = [];
          state.isLoading = false;
          state.error = null;
        });
      },

      setLocationId(locationId) {
        set((state) => {
          state.locationId = locationId;
        });
      },
      setCampaignId(campaignId) {
        set((state) => {
          state.campaignId = campaignId;
        });
      },
      setCampaignName(name) {
        set((state) => {
          state.campaignName = name;
        });
      },
      setBizId(bizId) {
        set((state) => {
          state.bizId = bizId;
        });
      },
      setBizName(bizName) {
        set((state) => {
          state.bizName = bizName;
        });
      },
      setSelectedOfferId(offerId) {
        set((state) => {
          state.selectedOfferId = offerId;
        });
      },
      setSelectedOfferName(offerName) {
        set((state) => {
          state.selectedOfferName = offerName;
        });
      },

      getItemQuantity(offerId) {
        const item = get().items.find((item) => item.offerId === offerId);
        return item?.qty || 0;
      },
      getTotalItems() {
        return get().items.reduce((total, item) => total + item.qty, 0);
      },
      getTotalAmount() {
        return get().items.reduce((total, item) => total + item.total, 0);
      },
      getCartItem(offerId) {
        return get().items.find((item) => item.offerId === offerId) || null;
      },
      getCampaignId() {
        return get().campaignId;
      },
      getLocationId() {
        return get().locationId;
      },
      getBizId() {
        return get().bizId;
      },
      getSelectedOfferId() {
        return get().selectedOfferId;
      },
      getSelectedOfferName() {
        return get().selectedOfferName;
      },
      getCartItems() {
        return get().items;
      },
      getCampaignName() {
        return get().campaignName;
      },
      getBizName() {
        return get().bizName;
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

      openLocationModal(pendingAction) {
        set((state) => {
          state.locationModalState = {
            isOpen: true,
            pendingAction,
          };
        });
      },
      closeLocationModal() {
        set((state) => {
          state.locationModalState.isOpen = false;
          // state.selectedOfferId = null;
        });
      },

      openAppointmentModal(pendingAction) {
        set((state) => {
          state.appointmentModalState = {
            isOpen: true,
            pendingAction,
          };
        });
      },
      closeAppointmentModal() {
        set((state) => {
          state.appointmentModalState.isOpen = false;
          state.selectedOfferId = null;
        });
      },

      executeLocationModalAction(locationId) {
        const campaignId = get().locationId;
        const pendingAction = get().locationModalState.pendingAction;

        if (campaignId && pendingAction) {
          get().setLocationId(locationId);
          pendingAction();
          get().closeLocationModal();
        }
      },

      executeAppointmentModalAction(offerId, mode, bookedSlots) {
        console.log("executeAppointmentModalAction", {
          offerId,
          mode,
          bookedSlots,
        });

        const campaignId = get().campaignId;
        const pendingAction = get().appointmentModalState.pendingAction;

        console.log({ offerId, mode, bookedSlots, campaignId, pendingAction });

        if (!campaignId || !offerId || !pendingAction) return;

        // set((state) => {
        //   if (mode === "schedule-later") {
        //     // Close modal and execute pending action without slots
        //     if (pendingAction) {
        //       pendingAction();
        //     }
        //   } else if (mode === "next") {
        //     // Execute pending action with booked slots
        //     const existingItemIndex = state.items.findIndex(
        //       (item) => item.offerId === offerId
        //     );

        //     console.log("existingItemIndex: ", existingItemIndex);

        //     if (existingItemIndex >= 0) {
        //       if (bookedSlots && bookedSlots.length > 0) {
        //         const newAppointment = bookedSlots[0];
        //         const existingAppointments =
        //           state.items[existingItemIndex].appointments || [];

        //         state.items[existingItemIndex].appointments = [
        //           ...existingAppointments,
        //           newAppointment,
        //         ];
        //       }
        //       // state.items[existingItemIndex].appointments = bookedSlots;
        //     }

        //     if (pendingAction) {
        //       if (bookedSlots && bookedSlots?.length > 0) {
        //         pendingAction(bookedSlots[0]);
        //       } else {
        //         pendingAction();
        //       }
        //     }
        //   }
        // });

        if (mode === "schedule-later") {
          if (pendingAction) {
            pendingAction();
          }
        } else if (mode === "next") {
          pendingAction(
            bookedSlots && bookedSlots.length > 0 ? bookedSlots[0] : undefined
          );
        }

        // get().closeAppointmentModal();
      },

      resetAppointmentBooking() {
        set((state) => {
          state.items = state.items.map((item) => ({
            ...item,
            appointments: [],
          }));
        });
      },
    })),
    {
      name: "offer-cart-store",
    }
  )
);
