import { ReviewOverviews } from "../api-response/review.response";
import { ActionResponse } from "../global";
import { GetReviewOverviewsParams } from "./review.params";

export type GetReviewOverviews = (
  params: GetReviewOverviewsParams
) => Promise<ActionResponse<ReviewOverviews>>;
