"use client";

import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import { placeAutocomplete, placeDetails } from "@/actions/maps.actions";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Coordinates } from "@/types/global";

const Location = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [predictions, setPredictions] = useState<PlaceAutocompleteResult[]>([]);
  const [, setSelectedLocation] = useState<string | null>(null);
  const [, setCoordinates] = useState<Coordinates | null>(null);

  const router = useRouter();
  // const session = useSession();

  // if (session) {

  // }

  // const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const fetchPredictions = async () => {
        if (value.length > 0) {
          const predictions = await placeAutocomplete(value);
          setPredictions(predictions ?? []);
        } else {
          setPredictions([]);
        }
      };
      fetchPredictions();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [value]);

  const handleLocationSelect = async (placeId: string, description: string) => {
    try {
      setSelectedLocation(description);
      setValue(description);

      // Get place details including coordinates
      const details = await placeDetails(placeId);

      if (details?.geometry?.location) {
        setCoordinates({
          lat: details.geometry.location.lat,
          lng: details.geometry.location.lng,
        });
        console.log("Location coordinates:", details.geometry.location);

        const newUrl = `?lat=${details.geometry.location.lat}&lng=${details.geometry.location.lng}`;

        router.push(newUrl, { scroll: false });
      }

      setOpen(false);
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="no-scrollbar min-h-[45px] w-[200px] justify-between overflow-x-auto"
        >
          {value || "Select Location..."}
          <MapPin className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search location..."
            value={value}
            onValueChange={setValue}
            className="h-9"
          />
          <CommandList className="custom-scrollbar ">
            <CommandEmpty>No location found...</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {predictions.map((prediction) => (
                <CommandItem
                  key={prediction.place_id}
                  onSelect={() =>
                    handleLocationSelect(
                      prediction.place_id,
                      prediction.description
                    )
                  }
                >
                  {prediction.description}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Location;
