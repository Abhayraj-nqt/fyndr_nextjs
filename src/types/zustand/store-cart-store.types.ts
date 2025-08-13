import { AppointmentSlotPayload } from "../invoice/invoice.types";
import { GetStoreResponse } from "../store/store.response";
import { StoreItem } from "../store/store.types";

export type StoreCartItem = {
  itemId: number;
  qty: number;
  amount: number;
  tax: number;
  total: number;
  storeItem: StoreItem;
  itemLevelAppointments: AppointmentSlotPayload[];
};

export type StoreCartState = {
  items: StoreCartItem[];
  bizId: number | null;
  bizName: string | null;
  locationId: number | null;

  storeId: number | null;
  storeUrl: number | null;
  storeName: string | null;

  appointmentType: GetStoreResponse["catalogueAppointmentType"] | null;
  cartLevelAppointments: AppointmentSlotPayload[];
};

export type StoreCartAction = {
  addCartItem: (item: StoreCartItem) => void;
  removeCartItem: (itemId: number) => void;
  clearCart: () => void;

  getItemQty: (itemId: number) => number;
  getTotalAmount: () => number;
  getCartItem: (itemId: number) => StoreCartItem | null;
  getLocationId: () => number | null;
};

export type StoreCartStore = StoreCartState & StoreCartAction;
