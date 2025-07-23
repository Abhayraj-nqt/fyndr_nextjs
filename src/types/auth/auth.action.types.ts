import { ActionResponse } from "../global";
import {
  ConfirmIdentityParams,
  GenerateTokenParams,
  GetAccountParams,
  RefreshTokenParams,
  ResetPasswordParams,
  SendEmailVerificationCodeParams,
  SendMobileVerificationCodeParams,
  SignInParams,
  SignInWithCredentialsParams,
  SignUpParams,
  UpdateEmailParams,
  VerifyCodeParams,
  VerifyMobileParams,
} from "./auth.params";
import {
  ConfirmIdentityResponse,
  GenerateTokenResponse,
  GetAccountResponse,
  RefreshTokenResponse,
  ResetPasswordResponse,
  SendEmailVerificationCodeResponse,
  SendMobileVerificationCodeResponse,
  SignInWithCredentialsResponse,
  SignOutResponse,
  SignUpResponse,
  UpdateEmailResponse,
  VerifyCodeResponse,
  VerifyMobileResponse,
} from "./auth.response";

export type SignIn = ({ payload }: SignInParams) => Promise<ActionResponse>;

export type SignInWithCredentials = ({
  payload,
}: SignInWithCredentialsParams) => Promise<
  ActionResponse<SignInWithCredentialsResponse>
>;

export type SignUp = ({
  payload,
}: SignUpParams) => Promise<ActionResponse<SignUpResponse>>;

export type SignOut = () => Promise<SignOutResponse>;

export type GetAccount = ({
  payload,
}: GetAccountParams) => Promise<ActionResponse<GetAccountResponse>>;

// -------------------------------------------------------------------------------------------

export type RefreshToken = ({
  payload,
}: RefreshTokenParams) => Promise<ActionResponse<RefreshTokenResponse>>;

export type GenerateToken = ({
  payload,
}: GenerateTokenParams) => Promise<ActionResponse<GenerateTokenResponse>>;

export type ResetPassword = ({
  payload,
}: ResetPasswordParams) => Promise<ActionResponse<ResetPasswordResponse>>;

// -------------------------------------------------------------------------------------------

export type ConfirmIdentity = ({
  payload,
}: ConfirmIdentityParams) => Promise<ActionResponse<ConfirmIdentityResponse>>;

export type SendMobileVerificationCode = ({
  payload,
}: SendMobileVerificationCodeParams) => Promise<
  ActionResponse<SendMobileVerificationCodeResponse>
>;

export type SendEmailVerificationCode = ({
  payload,
}: SendEmailVerificationCodeParams) => Promise<
  ActionResponse<SendEmailVerificationCodeResponse>
>;

export type VerifyMobile = ({
  payload,
}: VerifyMobileParams) => Promise<ActionResponse<VerifyMobileResponse>>;

export type VerifyCode = ({
  params,
}: VerifyCodeParams) => Promise<ActionResponse<VerifyCodeResponse>>;

export type UpdateEmail = ({
  params,
  payload,
}: UpdateEmailParams) => Promise<ActionResponse<UpdateEmailResponse>>;

// -------------------------------------------------------------------------------------------
