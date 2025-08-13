"use client";

import React from "react";

import StoreCartQtySelector from "./store-cart-qty-selector";

const CartItemCard = () => {
  return (
    <div className="heading-6 grid w-full grid-cols-8 rounded-10 bg-primary-0.5 p-4 text-black-heading">
      <div className="col-span-3">Paneer Tikka</div>
      <div className="flex-center col-span-2">
        <StoreCartQtySelector
          qty={1}
          min={1}
          onDecrement={() => {}}
          onIncrement={() => {}}
          setQty={() => {}}
        />
      </div>
      <div className="col-span-3 flex place-content-end items-center">
        $500.00
      </div>
    </div>
  );
};

export default CartItemCard;
