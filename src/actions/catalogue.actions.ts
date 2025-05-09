import { API_BASE_URL } from "@/environment";
import { _get } from "@/lib/handlers/fetch";
import { GetCatalogueList } from "@/types/api-params/catalogue.params";
import { catalogueListResponse } from "@/types/api-response/catalogue.response";

export const onGetCatalogueList: GetCatalogueList = async (params) => {
  const endpoint = `${API_BASE_URL}/catalogue/catalogues/fetch/${params.bizid}?pgStart=${params.pgStart || 0}&pgSize=${params.pgSize || 1000}`;

  return _get<catalogueListResponse>(endpoint, {
    requireAuth: true,
    cache: "force-cache",
  });
};
