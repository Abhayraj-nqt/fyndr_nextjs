"use server";

import { API_BASE_URL } from "@/environment";
import { _get, _post } from "@/lib/handlers/fetch";
import {
  GetCampaignByQrProps,
  GetCampaignListProps,
  GetCampaignsProps,
} from "@/types/api-params/campaign.params";
import {
  CampaignListResponse,
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

export const onGetCampaignList: GetCampaignListProps = async (params) => {
  const endpoint = `${API_BASE_URL}/campaign/fetch/business/${params.bizid}?pgStart=0&pgSize=100&status=ALL`;

  return _get<CampaignListResponse>(endpoint, {
    requireAuth: true,
    cache: "force-cache",
  });
};
