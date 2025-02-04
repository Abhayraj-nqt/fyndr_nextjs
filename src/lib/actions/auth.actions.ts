"use server";

import { signIn } from "@/auth";
import { ActionResponse, ErrorResponse } from "@/types/global";

import handleError from "../handlers/error";
import { createSession, SessionPayload } from "../sessions";
import { encryptPassword } from "../utils";

const API_TOKEN =
  "xS*KkawsJ36ADKpwbba^Z6g!_f2eanPfz@pKT_2C85Z3q8-#$5Kw@y=#cA%AmR+t";

export async function signInWithCredentials(params: {
  email: string;
  password: string;
}): Promise<ActionResponse> {
  const { email, password } = params;

  const encryptedPassword = Array.from(
    await encryptPassword({ email, password })
  );

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/identity/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-fyndr-auth-token": API_TOKEN,
        },
        body: JSON.stringify({
          email,
          pwd: encryptedPassword,
          mode: "classic",
        }),
      }
    );

    const res = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: {
          message: res?.message,
        },
      };
    }

    const tokens = {
      accessToken: response.headers.get("x-auth-fyndr-code"),
      refreshToken: response.headers.get("x-auth-fyndr-refresh-code"),
      secureToken: response.headers.get("tokenheader"),
      expiry: response.headers.get("x-auth-fyndr-expiry"),
    };

    // console.log("auth.actions.ts -> ", { tokens });

    // Get account details
    const accountResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/identity/account`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          "Content-Type": "application/json",
          "x-fyndr-auth-token": API_TOKEN,
        },
        body: JSON.stringify({
          email,
          regMode: "facebook",
        }),
      }
    );

    const accountData = await accountResponse.json();

    if (!accountResponse.ok) {
      return {
        success: false,
        error: {
          message: accountData.message,
        },
      };
    }

    // console.log({ accountData });

    // onLoginSuccess(response?.entityType , response?.payoutsEnabled)

    // const onLoginSuccess = async (role, payoutsEnabled) => {

    //   if (props?.location?.state?.route) {
    //     dispatch({ type: SET_ROUTE, payload: null });
    //     history.replace(props?.location?.state?.route, { catalogueDetail: props?.location?.state?.catalogueDetail });
    //   } else if (route) {
    //     dispatch({ type: SET_ROUTE, payload: null });
    //     history.replace(route)
    //   } else {

    //     //this function will find the path  as per the role
    //     let path = findHomePathFromRole(role, payoutsEnabled);

    //     history.push(path);
    //   }
    // };

    // export const findHomePathFromRole = (role, payoutsEnabled) => {
    //   const { ROLE_FYNDR } = constants;
    //   switch (role) {
    //     case ROLE_FYNDR: {
    //       return "/admin/dashboard";
    //     }
    //     case "INDIVIDUAL": {
    //       return "/";
    //     }
    //     default:
    //       return (payoutsEnabled === null || payoutsEnabled === false) ? "/merchant/stripe_connect" : "/billing/transactions";
    //   }
    // };

    if (accountData.accountStatus === "DELETED") {
      throw new Error("Account has been deleted. Please contact support.");
      // This Account has been deleted from the Fyndr Platform. Please contact support for help.
    }

    // if (data.regMode !== "classic") {
    //   const qrcode = resp.identity;

    //   let res = await actions.adminSetting({
    //     names: platformVairables?.data,
    //     countryId: -1,
    //   });

    //   await dispatch(variablesParser(res));

    //   const { days_default, free_limits } = await dispatch(
    //     loadSettings(resp.setting)
    //   );

    //   localStorage.setItem("email", data.email);

    //   if (resp.isBusiness) {
    //     await dispatch({
    //       type: ACCOUNT_FOUND,
    //       payload: parseBizResp(qrcode, resp, days_default, free_limits),
    //     });
    //   } else {
    //     await dispatch({
    //       type: ACCOUNT_FOUND,
    //       payload: parseIndResp(qrcode, resp, days_default, free_limits),
    //     });
    //   }
    //   if (resp.entityType === ROLE_FYNDR) {

    //     await dispatch({
    //       type: ADMIN_ACCOUNT,
    //       payload: resp?.isBusiness
    //         ? parseBizResp(qrcode, resp, days_default, free_limits)
    //         : parseIndResp(qrcode, resp, days_default, free_limits),
    //     });
    //     localStorage.setItem(
    //       "adminAccessToken",
    //       localStorage.getItem("accessToken")
    //     );
    //   }

    // ---------------------------------------------------------

    // }

    // return {
    //   status: "exists",
    //   biz: resp.isBusiness,
    //   entityType: resp.entityType,
    //   googleCalendarPermissionGranted: resp?.googleCalendarPermissionGranted,
    //   isSubscribedToFyndrPromoEmails : resp?.isSubscribedToFyndrPromoEmails,
    //   payoutsEnabled : resp?.payoutsEnabled
    // };

    // return {
    //   id: accountData.identity,
    //   email: credentials.email,
    //   tokens,
    //   entityType: accountData.entityType,
    //   isBusiness: accountData.isBusiness,
    //   payoutsEnabled: accountData.payoutsEnabled,
    //   isSubscribedToFyndrPromoEmails:
    //     accountData.isSubscribedToFyndrPromoEmails,
    // };

    const name = `${accountData?.firstName} ${accountData?.lastName}`;
    const id = accountData?.identity;
    // entityRole: "BIZ_ADMIN";
    // entityType: "BUSINESS";
    const entityRole = accountData?.entityRole;
    const entityType = accountData?.entityType;
    const credData = {
      email,
      name,
      // tokens,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      secureToken: tokens.secureToken,
      expiry: tokens.expiry,
      id,
      entityRole,
      entityType,
    };

    await signIn("credentials", { ...credData, redirect: false });

    // Create session

    const sessionPayload: SessionPayload = {
      user: {
        id: accountData.indvid,
        name: accountData.displayName,
        email: accountData.email,
        phone: accountData.address.phone,
        accountStatus: accountData.accountStatus.toLowerCase(),
        role: accountData.entityType.toLowerCase(),
        identity: accountData.identity,
        qrid: accountData.qrid,
        fyndrHandle: accountData.fyndrHandle,
        location: {
          addressLine1: accountData.address.addressLine1,
          addressLine2: accountData.address.addressLine2,
          lat: accountData.address.lat,
          lng: accountData.address.lng,
          city: accountData.address.city,
          state: accountData.address.state,
          country: accountData.address.country,
          countryCode: accountData.address.countryCode,
          postalCode: accountData.address.postalCode,
          countryId: accountData.countryId,
          currency: accountData.currency,
          currencySymbol: accountData.currencySymbol,
        },
      },
      tokens: {
        accessToken: tokens.accessToken!,
        refreshToken: tokens.refreshToken!,
      },
    };

    await createSession(sessionPayload);

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
