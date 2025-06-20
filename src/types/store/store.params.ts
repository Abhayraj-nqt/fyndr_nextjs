import { Coordinates } from "../global";

export type GetBusinessDirectoryParams = {
  params: {
    search?: string;
    page: number;
    pageSize: number;
  };
  payload: {
    indvId: number | null;
    distance: number;
    isCategory: boolean;
    location: Coordinates;
  };
};
