import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { StoreItem } from "@/types/store/store.types";
import { StoreCartStore } from "@/types/zustand/store-cart-store.types";

export const useStoreCartStore = create<StoreCartStore>()(
  devtools(
    persist(
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

        country: null,
        postalCode: null,

        addCartItem(item) {
          set((state) => {
            const sameIds = (
              arrA: StoreItem["catalogueModifiers"],
              arrB: StoreItem["catalogueModifiers"]
            ) => {
              if (arrA.length !== arrB.length) return false;
              const idsA = arrA.map((m) => m.modifier.objid).sort();
              const idsB = arrB.map((m) => m.modifier.objid).sort();
              return idsA.every((id, idx) => id === idsB[idx]);
            };

            const existingItemIndex = state.items.findIndex(
              (cartItem) =>
                cartItem.itemId === item.itemId &&
                sameIds(cartItem.modifiers.addon, item.modifiers.addon) &&
                sameIds(cartItem.modifiers.whole, item.modifiers.whole)
            );

            if (existingItemIndex >= 0) {
              state.items[existingItemIndex].qty += item.qty ?? 1;
            } else {
              state.items.push({
                ...item,
                itemLevelAppointments: item.itemLevelAppointments || [],
              });
            }
          });
        },
        removeCartItem(itemId, index) {
          set((state) => {
            state.items = state.items.filter(
              (item, i) => !(item.itemId === itemId && i === index)
            );
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
        getCartItem(itemId) {
          return get().items.find((item) => item.itemId === itemId) || null;
        },
        getLocationId() {
          return get().locationId;
        },
        setCartData({
          bizId,
          bizName,
          locationId,
          storeId,
          storeName,
          storeUrl,
          appointmentType,
          country,
          postalCode,
        }) {
          set((state) => {
            state.bizId = bizId;
            state.bizName = bizName;
            state.locationId = locationId;
            state.storeId = storeId;
            state.storeName = storeName;
            state.storeUrl = storeUrl;
            state.appointmentType = appointmentType;
            state.country = country;
            state.postalCode = postalCode;
          });
        },
      })),
      {
        name: "store-cart",
      }
    ),
    {
      name: "store-cart",
    }
  )
);
