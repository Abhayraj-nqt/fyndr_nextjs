import { useMutation } from "@tanstack/react-query";

import { onUpdateStoreURL } from "@/actions/catalogue.actions";
import toast from "@/components/global/toast";

export const useUpdateStoreURL = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: onUpdateStoreURL,
    onSuccess: (res) => {
      if (res.success && res.data) {
        toast.success({
          message: res.data.message,
        });
        onSuccessCallback?.();
      } else {
        toast.error({
          message: "URL not updated",
        });
      }
    },
    onError: () => {
      toast.error({
        message: "Could not update the store URL.",
      });
    },
  });
};
