import { ReviewOverviews } from "../api-response/review.response";
import { ActionResponse } from "../global";

export type GetReviewOverviews = (params :{
 bizId: number 
}) => Promise<ActionResponse<ReviewOverviews>>;