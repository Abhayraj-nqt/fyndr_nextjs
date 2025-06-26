import { ActionResponse } from "../global";
import {
  GetBusinessDirectoryParams,
  GetLocationOfferReviewsParams,
  GetLocationOffersParams,
  LikeBusinessParams,
} from "./store.params";
import {
  GetBusinessDirectoryResponse,
  GetLocationOfferReviewsResponse,
  GetLocationOffersResponse,
  LikeBusinessResponse,
} from "./store.response";

export type GetBusinessDirectory = ({
  params,
  payload,
}: GetBusinessDirectoryParams) => Promise<
  ActionResponse<GetBusinessDirectoryResponse>
>;

export type GetLocationOffers = ({
  params,
}: GetLocationOffersParams) => Promise<
  ActionResponse<GetLocationOffersResponse>
>;

export type GetLocationOfferReviews = ({
  payload,
}: GetLocationOfferReviewsParams) => Promise<
  ActionResponse<GetLocationOfferReviewsResponse>
>;

export type LikeBusiness = ({
  payload,
}: LikeBusinessParams) => Promise<ActionResponse<LikeBusinessResponse>>;
