export type AdminUserProps = {
  address: {
    addressLine1: string;
    addressLine2: string;
    state: string;
    country: string;
    postalCode: string;
    city: string;
  };
  createDt: string;
  name: string;
  status: string;
  businessName: string | null;
  website: string | null;
  phone: {
    countryCode: string;
    phoneNumber: string;
  };
  email: string;
  objId: number;
  regMode: string;
  promoCodeRedemptionDate: null | string | unknown;
  businessLogo: null | string;
  business: boolean;
};

export type GetUsersResponse = {
  success: boolean;
  data: {
    count: number;
    last: boolean;
    users: AdminUserProps[] | null;
  };
};
