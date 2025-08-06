"use server";

import { revalidatePath } from "next/cache";

import { API_BASE_URL } from "@/environment";
import { _get, _post } from "@/lib/handlers/fetch";
import {
  GetComments,
  GetRatings,
  ReplyToComment,
  ReportToComment,
  SubmitReview,
} from "@/types/business/business.action.types";

export const onGetRatings: GetRatings = async ({ params }) => {
  const { bizId } = params;
  const endpoint = `${API_BASE_URL}/analytics/business/ratingSummary/${bizId}`;

  return _get(endpoint, {
    cache: "force-cache",
    next: {
      revalidate: 1000 * 60 * 10,
    },
  });
};

export const onGetComments: GetComments = async ({ params }) => {
  const { bizId, pgSize, orderBy, sortBy, page } = params;
  const endpoint = `${API_BASE_URL}/analytics/business/${bizId}/comments?pgSize=${pgSize}&pgStart=${page}&orderBy=${orderBy}&sortedBy=${sortBy}`;

  return _get(endpoint, {
    cache: "force-cache",
    next: {
      revalidate: 1000 * 60 * 10,
    },
  });
};

export const onReplyToComment: ReplyToComment = async ({
  params,
  payload,
  options,
}) => {
  const { commentId } = params;
  const endpoint = `${API_BASE_URL}/analytics/business/${commentId}/reply`;
  const { validatePath } = options;

  revalidatePath(validatePath);

  return _post(endpoint, payload, {
    requireAuth: true,
  });
};

export const onReportToComment: ReportToComment = async ({
  params,
  payload,
  options,
}) => {
  const { commentId } = params;
  const endpoint = `${API_BASE_URL}/analytics/business/${commentId}/report`;
  const { validatePath } = options;

  revalidatePath(validatePath);

  return _post(endpoint, payload, {
    requireAuth: true,
  });
};

export const onSubmitReview: SubmitReview = async ({ payload, options }) => {
  const endpoint = `${API_BASE_URL}/analytics/business/comment`;
  const { validatePath } = options;

  revalidatePath(validatePath);
  return _post(endpoint, payload, {
    requireAuth: true,
  });
};
