import { auth } from "@/auth";
import { ActionResponse } from "@/types/global";

import logger from "../logger";
import handleError from "./error";
import { RequestError } from "../http-errors";

const API_TOKEN =
  "xS*KkawsJ36ADKpwbba^Z6g!_f2eanPfz@pKT_2C85Z3q8-#$5Kw@y=#cA%AmR+t";

interface FetchOptions extends RequestInit {
  timeout?: number;
  requireAuth?: boolean;
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ActionResponse<T>> {
  const {
    timeout = 5000,
    headers: customHeaders = {},
    requireAuth = false,
    ...restOptions
  } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    let authHeaders = {};
    if (requireAuth) {
      const session = await auth();
      if (!session?.tokens?.accessToken) {
        throw new Error("Authentication required");
      }

      console.log(session);

      authHeaders = {
        Authorization: `Bearer ${session.tokens.accessToken}`,
      };
    }

    const defaultHeaders: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-fyndr-auth-token": API_TOKEN,
      ...authHeaders,
    };

    const headers: HeadersInit = { ...defaultHeaders, ...customHeaders };

    const config: RequestInit = {
      ...restOptions,
      headers,
      signal: controller.signal,
    };

    const response = await fetch(url, config);

    clearTimeout(id);

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new RequestError(
        response.status,
        `HTTP error: ${response.status}`,
        errorResponse
      );
    }

    const responseData = await response.json();

    // const finalResponse: ActionResponse<T> = {
    //   success: true,
    //   data: responseData,
    //   status: response.status,
    // };

    // // return new Promise<ActionResponse<T>>((resolve) => resolve(finalResponse));
    // return finalResponse;

    return {
      success: true,
      data: responseData,
      status: response.status,
    };
  } catch (err) {
    const error = isError(err) ? err : new Error("Unknown error");

    if (error.name === "AbortError") {
      logger.warn(`Request to ${url} timed out`);
    } else {
      logger.warn(`Error fetching ${url}: ${error.message}`);
    }

    return handleError(error) as ActionResponse<T>;
  }
}
