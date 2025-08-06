/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { PaymentMethod } from "@/types/payment/payment.types";

import Button from "../buttons";

const getCardIcon = (brand: string) => {
  switch (brand) {
    case "visa":
      return "fab fa-cc-visa";
    case "mastercard":
      return "fab fa-cc-mastercard";
    case "amex":
      return "fab fa-cc-amex";
    case "discover":
      return "fab fa-cc-discover";
    default:
      return "fas fa-credit-card"; // Default icon for unknown brands
  }
};

type Props = {
  cards: PaymentMethod[];
  onCardChange?: (card: PaymentMethod) => void;
  className?: string;
};

const CardPay = ({ cards = [], onCardChange, className }: Props) => {
  const [selectedCardId, setselectedCardId] = useState<string>();

  const handleCardChange = (cardId: string) => {
    setselectedCardId(cardId);
    const selectedCard = cards.find((card) => card.id === cardId);
    if (selectedCard && onCardChange) {
      onCardChange(selectedCard);
    }
  };

  useEffect(() => {
    if (cards.length > 0) {
      const defaultCard = cards.find((card) => card.default === "y");
      setselectedCardId(defaultCard?.id);
      if (onCardChange && defaultCard) {
        onCardChange(defaultCard);
      }
    }
  }, []);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <RadioGroup
        value={selectedCardId}
        onValueChange={handleCardChange}
        className="flex flex-col gap-2"
      >
        {cards.length > 0 ? (
          cards.map((card) => {
            const isSelected = selectedCardId === card.id;

            return (
              <div key={card.id} className="relative">
                <Label
                  htmlFor={card.id}
                  className={cn(
                    `flex cursor-pointer rounded-10 border border-secondary-20 text-black-60 transition-all duration-200 ease-in-out h-[46px] items-center
                      px-3 py-2.5 peer-checked:border-blue-500 peer-checked:bg-gray-800
                      ${isSelected ? "border-primary" : "border-secondary-20"}
                    `,
                    "justify-between"
                  )}
                >
                  <i
                    className={`${getCardIcon(card.brand)} heading-7 ${isSelected ? "text-primary" : ""}`}
                  />
                  <div className={`${isSelected ? "text-primary" : ""}`}>
                    **** **** **** {card.last4}
                  </div>
                  <RadioGroupItem
                    value={card.id}
                    id={card.id}
                    // className="peer sr-only"
                    className={`shadow-none ${isSelected ? "border-primary" : ""}`}
                  />
                </Label>
              </div>
            );
          })
        ) : (
          <div className="text-black-50">No payment methods available</div>
        )}
      </RadioGroup>
      <Button variant="primary-dark-outlined" className="w-full" stdHeight>
        Add a new card{" "}
        <span className="flex-center rounded-5 border border-secondary p-0.5">
          <Plus size={20} className="!size-4" />
        </span>
      </Button>
    </div>
  );
};

export default CardPay;
