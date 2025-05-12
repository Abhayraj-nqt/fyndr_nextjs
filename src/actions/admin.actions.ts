import { API_BASE_URL } from "@/environment";
import { _get } from "@/lib/handlers/fetch";
import { GetActivePromoProps, GetExpiredPromos } from "@/types/api-params/promocode.params";
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