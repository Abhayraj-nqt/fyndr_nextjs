import { BusinessDirectory } from "./store.types";

export type GetBusinessDirectoryResponse = {
  bizdir: BusinessDirectory[];
  count: number;
  last: boolean;
  resultFromTextExactMatch: null | unknown;
};
