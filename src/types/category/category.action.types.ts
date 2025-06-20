import { ActionResponse } from "../global";
import { GetCategoriesResponse } from "./category.response";

export type GetCategories = () => Promise<
  ActionResponse<GetCategoriesResponse>
>;
