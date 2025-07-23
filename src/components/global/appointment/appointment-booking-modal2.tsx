"use client";

import React from "react";

import { useCartStore } from "@/zustand/stores/offer-details/cart3.store";
import { OfferCartAppointmentSlot } from "@/zustand/stores/offer-details/offer-cart.store";

import { Modal } from "../modal";
import SlotBooking2 from "./slot-booking2";

type Props = {
  campaignId: number;
  offerId: number;
  title: string;
};

const AppointmentBookingModal2 = ({ campaignId, offerId, title }: Props) => {
  const {
    appointmentModalState,
    closeAppointmentModal,
    addAppointmentSlot,
    executeAppointmentModalAction,
    resetAppointmentBooking,
    getCampaignLocation,
    getCampaignLocations,
  } = useCartStore();

  const isOpen =
    appointmentModalState.isOpen &&
    appointmentModalState.campaignId === campaignId &&
    appointmentModalState.offerId === offerId;

  //   const [isProcessing, setIsProcessing] = useState(false);
  //   const { pendingQty, currentSlotIndex, bookedSlots } = appointmentModalState;

  //   const totalSlotsNeeded = pendingQty || 0;
  //   const remainingSlots = totalSlotsNeeded - currentSlotIndex;

  const selectedLocation = getCampaignLocation(campaignId);
  const allCampaignLocations = getCampaignLocations(campaignId);
  const bookingEnabledLocations = allCampaignLocations.filter(
    (item) => item.campaignBookingEnabled === true
  );
  const formattedBookingEnabledLocations = bookingEnabledLocations.map(
    (item) => ({
      value: `${item.locationId}`,
      label: item.locName,
    })
  );

  const handleNext = (appointment: OfferCartAppointmentSlot) => {
    console.log(appointment);
    if (appointment) {
      addAppointmentSlot(appointment);
      executeAppointmentModalAction("next");
    }
  };

  const handleScheduleLater = () => {
    console.log("handleScheduleLater");
    executeAppointmentModalAction("schedule-later");
  };

  const handleCancel = () => {
    console.log("handleCancel");
    resetAppointmentBooking();
    closeAppointmentModal();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCancel();
    }
  };

  if (!selectedLocation) {
    return null;
  }

  return (
    <Modal
      open={isOpen}
      onOpenChange={handleOpenChange}
      title={title}
      closeOnOutsideClick={false}
      //   width="100%"
      contentClassName="!max-w-fit"
    >
      <div className="relative">
        <SlotBooking2
          title={`Appointment booking for ${title}`}
          objId={offerId}
          onNext={handleNext}
          onScheduleLater={handleScheduleLater}
          locations={formattedBookingEnabledLocations}
          defaultLocationId={selectedLocation?.locationId.toString()}
        />
      </div>
    </Modal>
  );
};

export default AppointmentBookingModal2;
