import {
  BackgroundImageResponse,
  BusinessTypesResponse,
  CountryListParams,
  FindUsOptionsResponse,
} from "../api-response/others.response";
import { ActionResponse, Coordinates } from "../global";

export type GetBackgroundImageProps = (
  params: Coordinates
) => Promise<ActionResponse<BackgroundImageResponse>>;

export type GetFindUsOptionsProps = () => Promise<
  ActionResponse<FindUsOptionsResponse>
>;

export type GetCountryListParams = () => Promise<
  ActionResponse<CountryListParams>
>;

export type GetBusinessTypesProps = () => Promise<
  ActionResponse<BusinessTypesResponse>
>;
