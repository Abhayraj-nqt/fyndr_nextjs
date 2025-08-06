import { CountryCode } from "../global";

export type Comment = {
  commentId: number;
  commentThread: {
    createdDt: string;
    reply: string;
  }[];
  createdDt: string;
  images: string[];
  isReportingAllowed: boolean;
  rating: number;
  reportedComments:
    | null
    | {
        createdDt: string;
        reportedComment: string;
      }[];
  review: string;
  user: { firstName: string; lastName: string };
  firstName: string;
  lastName: string;
  verifiedUser: boolean;
};

export type Biz = {
  addonUrl: string | null;
  addressLine1: string;
  addressLine2: string;
  bizid: number;
  bizName: string;
  bizType: string;
  city: string;
  country: string;
  country_code: CountryCode;
  expo_code: string | null;
  lat: number;
  lng: number;
  mainLogo: string;
  phone: string;
  postalCode: string;
  state: string;
  showBiz: boolean;
  website: string | null;
};
