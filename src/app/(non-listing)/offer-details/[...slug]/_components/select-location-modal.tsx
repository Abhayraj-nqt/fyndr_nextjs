"use client";

import React, { useState } from "react";

import Button from "@/components/global/buttons";
import { Modal } from "@/components/global/modal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CampaignLocation } from "@/types/campaign/campaign.types";
// import { useCartStore } from "@/zustand/stores/offer-details/cart2.store";
// import { useCartStore } from "@/zustand/stores/offer-details/cart3.store";
import { useOfferCartStore } from "@/zustand/stores/offer-details/offer-cart.store";

import LocationCard from "./location-card";

type Props = {
  locations: CampaignLocation[];
  campaignId: number;
  //   onSelect: (selectedLocation: CampaignLocation) => void;
  //   open: boolean;
  //   onOpenChange: ((open: boolean) => void) | undefined;
};

const SelectLocationModal = ({
  locations,
  campaignId,
  //   onSelect,
  //   onOpenChange,
  //   open,
}: Props) => {
  // const {
  //   locationModalState,
  //   closeLocationModal,
  //   executeLocationModalAction,
  //   setCampaignLocation,
  // } = useCartStore();
  const {
    locationModalState,
    closeLocationModal,
    executeLocationModalAction,
    setLocationId,
    getCampaignId,
  } = useOfferCartStore();

  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);

  // const isOpen =
  //   locationModalState.isOpen && locationModalState.campaignId === campaignId;
  const isOpen = locationModalState.isOpen && getCampaignId() === campaignId;

  const handleLocationChange = (value: string) => {
    setSelectedLocationId(Number(value));
  };

  const handleConfirm = async () => {
    if (!selectedLocationId) return;

    const selectedLocation = locations.find(
      (location) => location.locationId === selectedLocationId
    );

    if (!selectedLocation) return;

    setIsProcessing(true);
    try {
      // First set the campaign location
      // setCampaignLocation(campaignId, selectedLocation, locations);
      setLocationId(selectedLocation.locationId);

      // Then execute the pending action
      // executeLocationModalAction(selectedLocation);
      executeLocationModalAction(selectedLocation.locationId);
    } catch (error) {
      console.error("Error processing location selection:", error);
    } finally {
      setIsProcessing(false);
      setSelectedLocationId(null);
    }
  };

  const handleCancel = () => {
    setSelectedLocationId(null);
    closeLocationModal();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCancel();
    }
  };

  //   const handleLocationChange = (value: string) => {
  //     const locationId: number = Number(value);
  //     const selectedLocation = locations.find(
  //       (item) => item.locationId === locationId
  //     );
  //     if (selectedLocation) {
  //       onSelect(selectedLocation);
  //     }
  //   };

  return (
    <>
      <Modal
        // open={open}
        // onOpenChange={onOpenChange}
        open={isOpen}
        onOpenChange={handleOpenChange}
        title={<p>Select Location</p>}
        closeOnOutsideClick={false}
      >
        <RadioGroup
          value={selectedLocationId?.toString()}
          onValueChange={handleLocationChange}
          className="no-scrollbar flex max-h-[80vh] flex-col gap-6 overflow-y-scroll pb-24"
        >
          {locations.map((location, i) => (
            <React.Fragment key={location.objid}>
              <div className="flex-between gap-2">
                <RadioGroupItem value={`${location.locationId}`} />
                <LocationCard
                  location={location}
                  radio={true}
                  variant="modal"
                />
              </div>
              {i !== locations.length - 1 && <Separator className="" />}
            </React.Fragment>
          ))}
        </RadioGroup>
        <div className="flex-center fixed inset-x-0 bottom-0 rounded-b-10 bg-white p-4 shadow-pagination">
          <Button
            variant="primary"
            stdHeight
            stdWidth
            onClick={handleConfirm}
            disabled={!selectedLocationId || isProcessing}
          >
            {isProcessing ? "Processing..." : "Confirm"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SelectLocationModal;
