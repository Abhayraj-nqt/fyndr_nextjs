import { ActionResponse } from "../global"

export type RevenueProps =(
    params: {
        pgStart: number,
        pgSize: number,
    },
    payload: {
        businessName: string,
        country: string,
        startDate:string,
        endDate: string
    }
) => Promise<ActionResponse<RevenueResponse>>;