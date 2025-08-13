"use client";

import React, { useEffect, useState } from "react";

import { StoreCartItem } from "@/types/zustand/store-cart-store.types";

import StoreCartQtySelector from "./store-cart-qty-selector";

type Props = {
  storeCartItem: StoreCartItem;
};

type ModifierCardProps = {
  name: string;
  price: number;
};

const ModifierCard = ({ name, price }: ModifierCardProps) => {
  return (
    <div className="flex-between gap-4 rounded-10 bg-white p-4">
      <div>{name}</div>
      <div>${price}</div>
    </div>
  );
};

const CartItemCard = ({ storeCartItem }: Props) => {
  const [qty, setQty] = useState<number>(1);
  const name = storeCartItem.storeItem.item.name;
  const itemPrice = storeCartItem.price;
  const wholeModifiers = storeCartItem.modifiers.whole;
  const addonModifiers = storeCartItem.modifiers.addon;

  useEffect(() => {
    setQty(storeCartItem.qty);
  }, [storeCartItem.qty]);

  return (
    <div className="flex w-full flex-col gap-4 rounded-10 bg-primary-0.5 p-4">
      <div className="heading-6 grid w-full grid-cols-8 rounded-10 bg-primary-0.5 text-black-heading">
        <div className="col-span-3">{name}</div>
        <div className="flex-center col-span-2">
          <StoreCartQtySelector
            qty={qty}
            min={1}
            onDecrement={() => {}}
            onIncrement={() => {}}
            setQty={() => {}}
          />
        </div>
        <div className="col-span-3 flex place-content-end items-center">
          ${itemPrice}
        </div>
      </div>
      {wholeModifiers.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="body-1-medium">Whole</div>
          <div className="flex flex-col gap-4">
            {wholeModifiers.map((modifier) => (
              <ModifierCard
                key={modifier.objid}
                name={modifier.modifier.modName}
                price={modifier.price}
              />
            ))}
          </div>
        </div>
      )}
      {addonModifiers.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="body-1-medium">Add-Ons</div>
          <div className="flex flex-col gap-4">
            {addonModifiers.map((modifier) => (
              <ModifierCard
                key={modifier.objid}
                name={modifier.modifier.modName}
                price={modifier.price}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItemCard;
