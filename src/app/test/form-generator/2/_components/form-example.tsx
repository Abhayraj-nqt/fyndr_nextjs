"use client";

import React, { useState } from "react";

import { FormGenerator } from "@/components/global/form-generator";
import { Modal } from "@/components/global/modal";

import { generateFormConfig } from "../form-config";

const ComprehensiveFormDemo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [switchControlValue, setSwitchControlValue] = useState(false);

  const updatedFormConfig = generateFormConfig({
    setSwitchControlValue,
    switchControlValue,
    handleModalState: () => {
      setIsModalOpen(true);
      console.log("Custom ");
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">User Registration Form</h2>
        <FormGenerator {...updatedFormConfig} />
      </div>
      <Modal
        title={"Modal title"}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      >
        Hello
      </Modal>
    </div>
  );
};

export default ComprehensiveFormDemo;
