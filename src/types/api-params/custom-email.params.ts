import {
  CustomEmailResponse,
  EmailCustomResponse,
} from "../api-response/custom-email.response";
import { ActionResponse } from "../global";

export type CustomEmailParams = (payload: {
  bizId: number;
  text: string;
  showOfferImages: boolean;
}) => Promise<ActionResponse<CustomEmailResponse>>;

export type getCustomeEmailParams = (params: {
  bizId: number;
}) => Promise<ActionResponse<EmailCustomResponse>>;
