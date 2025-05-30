"use client";

import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { onGetCountryList } from "@/actions/admin.actions";
import {
  placeAutocomplete,
  placeDetails,
  placeDetailsByCoordinates,
} from "@/actions/maps.actions";
import { DEFAULT_LOCATION } from "@/constants";
import { Coordinates } from "@/types/global";

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
    const params = new URLSearchParams(searchParams.toString());
    params.set("lat", lat.toString());
    params.set("lng", lng.toString());
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

export function useCountryList() {
  const QUERY_KEY = ["countryList"];

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: onGetCountryList,
  });

  return {
    countryList: data?.data || [],
    isLoading,
  };
}
