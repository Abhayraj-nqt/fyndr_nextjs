"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

import Button from "@/components/global/buttons";
import ROUTES from "@/constants/routes";

type Props = {
  onAddToCart: () => void;
};

const NoAppointment = ({ onAddToCart }: Props) => {
  return (
    <div className="flex-between gap-4 border-t border-secondary-20 p-4">
      <Button variant="primary" stdHeight stdWidth asChild>
        <Link href={ROUTES.STORE_CART}>Checkout</Link>
      </Button>
      <Button
        variant="primary-outlined"
        stdHeight
        stdWidth
        onClick={onAddToCart}
      >
        <ShoppingCart size={20} className="!size-5" /> Add to cart
      </Button>
    </div>
  );
};

export default NoAppointment;
