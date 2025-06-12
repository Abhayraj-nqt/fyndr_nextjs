import { QueryClient } from "@tanstack/react-query";
import React from "react";

import { onGetCampaigns } from "@/actions/campaign.action";

const MapSection = () => {
  const queryClient = new QueryClient();

  const { data, success, error } = await onGetCampaigns(params, payload);

  return <div></div>;
};

export default MapSection;
