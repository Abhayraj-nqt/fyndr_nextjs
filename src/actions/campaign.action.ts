"use server";

import { API_BASE_URL } from "@/environment";
import { _post } from "@/lib/handlers/fetch";
import {
  GetCampaignByQrProps,
  GetCampaignsProps,
} from "@/types/api-params/campaign.params";
import {
  CampaignResponse,
  CampaignsResponse,
} from "@/types/api-response/campaign.response";

export const onGetCampaignByQr: GetCampaignByQrProps = async (
  params,
  payload
) => {
  const { qrCode, orderBy = "ASC", sortedBy = "PRICE" } = params;

  const endpoint = `${API_BASE_URL}/campaign/v2/public/fetchByQR/${qrCode}?orderBy=${orderBy}&sortedBy=${sortedBy}`;

  return _post<CampaignResponse>(endpoint, payload, {
    requireAuth: true,
    cache: "force-cache",
  });
};

export const onGetCampaigns: GetCampaignsProps = async (params, payload) => {
  console.log(payload);

  let endpoint = `${API_BASE_URL}/campaign/v2/public/search?pgStart=${params.page}&pgSize=${params.pageSize}`;
  if (params.search) {
    endpoint = `${endpoint}&text=${params.search}`;
  }
  if (params.orderBy) {
    endpoint = `${endpoint}&orderBy=${params.orderBy}`;
  }

  return _post<CampaignsResponse>(endpoint, payload, {
    timeout: 20000,
    cache: "force-cache",
    next: {
      revalidate: 10000,
    },
  });
};
