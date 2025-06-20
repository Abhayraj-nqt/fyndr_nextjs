import { useMutation } from "@tanstack/react-query";

import { onGetStoreLocations } from "@/actions/catalogue.actions";
import toast from "@/components/global/toast";
import { fetchLocationResponse } from "@/types/api-response/catalogue.response";

export const useFetchStoreLocation = (
  onSuccessCallback?: (data: fetchLocationResponse) => void
) => {
  return useMutation({
    mutationFn: onGetStoreLocations,
    onSuccess: (res) => {
      if (res.success && res.data) {
        onSuccessCallback?.(res.data);
      } else {
        toast.error({
          message: "Unable to fetch locations ",
        });
      }
    },
    onError: () => {
      toast.error({
<<<<<<< HEAD:src/hooks/catalogues/useFetchStoreLocation.ts
        message: "Something went wrong",
        description: "Could not fetch the store locations.",
       
=======
        message: "Could not fetch the store locations.",
>>>>>>> d45cadae9ac1e0b7c13fcda2a4b665447bb107b1:src/hooks/catalogues/use-store-location.ts
      });
    },
  });
};
