import React from "react";

import SlotBooking from "@/components/global/appointment/slot-booking";

const SlotBookingPage = () => {
  return (
    <div className="flex min-h-screen flex-col gap-10 p-4">
      <h1>SlotBookingPage</h1>
      <div className="">
        <SlotBooking
          title="Appoint booking for test title"
          defaultLocationId="477"
          objId={1}
        />
      </div>
    </div>
  );
};

export default SlotBookingPage;
