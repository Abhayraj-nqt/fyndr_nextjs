"use server";

import { API_BASE_URL } from "@/environment";
import { _get } from "@/lib/handlers/fetch";
import {
  GetBackgroundImageProps,
  GetFindUsOptionsProps,
} from "@/types/api-params/others.params";
import { BackgroundImageResponse } from "@/types/api-response/others.response";

export const onGetBackgroundImage: GetBackgroundImageProps = async (params) => {
  const endpoint = `${API_BASE_URL}/identity/background-image?lat=${params.lat}&lng=${params.lng}`;

  return _get<BackgroundImageResponse>(endpoint, {
    cache: "force-cache",
    timeout: 10000,
  });
};

export const onGetFindUsOptions: GetFindUsOptionsProps = async () => {
  const endpoint = `${API_BASE_URL}/identity/find_us`;
  return _get(endpoint, {
    cache: "force-cache",
  });
};
