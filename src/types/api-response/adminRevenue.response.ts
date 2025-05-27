type RevenueDetail = {
  businessName: string;
  objId: number;
  offers: number;
  promo: number;
  catalog: number;
  interaction: number;
  totalRevenue: number;
  currency: string;
  currencySymbol: string;
  fyndrCash: number;
  cmpnPromo: number;
  event: number;
};

type RevenueResponse = {
  success: boolean;
  data: {
    last: boolean;
    revenueDetails: RevenueDetail[];
    count: number;
  };
};
