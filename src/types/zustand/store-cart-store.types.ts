import { AppointmentSlotPayload } from "../invoice/invoice.types";
import { GetStoreResponse } from "../store/store.response";
import { StoreItem } from "../store/store.types";

export type StoreCartItem = {
  itemId: number;
  qty: number;
  price: number;
  modifiers: {
    whole: StoreItem["catalogueModifiers"];
    addon: StoreItem["catalogueModifiers"];
  };
  storeItem: StoreItem;
  itemLevelAppointments: AppointmentSlotPayload[];
};

export type StoreCartState = {
  items: StoreCartItem[];
  bizId: number | null;
  bizName: string | null;
  locationId: number | null;

  storeId: number | null;
  storeUrl: string | null;
  storeName: string | null;

  country: string | null;
  postalCode: string | null;

  appointmentType: GetStoreResponse["catalogueAppointmentType"] | null;
  cartLevelAppointments: AppointmentSlotPayload[];
};

export type StoreCartAction = {
  addCartItem: (item: StoreCartItem) => void;
  removeCartItem: (itemId: number, index: number) => void;
  clearCart: () => void;

  getItemQty: (itemId: number) => number;
  getCartItem: (itemId: number) => StoreCartItem | null;
  getLocationId: () => number | null;

  setCartData: ({
    bizId,
    bizName,
    locationId,
    storeId,
    storeName,
    storeUrl,
    appointmentType,
    country,
    postalCode,
  }: {
    bizId: number;
    storeId: number;
    locationId: number;
    storeUrl: string;
    bizName: string;
    storeName: string;
    appointmentType: GetStoreResponse["catalogueAppointmentType"];
    country: string;
    postalCode: string;
  }) => void;
};

export type StoreCartStore = StoreCartState & StoreCartAction;
