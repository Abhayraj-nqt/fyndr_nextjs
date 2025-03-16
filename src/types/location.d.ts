export type Location = {
  lat: number;
  lng: number;
  label?: "default" | "session" | "temporary";
};

// export enum LocationSource {
//   SESSION = "session",
//   TEMPORARY = "temporary",
//   DEFAULT = "default",
// }

// export type LocationState = {
//   current: Location;
//   source: LocationSource;
//   timestamp: number;
// };
