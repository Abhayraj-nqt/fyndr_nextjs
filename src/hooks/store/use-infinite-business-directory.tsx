import { useInfiniteQuery } from "@tanstack/react-query";

import { onGetBusinessDirectory } from "@/actions/store.action";
import { GetBusinessDirectoryParams } from "@/types/store/store.params";
import { GetBusinessDirectoryResponse } from "@/types/store/store.response";

export function useInfiniteBusinessDirectory({
  params,
  payload,
  initialData,
}: GetBusinessDirectoryParams & {
  initialData?: GetBusinessDirectoryResponse;
}) {
  return useInfiniteQuery({
    queryKey: ["business-directory", params, payload],
    queryFn: async ({ pageParam }) => {
      const response = await onGetBusinessDirectory({
        params: {
          page: pageParam,
          pageSize: params.pageSize,
          search: params.search,
        },
        payload,
      });

      if (!response.success || !response.data) {
        throw new Error(response.error?.message || "Failed to fetch business");
      }

      return {
        ...response.data,
        currentPage: pageParam,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.last) {
        return undefined;
      }

      return allPages.length + 1;
    },

    ...(initialData && {
      initialData: {
        pages: [{ ...initialData, currentPage: 0 }],
        pageParams: [0],
      },
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}
