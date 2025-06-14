import { Coordinates, ValueLabelProps } from "@/types/global";

export const DEFAULT_LOCATION: Coordinates = {
  lat: 33.6629442, // Default to Phenix, AZ
  lng: -112.0182329,
};

export const TYPES_OF_DEALS: ValueLabelProps[] = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Coupons",
    value: "COUPONS",
  },
  {
    label: "Offers",
    value: "OFFERS",
  },
  {
    label: "Events",
    value: "EVENTS",
  },
];

export const CAT_LIST_HOME = [
  { keyword: "Entertainment", title: "Explore Exciting Activities Nearby" },
  {
    keyword: "Food & Beverages",
    title: "Discover Dining Experiences Near You",
  },
  { keyword: "Beauty & Wellness", title: "Nearby Beauty Finds" },
];

export const CATEGORY_ICON = new Map<string, string>([
  ["auto", "/icons/category/auto.svg"],
  ["baby & kids", "/icons/category/baby-and-kids.svg"],
  ["beauty & wellness", "/icons/category/beauty-and-wellness.svg"],
  ["cleaning services", "/icons/category/cleaning-services.svg"],
  ["education & learning", "/icons/category/education-and-learning.svg"],
  ["electronics", "/icons/category/electronics.svg"],
  ["entertainment", "/icons/category/entertainment.svg"],
  ["fashion", "/icons/category/fashion.svg"],
  ["food & beverages", "/icons/category/food-and-beverages.svg"],
  ["fyndr exclusives", "/icons/category/fyndr-exclusives.svg"],
  ["health & fitness", "/icons/category/health-and-fitness.svg"],
  ["home services", "/icons/category/home-services.svg"],
  ["photography", "/icons/category/photography.svg"],
  ["pets", "/icons/category/pets.svg"],
  ["personal care", "/icons/category/personal-care.svg"],
  ["professional services", "/icons/category/professional-services.svg"],
  ["sports & outdoors", "/icons/category/sports-and-outdoors.svg"],
  ["travel", "/icons/category/travel.svg"],
  ["other", "/icons/category/other.svg"],
]);
