"use server";

import { API_BASE_URL } from "@/environment";
import { _get, _post, _put } from "@/lib/handlers/fetch";
import {
  GetCampaignByQrProps,
  GetCampaignListProps,
  GetCampaignMarkerProps,
  GetCampaignsProps,
  LikeCampaignProps,
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
  const baseUrl = `${API_BASE_URL}/campaign/v2/public/search`;
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.append("pgStart", params.page.toString());
  }
  if (params.pageSize) {
    searchParams.append("pgSize", params.pageSize.toString());
  }
  if (params.search) {
    searchParams.append("text", params.search);
  }
  if (params.orderBy) {
    searchParams.append("orderBy", params.orderBy);
  }

  // Construct final endpoint
  const endpoint = searchParams.toString()
    ? `${baseUrl}?${searchParams.toString()}`
    : baseUrl;

  console.log({ endpoint });

  return _post<CampaignsResponse>(endpoint, payload, {
    timeout: 20000,
    cache: "force-cache",
    next: {
      revalidate: 10000,
    },
  });
};

export const onGetCampaignMarkers: GetCampaignMarkerProps = async (payload) => {
  const endpoint = `${API_BASE_URL}/campaign/v2/public/search`;
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

export const onLikeCampaign: LikeCampaignProps = async (payload) => {
  const endpoint = `${API_BASE_URL}/campaign/indvcmpn`;

  if (payload.objid) {
    return _put(endpoint, payload, {
      requireAuth: true,
    });
  }

  return _post(endpoint, payload, {
    requireAuth: true,
  });
};
