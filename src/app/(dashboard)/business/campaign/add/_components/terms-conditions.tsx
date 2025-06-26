import React from "react";

import DefaultCard from "@/components/global/cards/default-card";
import CustomEditor from "@/components/global/editor/custom-editor";
import { useCampaignStore } from "@/zustand/stores/campaign.store";

const TermsAndConditions = () => {
  const { campaignPayload, updateCampaignPayload } = useCampaignStore();
  return (
    <>
      <DefaultCard className="m-4 min-h-[300px] w-full max-w-[900px] flex-col border-solid bg-white p-[23px] outline-black">
        <CustomEditor
          value={campaignPayload.finePrint || ""}
          onChange={(val) => updateCampaignPayload("finePrint", val)}
        />
      </DefaultCard>
    </>
  );
};

export default TermsAndConditions;
