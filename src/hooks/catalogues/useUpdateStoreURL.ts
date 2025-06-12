import { useMutation } from "@tanstack/react-query";

import { updateStoreURL } from "@/actions/catalogue.actions";

// import { toast } from "../use-toast";

export const useUpdateStoreURL = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: updateStoreURL,
    onSuccess: (res) => {
      if (res.success && res.data) {
        // toast({
        //   title: "Success",
        //   description: res.data.message,
        // });
        onSuccessCallback?.();
      } else {
        // toast({
        //   title: "Error",
        //   description: "URL not updated",
        //   variant: "destructive",
        // });
      }
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Could not update the store URL.",
        variant: "destructive",
      });
    },
  });
};
