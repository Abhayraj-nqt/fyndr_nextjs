import { OfferSummaryResponse } from "../api-response/offersummary.response";
import { ActionResponse } from "../global";

export type GetOfferSummaryParams = (params: {
  bizid: number | unknown;
  pgStart: number | string;
  pgSize: number | string;
  orderBy?: string;
  sortBy?: string;
  text?: string;
  redemptionStatusList?: string[];
}) => Promise<ActionResponse<OfferSummaryResponse>>;
