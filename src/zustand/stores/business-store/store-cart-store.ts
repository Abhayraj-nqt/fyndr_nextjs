import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { StoreCartStore } from "@/types/zustand/store-cart-store.types";

export const useStoreCartStore = create<StoreCartStore>()(
  devtools(
    immer((set, get) => ({
      items: [],
      bizId: null,
      bizName: null,
      locationId: null,
      storeId: null,
      storeName: null,
      storeUrl: null,

      appointmentType: null,
      cartLevelAppointments: [],

      addCartItem(item) {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (cartItem) => cartItem.itemId === item.itemId
          );

          if (existingItemIndex >= 0) {
            const existingItem = state.items[existingItemIndex];
            state.items[existingItemIndex] = {
              ...item,
              storeItem: item.storeItem,
              itemLevelAppointments: existingItem.itemLevelAppointments || [],
            };
            if (
              item.itemLevelAppointments &&
              item.itemLevelAppointments.length > 0
            ) {
              const newAppointment = item.itemLevelAppointments[0];
              const existingAppointments =
                state.items[existingItemIndex].itemLevelAppointments || [];
              state.items[existingItemIndex].itemLevelAppointments = [
                ...existingAppointments,
                newAppointment,
              ];
            }
          } else {
            state.items.push({
              ...item,
              storeItem: item.storeItem,
              itemLevelAppointments: item.itemLevelAppointments || [], // Ensure appointments is always an array
            });
          }
        });
      },
      removeCartItem(itemId) {
        set((state) => {
          state.items = state.items.filter((item) => item.itemId !== itemId);
        });
      },
      clearCart() {
        set((state) => {
          state.items = [];
        });
      },
      getItemQty(itemId) {
        const item = get().items.find((item) => item.itemId === itemId);
        return item?.qty || 0;
      },
      getTotalAmount() {
        return get().items.reduce((total, item) => total + item.total, 0);
      },
      getCartItem(itemId) {
        return get().items.find((item) => item.itemId === itemId) || null;
      },
      getLocationId() {
        return get().locationId;
      },
    })),
    {
      name: "store-cart-store",
    }
  )
);
