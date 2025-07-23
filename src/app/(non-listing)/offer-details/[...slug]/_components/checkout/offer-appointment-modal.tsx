"use client";

import React, { useState, useMemo } from "react";

import SlotBooking2 from "@/components/global/appointment/slot-booking2";
import Button from "@/components/global/buttons";
import { Modal } from "@/components/global/modal";
import { AppointmentSlot } from "@/types/appointment/appointment.types";
import { Campaign } from "@/types/campaign/campaign.types";
import {
  OfferCartAppointmentSlot,
  useOfferCartStore,
} from "@/zustand/stores/offer-details/offer-cart.store";

import AppointmentSummaryModal from "./appointment-summary-modal";

type Props = {
  campaignId: number;
  campaignLocations: Campaign["cmpnLocs"];
};

const OfferAppointmentModal = ({ campaignId, campaignLocations }: Props) => {
  const {
    appointmentModalState,
    closeAppointmentModal,
    getLocationId,
    getCampaignId,
    items,
    executeAppointmentModalAction,
    getSelectedOfferId,
    clearCart,
    setLocationId: setLocationIdStore,
    getBizName,
    getSelectedOfferName,
    getCartItem,
  } = useOfferCartStore();

  const [locationWarningModalOpen, setLocationWarningModalOpen] =
    useState<boolean>(false);
  const [appointmentSummaryModalOpen, setAppointmentSummaryModalOpen] =
    useState<boolean>(false);

  // Store the pending location change details
  const [pendingLocationChange, setPendingLocationChange] = useState<{
    locationId: string;
    setLocationId: (newLocationId: string) => void;
  } | null>(null);

  const selectedOfferId = getSelectedOfferId();
  const selectedLocationId = getLocationId();

  // Function to adjust slot availability based on cart appointments
  const adjustSlotAvailability = useMemo(() => {
    return (
      slots: AppointmentSlot[],
      selectedDate: Date
    ): AppointmentSlot[] => {
      if (!selectedOfferId || !selectedLocationId) return slots;

      const cartItem = getCartItem(selectedOfferId);
      if (!cartItem?.appointments) return slots;

      // Filter appointments for the selected date and location
      const dateStr = selectedDate.toISOString().split("T")[0];
      const relevantAppointments = cartItem.appointments.filter(
        (apt) =>
          apt.locId === selectedLocationId &&
          apt.date.toISOString().split("T")[0] === dateStr
      );

      // Create a map of booked slots count
      const bookedSlotsCount = relevantAppointments.reduce(
        (acc, apt) => {
          const key = `${apt.startTime}-${apt.endTime}`;
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      // Adjust available appointments
      return slots.map((slot) => {
        const key = `${slot.startTime}-${slot.endTime}`;
        const bookedCount = bookedSlotsCount[key] || 0;
        const adjustedAvailable = Math.max(
          0,
          slot.availableAppointments - bookedCount
        );

        return {
          ...slot,
          availableAppointments: adjustedAvailable,
        };
      });
    };
  }, [selectedOfferId, selectedLocationId, getCartItem]);

  if (!selectedLocationId || !selectedOfferId) {
    return;
  }

  const selectedOffer = items.find((item) => item.offerId === selectedOfferId);
  const isOpen = appointmentModalState.isOpen && getCampaignId() === campaignId;

  const bookingEnabledLocations = campaignLocations.filter(
    (item) => item.campaignBookingEnabled === true
  );
  const formattedBookingEnabledLocations = bookingEnabledLocations.map(
    (item) => ({
      value: `${item.locationId}`,
      label: item.locName,
    })
  );

  const handleNext = (appointment: OfferCartAppointmentSlot) => {
    if (appointment) {
      setAppointmentSummaryModalOpen(true);
      executeAppointmentModalAction(selectedOfferId, "next", [appointment]);
    }
  };

  const handleScheduleLater = () => {
    executeAppointmentModalAction(selectedOfferId, "schedule-later", undefined);
  };

  const handleCancel = () => {
    closeAppointmentModal();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeAppointmentModal();
    }
  };

  const handleLocationChange = (params: {
    locationId: string;
    setLocationId: (newLocationId: string) => void;
  }): void => {
    const { locationId, setLocationId } = params;
    if (selectedLocationId !== Number(locationId)) {
      setPendingLocationChange({ locationId, setLocationId });
      setLocationWarningModalOpen(true);
      return;
    }
    setLocationId(locationId);
  };

  const handleConfirmLocationChange = () => {
    if (pendingLocationChange) {
      clearCart();
      pendingLocationChange.setLocationId(pendingLocationChange.locationId);
      setLocationIdStore(Number(pendingLocationChange.locationId));
      setPendingLocationChange(null);
    }
    setLocationWarningModalOpen(false);
  };

  const handleAppointmentSummaryModalClose = () => {
    setAppointmentSummaryModalOpen(false);
    closeAppointmentModal();
  };

  const title = getBizName() || "Appointment Booking";
  const offerName = getSelectedOfferName() || "offer";

  return (
    <>
      <Modal
        open={isOpen}
        onOpenChange={handleOpenChange}
        title={title}
        closeOnOutsideClick={false}
        onCloseIconClick={handleCancel}
        contentClassName="!max-w-fit"
      >
        <div className="relative">
          <SlotBooking2
            title={`Appointment booking for ${offerName}`}
            objId={selectedOfferId}
            onNext={handleNext}
            onLocationChange={handleLocationChange}
            onScheduleLater={handleScheduleLater}
            locations={formattedBookingEnabledLocations}
            defaultLocationId={selectedLocationId.toString()}
            slotAvailabilityAdjuster={adjustSlotAvailability}
          />
        </div>
      </Modal>

      <Modal
        title={<div>Warning</div>}
        open={locationWarningModalOpen}
        onOpenChange={(open) => setLocationWarningModalOpen(open)}
        closeOnOutsideClick={false}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="body-1-medium text-black-80">
              Do you want to change location?
            </div>
            <div className="body-3 text-black-80">
              Changing location will delete all the scheduled appointments in
              your cart.
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="primary"
              stdHeight
              stdWidth
              onClick={handleConfirmLocationChange}
            >
              Confirm
            </Button>
            <Button
              variant="primary-outlined"
              stdHeight
              stdWidth
              onClick={() => setLocationWarningModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <AppointmentSummaryModal
        isOpen={appointmentSummaryModalOpen}
        onClose={handleAppointmentSummaryModalClose}
        offerId={selectedOfferId}
        title="Appointment Summary"
        offerName={selectedOffer?.offer.title || "Offer Name"}
      />
    </>
  );
};

export default OfferAppointmentModal;
