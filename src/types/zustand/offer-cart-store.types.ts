import { CampaignOffer } from "../campaign/campaign.types";
import { AppointmentSlotPayload } from "../invoice/invoice.types";

export type OfferCartAppointmentSlot = AppointmentSlotPayload & {};

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
    editMode: {
      isEditing: boolean;
      appointmentIndex: number | null;
      originalAppointment: OfferCartAppointmentSlot | null;
    };
  };

  selectedOfferId: number | null;
  selectedOfferName: string | null;

  paymentOptionsVisible: boolean;

  isLoading: boolean;
  error: string | null;
};

export type OfferCartAction = {
  addCartItem: (item: OfferCartItem) => void;
  removeCartItem: (offerId: number) => void;
  removeLastAppointment: (offerId: number) => void;
  updateAppointmentByIndex: (
    offerId: number,
    appointmentIndex: number,
    updatedAppointment: OfferCartAppointmentSlot
  ) => void;
  clearCart: () => void;

  setLocationId: (locationId: number) => void;
  setCampaignInfo: ({
    cmpnId,
    cmpnName,
    bizName,
  }: {
    cmpnId: number;
    cmpnName: string;
    bizName: string;
  }) => void;
  setSelectedOfferInfo: ({
    offerId,
    offerName,
  }: {
    offerId: number;
    offerName: string;
  }) => void;
  setPaymentOptionsVisible: (visible: boolean) => void;

  openLocationModal: (pendingAction: () => void) => void;
  closeLocationModal: () => void;

  openAppointmentModal: (
    pendingAction: (appointment?: OfferCartAppointmentSlot) => void
  ) => void;
  openAppointmentModalForEdit: (
    offerId: number,
    appointmentIndex: number,
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
  getLocationId: () => number | null;

  clearCampaignId: () => void;
  clearLocationId: () => void;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export type OfferCartStore = OfferCartState & OfferCartAction;
