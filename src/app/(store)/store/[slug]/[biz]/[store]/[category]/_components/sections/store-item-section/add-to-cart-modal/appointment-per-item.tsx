"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useState, useTransition } from "react";

import { onGetGooglePermission } from "@/actions/auth.actions";
import AppointmentConsentModal from "@/components/global/appointment/appointment-consent-modal";
import SlotBooking from "@/components/global/appointment/slot-booking";
import Button from "@/components/global/buttons";
import { Modal } from "@/components/global/modal";
import toast from "@/components/global/toast";
import ROUTES from "@/constants/routes";
import { AppointmentSlotPayload } from "@/types/invoice/invoice.types";
import { useStoreCartStore } from "@/zustand/stores/business-store/store-cart-store";
import { useCalendarConsentStore } from "@/zustand/stores/calendar-consent.store";

type Props = {
  onAddToCart: (
    mode: "APPOINTMENT_PER_ITEM",
    appointment: AppointmentSlotPayload
  ) => void;
  itemId: number;
};

const AppointmentPerItem = ({ onAddToCart, itemId }: Props) => {
  const {
    items,
    locationId,
    bizName,
    storeName,
    appointmentModalState,
    openAppointmentModal,
    closeAppointmentModal,
  } = useStoreCartStore();
  const [transition, startTransition] = useTransition();
  const [scheduledForLater, setScheduledForLater] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentSlotPayload>();
  const [appointmenConsentModalOpen, setAppointmentConsentModalOpen] =
    useState<boolean>(false);

  const { checkTokenValidity } = useCalendarConsentStore();
  const isTokenValid = checkTokenValidity();

  const handleAddToCart = () => {
    if (!selectedAppointment) return;
    startTransition(async () => {
      onAddToCart("APPOINTMENT_PER_ITEM", selectedAppointment);
    });
    // setSelectedAppointment(undefined);
  };

  const handleNext = (appointment: AppointmentSlotPayload) => {
    if (appointment) {
      const isTokenValid = checkTokenValidity();
      console.log({ isTokenValid });

      setSelectedAppointment(appointment);
      if (!isTokenValid) {
        setAppointmentConsentModalOpen(true);
        return;
      }
      closeAppointmentModal();
      handleCalendarCancel();
    }
  };

  const handleScheduleLater = () => {
    const date = new Date().toISOString().split("T")[0];
    const scheduleForLaterObj: AppointmentSlotPayload = {
      [date]: {
        startTime: "",
        endTime: "",
        bookingDay: "",
        locId: NaN,
        objId: NaN,
      },
    };
    setScheduledForLater(true);
    setSelectedAppointment(scheduleForLaterObj);
    closeAppointmentModal();
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
      // setCartLevelAppointments(selectedAppointment);
      // setModalOpen(false);
      closeAppointmentModal();
    }
    setAppointmentConsentModalOpen(false);
    // setSelectedAppointment(undefined);
  };

  const handleCalendarCancel = () => {
    if (selectedAppointment) {
      // setCartLevelAppointments(selectedAppointment);
      closeAppointmentModal();
    }
    setAppointmentConsentModalOpen(false);
    // setSelectedAppointment(undefined);
  };

  const handleAppointmentModalChange = (open: boolean) => {
    if (open) {
      openAppointmentModal();
    } else {
      closeAppointmentModal();
    }
  };

  // if (scheduledForLater || selectedAppointment) {
  //   return (
  //     <div className="flex-between gap-4 border-t border-secondary-20 p-4">
  //       {items.length > 0 ? (
  //         <Button variant="primary" stdHeight stdWidth asChild>
  //           <Link href={ROUTES.STORE_CART}>Checkout</Link>
  //         </Button>
  //       ) : (
  //         <div></div>
  //       )}
  //       <Button
  //         variant="primary-outlined"
  //         stdHeight
  //         stdWidth
  //         onClick={handleAddToCart}
  //         disabled={transition}
  //       >
  //         <ShoppingCart size={20} className="!size-5" />{" "}
  //         {transition ? "Adding to cart" : "Add to cart"}
  //       </Button>
  //     </div>
  //   );
  // }

  return (
    <>
      {scheduledForLater || selectedAppointment ? (
        <div className="flex-between gap-4 border-t border-secondary-20 p-4">
          {items.length > 0 ? (
            <Button variant="primary" stdHeight stdWidth asChild>
              <Link href={ROUTES.STORE_CART}>Checkout</Link>
            </Button>
          ) : (
            <div></div>
          )}
          <Button
            variant="primary-outlined"
            stdHeight
            stdWidth
            onClick={handleAddToCart}
            disabled={transition}
          >
            <ShoppingCart size={20} className="!size-5" />{" "}
            {transition ? "Adding to cart" : "Add to cart"}
          </Button>
        </div>
      ) : (
        <div className="flex-between gap-4 border-t border-secondary-20 p-4">
          <Button
            variant="primary-outlined"
            stdHeight
            stdWidth
            onClick={handleScheduleLater}
          >
            Schedule for later
          </Button>
          <Button
            variant="primary"
            stdHeight
            stdWidth
            onClick={openAppointmentModal}
          >
            <ShoppingCart size={20} className="!size-5" /> Book an appointment
          </Button>
        </div>
      )}
      <Modal
        title={bizName}
        open={appointmentModalState.isOpen}
        onOpenChange={handleAppointmentModalChange}
        closeOnOutsideClick={false}
        contentClassName="!max-w-screen-xl"
      >
        <SlotBooking
          objId={itemId}
          title={storeName || ""}
          defaultLocationId={`${locationId}`}
          showHeader={false}
          onNext={handleNext}
          onScheduleLater={handleScheduleLater}
          // slotAvailabilityAdjuster={}
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
      </Modal>
      <AppointmentConsentModal
        isOpen={appointmenConsentModalOpen}
        onConfirm={handleCalendarConfirm}
        onCancel={handleCalendarCancel}
        onClose={() => setAppointmentConsentModalOpen(false)}
      />
    </>
  );
};

export default AppointmentPerItem;
