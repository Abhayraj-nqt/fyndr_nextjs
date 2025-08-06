"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import Button from "@/components/global/buttons";
import HtmlContent from "@/components/global/html-content";
import { Modal } from "@/components/global/modal";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import ASSETS from "@/constants/assets";
import { parseAmount } from "@/lib/utils/parser";
import { StoreItem } from "@/types/store/store.types";

import ItemCard from "./item-card";
import StoreQtySelector from "./store-qty-selector";

type Props = {
  trigger: React.ReactNode;
  storeItem: StoreItem;
};

const wholeUnits = ["each", "set", "box", "pair"];

const AddToCartModal = ({ trigger, storeItem }: Props) => {
  const [selectedWholeModifierId, setSelectedWholeModifierId] =
    useState<string>("");
  const [selectedAddonModifierIds, setSelectedAddonModifierIds] = useState<
    string[]
  >([]);
  const [qty, setQty] = useState<number>(1);

  const isWholeUnit: boolean = wholeUnits.includes(storeItem.item.unit);

  const imageUrl =
    storeItem.item?.images?.[0]?.img_url || ASSETS.IMAGES.PLACEHOLDER.FYNDR;
  const itemName = storeItem.item.name;

  const wholeModifiers = storeItem.catalogueModifiers.filter(
    (item) => item.modifier.modType === "whole"
  );
  const addonModifiers = storeItem.catalogueModifiers.filter(
    (item) => item.modifier.modType === "addon"
  );

  const handleWholeModifierChange = (value: string) => {
    setSelectedWholeModifierId(value);
  };

  const handleAddonModifierChange = (modifierId: string, checked: boolean) => {
    setSelectedAddonModifierIds((prev) => {
      if (checked) {
        return [...prev, modifierId];
      } else {
        return prev.filter((id) => id !== modifierId);
      }
    });
  };

  const removeWholeModifier = () => {
    setSelectedWholeModifierId("");
  };

  const calculateTotalPrice = () => {
    let total = storeItem.price * Math.max(qty, 1);

    // Add whole modifier price
    if (selectedWholeModifierId) {
      const wholeModifier = wholeModifiers.find(
        (item) => item.modifier.objid.toString() === selectedWholeModifierId
      );
      if (wholeModifier) {
        total += wholeModifier.price;
      }
    }

    // Add addon modifiers prices
    selectedAddonModifierIds.forEach((id) => {
      const addonModifier = addonModifiers.find(
        (item) => item.modifier.objid.toString() === id
      );
      if (addonModifier) {
        total += addonModifier.price;
      }
    });

    return total;
  };

  const handleIncrement = () => {
    if (isWholeUnit) {
      setQty((prev) => prev + 1);
    } else {
      setQty((prev) => prev + 0.1);
    }
  };

  const handleDecrement = () => {
    if (qty <= 1) return;
    if (isWholeUnit) {
      setQty((prev) => prev - 1);
    } else {
      setQty((prev) => prev - 0.1);
    }
  };

  return (
    <Modal
      title={<div>Add To Cart</div>}
      trigger={trigger}
      closeOnOutsideClick={false}
      bodyClassName="!p-0"
    >
      <div className="no-scrollbar flex max-h-[80vh] flex-col gap-4 overflow-y-scroll p-4">
        <div className="flex flex-col gap-2">
          <Image
            src={imageUrl}
            alt={itemName}
            width={350}
            height={300}
            className="aspect-[2/1] w-full rounded-10"
          />
          <div className="body-1-medium md:title-6-medium mt-2 text-black-80">
            Please choose from any available Variation or Add on
          </div>
          <div className="flex flex-col gap-2">
            <div className="body-1 text-black-80">
              {itemName} - ${parseAmount(storeItem.price)}/{storeItem.item.unit}
            </div>
            <HtmlContent
              htmlString={storeItem.item.description}
              className="body-3 text-black-80"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <ItemCard
            currencySymbol="$"
            imgUrl={imageUrl}
            name={itemName}
            price={storeItem.price}
          />
          {wholeModifiers.length > 0 ? (
            <div className="border-t border-secondary-20">
              <div className="flex-between text-secondary">
                <div className="body-1-medium py-5">Whole</div>
                {selectedWholeModifierId && (
                  <div
                    className="body-1 cursor-pointer underline"
                    onClick={removeWholeModifier}
                  >
                    Remove
                  </div>
                )}
              </div>
              <RadioGroup
                className="flex flex-col gap-2"
                value={selectedWholeModifierId}
                onValueChange={handleWholeModifierChange}
              >
                {wholeModifiers.map((item) => {
                  const modifierImgUrl =
                    item.modifier?.images?.[0]?.img_url ||
                    ASSETS.IMAGES.PLACEHOLDER.FYNDR;

                  const isSelected =
                    selectedWholeModifierId === item.modifier.objid.toString();
                  return (
                    <div
                      key={item.objid}
                      className="relative flex w-full items-center"
                    >
                      <ItemCard
                        currencySymbol="$"
                        imgUrl={modifierImgUrl}
                        name={item.modifier.modName}
                        price={item.price}
                      />
                      <RadioGroupItem
                        value={item.modifier.objid.toString()}
                        className={`absolute right-5 shadow-none ${isSelected ? "border-primary" : "border-black-80"}`}
                      />
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          ) : (
            <></>
          )}
          {addonModifiers.length > 0 ? (
            <div className="border-t border-secondary-20">
              <div className="body-1-medium py-5 text-secondary">Add-ons</div>
              <div className="flex flex-col gap-2">
                {addonModifiers.map((item) => {
                  const modifierImgUrl =
                    item.modifier?.images?.[0]?.img_url ||
                    ASSETS.IMAGES.PLACEHOLDER.FYNDR;

                  const isSelected = selectedAddonModifierIds.includes(
                    item.modifier.objid.toString()
                  );
                  return (
                    <div
                      key={item.objid}
                      className="relative flex w-full items-center"
                    >
                      <ItemCard
                        currencySymbol="$"
                        imgUrl={modifierImgUrl}
                        name={item.modifier.modName}
                        price={item.price}
                      />
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) =>
                          handleAddonModifierChange(
                            item.modifier.objid.toString(),
                            checked as boolean
                          )
                        }
                        className="absolute right-5 border-black-80 shadow-none data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <Textarea
          placeholder="Instructions: spice level, order for, include, exclude"
          className="no-focus placeholder min-h-20 !rounded-10 border border-secondary-20 text-black-70 shadow-none"
        />
        <div className="flex-between text-black-80">
          <div className="title-6">
            Total: ${parseAmount(calculateTotalPrice())}
          </div>
          <StoreQtySelector
            qty={qty}
            setQty={setQty}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        </div>
      </div>
      <div className="flex-between gap-4 border-t border-secondary-20 p-4">
        <Button variant="primary" stdHeight stdWidth>
          Checkout
        </Button>
        <Button variant="primary-outlined" stdHeight stdWidth>
          <ShoppingCart size={20} className="!size-5" /> Add to cart
        </Button>
      </div>
    </Modal>
  );
};

export default AddToCartModal;
