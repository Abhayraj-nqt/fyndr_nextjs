import {
  AccountResponse,
  ConfirmIdentityResponse,
  RefreshTokenResponse,
  SendMobileVerificationCodeResponse,
  VerifyCodeResponse,
  VerifyMobileResponse,
} from "../api-response/auth.response";
import { ActionResponse, RegModeProps } from "../global";

type BaseSignupPayload = {
  email: string;
  firstName: string;
  lastName: string;
  ctryCode: string;
  phone: string;
  country: string;
  postalCode: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  isBusiness: boolean;
  referralCode: string | null;
  promoCode: string | null;
  lat: number;
  lng: number;
  pwd: string[];
  regMode: RegModeProps;
  findUsId: number;
};

type IndividualSignUpPayload = BaseSignupPayload & {
  yob: string | null;
  gender: null | "M" | "F" | "OT" | "ND";
};

type BusinessSignUpPayload = BaseSignupPayload & {
  bizInfo: {
    bizName: string;
    bizType: string;
    website: string;
    tags: string;
  };
  accountStatus?: string;
};

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

export type SignUpProps = (
  payload: IndividualSignUpPayload | BusinessSignUpPayload
) => Promise<ActionResponse<AccountResponse>>;

export type SignOutProps = () => Promise<void>;

export type ConfirmIdentityProps = (payload: {
  email: string;
  token: string;
  isBusiness: boolean;
}) => Promise<ActionResponse<ConfirmIdentityResponse>>;

export type SendMobileVerificationCodeProps = (payload: {
  countryCode: string;
  email: string;
  isBusiness: boolean;
  phone: string;
  registerMode: RegModeProps;
}) => Promise<ActionResponse<SendMobileVerificationCodeResponse>>;

export type VerifyMobileProps = (payload: {
  countryCode: string;
  email: string;
  phone: string;
  verificationCode: string;
}) => Promise<ActionResponse<VerifyMobileResponse>>;

export type VerifyCodeProps = (params: {
  isBusiness: boolean;
  code: string;
  countryId: number;
  codeType: "REGISTRATION" | string;
}) => Promise<ActionResponse<VerifyCodeResponse>>;
