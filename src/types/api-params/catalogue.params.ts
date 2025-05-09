import { catalogueListResponse } from "../api-response/catalogue.response";
import { ActionResponse } from "../global";

export type GetCatalogueList = (params: {
  bizid: number;
  pgStart?: number;
  pgSize?: number;
}) => Promise<ActionResponse<catalogueListResponse>>;
