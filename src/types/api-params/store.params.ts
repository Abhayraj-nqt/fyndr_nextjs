import { StoresResponse } from "../api-response/store.response";
import { ActionResponse, Coordinates } from "../global";

export type GetStoreProps = (
  params: {
    search?: string;
    page: number;
    pageSize: number;
  },
  payload: {
    indvId: number | null;
    distance: number;
    isCategory: boolean;
    location: Coordinates;
  }
) => Promise<ActionResponse<StoresResponse>>;
