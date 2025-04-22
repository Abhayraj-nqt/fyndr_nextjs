/* eslint-disable @typescript-eslint/no-explicit-any */

export type LatLng = {
  lat: number;
  lng: number;
};

export interface MarkerData {
  id: string | number;
  position: LatLng;
  title?: string;
  description?: string;
  // Additional properties that might be useful
  icon?: string;
  data?: Record<string, any>;
}

export interface MapConfig {
  center: LatLng;
  zoom?: number;
  mapTypeId?: google.maps.MapTypeId;
  disableDefaultUI?: boolean;
  zoomControl?: boolean;
  scrollwheel?: boolean;
  styles?: google.maps.MapTypeStyle[];
  [key: string]: any;
}
