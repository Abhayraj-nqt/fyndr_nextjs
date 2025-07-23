"use client";

import React, { useState } from "react";

import SlotBooking2 from "@/components/global/appointment/slot-booking2";
import Button from "@/components/global/buttons";
import { Modal } from "@/components/global/modal";
import { ValueLabelProps } from "@/types/global";
import { AppointmentSlotPayload } from "@/types/invoice/invoice.types";
import { useCartStore } from "@/zustand/stores/offer-details/cart3.store";

type Props = {
  campaignId: number;
  offerId: number;
};

const AppointmentBookingModal = ({ campaignId, offerId }: Props) => {
  const {
    appointmentModalState,
    closeAppointmentModal,
    addAppointmentSlot,
    executeAppointmentModalAction,
    resetAppointmentBooking,
    getCampaignLocation,
  } = useCartStore();

  const [isProcessing, setIsProcessing] = useState(false);

  const isOpen =
    appointmentModalState.isOpen &&
    appointmentModalState.campaignId === campaignId &&
    appointmentModalState.offerId === offerId;

  const { pendingQty, currentSlotIndex, bookedSlots } = appointmentModalState;

  const selectedLocation = getCampaignLocation(campaignId);
  const totalSlotsNeeded = pendingQty || 0;
  const remainingSlots = totalSlotsNeeded - currentSlotIndex;

  // Convert campaign locations to slot booking format
  const slotBookingLocations: ValueLabelProps[] = selectedLocation
    ? [
        {
          value: selectedLocation.locationId.toString(),
          label: selectedLocation.businessName || selectedLocation.address,
        },
      ]
    : [];

  const handleSlotSelect = (slot: AppointmentSlotPayload) => {
    if (slot) {
      addAppointmentSlot(slot);

      // Check if we have booked all required slots
      if (currentSlotIndex + 1 >= totalSlotsNeeded) {
        // All slots booked, ready to proceed
        setIsProcessing(false);
      }
    }
  };

  const handleNext = () => {
    if (bookedSlots.length < totalSlotsNeeded) {
      // Not all slots booked yet
      return;
    }

    setIsProcessing(true);
    executeAppointmentModalAction("next");
    setIsProcessing(false);
  };

  const handleScheduleLater = () => {
    setIsProcessing(true);
    executeAppointmentModalAction("schedule-later");
    setIsProcessing(false);
  };

  const handleCancel = () => {
    resetAppointmentBooking();
    closeAppointmentModal();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCancel();
    }
  };

  const getModalTitle = () => {
    if (totalSlotsNeeded === 1) {
      return "Book Appointment Slot";
    }
    return `Book Appointment Slots (${currentSlotIndex + 1} of ${totalSlotsNeeded})`;
  };

  const getSlotBookingTitle = () => {
    if (totalSlotsNeeded === 1) {
      return "Select your preferred time slot";
    }
    if (remainingSlots === 1) {
      return "Select your final time slot";
    }
    return `Select time slot ${currentSlotIndex + 1} of ${totalSlotsNeeded}`;
  };

  if (!selectedLocation) {
    return null;
  }

  return (
    <Modal
      open={isOpen}
      onOpenChange={handleOpenChange}
      title={<p className="text-lg font-semibold">{getModalTitle()}</p>}
      closeOnOutsideClick={false}
    >
      <div className="space-y-6">
        {/* Progress indicator for multiple slots */}
        {totalSlotsNeeded > 1 && (
          <div className="flex items-center justify-center space-x-2">
            {Array.from({ length: totalSlotsNeeded }, (_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition-colors ${
                  index < currentSlotIndex
                    ? "bg-green-500"
                    : index === currentSlotIndex
                      ? "bg-blue-500"
                      : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}

        {/* Slot booking component */}
        <SlotBooking2
          title={getSlotBookingTitle()}
          objId={offerId}
          locations={slotBookingLocations}
          defaultLocationId={selectedLocation.locationId.toString()}
          onNext={handleSlotSelect}
          onScheduleLater={handleScheduleLater}
          className="border-0 shadow-none"
        />

        {/* Booked slots summary */}
        {bookedSlots.length > 0 && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h4 className="mb-2 font-medium text-gray-900">
              Booked Slots ({bookedSlots.length})
            </h4>
            <div className="space-y-2">
              {bookedSlots.map((slot, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded bg-white p-2 text-sm"
                >
                  <span>
                    Slot {index + 1}: {slot.startTime} - {slot.endTime}
                  </span>
                  <span className="text-green-600">✓ Booked</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-between border-t border-gray-200 pt-4">
          <Button
            variant="secondary"
            onClick={handleCancel}
            disabled={isProcessing}
          >
            Cancel
          </Button>

          <div className="flex space-x-3">
            <Button
              variant="primary-outlined"
              onClick={handleScheduleLater}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Schedule For Later"}
            </Button>

            <Button
              variant="primary"
              onClick={handleNext}
              disabled={bookedSlots.length < totalSlotsNeeded || isProcessing}
            >
              {isProcessing ? "Processing..." : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AppointmentBookingModal;
