"use client";

import { PencilLine } from "lucide-react";
import React from "react";

import Button from "@/components/global/buttons";
import { Modal } from "@/components/global/modal";
import { Input } from "@/components/ui/input";
import { CurrencySymbol } from "@/types/global";
import { useOfferCartStore } from "@/zustand/stores/offer-details/offer-cart.store";

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

type AppointmentDetailsRowProps = {
  startTime: string;
  endTime: string;
  date: Date;
  qty: number;
  amount: number;
  currencySymbol: CurrencySymbol;
  onEdit: () => void;
};

const AppointmentDetailsRow = ({
  startTime,
  endTime,
  amount,
  date,
  // qty,
  currencySymbol,
  onEdit,
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
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" }); // "Sat"
  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);

  const displayString = `${formattedDate} (${dayName}) ${formattedStartTime} - ${formattedEndTime}`;

  return (
    <div className="flex-between gap-4">
      <div>{displayString}</div>
      {/* <div>{qty}</div> */}
      <Input
        type="text"
        // value={qty}
        value={1}
        className="hide-input-arrow no-focus body-3 h-8 w-14 rounded-5 border border-secondary-20 bg-white text-black-80 shadow-none !outline-none ring-0 disabled:cursor-text disabled:opacity-100"
        disabled
      />
      <div className="flex items-center gap-2">
        <div>
          {currencySymbol}
          {amount}{" "}
        </div>
        <PencilLine size={16} className="cursor-pointer" onClick={onEdit} />
      </div>
    </div>
  );
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
  const { getCartItem } = useOfferCartStore();

  const cartItem = getCartItem(offerId);

  if (!cartItem || !cartItem.appointments) return null;

  const handleEdit = (index: number) => {
    // TODO: complete function defination
    console.log("handleEdit clicked!!", index);
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
            {cartItem.appointments.map((appointment, i) => (
              <AppointmentDetailsRow
                key={`${appointment.startTime}-${i}`}
                amount={cartItem.amount}
                currencySymbol={"$"}
                date={appointment.date}
                startTime={appointment.startTime}
                endTime={appointment.endTime}
                qty={cartItem.qty}
                onEdit={() => handleEdit(i)}
              />
            ))}
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
