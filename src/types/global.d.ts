import { NextResponse } from "next/server";

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<undefined> & { success: false };

type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;

interface RouteParams {
  params?: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

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
  imgURL: string;
  alt: string;
  title: string;
}

interface ValueLabelProps {
  label: string;
  value: string;
}

interface SocialLinksProps {
  label: string;
  icon: LucideIcon;
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
