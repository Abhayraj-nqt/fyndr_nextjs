"use client";

import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";
import { Loader2, MapPin, Navigation } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import {
  placeAutocomplete,
  placeDetails,
  placeDetailsByCoordinates,
} from "@/actions/maps.actions";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/hooks/auth";
import { Coordinates } from "@/types/global";

type Props = {
  className?: string;
  inputClassName?: string;
  commandClassName?: string;
  placeholder?: string;
  onLocationSelect?: (location: string, coordinates: Coordinates) => void;
};

const LocationSelector = ({
  className = "",
  commandClassName = "",
  placeholder = "Search location...",
  onLocationSelect,
  inputClassName,
}: Props) => {
  const [input, setInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<PlaceAutocompleteResult[]>([]);
  const [, setSelectedLocation] = useState<string | null>(null);
  const [, setCoordinates] = useState<Coordinates | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const commandRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandRef.current &&
        !commandRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch location predictions
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const fetchPredictions = async () => {
        if (input.length > 1) {
          try {
            const predictions = await placeAutocomplete(input);
            setPredictions(predictions ?? []);
            if (predictions && predictions.length > 0) {
              setIsOpen(true);
            }
          } catch (error) {
            console.error("Error fetching predictions:", error);
            setPredictions([]);
          }
        } else {
          setPredictions([]);
          setIsOpen(false);
        }
      };
      fetchPredictions();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [input]);

  useEffect(() => {
    if (!isLoading && !error && user) {
      const lat = user.address.lat;
      const lng = user.address.lng;
      getUserAccountLocation({ lat, lng });
    }
  }, [user]);

  const handleLocationSelect = async (placeId: string, description: string) => {
    try {
      setSelectedLocation(description);
      setInput(description);

      // Get place details including coordinates
      const details = await placeDetails(placeId);

      if (details?.geometry?.location) {
        const newCoordinates = {
          lat: details.geometry.location.lat,
          lng: details.geometry.location.lng,
        };

        setCoordinates(newCoordinates);
        console.log("Location coordinates:", newCoordinates);

        // Update URL with new coordinates
        const newUrl = `?lat=${newCoordinates.lat}&lng=${newCoordinates.lng}`;
        router.push(newUrl, { scroll: false });

        // Call the callback if provided
        if (onLocationSelect) {
          onLocationSelect(description, newCoordinates);
        }
      }

      setIsOpen(false);
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  const handleFocus = () => {
    if (input.length > 1 && predictions.length > 0) {
      setIsOpen(true);
    }
  };

  const getCurrentLocation = async () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    try {
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by your browser");
      }

      // Get current position
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          });
        }
      );

      const coords: Coordinates = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      console.log("Current location:", coords);

      // Perform reverse geocoding to get address
      const locationDetails = await placeDetailsByCoordinates(coords);

      if (locationDetails) {
        const formattedAddress =
          locationDetails.formatted_address || "Current Location";
        setInput(formattedAddress);
        setSelectedLocation(formattedAddress);
        setCoordinates(coords);

        // Update URL with new coordinates
        const newUrl = `?lat=${coords.lat}&lng=${coords.lng}`;
        router.push(newUrl, { scroll: false });

        // Call the callback if provided
        if (onLocationSelect) {
          onLocationSelect(formattedAddress, coords);
        }
      } else {
        setInput("Current Location");
        setCoordinates(coords);

        // Update URL with new coordinates
        const newUrl = `?lat=${coords.lat}&lng=${coords.lng}`;
        router.push(newUrl, { scroll: false });

        // Call the callback if provided
        if (onLocationSelect) {
          onLocationSelect("Current Location", coords);
        }
      }
    } catch (error) {
      console.error("Error getting current location:", error);
      setLocationError(
        error instanceof Error
          ? error.message
          : "Failed to get current location"
      );
    } finally {
      setIsLoadingLocation(false);
      setIsOpen(false);
    }
  };

  const getUserAccountLocation = async (location: Coordinates) => {
    try {
      const locationDetails = await placeDetailsByCoordinates(location);
      if (locationDetails) {
        const formattedAddress = locationDetails.formatted_address || "";
        setInput(formattedAddress);
        setSelectedLocation(formattedAddress);
        setCoordinates(location);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`relative flex flex-col ${className}`}>
      <div className="relative flex min-h-[45px] grow items-center gap-1 rounded-lg border border-light-700 bg-light-900">
        <Input
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={handleFocus}
          className={`no-focus paragraph-regular placeholder border-none text-dark-400 shadow-none outline-none ${inputClassName}`}
        />
        <div className="absolute right-3 flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-full p-0"
                  onClick={getCurrentLocation}
                  disabled={isLoadingLocation}
                >
                  {isLoadingLocation ? (
                    <Loader2 className="size-4 animate-spin text-gray-400" />
                  ) : (
                    <Navigation className="size-4 text-gray-400" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Use current location</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <MapPin className="size-5 text-gray-400" />
        </div>
      </div>

      {locationError && (
        <p className="mt-1 text-sm text-red-500">{locationError}</p>
      )}

      {isOpen && (
        <div ref={commandRef} className="absolute top-[45px] z-50 mt-1 w-full">
          <Command
            className={`rounded-lg border shadow-md ${commandClassName}`}
          >
            <CommandList className="max-h-64 overflow-y-auto">
              <CommandEmpty>No location found...</CommandEmpty>
              <CommandGroup>
                {predictions.map((prediction) => (
                  <CommandItem
                    key={prediction.place_id}
                    onSelect={() =>
                      handleLocationSelect(
                        prediction.place_id,
                        prediction.description
                      )
                    }
                    className="cursor-pointer"
                  >
                    <MapPin className="mr-2 size-4 text-gray-400" />
                    <span>{prediction.description}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
