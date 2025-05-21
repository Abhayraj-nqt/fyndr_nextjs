export type campaignStatistics ={
    data: {
        active: number,
        online: number,
        instore: number;
        all: number,
    }
    success: boolean,
}

export type userStatistics ={
    data : {
        user: number,
        customer: number,
        merchant: number,
    }
    success:boolean,
}

export type revernueStatistics ={
    data : {
        totalRevenue: number,
        offerRevenue: number,
        catalogueRevenue: number,
        promotionalRevenue: number,
        interactionRevenue: number,
        currency: string,
        currencySymbol: string,
        eventsRevenue: number,
        fyndrCash: number,
        campaignPromotionRevenue: number,
    }
}