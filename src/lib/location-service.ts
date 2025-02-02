import { cookies } from "next/headers";

import { Location } from "@/types/global";

const LOCATION_COOKIE = "user_location";
const DEFAULT_LOCATION: Location = {
  lat: 33.6629442, // Default to Phenix, AZ
  lng: -112.0182329,
  isTemp: false,
};

export class LocationService {
  static async getLocation(): Promise<Location> {
    const cookieStore = cookies();
    const locationCookie = (await cookieStore).get(LOCATION_COOKIE);

    if (locationCookie) {
      return JSON.parse(locationCookie.value);
    }

    return DEFAULT_LOCATION;
  }

  static async setLocation(location: Location) {
    (await cookies()).set(LOCATION_COOKIE, JSON.stringify(location));
  }
}
