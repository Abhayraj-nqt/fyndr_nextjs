"use client";

import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  placeAutocomplete,
  placeDetails,
  placeDetailsByCoordinates,
} from "@/actions/maps.actions";
import { DEFAULT_LOCATION } from "@/constants";
import { Coordinates } from "@/types/global";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { useUser } from "../auth";

export function useLocationSelector() {
  const [input, setInput] = useState<string>("");
  const [predictions, setPredictions] = useState<PlaceAutocompleteResult[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [shouldFetchPredictions, setShouldFetchPredictions] =
    useState<boolean>(false);

  const [, setSelectedLocation] = useState<string>("");
  const [isFetchingCurrentLocation, setIsFetchingCurrentLocation] =
    useState<boolean>(false);
  const [, setCoordinates] = useState<undefined | Coordinates>();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const { user, error: userError, isLoading: isUserLoading } = useUser();
  const commandRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandRef.current &&
        !commandRef.current.contains(event.target as Node)
      ) {
        onCloseDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get user's saved location on initial load
  useEffect(() => {
    const locationPayload = DEFAULT_LOCATION;

    if (
      !isUserLoading &&
      !userError &&
      user?.address?.lat &&
      user?.address?.lng
    ) {
      locationPayload.lat = user?.address.lat;
      locationPayload.lng = user?.address.lng;
    }

    const lat = searchParams.get("lat") || "";
    const lng = searchParams.get("lng") || "";

    if (lat && lng) {
      locationPayload.lat = Number(lat);
      locationPayload.lng = Number(lng);
    }

    if (locationPayload.lat && locationPayload.lng) {
      getUserAccountLocation(locationPayload);
    } else {
      // Mark initial load as complete if there's no user or address
      setIsInitialLoad(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userError, isUserLoading, searchParams]);

  useEffect(() => {
    if (!shouldFetchPredictions) return;

    const delayDebounceFn = setTimeout(() => {
      const fetchPredictions = async () => {
        if (input.length > 1) {
          try {
            const predictionsData = await placeAutocomplete(input);
            setPredictions(predictionsData ?? []);
            if (predictionsData && predictionsData.length > 0) {
              onOpenDropdown();
            }
          } catch (error) {
            console.error("Error fetching predictions:", error);
            setPredictions([]);
          }
        } else {
          setPredictions([]);
          onCloseDropdown();
        }
      };
      fetchPredictions();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [input, shouldFetchPredictions]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setShouldFetchPredictions(true);

    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  };

  // Programmatically set input without triggering prediction fetch
  const setInputWithoutFetch = (value: string) => {
    setShouldFetchPredictions(false);
    setInput(value);
  };

  const onOpenDropdown = () => setIsDropdownOpen(true);
  const onCloseDropdown = () => setIsDropdownOpen(false);

  const onInputFocus = () => {
    if (!isInitialLoad && input.length > 1 && predictions.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  const getUserAccountLocation = async (location: Coordinates) => {
    try {
      const locationDetails = await placeDetailsByCoordinates(location);
      if (locationDetails) {
        const formattedAddress = locationDetails.formatted_address || "";

        // Set input without triggering prediction fetch
        setInputWithoutFetch(formattedAddress);
        setSelectedLocation(formattedAddress);
        setCoordinates(location);
        onCloseDropdown();

        // After a short delay, mark initial load as complete
        setTimeout(() => {
          setIsInitialLoad(false);
        }, 500);
      }
    } catch (error) {
      console.log("Error fetching user location:", error);
      setIsInitialLoad(false);
    }
  };

  const onSelectCurrentLocation = async () => {
    setIsFetchingCurrentLocation(true);
    setLocationError(null);
    onCloseDropdown();

    try {
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by your browser");
      }

      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            (error) => {
              reject(error);
            },
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0,
            }
          );
        }
      );

      const currentCoordinates: Coordinates = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      const locationDetails =
        await placeDetailsByCoordinates(currentCoordinates);

      if (locationDetails) {
        const formattedAddress =
          locationDetails.formatted_address || "Current Location";

        // Set input without triggering prediction fetch
        setInputWithoutFetch(formattedAddress);
        setSelectedLocation(formattedAddress);
        setCoordinates(currentCoordinates);

        // const newUrl = `?lat=${currentCoordinates.lat}&lng=${currentCoordinates.lng}`;
        // router.push(newUrl, { scroll: false });

        updateLocationParams(currentCoordinates.lat, currentCoordinates.lng);
      } else {
        // Set input without triggering prediction fetch
        setInputWithoutFetch("Current Location");
        setCoordinates(currentCoordinates);

        // const newUrl = `?lat=${currentCoordinates.lat}&lng=${currentCoordinates.lng}`;
        // router.push(newUrl, { scroll: false });
        updateLocationParams(currentCoordinates.lat, currentCoordinates.lng);
      }
    } catch (error) {
      if (
        error instanceof GeolocationPositionError &&
        error.code === error.PERMISSION_DENIED
      ) {
        console.log("Location permission denied - user can try again");
        alert("Please enable location from your browser's settings");
      } else if (
        !(
          error instanceof GeolocationPositionError &&
          error.code === error.PERMISSION_DENIED
        )
      ) {
        console.error("Error getting current location:", error);
        setLocationError(
          error instanceof Error && error.message
            ? error.message
            : "Failed to get current location"
        );
      }
    } finally {
      setIsFetchingCurrentLocation(false);
      onCloseDropdown();
    }
  };

  const updateLocationParams = (lat: number, lng: number) => {
    // Create a new URLSearchParams object based on current params
    const params = new URLSearchParams(searchParams.toString());

    // Update lat and lng parameters
    params.set("lat", lat.toString());
    params.set("lng", lng.toString());

    // Use router.replace instead of push to avoid adding to history stack
    // This also ensures a proper re-render of server components
    router.replace(`${pathname}?${params.toString()}`);
  };

  const onSelectPrediction = async (placeId: string, description: string) => {
    try {
      // Set input without triggering prediction fetch
      setInputWithoutFetch(description);
      setSelectedLocation(description);
      onCloseDropdown();

      const details = await placeDetails(placeId);

      if (details?.geometry?.location) {
        const newCoordinates = {
          lat: details.geometry.location.lat,
          lng: details.geometry.location.lng,
        };

        setCoordinates(newCoordinates);

        // const newUrl = `?lat=${newCoordinates.lat}&lng=${newCoordinates.lng}`;
        // router.push(newUrl, { scroll: false });
        updateLocationParams(newCoordinates.lat, newCoordinates.lng);
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return {
    input,
    onInputChange,
    onInputFocus,
    predictions,
    isDropdownOpen,
    commandRef,
    locationError,

    onOpenDropdown,
    onCloseDropdown,

    onSelectCurrentLocation,
    onSelectPrediction,
    isFetchingCurrentLocation,
  };
}

// -------------------------------------------------------------------------------------------------------------

interface ZipCodeResult {
  city: string;
  state: string;
  lat: number;
  lng: number;
  postalCode: string;
}

interface UseZipCodeLookupProps {
  zipCode: string;
  countryCode: string;
  enabled?: boolean;
}

// Helper function to get country name from country code
function getCountryName(countryCode: string): string {
  const countryMap: Record<string, string> = {
    US: "United States",
    AU: "Australia",
    CA: "Canada",
    GB: "United Kingdom",
    IN: "India",
    NZ: "New Zealand",
  };

  return countryMap[countryCode] || countryCode;
}

// Helper function to extract location data from Google Places API response
function extractLocationData(
  placeDetail: any,
  zipCode: string
): ZipCodeResult | null {
  try {
    const addressComponents = placeDetail.address_components || [];
    const geometry = placeDetail.geometry;

    if (!geometry || !geometry.location) {
      return null;
    }

    let city = "";
    let state = "";
    let postalCode = zipCode;

    // Extract city and state from address components
    for (const component of addressComponents) {
      const types = component.types;

      if (types.includes("locality") || types.includes("sublocality")) {
        city = component.long_name;
      } else if (types.includes("administrative_area_level_1")) {
        state = component.short_name || component.long_name;
      } else if (types.includes("postal_code") && !postalCode) {
        postalCode = component.long_name;
      }
    }

    // Fallback for city if not found in locality
    if (!city) {
      const cityComponent = addressComponents.find(
        (comp: any) =>
          comp.types.includes("sublocality_level_1") ||
          comp.types.includes("neighborhood") ||
          comp.types.includes("administrative_area_level_2")
      );
      if (cityComponent) {
        city = cityComponent.long_name;
      }
    }

    // If still no city, try to get it from formatted_address
    if (!city && placeDetail.formatted_address) {
      const addressParts = placeDetail.formatted_address.split(",");
      if (addressParts.length >= 2) {
        city = addressParts[1].trim();
      }
    }

    return {
      city,
      state,
      lat: geometry.location.lat,
      lng: geometry.location.lng,
      postalCode,
    };
  } catch (error) {
    console.error("Error extracting location data:", error);
    return null;
  }
}

// Main function to lookup zip code
async function lookupZipCode(
  zipCode: string,
  countryCode: string
): Promise<ZipCodeResult> {
  if (!zipCode || zipCode.length < 3) {
    throw new Error("Zip code must be at least 3 characters");
  }

  try {
    // Create search query based on country
    const searchQuery = `${zipCode} ${getCountryName(countryCode)}`;

    // Get autocomplete predictions
    const predictions = await placeAutocomplete(searchQuery);

    if (!predictions || predictions.length === 0) {
      throw new Error("No results found for this zip code");
    }

    // Find the best matching prediction (postal code type)
    const bestMatch =
      predictions.find(
        (prediction) =>
          prediction.types.includes("postal_code") ||
          prediction.types.includes("sublocality") ||
          prediction.description.includes(zipCode)
      ) || predictions[0];

    // Get detailed place information
    const placeDetail = await placeDetails(bestMatch.place_id);

    if (!placeDetail) {
      throw new Error("Could not fetch place details");
    }

    // Extract city, state, and coordinates
    const result = extractLocationData(placeDetail, zipCode);

    if (!result) {
      throw new Error("Could not extract location data from the response");
    }

    // Validate that we have minimum required data
    if (!result.lat || !result.lng) {
      throw new Error("Could not determine coordinates for this location");
    }

    return result;
  } catch (error) {
    console.error("Zip code lookup error:", error);
    throw error;
  }
}

// React Query hook
export const useZipCodeLookup = ({
  zipCode,
  countryCode,
  enabled = true,
}: UseZipCodeLookupProps) => {
  return useQuery({
    queryKey: ["zipCodeLookup", zipCode, countryCode],
    queryFn: () => lookupZipCode(zipCode, countryCode),
    enabled:
      enabled &&
      Boolean(zipCode) &&
      zipCode.length >= 3 &&
      Boolean(countryCode),
    staleTime: 5 * 60 * 1000, // 5 minutes
    // cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      // Don't retry if it's a validation error
      if (
        error instanceof Error &&
        error.message.includes("must be at least")
      ) {
        return false;
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
};

// Alternative hook for manual triggering (useful for forms)
export const useZipCodeLookupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      zipCode,
      countryCode,
    }: {
      zipCode: string;
      countryCode: string;
    }) => lookupZipCode(zipCode, countryCode),
    onSuccess: (data, variables) => {
      // Cache the result for future use
      queryClient.setQueryData(
        ["zipCodeLookup", variables.zipCode, variables.countryCode],
        data
      );
    },
  });
};
