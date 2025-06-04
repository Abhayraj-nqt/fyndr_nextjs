import { API_BASE_URL } from "@/environment";
import { _get, _post } from "@/lib/handlers/fetch";
import { adminCampaignParam } from "@/types/api-params/admincampaign.params";
import { RevenueProps } from "@/types/api-params/revenue.params";
import { ReviewReportParam } from "@/types/api-params/reviewReport.param";
import { GetCountryListParams } from "@/types/api-params/others.params";
import {
  GetActivePromoProps,
  GetExpiredPromos,
} from "@/types/api-params/promocode.params";
import { GetUsersParams } from "@/types/api-params/user.params";
import { campaignStatistics, revernueStatistics, userStatistics } from "@/types/api-response/adminStatistics.response";
import { ExpiredList } from "@/types/api-response/promocode.response";

export const getActivePromos : GetActivePromoProps = async({search})=>{
    const endpoint = `${API_BASE_URL}/admin/promocode/list?text=${search}`;
    return _get(endpoint, {
        
    })
}
export const getExpiredPromos : GetExpiredPromos = async({search, pgStart, pgSize}) =>{
    const endpoint = `${API_BASE_URL}/admin/promocode/expired?text=${search}&pgStart=${pgStart}&pgSize=${pgSize}`
    return _get<ExpiredList>(endpoint,{ requireAuth: true,})
}

export const getCampaignsStatistics = async () => {
    const endpoint = `${API_BASE_URL}/admin/statistics/campaign`
    return _get<campaignStatistics>(endpoint, {requireAuth: true})
}

export const getCustomerStatistics = async () => {
    const endpoint = `${API_BASE_URL}/admin/statistics/user`
    return _post<userStatistics>(endpoint, {},{requireAuth: true,})
}

export const getRevenueStatistics = async () => {
    const endpoint = `${API_BASE_URL}/admin/statistics/revenue`
    return _get<revernueStatistics>(endpoint, {requireAuth: true})
}

export const onGetUsers: GetUsersParams = async (params, payload) => {
  const { page, pageSize, dateOrder } = params;
  let endpoint = `${API_BASE_URL}/admin/user/search?pgStart=${page}&pgSize=${pageSize}`;

  if (dateOrder) {
    endpoint = `${endpoint}&dateOrder=${dateOrder}`;
  }

  return _post(endpoint, payload, {
    requireAuth: true,
    cache: "force-cache",
    next: {
      revalidate: 600000,
    },
  });
};

export const getCapaignDetails : adminCampaignParam = async (params, payload)=>{
  const {pgStart, pgSize} = params;
   let endpoint = `${API_BASE_URL}/admin/campaign?pgStart=${pgStart}&pgSize=${pgSize}`;
   return _post(endpoint, payload, {
    requireAuth: true,
    cache: "force-cache",
    next : {
      revalidate: 600000,
    }
   });
}

export const getReveue: RevenueProps= async(params, payload) =>{
  const {pgStart, pgSize} = params;
  let endpoint= `${API_BASE_URL}/admin/revenue?pgStart=${pgStart}&pgSize=${pgSize}`;
  return _post(endpoint, payload, {
    requireAuth: true,
    cache: "force-cache",
    next : {
      revalidate: 600000,
    }
  })
}

export const getReviewReport : ReviewReportParam = async(params)=>{
  const {orderBy, pgSize, pgStart} = params;
  let endpoint =`${API_BASE_URL}/admin/comment/list?orderBy=${orderBy}&pgStart=${pgStart}&pgSize=${pgSize}`
  return _get(endpoint, {
    requireAuth:true,
    cache:'force-cache',
    next:{
      revalidate:600000,
    }
  })

}
export const onGetCountryList: GetCountryListParams = async () => {
  const endpoint = `${API_BASE_URL}/admin/country/list`;
  return _get(endpoint, {
    cache: "force-cache",
  });
};
