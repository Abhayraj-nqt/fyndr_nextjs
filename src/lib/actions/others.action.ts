"use server";

import { API_BASE_URL } from "@/environment";
import { Coordinates } from "@/types/global";

import { _get } from "../handlers/fetch";

export async function getBackgroundImage(params: Coordinates) {
  const endpoint = `${API_BASE_URL}/identity/background-image?lat=${params.lat}&lng=${params.lng}`;

  type Response = {
    backgroundImageUrl: string;
  };

  return _get<Response>(endpoint, {
    cache: "force-cache",
    timeout: 10000,
  });
}
