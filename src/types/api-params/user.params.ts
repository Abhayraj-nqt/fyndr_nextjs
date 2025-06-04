import { GetUsersResponse } from "../api-response/user.response";
import { ActionResponse } from "../global";

export type GetUsersParams = (
  params: {
    page: number;
    pageSize: number;
    dateOrder?: "ASC" | "DESC";
  },
  payload: {
    country: string;
    endDate: string;
    promoCodeId: null | number;
    startDate: string;
    state: string[];
    text: string;
    userStatus: string[];
    userType: string[];
    findUsOptions: number[];
  }
) => Promise<ActionResponse<GetUsersResponse>>;
