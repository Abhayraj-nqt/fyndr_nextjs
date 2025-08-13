"use client";

import React from "react";

import TipSelector from "../../tip-selector";

const PricingSection = () => {
  return (
    <div className="flex flex-col ">
      <div className="flex-between w-full gap-4 border-b border-secondary-20">
        <div className="heading-6 flex w-full flex-col gap-4 p-4">
          <div className="flex-between">
            <div>Total Price</div>
            <div>$740.00</div>
          </div>
          <div className="flex-between">
            <div>Tax</div>
            <div>$740.00</div>
          </div>
          <div className="flex-between">
            <div className="flex-between gap-4">
              Add Tip: <TipSelector onSelect={() => {}} />
            </div>
            <div>$740.00</div>
          </div>
        </div>
        <div className="h-4 w-[41px]"></div>
      </div>
      <div className="flex-between gap-4 border-b border-secondary-20">
        <div className="flex-between heading-6 w-full p-4">
          <div>Total Payable Amount</div>
          <div>$834.00</div>
        </div>
        <div className="h-4 w-[41px]"></div>
      </div>
    </div>
  );
};

export default PricingSection;
