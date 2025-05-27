import { FaqCategoriesResponse, FaqQuestionResponse } from "../api-response/aboutus.response";
import { ActionResponse } from "../global";


export type GetFaqCategories =(params:{
    entityId: number
}) => Promise<ActionResponse<FaqCategoriesResponse>>;

export type GetFaqQuestions = (params : {
  searchStr?: string;
  categoryId: number;
}) => Promise<ActionResponse<FaqQuestionResponse>>;