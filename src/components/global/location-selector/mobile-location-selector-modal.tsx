"use client";

import { MapPin } from "lucide-react";
import React, { useState } from "react";

import { Modal } from "@/components/global/modal";

// import LocationSelector from ".";
import LocationSelector from ".";

const MobileLocationSelectorModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <>
      <MapPin
        onClick={handleModalOpen}
        size={25}
        className="flex text-white sm:hidden"
      />
      <Modal
        title={<div className="text-left">Select location</div>}
        open={modalOpen}
        onOpenChange={(open) => {
          if (!open) handleModalClose();
        }}
      >
        <LocationSelector className="w-full" />
      </Modal>
    </>
  );
};

export default MobileLocationSelectorModal;
