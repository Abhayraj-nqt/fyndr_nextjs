"use client";
import { PencilLine, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import OfferForm from "@/components/forms/business/campaign/offer-form";
import Button from "@/components/global/buttons";
import DefaultCard from "@/components/global/cards/default-card";
import { Modal } from "@/components/global/modal";

const OfferComponent = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <>
      <DefaultCard className="m-4 min-h-[400px] w-full max-w-[80%] flex-col border-solid bg-white p-[16px] outline-black">
        <div className="flex flex-1 justify-end">
          <Button variant="primary" onClick={handleModalOpen}>
            Create Offer
            <Plus className="text-white" />
          </Button>
        </div>
        <DefaultCard className="mt-3 flex h-[130px] w-full max-w-full border-solid bg-white p-2 py-3 outline-black">
          <div className="flex-center h-full">
            <Image
              src="/images/fyndr-placeholder-gray.svg"
              alt="Preview"
              className="size-4/5 rounded-lg object-cover"
              width={0}
              height={0}
            />
          </div>
          <div className="grid flex-1 grid-cols-3 grid-rows-3 gap-2">
            <span className="text-sm font-medium text-gray-600">
              Testing_01
            </span>
            <span className="text-sm text-black-70">Sold Offer:</span>
            <span className="text-sm text-black-70">
              Remaining Offer:Unlimted
            </span>

            <span className="text-sm text-gray-600">$16</span>
            <span className="text-sm text-black-70">Discount:20% OFF</span>
            <span className="text-sm text-black-70">Per User Limit:9</span>

            <span className="text-sm text-black-70">$20</span>
            <span className="text-sm text-black-70">Repurchase Period:</span>
            <span className="text-sm text-black-70">
              Offer Limit: Unlimited
            </span>
          </div>
          <div className="ml-4 flex flex-col justify-between">
            <Button
              variant="primary-outlined"
              className="mb-2 px-2 py-[6px] font-roboto text-xs"
            >
              20% Off
            </Button>
            <Button variant="primary">
              Edit
              <PencilLine className="text-white" />
            </Button>
          </div>
        </DefaultCard>
      </DefaultCard>

      <Modal
        title={"Create Offer"}
        open={modalOpen}
        onOpenChange={(open) => {
          if (!open) handleModalClose();
        }}
        closeOnOutsideClick={false}
        width="840px"
      >
        <OfferForm handleModalClose={handleModalClose} />
      </Modal>
    </>
  );
};

export default OfferComponent;
