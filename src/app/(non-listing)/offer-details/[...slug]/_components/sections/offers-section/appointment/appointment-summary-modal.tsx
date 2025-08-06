"use client";

import { PencilLine } from "lucide-react";
import React, { useMemo } from "react";

import Button from "@/components/global/buttons";
import { Modal } from "@/components/global/modal";
import {
  AppointmentSlot,
  AppointmentSlotPayload,
} from "@/types/invoice/invoice.types";
import { OfferCartAppointmentSlot } from "@/types/zustand/offer-cart-store.types";
import { useOfferCartStore } from "@/zustand/stores/offer-details/offer-cart.store";

import { AppointmentDetailsRowProps } from "./appointment-details-row";

const formatTime = (timeStr: string) => {
  const [hour, minute] = timeStr.split(":");
  const date = new Date();
  date.setHours(Number(hour), Number(minute));
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const AppointmentDetailsRow = ({
  startTime,
  endTime,
  amount,
  date,
  qty,
  currencySymbol,
  onEdit,
  offerName,
}: AppointmentDetailsRowProps) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formattedDate = `${months[date.getMonth()]} ${date.getDate()}`;
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);

  const displayString = `${formattedDate} (${dayName}) ${formattedStartTime} - ${formattedEndTime}`;
  const isScheduledForLater = !startTime.length || !endTime.length;

  return (
    <div
      className={`flex w-full flex-col ${isScheduledForLater ? "rounded-10 border border-secondary-20 p-4" : ""}`}
    >
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3">
          {isScheduledForLater ? offerName : displayString}
        </div>
        <div className="flex-center w-16 rounded-5 border border-secondary-20 px-2 py-1">
          {qty}
        </div>
        <div className="flex min-w-6 items-center justify-end gap-2">
          <div>
            {currencySymbol}
            {amount}{" "}
          </div>
          {!isScheduledForLater ? (
            <PencilLine size={16} className="cursor-pointer" onClick={onEdit} />
          ) : (
            <></>
          )}
        </div>
      </div>
      {isScheduledForLater ? (
        <div className="body-3 w-fit rounded-5  bg-secondary-10 px-2 py-1 text-black-70">
          Schedule later
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

type ProcessedAppointment = {
  appointment: AppointmentSlotPayload;
  index: number;
  dateKey: string;
  appointmentDetails: AppointmentSlot;
};

type AppointmentSummaryModalProps = {
  offerId: number;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  offerName: string;
};

const AppointmentSummaryModal = ({
  offerId,
  isOpen,
  offerName,
  onClose,
  title,
}: AppointmentSummaryModalProps) => {
  const { getCartItem, openAppointmentModalForEdit } = useOfferCartStore();
  const cartItem = getCartItem(offerId);

  // Process appointments to group "scheduled for later" ones
  const processedAppointments = useMemo(() => {
    const scheduledLaterAppointments: ProcessedAppointment[] = [];
    const regularAppointments: ProcessedAppointment[] = [];

    cartItem?.appointments.forEach((appointment, index) => {
      const dateKey = Object.keys(appointment)[0];
      const appointmentDetails = appointment[dateKey];

      const isScheduledForLater =
        !appointmentDetails.startTime.length ||
        !appointmentDetails.endTime.length;

      if (isScheduledForLater) {
        scheduledLaterAppointments.push({
          appointment,
          index,
          dateKey,
          appointmentDetails,
        });
      } else {
        regularAppointments.push({
          appointment,
          index,
          dateKey,
          appointmentDetails,
        });
      }
    });

    const result: (ProcessedAppointment & {
      type: AppointmentDetailsRowProps["type"];
      qty: number;
    })[] = [];

    regularAppointments.forEach(
      ({ appointment, index, dateKey, appointmentDetails }) => {
        result.push({
          type: "regular",
          appointment,
          index,
          dateKey,
          appointmentDetails,
          qty: 1,
        });
      }
    );
    // Add grouped scheduled for later appointments
    if (scheduledLaterAppointments.length > 0) {
      result.push({
        type: "scheduledLater",
        appointment: scheduledLaterAppointments[0].appointment, // Use first one for display
        index: scheduledLaterAppointments[0].index, // Use first index for edit
        dateKey: scheduledLaterAppointments[0].dateKey,
        appointmentDetails: scheduledLaterAppointments[0].appointmentDetails,
        qty: scheduledLaterAppointments.length,
      });
    }

    return result;
  }, [cartItem?.appointments]);

  if (!cartItem || !cartItem.appointments) return null;

  const handleEdit = (appointmentIndex: number) => {
    const appointment = cartItem.appointments[appointmentIndex];
    if (!appointment) return;
    const editPendingAction = (
      updatedAppointment?: OfferCartAppointmentSlot
    ) => {
      console.log("Edit appointment completed", { updatedAppointment });
    };
    openAppointmentModalForEdit(offerId, appointmentIndex, editPendingAction);
  };

  const handleClose = () => {
    onClose();
  };

  const handleModalChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title={<div>{title}</div>}
      closeOnOutsideClick={false}
      open={isOpen}
      onOpenChange={handleModalChange}
      contentClassName="!max-w-2xl"
    >
      <div className="flex flex-col gap-4">
        <div className="rounded-10 border border-secondary-20">
          <div className="border-b border-secondary-20 p-4">
            <div className="body-1-medium text-black-80">{offerName}</div>
          </div>
          <div className="body-3 flex flex-col gap-4 p-4 text-black-80">
            {processedAppointments.map((appointment, i) => {
              return (
                <AppointmentDetailsRow
                  key={`${appointment.appointmentDetails.startTime}-${i}`}
                  amount={cartItem.offer.offerPrice * appointment.qty}
                  currencySymbol={"$"}
                  date={new Date(appointment.dateKey)}
                  startTime={appointment.appointmentDetails.startTime}
                  endTime={appointment.appointmentDetails.endTime}
                  qty={appointment.qty}
                  onEdit={() => handleEdit(i)}
                  offerName={cartItem.offer.title}
                  type={appointment.type}
                />
              );
            })}
          </div>
        </div>
        <div className="flex-center">
          <Button variant="primary" onClick={handleClose} stdHeight stdWidth>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AppointmentSummaryModal;
