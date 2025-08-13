"use client";

import { CircleMinus } from "lucide-react";
import React from "react";

import { useStoreCartStore } from "@/zustand/stores/business-store/store-cart-store";

import RemoveCartItemModal from "./remove-cart-item-modal";
import CartItemCard from "../../cart-item-card";

const CartItemSection = () => {
  const { items } = useStoreCartStore();

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-secondary-20 p-4">
        <div className="flex-between">
          <div className="heading-6-medium grid w-full grid-cols-8 px-4">
            <div className="col-span-3">Product</div>
            <div className="flex-center col-span-2">Quantity</div>
            <div className="col-span-3 flex place-content-end items-center">
              Price
            </div>
          </div>
          <div className="h-4 w-[41px]"></div>
        </div>
        {items.map((item, i) => (
          <div key={`${i}-${item.itemId}`} className="flex-between gap-4">
            <CartItemCard storeCartItem={item} />
            <RemoveCartItemModal
              index={i}
              itemId={item.itemId}
              trigger={
                <div className="cursor-pointer text-red-600">
                  <CircleMinus size={24} />
                </div>
              }
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default CartItemSection;
