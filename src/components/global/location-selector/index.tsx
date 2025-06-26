"use client";

import { Loader2, MapPin } from "lucide-react";

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
import { useLocationSelector } from "@/hooks/location";

type Props = {
  className?: string;
  inputClassName?: string;
  commandClassName?: string;
  placeholder?: string;
};

const LocationSelector = ({
  className = "",
  commandClassName = "",
  placeholder = "Search location...",
  inputClassName,
}: Props) => {
  const {
    input,
    onInputChange,
    onInputFocus,
    onSelectCurrentLocation,
    isFetchingCurrentLocation,
    predictions,
    onSelectPrediction,
    isDropdownOpen,
    commandRef,
    locationError,
  } = useLocationSelector();

  return (
    <div className={`relative flex flex-col ${className}`}>
      <div className="relative flex min-h-[46px] grow items-center gap-1 rounded-10 border border-secondary-20 bg-white">
        <Input
          placeholder={placeholder}
          value={input}
          onChange={onInputChange}
          onFocus={onInputFocus}
          className={`no-focus paragraph-regular placeholder border-none pr-0 text-black-70 shadow-none outline-none ${inputClassName}`}
        />
        <div className="mr-1 flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 rounded-full !p-0 !text-black-40 hover:bg-white"
                  onClick={onSelectCurrentLocation}
                  disabled={isFetchingCurrentLocation}
                >
                  {isFetchingCurrentLocation ? (
                    <Loader2 className="!size-5 animate-spin" />
                  ) : (
                    <MapPin className="!size-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Use current location</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {locationError && (
        <p className="mt-1 text-sm text-red-500">{locationError}</p>
      )}

      {isDropdownOpen && (
        <div ref={commandRef} className="absolute top-[45px] z-50 mt-1 w-full">
          <Command
            className={`rounded-lg border shadow-md ${commandClassName}`}
          >
            <CommandList className="custom-scrollbar max-h-64 overflow-y-auto">
              <CommandEmpty>No location found...</CommandEmpty>
              <CommandGroup>
                {predictions.map((prediction) => (
                  <CommandItem
                    key={prediction.place_id}
                    onSelect={() =>
                      onSelectPrediction(
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
