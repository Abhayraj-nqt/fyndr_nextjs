import { BusinessDirectoryProps } from "./store.types";

export type GetBusinessDirectoryResponse = {
  bizdir: BusinessDirectoryProps[];
  count: number;
  last: boolean;
  resultFromTextExactMatch: null | unknown;
};
