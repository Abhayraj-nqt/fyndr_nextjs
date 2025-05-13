import {
  ActivePromoResponse,
  ExpiredList,
} from "../api-response/promocode.response";
import { ActionResponse } from "../global";

export type GetActivePromoProps = (params: {
  search: string;
}) => Promise<ActionResponse<ActivePromoResponse>>;
export type GetExpiredPromos = (params: {
  search: string;
  pgStart: number;
  pgSize: number;
}) => Promise<ActionResponse<ExpiredList>>;

import { VerifyPromocodeResponse } from "../api-response/promocode.response";
// import { ActionResponse } from "../global";

export type VerifyPromocode = (params: {
  isBusiness: boolean;
  code: string;
  countryId: number;
  codeType: "REDEEM_PROMOCODE";
}) => Promise<ActionResponse<VerifyPromocodeResponse>>;
