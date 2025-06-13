"use server";

import { revalidatePath, unstable_cache } from "next/cache";

import ROUTES from "@/constants/routes";
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

const getCachedCampaigns = unstable_cache(
  async (params: any, payload: any) => {
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

    const endpoint = searchParams.toString()
      ? `${baseUrl}?${searchParams.toString()}`
      : baseUrl;

    console.log({ endpoint });

    return _post<CampaignsResponse>(endpoint, payload, {
      timeout: 20000,
    });
  },
  ["campaigns-data"], // Cache key
  {
    revalidate: 60, // Revalidate every 60 seconds
    tags: ["campaigns"],
  }
);

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

// export const onGetCampaigns: GetCampaignsProps = async (params, payload) => {
//   // Create a stable cache key based on params and payload
//   const cacheKey = JSON.stringify({ params, payload });

//   try {
//     return await getCachedCampaigns(params, payload);
//   } catch (error) {
//     console.error("Error in onGetCampaigns:", error);
//     throw error;
//   }
// };

// export const onGetCampaignsInfinite = async (params, payload):  => {
//   console.log({ params, payload });

//   const baseUrl = `${API_BASE_URL}/campaign/v2/public/search`;
//   const searchParams = new URLSearchParams();

//   if (params.page !== undefined) {
//     searchParams.append("pgStart", params.page.toString());
//   }
//   if (params.pageSize) {
//     searchParams.append("pgSize", params.pageSize.toString());
//   }
//   if (params.search) {
//     searchParams.append("text", params.search);
//   }
//   if (params.orderBy) {
//     searchParams.append("orderBy", params.orderBy);
//   }

//   // Construct final endpoint
//   const endpoint = searchParams.toString()
//     ? `${baseUrl}?${searchParams.toString()}`
//     : baseUrl;

//   console.log({ endpoint });

//   const {success, data} = await _post<CampaignsResponse>(endpoint, payload, {
//     timeout: 20000,
//     // cache: "force-cache",
//     // next: {
//     //   revalidate: 10000,
//     // },
//   });

//   if (!success || !data) {
//     return [];
//   }

//   return

// };

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

  // revalidatePath(ROUTES.OFFERS_AND_EVENTS);
  if (payload.objid) {
    return _put(endpoint, payload, {
      requireAuth: true,
    });
  }

  return _post(endpoint, payload, {
    requireAuth: true,
  });
};
