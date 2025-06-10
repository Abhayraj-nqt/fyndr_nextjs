import { useMutation } from "@tanstack/react-query";

import { updateStoreURL } from "@/actions/catalogue.actions";
import toast from "@/components/global/toast";

export const useUpdateStoreURL = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: updateStoreURL,
    onSuccess: (res) => {
      if (res.success && res.data) {
        toast.success({
          message: "Success",
          description: res.data.message,
        });
        onSuccessCallback?.();
      } else {
        toast.error({
          message: "Error",
          description: "URL not updated",
        });
      }
    },
    onError: () => {
      toast.error({
        message: "Something went wrong",
        description: "Could not update the store URL.",
      });
    },
  });
};
