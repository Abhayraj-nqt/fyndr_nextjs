"use server";

import { CampaignProps } from "@/types/campaign";
import { Coordinates } from "@/types/global";

import { _post } from "../handlers/fetch";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export async function onGetCampaignByQr(params: {
  qrCode: string;
  sortedBy?: string;
  orderBy?: string;
}) {
  const { qrCode, orderBy = "ASC", sortedBy = "PRICE" } = params;

  const endpoint = `${API_BASE_URL}/campaign/v2/public/fetchByQR/${qrCode}?orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const payload = {
    lat: 33.4483771,
    lng: -112.0740373,
  };

  return _post<CampaignProps>(endpoint, payload, {
    requireAuth: true,
    cache: "force-cache",
  });
}

export async function onGetCampaigns(
  params: {
    search?: string;
    page: number;
    pageSize: number;
    orderBy?: string;
  },
  payload: {
    indvId: number | null;
    distance: number;
    location: Coordinates;
    categories: string[];
    fetchById: string;
    fetchByGoal: string;
  }
) {
  type Response = {
    campaigns: CampaignProps[];
    last: boolean;
    resultFromCampaignTag: boolean;
    resultFromTextExactMatch: null | boolean;
  };

  let endpoint = `${API_BASE_URL}/campaign/v2/public/search?pgStart=${params.page}&pgSize=${params.pageSize}`;
  if (params.search) {
    endpoint = `${endpoint}&text=${params.search}`;
  }
  if (params.orderBy) {
    endpoint = `${endpoint}&orderBy=${params.orderBy}`;
  }

  return _post<Response>(endpoint, payload, {
    timeout: 10000,
  });
}
