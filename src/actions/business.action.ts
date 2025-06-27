"use server";

import { API_BASE_URL } from "@/environment";
import { _get, _post } from "@/lib/handlers/fetch";
import {
  GetComments,
  GetRatings,
  ReplyToComment,
  ReportToComment,
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

export const onReplyToComment: ReplyToComment = async ({ params, payload }) => {
  const { commentId } = params;
  const endpoint = `${API_BASE_URL}/analytics/business/${commentId}/reply`;

  return _post(endpoint, payload, {
    requireAuth: true,
  });
};

export const onReportToComment: ReportToComment = async ({
  params,
  payload,
}) => {
  const { commentId } = params;
  const endpoint = `${API_BASE_URL}/analytics/business/${commentId}/report`;

  return _post(endpoint, payload, {
    requireAuth: true,
  });
};
