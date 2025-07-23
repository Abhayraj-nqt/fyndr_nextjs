import React from "react";

// import SlotBooking from "@/components/global/appointment/slot-booking";
import SlotBooking2 from "@/components/global/appointment/slot-booking2";

const SlotBookingPage = () => {
  return (
    <div className="flex min-h-screen flex-col gap-10 p-4">
      <h1>SlotBookingPage</h1>
      <div className="">
        {/* <SlotBooking /> */}
        <SlotBooking2
          title="Appoint booking for test title"
          defaultLocationId="477"
        />
      </div>
    </div>
  );
};

export default SlotBookingPage;
