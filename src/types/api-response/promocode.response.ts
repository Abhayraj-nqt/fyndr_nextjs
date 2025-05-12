type Promo = {
  id: number;
  promoCode: string;
  country: string;
  targetUser: string;
  promoCodeType: string;
  type: string;
  amount: number;
  description: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  status: string;
  createdDate: string;
  updatedDate: string;
  timeZone: string;
  userRegistered: number;
  private: boolean;
};
export type ActivePromoResponse = Promo[];

export type ExpiredPromo = {
  id: number;
  promoCode: string;
  country: string;
  targetUser: string;
  promoCodeType: string;
  type: string;
  amount: number;
  description: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  timeZone: string;
  userRegistered: number;
  private: boolean;
  promoCodeStatus: "EXPIRED" | "ACTIVE" | "INACTIVE";
};
export type ExpiredList = {
  last: boolean;
  promocodesList: ExpiredPromo[] | undefined;
  count: number;
};
