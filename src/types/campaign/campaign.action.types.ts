import { ActionResponse } from "../global";
import {
  GetBusinessCampaignsParams,
  GetCampaignByQrParams,
  GetCampaignsParams,
  GetLikedCampaignsParams,
  LikeCampaignParams,
  VerifyOfferParams,
} from "./campaign.params";
import {
  GetBusinessCampaignsResponse,
  GetCampaignByQrResponse,
  GetCampaignsResponse,
  GetLikedCampaignsResponse,
  LikeCampaignResponse,
  VerifyOfferResponse,
} from "./campaign.response";

export type GetLikedCampaigns = ({
  params,
  payload,
}: GetLikedCampaignsParams) => Promise<
  ActionResponse<GetLikedCampaignsResponse>
>;

export type LikeCampaign = ({
  payload,
}: LikeCampaignParams) => Promise<ActionResponse<LikeCampaignResponse>>;

export type GetCampaignByQr = ({
  params,
  payload,
}: GetCampaignByQrParams) => Promise<ActionResponse<GetCampaignByQrResponse>>;

export type GetCampaigns = ({
  params,
  payload,
}: GetCampaignsParams) => Promise<ActionResponse<GetCampaignsResponse>>;

export type GetBusinessCampaigns = ({
  params,
}: GetBusinessCampaignsParams) => Promise<
  ActionResponse<GetBusinessCampaignsResponse>
>;

export type VerifyOffer = ({
  payload,
}: VerifyOfferParams) => Promise<ActionResponse<VerifyOfferResponse>>;
