export type CampaignDetailsResponse = {
  success: boolean;
  data: {
    last: boolean;
    campaignDetails: CampaignDetail[];
    count: number;
    campaignTypeCount: Record<string, number>;
    campaignStatusCount: Record<string, number>;
    campaignCount: number;
  };
};

export type CampaignDetail = {
  objId: number;
  businessName: string;
  campaignName: string;
  activeOffers: number;
  totalOffers: number;
  industryType: string;
  campaignType: string;
  offerSold: number;
  totalOfferSoldAmount: number;
  endDate: string; 
  currency: string;
  currencySymbol: string;
  status: "ACTIVE" | "INACTIVE" | "EXPIRED";
  cmpnId: number;
  featured: boolean;
};
