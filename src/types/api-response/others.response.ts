export type BackgroundImageResponse = {
  backgroundImageUrl: string;
};

export type ContactUsResponse = {
  statusCode: string;
  status: string;
  message: string;
};

export type BusinessLogo = {
  status: string;
  url: string;
  message: string;
};

export type QrLogo = {
  status: string;
  url: string;
  message: string;
};

export type AddLocation = {
  identity: string;
  locations: [
    {
      country: string;
      parentLocation: number;
      isCampaignBookingEnabled: boolean;
      isCatalogueBookingEnabled: boolean;
      qrCode: string;
      city: string;
      postalCode: number;
      objid: number;
      locName: string;
      qrid: number;
      addressLine1: string;
      addressLine2: string;
      catalogueName: string;
      state: string;
    },
  ];
  bizid: number;
  bizName: string;
  bizType: string;
  website: string;
  address: string;
  term: string;
  subscription: string;
  displayName: string;
  indvid: number;
  firstName: string;
  lastName: string;
  regMode: string;
  fyndrHandle: string;
  email: string;
  yob: string;
  taxnbr: string;
  qrid: number;
  mainLogo: string;
  qrLogo: string;
  custid: number;
  pmethod: string;
  deviceToken: string;
  gender: string;
  setting: string;
  currency: number;
  addonUrl: string;
  showBiz: string;
  currencySymbol: string;
  merchantId: number;
  merchantAllowed: string;
  detailsSubmitted: string;
  payoutsEnabled: string;
  chargesEnabled: string;
  tags: string;
  accountStatus: string;
  entityType: string;
  referralCode: string;
  entityRole: string;
  businessWorkingHoursAndSlotsList: [
    {
      id: number;
      locationId: number;
      weekDay: string;
      workingHourStartTime: string;
      workingHourEndTime: string;
      workingHoursAndSlotStatus: string;
      slotDurationInMin: number;
      slotCapacity: number;
      createdDt: string;
      updatedDt: string;
      slotCapacityUpdatedDt: string;
      catalogueAppointmentType: string;
      campaignBookingEnabled: boolean;
    },
  ];
  googleCalendarPermissionGranted: boolean;
  userTimeZone: string;
  promoCode: string;
  countryId: number;
  isEmailVerified: boolean;
  stripeAccountType: string;
  subscribedToFyndrPromoEmails: string;
  business: boolean;
};
export type FindUsOptionsResponse = {
  active: boolean;
  id: number;
  options: string;
}[];

export type CountryListParams = {
  objId: number;
  name: string;
  isoCode: string;
}[];

export type BusinessTypesResponse = {
  objid: number;
  isActive: boolean;
  name: string;
}[];
