import { useMutation } from "@tanstack/react-query";

import { fetchLocations } from "@/actions/catalogue.actions";
import { fetchLocationResponse } from "@/types/api-response/catalogue.response";

import { toast } from "../use-toast";

export const useFetchStoreLocation = (
  onSuccessCallback?: (data: fetchLocationResponse) => void
) => {
  return useMutation({
    mutationFn: fetchLocations,
    onSuccess: (res) => {
      if (res.success && res.data) {
        onSuccessCallback?.(res.data);
      } else {
        toast({
          title: "Error",
          description: "Unable to fetch locations ",
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Could not fetch the store locations.",
        variant: "destructive",
      });
    },
  });
};
