"use server";

import { signIn, signOut as authSignOut } from "@/auth";
import { API_BASE_URL, API_GATEWAY_URL } from "@/environment";
import handleError from "@/lib/handlers/error";
import { _get, _post } from "@/lib/handlers/fetch";
import { encryptPassword } from "@/lib/utils";
import {
  GetAccountAPIProps,
  RefreshAccessTokenAPIProps,
  SignInAPIProps,
  SignInWithCredentials,
  SignOutProps,
} from "@/types/api-params/auth.params";
import {
  AccountResponse,
  RefreshTokenResponse,
} from "@/types/api-response/auth.response";
import { ChannelOptionsResponse } from "@/types/api-response/findUsChannel.response";
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

export const signOut: SignOutProps = async () => {
  try {
    await authSignOut({ redirectTo: "/" });
  } catch (error) {
    handleError(error);
  }
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

  const newPayload = {
    email: payload.email,
    regMode: payload.regMode,
  };

  return _post<AccountResponse>(endpoint, newPayload, {
    headers: {
      Authorization: `Bearer ${payload.accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 500000,
    },
  });
};

export const refreshAccessTokenAPI: RefreshAccessTokenAPIProps = async (
  payload
) => {
  const endpoint = `${API_GATEWAY_URL}/v1/token/generateFromRefreshToken`;
  return _post<RefreshTokenResponse>(endpoint, payload);
};

export const getAllChannel = async()=> {
  const endpoint=`${API_BASE_URL}/identity/find_us`
  return _get<ChannelOptionsResponse>(endpoint)
}
