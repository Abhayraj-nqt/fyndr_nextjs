"use client";

import React, { useState } from "react";

import Button from "@/components/global/buttons";
import { Modal } from "@/components/global/modal";
import { Separator } from "@/components/ui/separator";
import { CampaignLocation } from "@/types/campaign/campaign.types";

import LocationCard from "../../cards/location-card";

type Props = {
  locations: CampaignLocation[];
};

const LocationsModal = ({ locations }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div>
        <Button
          variant="primary-outlined"
          stdHeight
          type="button"
          className="mt-6 w-full"
          onClick={() => setModalOpen(true)}
        >
          View all locations
        </Button>
      </div>
      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={<p>All Locations</p>}
      >
        <div className="no-scrollbar flex max-h-[80vh] flex-col gap-6 overflow-y-scroll">
          {locations.map((item, i) => (
            <React.Fragment key={item.objid}>
              <LocationCard location={item} />
              {i !== locations.length - 1 && <Separator className="" />}
            </React.Fragment>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default LocationsModal;
