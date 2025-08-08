import React from "react";

import { onGetBusinessCampaigns } from "@/actions/campaign.action";
import { auth } from "@/auth";
import ContainerWrapper from "@/components/global/container-wrapper";

import Campaigns from "./_components";

const CampaignCenter = async () => {
  const session = await auth();
  const bizid = session?.user?.bizid;
  if (!bizid) return null;

  const { success, data } = await onGetBusinessCampaigns({ params: { bizid } });
  if (!success || !data) return null;

  return (
    <ContainerWrapper title="Campaign Center">
      <Campaigns campaigns={data.campaigns} />
    </ContainerWrapper>
  );
};

export default CampaignCenter;
