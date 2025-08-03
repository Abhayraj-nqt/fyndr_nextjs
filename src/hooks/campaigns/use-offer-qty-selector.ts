/* eslint-disable max-lines */

import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";

import { onVerifyOffer } from "@/actions/campaign.action";
import { onGetTax } from "@/actions/invoice.action";
import toast from "@/components/global/toast";
import { getRemaining } from "@/lib/utils";
import { parseAmount } from "@/lib/utils/parser";
import {
  Campaign,
  CampaignLocation,
  CampaignOffer,
} from "@/types/campaign/campaign.types";
import {
  OfferCartAppointmentSlot,
  useOfferCartStore,
} from "@/zustand/stores/offer-details/offer-cart.store";

import { useDebouncedCallback } from "../use-debounced-callback";

type DisabledStatesProps = {
  incrementDisabled: boolean;
  decrementDisabled: boolean;
  inputDisabled: boolean;
};

type QuantityProps = {
  qty: number;
  amount: number;
  tax: number;
  total: number;
};

type Props = {
  offer: CampaignOffer;
  campaignLocations: Campaign["cmpnLocs"];
};

const useOfferQtySelector = ({ offer, campaignLocations }: Props) => {
  const { data: session } = useSession();
  const {
    addCartItem,
    removeCartItem,
    getLocationId,
    setSelectedOfferId,
    setSelectedOfferName,
    openLocationModal,
    openAppointmentModal,
    removeLastAppointment,
    getItemQuantity,
    items, // Listen to items changes
  } = useOfferCartStore();

  const [transition, startTransition] = useTransition();
  const [finalizingUpdate, startFinalizingUpdate] = useTransition();
  const [disabledStates, setDisabledStates] = useState<DisabledStatesProps>({
    incrementDisabled: false,
    decrementDisabled: false,
    inputDisabled: false,
  });
  const [qtyData, setQtyData] = useState<QuantityProps>({
    qty: 0,
    amount: 0,
    tax: 0,
    total: 0,
  });

  const getSelectedLocation = (locationId: number): CampaignLocation | null => {
    const selectedLocation =
      campaignLocations.find(
        (location) => location.locationId === locationId
      ) || null;
    return selectedLocation;
  };

  const handleQtyChange = async (
    newQty: number,
    operation: "increment" | "decrement" | "input" = "input"
  ) => {
    const qty = Math.max(0, Math.min(newQty, effectiveMaxQty));
    if (qty === 0) {
      // If quantity is 0, remove the item from cart
      removeCartItem(offer.objid);
      setQtyData({ qty: 0, amount: 0, tax: 0, total: 0 });
      return;
    }

    const locationId = getLocationId();
    setSelectedOfferId(offer.objid);
    setSelectedOfferName(offer.title);

    console.log({
      newQty,
      qty,
      locationId,
      operation,
      selectedOfferId: offer.objid,
    });

    // step 1: If location is not selected then open location modal
    if (!locationId) {
      console.log(">>Location selection required");
      const pendingAction = () => {
        startTransition(async () => {
          // step 2: If appointment booking is required then open appointment modal
          if (requiresAppointmentBooking()) {
            console.log(">>Appointment booking required");
            const appointmentPendingAction = (
              appointment?: OfferCartAppointmentSlot
            ) => {
              console.log("Appointment pending action called");
              startTransition(async () => {
                await finalizeQuantityUpdate(qty, appointment);
              });
            };
            openAppointmentModal(appointmentPendingAction);
          } else {
            console.log(">>No appointment booking required");
            await finalizeQuantityUpdate(qty);
          }
        });
      };

      openLocationModal(pendingAction);
    } else {
      console.log(">>Location already selected");
      // step 3: If location is already selected & appointment booking is required then open appoint modal
      if (requiresAppointmentBooking()) {
        console.log(">>Appointment booking required");
        const appointmentPendingAction = (
          appointment?: OfferCartAppointmentSlot
        ) => {
          console.log("Appointment pending action called");
          startTransition(async () => {
            // await finalizeQuantityUpdate(qty, appointment);

            // Check if cart was cleared (location change scenario)
            const currentCartQty = getItemQuantity(offer.objid);
            const finalQty = currentCartQty === 0 ? 1 : qty;
            await finalizeQuantityUpdate(finalQty, appointment);
          });
        };

        openAppointmentModal(appointmentPendingAction);
      } else {
        console.log(">>No appointment booking required");
        await finalizeQuantityUpdate(qty);
      }
    }
  };

  const debouncedHandleQtyChange = useDebouncedCallback(handleQtyChange, 500);
  const handleIncrement = () => {
    if (qtyData.qty >= effectiveMaxQty) return;
    handleQtyChange(qtyData.qty + 1, "increment");
  };
  const handleDecrement = () => {
    if (qtyData.qty <= 1) {
      // If quantity is 0, remove the item from cart
      removeCartItem(offer.objid);
      setQtyData({ qty: 0, amount: 0, tax: 0, total: 0 });
      return;
    }
    // case: If appointment booking is required - remove last saved appointment
    if (offer.isBookingEnabled) {
      removeLastAppointment(offer.objid);
    }
    finalizeQuantityUpdate(qtyData.qty - 1);
  };
  const handleQtyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (offer.isBookingEnabled) return;
    const newQty = parseInt(e.target.value) || 0;
    debouncedHandleQtyChange(newQty);
  };

  const calculatePricing = async (
    qty: number
  ): Promise<QuantityProps | null> => {
    if (qty <= 0) {
      return {
        qty: 0,
        amount: 0,
        tax: 0,
        total: 0,
      };
    }

    if (!session || !session.user) {
      toast.error({
        message: "Please sign-in to proceed",
      });
      return null;
    }

    // Verify offer availability
    const { success: verifySuccess, error: verifyError } = await onVerifyOffer({
      payload: {
        buyerEmail: session.user.email,
        offerId: offer.objid,
        userSelectQuanity: qty,
      },
    });

    if (!verifySuccess) {
      toast.error({
        message:
          verifyError?.details?.message ||
          "Failed to verify offer availability",
      });
      return null;
    }

    console.log("onVerifyOffer called", { verifySuccess });

    const selectedLocationId = getLocationId();

    // Get location for tax calculation
    if (!selectedLocationId) {
      throw new Error("Location not selected");
      // toast.error({
      //   message: "Location not selected"
      // })
      // return null;
    }

    const selectedLocation = getSelectedLocation(selectedLocationId);
    if (!selectedLocation) {
      throw new Error("Location not selected");
    }

    // Calculate tax
    const {
      success: taxSuccess,
      data: taxData,
      error: taxError,
    } = await onGetTax({
      payload: {
        country: selectedLocation.country,
        postalCode: selectedLocation.postalCode,
      },
    });

    if (!taxSuccess) {
      toast.error({
        message: taxError?.details?.message || "Failed to calculate tax",
      });
      return null;
    }

    if (taxData) {
      const amount = Number(parseAmount(offer.offerPrice * qty));
      const tax = Number(parseAmount(offer.offerPrice * taxData.taxRate * qty));
      const total = amount + tax;

      console.log({
        qty,
        amount,
        tax,
        total,
      });

      return {
        qty,
        amount,
        tax,
        total,
      };
    }

    return null;
  };

  const finalizeQuantityUpdate = async (
    newQty: number,
    appointment?: OfferCartAppointmentSlot
  ) => {
    startFinalizingUpdate(async () => {
      console.log("finalizeQuantityUpdate called: ", newQty);

      const pricingData = await calculatePricing(newQty);
      console.log("\tpricing data: ", pricingData);

      if (!pricingData) return;
      setQtyData(pricingData);

      // update cart
      if (pricingData.qty > 0) {
        const selectedLocationId = getLocationId();
        if (selectedLocationId) {
          addCartItem({
            offer,
            offerId: offer.objid,
            amount: pricingData.amount,
            tax: pricingData.tax,
            qty: pricingData.qty,
            total: pricingData.total,
            appointments: appointment ? [appointment] : [],
          });
        } else {
          removeCartItem(offer.objid);
        }
      }
    });
  };

  const requiresAppointmentBooking = (): boolean => {
    const selectedLocationId = getLocationId();
    const selectedLocation = campaignLocations.find(
      (item) => item.locationId === selectedLocationId
    );

    if (!selectedLocation) {
      // throw new Error("Please select location");
      return false;
    }

    return offer.isBookingEnabled && selectedLocation.campaignBookingEnabled;
  };

  const remainingOffers: number = offer.offerLimit
    ? getRemaining(offer.offerLimit, offer?.offerSold || 0)
    : Infinity;

  const maxQty = offer?.usageLimit >= 0 ? offer?.usageLimit : Infinity;
  const effectiveMaxQty = Math.min(maxQty, remainingOffers);

  useEffect(() => {
    const decrementDisabled =
      qtyData.qty <= 0 || transition || finalizingUpdate;
    const incrementDisabled =
      qtyData.qty >= effectiveMaxQty || transition || finalizingUpdate;
    const isBookingEnabled = offer.isBookingEnabled;
    const inputDisabled = transition || isBookingEnabled || finalizingUpdate;

    setDisabledStates({
      decrementDisabled,
      incrementDisabled,
      inputDisabled,
    });
  }, [
    transition,
    qtyData.qty,
    effectiveMaxQty,
    offer.isBookingEnabled,
    finalizingUpdate,
  ]);

  // -------------------------------------------------------

  // Initialize with store quantity on mount
  useEffect(() => {
    console.log("Initializing qtyData with store quantity on mount");
    const storeQty = getItemQuantity(offer.objid);
    if (storeQty > 0 && qtyData.qty === 0) {
      // Initialize with store data if available
      const cartItem = items.find((item) => item.offerId === offer.objid);
      if (cartItem) {
        setQtyData({
          qty: cartItem.qty,
          amount: cartItem.amount,
          tax: cartItem.tax,
          total: cartItem.total,
        });
      }
    }
  }, []); // Only on mount

  // Sync local state with store when items change
  useEffect(() => {
    console.log("Syncing qtyData with store: USE_EFFECT");

    const storeQty = getItemQuantity(offer.objid);
    if (storeQty !== qtyData.qty) {
      if (storeQty === 0) {
        // Reset to zero state
        setQtyData({ qty: 0, amount: 0, tax: 0, total: 0 });
      } else {
        // Update with store quantity (preserve other calculated values)
        // setQtyData((prev) => ({ ...prev, qty: storeQty }));
        console.log("Syncing qtyData with store:", {
          offerId: offer.objid,
          storeQty,
          qtyData: { ...qtyData, qty: storeQty },
        });

        // Update with store quantity (preserve other calculated values or get from store)
        const cartItem = items.find((item) => item.offerId === offer.objid);
        if (cartItem) {
          setQtyData({
            qty: cartItem.qty,
            amount: cartItem.amount,
            tax: cartItem.tax,
            total: cartItem.total,
          });
        }
      }
    }
    // }, [items, offer.objid, getItemQuantity, qtyData.qty]);
  }, [items, offer.objid, getItemQuantity, qtyData.qty]);

  return {
    // states
    qtyData,
    disabledStates,
    effectiveMaxQty,

    // handlers
    handleIncrement,
    handleDecrement,
    handleQtyInputChange,
  };
};

export default useOfferQtySelector;
