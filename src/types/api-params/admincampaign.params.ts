import { CampaignDetail, CampaignDetailsResponse } from "../api-response/adminCampaign.response";
import { ActionResponse } from "../global";

export type adminCampaignParam =(
    params :{
        pgStart: number;
        pgSize: number;
    },
    payload : {
        country: string;
        campaignType: string[];
        businessName: string;
        endDate:string;
        startDate:string;
        status: string[];
    }
 ) => Promise<ActionResponse<CampaignDetailsResponse>>;