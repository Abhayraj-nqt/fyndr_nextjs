import { ActionResponse } from "../global";
import { GetBusinessDirectoryParams } from "./store.params";
import { GetBusinessDirectoryResponse } from "./store.response";

export type GetBusinessDirectory = ({
  params,
  payload,
}: GetBusinessDirectoryParams) => Promise<
  ActionResponse<GetBusinessDirectoryResponse>
>;
