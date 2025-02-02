"use client";

import { createContext, useContext, useState } from "react";

import { Location } from "@/types/global";

type LocationContextType = {
  location: Location | null;
  setTempLocation: (location: Location) => void;
  resetToUserLocation: () => void;
};

const LocationContext = createContext<LocationContextType | null>(null);

export function LocationProvider({
  children,
  initialLocation,
  userLocation,
}: {
  children: React.ReactNode;
  initialLocation: Location;
  userLocation?: Location;
}) {
  const [location, setLocation] = useState<Location>(initialLocation);
  const setTempLocation = (newLocation: Location) => {
    setLocation({ ...newLocation, isTemp: true });
  };

  const resetToUserLocation = () => {
    if (userLocation) {
      setLocation(userLocation);
    }
  };

  return (
    <LocationContext.Provider
      value={{ location, setTempLocation, resetToUserLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
