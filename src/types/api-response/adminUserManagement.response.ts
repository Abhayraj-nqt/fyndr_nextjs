export type UserListResponse = {
  success: boolean;
  data: {
    last: boolean;
    users: UserDetail[];
    count: number;
  };
};

export type UserDetail = {
  userId: number;
  firstName: string;
  lastName: string;
  userEmail: string;
  phone: string;
  countryCode: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  createdDate: string; 
  userRole: "FYNDR_SUPPORT" | "SUPER_ADMIN" | "FYNDR_MANAGER" | string;
};

export type RoleEntry = {
  id: number;
  roles: "SUPER_ADMIN" | "FYNDR_MANAGER" | "FYNDR_SUPPORT" | string;
  entityType: string; 
};

export type RoleListResponse = RoleEntry[];
