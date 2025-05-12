import {
  RedeemPromocodeResponse,
  VerifyPromocodeResponse,
} from "../api-response/promocode.response";
import { ActionResponse } from "../global";

export type VerifyPromocode = (params: {
  isBusiness: boolean;
  code: string;
  countryId: number;
  codeType: "REDEEM_PROMOCODE";
}) => Promise<ActionResponse<VerifyPromocodeResponse>>;

export type RedeemPromocode = (
  params: {
    indvId: number;
  },
  payload: {
    countryId: number;
    promoCode: string;
    promoCodeType: PromocodeTypesProps;
    targetUser: "BUSINESS" | "INDIVIDUAL";
  }
) => Promise<ActionResponse<RedeemPromocodeResponse>>;
