"use client";

import { Minus, Plus } from "lucide-react";
import React from "react";

import Button from "@/components/global/buttons";
import { Input } from "@/components/ui/input";

type Props = {
  qty: number;
  onIncrement: () => void;
  onDecrement: () => void;
  setQty: (newQty: number) => void;
  min?: number;
};

const StoreCartQtySelector = ({
  qty,
  setQty,
  onDecrement,
  onIncrement,
  min = 1,
}: Props) => {
  const handleQtyChange = (newQty: number) => {
    setQty(Math.max(newQty, min));
  };
  return (
    <div className="relative flex gap-3">
      <Button
        onClick={onDecrement}
        disabled={qty <= 1}
        className="size-6 !rounded-full border-2 border-black-heading bg-transparent p-0 hover:bg-transparent"
      >
        <Minus size={18} className="text-black-heading" />
      </Button>
      <Input
        type="number"
        min={min}
        value={qty}
        onChange={(e) => handleQtyChange(Number(e.target.value))}
        className="hide-input-arrow no-focus placeholder body-1 h-[33px] w-[52px] border-y border-secondary-20 bg-white text-black-70 shadow-none"
      />
      <Button
        onClick={onIncrement}
        className="size-6 !rounded-full border-2 border-black-heading bg-transparent p-0 hover:bg-transparent"
      >
        <Plus size={18} className="text-black-heading" />
      </Button>
    </div>
  );
};

export default StoreCartQtySelector;
