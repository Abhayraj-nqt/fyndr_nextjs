import { ActivePromoResponse, ExpiredList } from "../api-response/promocode.response";
import { ActionResponse } from "../global";

export type GetActivePromoProps = (params: {search:string}) => Promise<ActionResponse<ActivePromoResponse>>;
export type GetExpiredPromos = (params: {search:string, pgStart:number, pgSize:number}) => Promise<ActionResponse<ExpiredList>>
