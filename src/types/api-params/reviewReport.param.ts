import { ActionResponse } from "../global";

export type ReviewReportParam = (
    params: {
        orderBy:string,
        pgSize:number,
        pgStart:number,
    }
)=> Promise<ActionResponse<ReportedCommentsResponse>>;