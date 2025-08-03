/* eslint-disable max-lines */
"use client";

import React, { useState, useMemo } from "react";

import { onGetGooglePermission } from "@/actions/auth.actions";
import SlotBooking2 from "@/components/global/appointment/slot-booking2";
import Button from "@/components/global/buttons";
import { Modal } from "@/components/global/modal";
import toast from "@/components/global/toast";
import { AppointmentSlot } from "@/types/appointment/appointment.types";
import { Campaign } from "@/types/campaign/campaign.types";
import { useCalendarConsentStore } from "@/zustand/stores/calendar-consent.store";
import {
  OfferCartAppointmentSlot,
  useOfferCartStore,
} from "@/zustand/stores/offer-details/offer-cart.store";

import AppointmentIncorporateModal from "./appointment-incorporate-modal";
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

  const { checkTokenValidity } = useCalendarConsentStore();
  const isTokenValid = checkTokenValidity();

  // const googleAccessToken = useCalendarConsentStore(
  //   (state) => state.tokens?.accessToken
  // );

  // const clearCalendarTokens = useCalendarConsentStore(
  //   (state) => state.clearCalendarTokens
  // );

  const [locationWarningModalOpen, setLocationWarningModalOpen] =
    useState<boolean>(false);
  const [appointmentSummaryModalOpen, setAppointmentSummaryModalOpen] =
    useState<boolean>(false);
  const [appointmentIncorporateModalOpen, setAppointmentIncorporateModalOpen] =
    useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<OfferCartAppointmentSlot>();

  // Store the pending location change details
  const [pendingLocationChange, setPendingLocationChange] = useState<{
    locationId: string;
    setLocationId: (newLocationId: string) => void;
  } | null>(null);

  const selectedOfferId = getSelectedOfferId();
  const selectedLocationId = getLocationId();
  const { editMode } = appointmentModalState;

  // Function to adjust slot availability based on cart appointments
  // const adjustSlotAvailability = useMemo(() => {
  //   return (
  //     slots: AppointmentSlot[],
  //     selectedDate: Date
  //   ): AppointmentSlot[] => {
  //     if (!selectedOfferId || !selectedLocationId) return slots;

  //     const cartItem = getCartItem(selectedOfferId);
  //     if (!cartItem?.appointments) return slots;

  //     // Filter appointments for the selected date and location
  //     const dateStr = selectedDate.toISOString().split("T")[0];
  //     let relevantAppointments = cartItem.appointments.filter(
  //       (apt) => {
  //         // Check if this appointment has the specific date key
  //         const appointmentDetails = apt[dateStr];
  //         return (
  //           appointmentDetails &&
  //           appointmentDetails.locId === selectedLocationId
  //         );
  //       }
  //       // apt.locId === selectedLocationId &&
  //       // apt.date.toISOString().split("T")[0] === dateStr
  //     );

  //     // If we're in edit mode, exclude the appointment being edited from the count
  //     if (editMode.isEditing && editMode.appointmentIndex !== null) {
  //       relevantAppointments = relevantAppointments.filter(
  //         (_, index) => index !== editMode.appointmentIndex
  //       );
  //     }

  //     // Create a map of booked slots count
  //     const bookedSlotsCount = relevantAppointments.reduce(
  //       (acc, apt) => {
  //         const key = `${apt.startTime}-${apt.endTime}`;
  //         acc[key] = (acc[key] || 0) + 1;
  //         return acc;
  //       },
  //       {} as Record<string, number>
  //     );

  //     // Adjust available appointments
  //     return slots.map((slot) => {
  //       const key = `${slot.startTime}-${slot.endTime}`;
  //       const bookedCount = bookedSlotsCount[key] || 0;
  //       const adjustedAvailable = Math.max(
  //         0,
  //         slot.availableAppointments - bookedCount
  //       );

  //       return {
  //         ...slot,
  //         availableAppointments: adjustedAvailable,
  //       };
  //     });
  //   };
  // }, [selectedOfferId, selectedLocationId, getCartItem, editMode]);

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
      let relevantAppointments = cartItem.appointments.filter((apt) => {
        // Check if this appointment has the specific date key
        const appointmentDetails = apt[dateStr];
        return (
          appointmentDetails && appointmentDetails.locId === selectedLocationId
        );
      });

      // If we're in edit mode, exclude the appointment being edited from the count
      if (editMode.isEditing && editMode.appointmentIndex !== null) {
        relevantAppointments = relevantAppointments.filter(
          (_, index) => index !== editMode.appointmentIndex
        );
      }

      // Create a map of booked slots count
      const bookedSlotsCount = relevantAppointments.reduce(
        (acc, apt) => {
          // Get the appointment details from the date key
          const appointmentDetails = apt[dateStr];
          if (appointmentDetails) {
            const key = `${appointmentDetails.startTime}-${appointmentDetails.endTime}`;
            acc[key] = (acc[key] || 0) + 1;
          }
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
  }, [selectedOfferId, selectedLocationId, getCartItem, editMode]);

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
    // 1. if google permission is granted then don't open concent screen.

    if (appointment) {
      // if (editMode.isEditing) {
      //   // In edit mode, directly execute the action without opening summary
      //   executeAppointmentModalAction(selectedOfferId, "next", [appointment]);
      //   closeAppointmentModal();
      // } else {
      //   // In regular mode, show summary
      //   setAppointmentSummaryModalOpen(true);
      //   executeAppointmentModalAction(selectedOfferId, "next", [appointment]);
      // }

      const isTokenValid = checkTokenValidity();

      setSelectedAppointment(appointment);

      if (!isTokenValid) {
        setAppointmentIncorporateModalOpen(true);
        return;
      }

      setAppointmentSummaryModalOpen(true);
      closeAppointmentModal();
      executeAppointmentModalAction(selectedOfferId, "next", [appointment]);
    }
  };

  const handleScheduleLater = () => {
    executeAppointmentModalAction(selectedOfferId, "schedule-later", undefined);
    setAppointmentSummaryModalOpen(true);
    closeAppointmentModal();
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
    // closeAppointmentModal();
  };

  const handleCalendarConfirm = async (googleAccessToken: string) => {
    if (!googleAccessToken) {
      toast.error({
        message: "Token is required",
      });
      return;
    }

    const { success, data, error } = await onGetGooglePermission({
      payload: {
        googleAccessToken,
      },
    });

    if (!success || error) {
      console.log("onGetGooglePermission", { error });
      toast.error({
        message: error?.details?.errorMessages?.[0] || "Something went wrong",
      });
      return;
    }

    if (data) {
      toast.success({
        message: data.message,
      });
    }

    if (selectedAppointment) {
      setAppointmentSummaryModalOpen(true);
      closeAppointmentModal();
      executeAppointmentModalAction(selectedOfferId, "next", [
        selectedAppointment,
      ]);
    }
    setAppointmentIncorporateModalOpen(false);
    setSelectedAppointment(undefined);
  };

  const handleCalendarCancel = () => {
    if (selectedAppointment) {
      setAppointmentSummaryModalOpen(true);
      closeAppointmentModal();
      executeAppointmentModalAction(selectedOfferId, "next", [
        selectedAppointment,
      ]);
    }
    setAppointmentIncorporateModalOpen(false);
    setSelectedAppointment(undefined);
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
        // contentClassName="!max-w-fit"
        // contentClassName="!w-full !max-w-full !overflow-hidden"
        contentClassName="!max-w-screen-xl"
      >
        <div className="no-scrollbar relative max-h-[80vh] overflow-y-scroll">
          <SlotBooking2
            title={`Appointment booking for ${offerName}`}
            objId={selectedOfferId}
            onNext={handleNext}
            onLocationChange={handleLocationChange}
            onScheduleLater={handleScheduleLater}
            locations={formattedBookingEnabledLocations}
            defaultLocationId={selectedLocationId.toString()}
            slotAvailabilityAdjuster={adjustSlotAvailability}
            footer={
              isTokenValid ? (
                <div className="body-3 rounded-b-[9px] border-t border-secondary-20 bg-yellow-300 p-4 py-2">
                  The Google Calendar permission to create events has been
                  enabled. Now, all selected appointment slots will be
                  automatically added to calendar.
                </div>
              ) : (
                <></>
              )
            }
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
      <AppointmentIncorporateModal
        isOpen={appointmentIncorporateModalOpen}
        onConfirm={handleCalendarConfirm}
        onCancel={handleCalendarCancel}
        onClose={() => setAppointmentIncorporateModalOpen(false)}
      />
    </>
  );
};

export default OfferAppointmentModal;
