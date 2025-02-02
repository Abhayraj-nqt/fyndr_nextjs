import { Coordinates } from "@/types/global";

import { fetchHandler } from "./handlers/fetch";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export const api = {
  auth: {
    signInWithCredentials: (payload: { email: string; password: string[] }) =>
      fetchHandler(`${API_BASE_URL}/identity/signin`, {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          pwd: payload.password,
          mode: "classic",
        }),
      }),
  },
  categories: {
    getAll: () =>
      fetchHandler<Category[]>(`${API_BASE_URL}/campaign/public/categories`),
  },
  business: {
    getBusinessCampaigns: () =>
      fetchHandler(
        `${API_BASE_URL}/campaign/fetch/business/1000139?pgStart=0&pgSize=100&status=ALL`,
        {
          requireAuth: true,
        }
      ),
  },
  location: {
    getBackgroundImage: (params: Coordinates) =>
      fetchHandler<{ backgroundImageUrl: string }>(
        `${API_BASE_URL}/identity/background-image?lat=${params.lat}&lng=${params.lng}`,
        {
          cache: "force-cache",
        }
      ),
  },
  campaigns: {
    getCampaigns: (
      params: {
        search?: string;
        page: number;
        pageSize: number;
        orderBy?: string;
      },
      payload: {
        indvId: number;
        distance: number;
        location: Coordinates;
        categories: string[];
        fetchById: string;
        fetchByGoal: string;
      }
    ) => {
      let endpoint = `${API_BASE_URL}/campaign/v2/public/search?pgStart=${params.page}&pgSize=${params.pageSize}`;
      if (params.search) {
        endpoint = `${endpoint}&text=${params.search}`;
      }
      if (params.orderBy) {
        endpoint = `${endpoint}&orderBy=${params.orderBy}`;
      }

      return fetchHandler<{
        campaigns: Campaign[];
        count: number;
        last: boolean;
        resultFromCampaignTag: boolean;
        resultFromTextExactMatch: null | boolean;
      }>(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    getCatalogue: (
      params: {
        search?: string;
        page: number;
        pageSize: number;
      },
      payload: {
        indvId: number | null;
        distance: number;
        location: Coordinates;
        isCategory: boolean;
      }
    ) => {
      let endpoint = `${API_BASE_URL}/catalogue/v2/search?pgStart=${params.page}&pgSize=${params.pageSize}`;
      if (params.search) {
        endpoint = `${endpoint}&text=${params.search.replace("&", "%26")}`;
      }

      return fetchHandler<{
        bizdir: BizDir[];
        count: number;
        last: boolean;
        resultFromTextExactMatch: null | boolean;
      }>(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
  },
};
