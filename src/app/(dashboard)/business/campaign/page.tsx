import React from "react";

import { onGetCampaignList } from "@/actions/campaign.action";
import { auth } from "@/auth";
import ContainerWrapper from "@/components/global/ContainerWrapper";

import Campaigns from "./_components";

const CampaignCenter = async () => {
  const session = await auth();
  const bizid = session?.user?.bizid;
  if (!bizid) throw new Error("BizId is required");

  const { success, data } = await onGetCampaignList({ bizid });
  if (!success || !data) return null;

  return (
    <ContainerWrapper title="Campaign Center">
      <Campaigns campaigns={data.campaigns} />
    </ContainerWrapper>
  );
};

export default CampaignCenter;
