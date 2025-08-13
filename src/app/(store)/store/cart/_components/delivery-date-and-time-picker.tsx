"use client";

import { CalendarDays } from "lucide-react";
import React, { useState } from "react";

import SlotBooking from "@/components/global/appointment/slot-booking";
import { Modal } from "@/components/global/modal";

const DeliveryDateAndTimePicker = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="heading-6 flex">
      <div className="flex-between gap-2" onClick={() => setModalOpen(true)}>
        Click here to set the delivery date and time <CalendarDays size={20} />
      </div>
      <Modal
        title={"Hello"}
        open={modalOpen}
        onOpenChange={setModalOpen}
        closeOnOutsideClick={false}
        contentClassName="!max-w-screen-xl"
      >
        <SlotBooking objId={1} title="" />
      </Modal>
    </div>
  );
};

export default DeliveryDateAndTimePicker;
