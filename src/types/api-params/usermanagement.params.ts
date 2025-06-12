import { UserListResponse } from "../api-response/adminUserManagement.response";
import { ActionResponse } from "../global";

export type userManagementParams = (
  params: {
    page: number;
    pageSize: number;
  },
  payload: {
    userRoles: string[];
    text: string;
  }
) => Promise<ActionResponse<UserListResponse>>;
