import { ActionResponse } from "../global"

export type RevenueProps =(
    params: {
        pgStart: number,
        pgSize: number,
    },
    payload: {
        businessName: string,
        country: string
    }
) => Promise<ActionResponse<RevenueResponse>>;