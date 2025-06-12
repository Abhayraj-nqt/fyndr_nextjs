"use client";

import { MapPin } from "lucide-react";
import React, { useState } from "react";

import { Modal } from "@/components/global/modal";

// import LocationSelector from ".";
import LocationSelector from ".";

type Props = {
  className?: string;
};

const MobileLocationSelectorModal = ({ className }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <div className={`flex ${className}`}>
      <MapPin onClick={handleModalOpen} size={25} className="flex text-white" />
      <Modal
        title={<div className="text-left">Select location</div>}
        open={modalOpen}
        onOpenChange={(open) => {
          if (!open) handleModalClose();
        }}
      >
        <LocationSelector className="w-full" />
      </Modal>
    </div>
  );
};

export default MobileLocationSelectorModal;
