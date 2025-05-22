import { LucideIcon } from "lucide-react";
import { StaticImageData } from "next/image";
import { NextResponse } from "next/server";

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details?: Record<string, any>;
  };
  status?: number;
  headers?: Headers;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<undefined> & { success: false };

type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;

type RouteParams = {
  params?: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
};

interface PaginatedSearchParams {
  page?: number;
  sort?: string;
}

interface FyndrAboutProps {
  imgURL: string;
  title: string;
  content: string;
  imgDir?: "left" | "right";
}

interface FyndrAboutFeatureProps {
  imgURL: string;
  title: string;
  description: string;
}

interface FyndrWalletStepsProps {
  id: number;
  imgURL?: string;
  alt?: string;
  title: string;
  icon?: LucideIcon;
}

interface ValueLabelProps {
  label: string;
  value: string;
}

interface SocialLinksProps {
  label: string;
  icon: string | LucideIcon | StaticImageData;
  url: string;
}

interface CompanyProps {
  name: string;
  socialLinks: SocialLinksProps[];
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface Location extends Coordinates {
  isTemp?: boolean;
}

type CountryCode = "+1" | "+91" | "+61" | "+44";
type country = "US" | "IN" | "AU" | "GB" | "CA" | "NZ";

type CurrencySymbol = "$" | "₹";
type Currency = "USD" | "INR";
type DiscountType = "%" | "flat";
type OfferStatus = "active" | "inactive";
type AddressProps = {
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  ctryCode: string;
  lat: number;
  lng: number;
  phone: string;
  postalCode: string;
  state: string;
};
