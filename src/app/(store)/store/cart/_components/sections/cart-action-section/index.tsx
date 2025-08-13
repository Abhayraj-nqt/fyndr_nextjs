"use client";

import React from "react";

import Button from "@/components/global/buttons";
import { Textarea } from "@/components/ui/textarea";

import DeliveryDateAndTimePicker from "../../delivery-date-and-time-picker";

const CartActionSection = () => {
  return (
    <div className="flex flex-col gap-6 p-4">
      <DeliveryDateAndTimePicker />
      <Textarea
        placeholder="Special Instruction (Optional)"
        className="no-focus placeholder min-h-20 !rounded-10 border border-secondary-20 text-black-70 shadow-none"
      />
      <div className="flex-center my-4 w-full">
        <Button
          stdHeight
          stdWidth
          variant="primary"
          className="w-full max-w-md"
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
};

export default CartActionSection;
