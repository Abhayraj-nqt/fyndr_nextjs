export type BackgroundImageResponse = {
  backgroundImageUrl: string;
};

export type ContactUsResponse = {
  statusCode: string;
  status: string;
  message: string;
};

export type BusinessLogo = {
  status: String;
  url: String;
  message: String;
};

export type QrLogo = {
  status: String;
  url: String;
  message: String;
};

export type AddLocation = {
  identity: string;
  locations: [
    {
      country: String;
      parentLocation: number;
      isCampaignBookingEnabled: boolean;
      isCatalogueBookingEnabled: boolean;
      qrCode: String;
      city: String;
      postalCode: number;
      objid: number;
      locName: String;
      qrid: number;
      addressLine1: String;
      addressLine2: String;
      catalogueName: String;
      state: String;
    },
  ];
  bizid: number;
  bizName: String;
  bizType: String;
  website: String;
  address: String;
  term: String;
  subscription: String;
  displayName: String;
  indvid: number;
  firstName: String;
  lastName: String;
  regMode: String;
  fyndrHandle: String;
  email: String;
  yob: String;
  taxnbr: String;
  qrid: number;
  mainLogo: String;
  qrLogo: String;
  custid: number;
  pmethod: String;
  deviceToken: String;
  gender: String;
  setting: String;
  currency: number;
  addonUrl: String;
  showBiz: String;
  currencySymbol: String;
  merchantId: number;
  merchantAllowed: String;
  detailsSubmitted: String;
  payoutsEnabled: String;
  chargesEnabled: String;
  tags: String;
  accountStatus: String;
  entityType: String;
  referralCode: String;
  entityRole: String;
  businessWorkingHoursAndSlotsList: [
    {
      id: number;
      locationId: number;
      weekDay: String;
      workingHourStartTime: String;
      workingHourEndTime: String;
      workingHoursAndSlotStatus: String;
      slotDurationInMin: number;
      slotCapacity: number;
      createdDt: String;
      updatedDt: String;
      slotCapacityUpdatedDt: String;
      catalogueAppointmentType: String;
      campaignBookingEnabled: boolean;
    },
  ];
  googleCalendarPermissionGranted: boolean;
  userTimeZone: String;
  promoCode: String;
  countryId: number;
  isEmailVerified: boolean;
  stripeAccountType: String;
  subscribedToFyndrPromoEmails: String;
  business: boolean;
};
