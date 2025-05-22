import {
  AccountResponse,
  ConfirmIdentityResponse,
  RefreshTokenResponse,
} from "../api-response/auth.response";
import { ActionResponse } from "../global";

export type SignInAPIProps = (payload: {
  email: string;
  password: string;
  mode: "classic";
}) => Promise<ActionResponse>;

export type GetAccountAPIProps = (payload: {
  email: string;
  regMode: "facebook" | "classic" | "google";
  accessToken?: string;
  isBusiness?: boolean;
}) => Promise<ActionResponse<AccountResponse>>;

export type RefreshAccessTokenAPIProps = (payload: {
  refreshToken: string;
}) => Promise<ActionResponse<RefreshTokenResponse>>;

export type SignInWithCredentials = (params: {
  email: string;
  password: string;
}) => Promise<ActionResponse>;

export type SignOutProps = () => Promise<void>;

export type ConfirmIdentityProps = (payload: {
  email: string;
  token: string;
  isBusiness: boolean;
}) => Promise<ActionResponse<ConfirmIdentityResponse>>;
