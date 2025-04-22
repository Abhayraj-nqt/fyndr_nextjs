"use server";

import { Client } from "@googlemaps/google-maps-services-js";

import handleError from "@/lib/handlers/error";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

const client = new Client();

export const placeAutocomplete = async (input: string) => {
  if (!input) return [];

  try {
    const response = await client.placeAutocomplete({
      params: {
        input,
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    return response.data.predictions;
  } catch (error) {
    handleError(error);
  }
};

export const placeDetails = async (placeId: string) => {
  try {
    if (!placeId) {
      throw new Error("Place id is required!");
    }
    const response = await client.placeDetails({
      params: {
        key: GOOGLE_MAPS_API_KEY,
        place_id: placeId,
      },
    });

    return response.data.result;
  } catch (error) {
    handleError(error);
  }
};

export async function getPlaceDetails(placeId: string) {
  try {
    const response = await fetch(`/api/places/details?placeId=${placeId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching place details:", error);
    return null;
  }
}
