"use client";

import React from "react";

import DefaultCard from "@/components/global/cards/default-card";
import {
  AppointmentSlot,
  AppointmentSlotPayload,
} from "@/types/invoice/invoice.types";
import {
  OfferCartAppointmentSlot,
  OfferCartItem,
} from "@/types/zustand/offer-cart-store.types";
import { useOfferCartStore } from "@/zustand/stores/offer-details/offer-cart.store";

import {
  AppointmentDetailsRow,
  AppointmentDetailsRowProps,
} from "./offers-section/appointment/appointment-details-row";

type ProcessedAppointment = {
  appointment: AppointmentSlotPayload;
  index: number;
  dateKey: string;
  appointmentDetails: AppointmentSlot;
};

const processAppointments = (cartItem: OfferCartItem) => {
  const scheduledLaterAppointments: ProcessedAppointment[] = [];
  const regularAppointments: ProcessedAppointment[] = [];

  cartItem.appointments.forEach((appointment, index) => {
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

  if (scheduledLaterAppointments.length > 0) {
    result.push({
      type: "scheduledLater",
      appointment: scheduledLaterAppointments[0].appointment,
      index: scheduledLaterAppointments[0].index,
      dateKey: scheduledLaterAppointments[0].dateKey,
      appointmentDetails: scheduledLaterAppointments[0].appointmentDetails,
      qty: scheduledLaterAppointments.length,
    });
  }

  return result;
};

const OfferSummarySection = () => {
  const { openAppointmentModalForEdit, items: cartItems } = useOfferCartStore();

  const handleEdit = (offerId: number, appointmentIndex: number) => {
    const cartItem = cartItems.find((item) => item.offerId === offerId);
    if (!cartItem) return;
    const appointment = cartItem.appointments[appointmentIndex];
    if (!appointment) return;
    const editPendingAction = (
      updatedAppointment?: OfferCartAppointmentSlot
    ) => {
      console.log("Edit appointment completed", { updatedAppointment });
    };
    openAppointmentModalForEdit(offerId, appointmentIndex, editPendingAction);
  };

  return (
    <DefaultCard className="w-full p-4 sm:p-6">
      <h2 className="heading-7-medium mb-2 text-secondary">Offer Summary</h2>
      <div className="flex flex-col gap-4">
        {cartItems.map((item, index) => {
          const processedAppointments = processAppointments(item);

          return (
            <div
              key={index}
              className="flex flex-col rounded-10 border border-secondary-20"
            >
              <div className="body-1-medium border-b border-secondary-20 p-4 text-black-80">
                {item.offer.title}
              </div>
              <div className="flex flex-col gap-4 p-4 text-black-80">
                {processedAppointments.length > 0 ? (
                  processedAppointments.map((appointment, i) => {
                    return (
                      <AppointmentDetailsRow
                        key={`${appointment.appointmentDetails.startTime}-${i}`}
                        startTime={appointment.appointmentDetails.startTime}
                        endTime={appointment.appointmentDetails.endTime}
                        amount={item.offer.offerPrice * appointment.qty}
                        currencySymbol={item.offer.currencySymbol}
                        date={new Date(appointment.dateKey)}
                        qty={appointment.qty}
                        onEdit={() => handleEdit(item.offerId, i)}
                        offerName={item.offer.title}
                        type={appointment.type}
                      />
                    );
                  })
                ) : (
                  <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-3">{item.offer.title}</div>
                    <div className="flex-center w-16 rounded-5 border border-secondary-20 px-2 py-1">
                      {item.qty}
                    </div>
                    <div className="flex min-w-6 items-center justify-end">
                      <div>
                        {item.offer.currencySymbol}
                        {item.amount}{" "}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </DefaultCard>
  );
};

export default OfferSummarySection;
