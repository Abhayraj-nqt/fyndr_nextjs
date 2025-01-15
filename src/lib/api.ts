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
      fetchHandler<category[]>(`${API_BASE_URL}/campaign/public/categories`),
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
};
