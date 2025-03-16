"use server";

import { redirect } from "next/navigation";

import { signIn } from "@/auth";
import { API_BASE_URL } from "@/environment";
import { AccountResponse } from "@/types/account";
import { ActionResponse, ErrorResponse } from "@/types/global";

import handleError from "../handlers/error";
import { _post } from "../handlers/fetch";
import { encryptPassword } from "../utils";

export async function signInWithCredentials(params: {
  email: string;
  password: string;
}): Promise<ActionResponse> {
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
}

export async function signOut() {
  try {
    await signOut();
    redirect("/");
  } catch (error) {
    handleError(error);
  }
}

// !Don't use these functions other than auth.ts file

export async function signInAPI(payload: {
  email: string;
  password: string;
  mode: "classic";
}) {
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
}

export async function getAccountAPI(payload: {
  email: string;
  regMode: "facebook";
  accessToken: string;
}) {
  const endpoint = `${API_BASE_URL}/identity/account`;

  const newPayload = {
    email: payload.email,
    regMode: payload.regMode,
  };

  return _post<AccountResponse>(endpoint, newPayload, {
    headers: {
      Authorization: `Bearer ${payload.accessToken}`,
    },
  });
}
