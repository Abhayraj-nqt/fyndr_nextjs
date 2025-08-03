import {
  BusinessSignUpPayload,
  IndividualSignUpPayload,
  RegMode,
} from "./auth.types";

export type SignInParams = {
  payload: {
    email: string;
    password: string;
    mode: RegMode;
  };
};

export type GetAccountParams = {
  payload: {
    email: string;
    regMode: RegMode;
    accessToken?: string;
    isBusiness?: boolean;
  };
};

export type RefreshTokenParams = {
  payload: {
    refreshToken: string;
  };
};

export type GenerateTokenParams = {
  payload: {
    provider: RegMode;
    token: string;
  };
};

export type ResetPasswordParams = {
  payload: {
    email: string;
    pwd: string[];
  };
};

export type SignInWithCredentialsParams = {
  payload: {
    email: string;
    password: string;
  };
};

export type SignUpParams = {
  payload: IndividualSignUpPayload | BusinessSignUpPayload;
};

export type SignOut = object;

export type ConfirmIdentityParams = {
  payload: {
    email: string;
    token: string;
    isBusiness: boolean;
  };
};
export type SendMobileVerificationCodeParams = {
  payload: {
    countryCode: string;
    email: string;
    isBusiness: boolean;
    phone: string;
    registerMode: RegMode;
  };
};

export type SendEmailVerificationCodeParams = {
  payload: {
    email: string;
  };
};

export type VerifyMobileParams = {
  payload: {
    countryCode: string;
    email: string;
    phone: string;
    verificationCode: string;
  };
};

export type VerifyCodeParams = {
  params: {
    isBusiness: boolean;
    code: string;
    countryId: number;
    codeType: "REGISTRATION" | string;
  };
};

export type UpdateEmailParams = {
  params: {
    indvId: number;
  };
  payload: {
    email: string;
  };
};

export type GetGooglePermissionParams = {
  payload: {
    googleAccessToken: string;
  };
};
