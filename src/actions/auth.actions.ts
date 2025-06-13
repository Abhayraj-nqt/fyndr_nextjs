"use server";

import { Account, Profile, User } from "next-auth";

import { signIn, signOut as authSignOut } from "@/auth";
import toast from "@/components/global/toast";
import { API_BASE_URL, API_GATEWAY_URL } from "@/environment";
import handleError from "@/lib/handlers/error";
import { _get, _post } from "@/lib/handlers/fetch";
import { encryptPassword } from "@/lib/utils";
import {
  ConfirmIdentityProps,
  GenerateTokenProps,
  GetAccountAPIProps,
  RefreshAccessTokenAPIProps,
  SendMobileVerificationCodeProps,
  SignInAPIProps,
  SignInWithCredentials,
  SignOutProps,
  SignUpProps,
  VerifyCodeProps,
  VerifyMobileProps,
} from "@/types/api-params/auth.params";
import {
  AccountResponse,
  RefreshTokenResponse,
} from "@/types/api-response/auth.response";
import { ErrorResponse } from "@/types/global";

export const signInWithCredentials: SignInWithCredentials = async (params) => {
  const { email, password } = params;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const signUp: SignUpProps = async (payload) => {
  return _post(`${API_BASE_URL}/identity/signup`, payload);
};

export const signOut: SignOutProps = async () => {
  try {
    await authSignOut({ redirectTo: "/" });
  } catch (error) {
    handleError(error);
  }
};

export const onConfirmIdentity: ConfirmIdentityProps = async (payload) => {
  const endpoint = `${API_BASE_URL}/identity/confirmIdentity`;
  return _post(endpoint, payload);
};

export const onSendMobileVerificationCode: SendMobileVerificationCodeProps =
  async (payload) => {
    const endpoint = `${API_BASE_URL}/identity/verify/sendVerificationCode?type=phone`;
    return _post(endpoint, payload);
  };

export const onVerifyMobile: VerifyMobileProps = async (payload) => {
  const endpoint = `${API_BASE_URL}/identity/verify/verifyVerificationCode?type=phone`;
  return _post(endpoint, payload);
};

export const onVerifyCode: VerifyCodeProps = async (params) => {
  const { isBusiness, code, countryId, codeType } = params;
  const endpoint = `${API_BASE_URL}/identity/verify?isBusiness=${isBusiness}&code=${code}&countryId=${countryId}&codeType=${codeType}`;
  return _get(endpoint);
};

// !Don't use these functions other than auth.ts file

export const signInAPI: SignInAPIProps = async (payload) => {
  const { email, password, mode } = payload;
  const endpoint = `${API_BASE_URL}/identity/signin`;

  const encryptedPassword = Array.from(
    await encryptPassword({ email, password })
  );

  const newPayload = {
    email,
    pwd: encryptedPassword,
    mode,
  };

  return _post(endpoint, newPayload);
};

export const getAccountAPI: GetAccountAPIProps = async (payload) => {
  const endpoint = `${API_BASE_URL}/identity/account`;

  // console.log({ payload });

  let newPayload: typeof payload = {
    email: payload.email,
    regMode: payload.regMode,
  };

  if (payload.isBusiness) {
    newPayload = {
      ...newPayload,
      isBusiness: payload.isBusiness,
    };
  }

  let headers = {};
  let next;

  if (payload?.accessToken) {
    headers = {
      ...headers,
      Authorization: `Bearer ${payload.accessToken}`,
    };

    next = {
      revalidate: 500000,
    };
  }

  return _post<AccountResponse>(endpoint, newPayload, {
    headers,
    cache: "force-cache",
    next,
  });
};

export const refreshAccessTokenAPI: RefreshAccessTokenAPIProps = async (
  payload
) => {
  const endpoint = `${API_GATEWAY_URL}/v1/token/generateFromRefreshToken`;
  return _post<RefreshTokenResponse>(endpoint, payload);
};

export const handleGoogleAuth = async (
  profile: Profile | undefined,
  account: Account | null | undefined
): Promise<User | null> => {
  const getAccountResponse = await getAccountAPI({
    email: profile?.email || "",
    regMode: "google",
  });

  if (getAccountResponse.status === 404) {
    return null;
  }

  const generateTokenResponse = await onGenerateToken({
    provider: "google",
    token: account?.access_token || "",
  });

  if (!generateTokenResponse.success) {
    toast.error({
      message:
        generateTokenResponse?.error?.details?.message ||
        "Something went wrong!",
    });

    throw new Error("Failed to generate token");
  }

  const user = getAccountResponse.data;

  return {
    email: user?.email,
    entityRole: user?.entityRole,
    entityType: user?.entityType,
    id: user?.indvid.toString(),
    image: profile?.picture,
    location: {
      lat: user?.address.lat,
      lng: user?.address.lng,
    },
    name: profile?.name,
    phone: user?.address.phone,
    accountStatus: user?.accountStatus,
    accessToken: generateTokenResponse.data?.accessCode,
    refreshToken: generateTokenResponse.data?.refreshToken,
  };
};

export const onGenerateToken: GenerateTokenProps = async (payload) => {
  const { provider, token } = payload;
  const endpoint = `${API_GATEWAY_URL}/v1/token/generate`;

  const encodedString = Buffer.from(token || "").toString("base64");

  return _post(endpoint, {
    provider,
    token: encodedString,
  });
};
