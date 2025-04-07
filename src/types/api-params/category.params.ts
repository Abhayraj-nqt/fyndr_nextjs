import { CategoriesResponse } from "../api-response/category.response";
import { ActionResponse } from "../global";

export type GetCategoriesProps = () => Promise<
  ActionResponse<CategoriesResponse>
>;
