// import { Location } from "@/types/location";

// export async function getActiveLocation(searchParams?: {
//   [key: string]: string | string[] | undefined;
// }): Promise<Location> {
//   // 1. Check URL parameters (highest priority)
//   if (searchParams?.lat && searchParams?.lng) {
//     const lat = parseFloat(String(searchParams.lat));
//     const lng = parseFloat(String(searchParams.lng));

//     if (!isNaN(lat) && !isNaN(lng)) {
//       return {
//         lat,
//         lng,
//         label: searchParams.label ? String(searchParams.label) : undefined,
//       };
//     }
//   }
// }
