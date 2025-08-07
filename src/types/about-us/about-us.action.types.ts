import {
  FaqCategoriesResponse,
  FaqQuestionResponse,
} from "../api-response/aboutus.response";
import { ActionResponse } from "../global";
import {
  GetFaqCategoriesParams,
  GetFaqQuestionsParams,
} from "./about-us.params";

export type GetFaqCategories = ({
  params,
}: GetFaqCategoriesParams) => Promise<ActionResponse<FaqCategoriesResponse>>;

export type GetFaqQuestions = ({
  params,
}: GetFaqQuestionsParams) => Promise<ActionResponse<FaqQuestionResponse>>;
