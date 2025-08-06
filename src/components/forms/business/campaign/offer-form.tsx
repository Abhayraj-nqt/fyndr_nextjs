import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { ProcessedFileProps } from "@/lib/utils/files/upload.utils";

import OfferActionsButton from "./offer-actions-button";
import OfferBasicDetails from "./offer-basic-detail";
import OfferPricingDetails from "./offer-pricing-detail";
import { OfferSchema } from "./schema";

export type OfferFormValues = z.infer<typeof OfferSchema>;
const defaultValues: OfferFormValues = {
  title: "",
  voucher: "",
  discount: undefined,
  amount: 0,
  offerLimit: 0,
  offerPrice: 0,
  perUserLimit: -1,
  taxPercent: 0,
  repurchasePeriod: undefined,
};

type Props = {
  handleModalClose: () => void;
};

const OfferForm = ({ handleModalClose }: Props) => {
  const [checked, setChecked] = useState(false);
  const [, setUploadedFiles] = useState<ProcessedFileProps[]>([]);

  const handleFileUpload = (files: ProcessedFileProps[]) => {
    setUploadedFiles(files);
  };
  const form = useForm<OfferFormValues>({
    resolver: zodResolver(OfferSchema),
    defaultValues,
  });

  const onSubmit = (data: OfferFormValues) => {
    console.log("Submitted Offer:", data);
  };

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full grid-cols-1 gap-6 p-2 md:grid-cols-2"
        >
          <OfferBasicDetails form={form} />
          <OfferPricingDetails
            form={form}
            checked={checked}
            setChecked={setChecked}
          />
          <OfferActionsButton
            form={form}
            handleFileUpload={handleFileUpload}
            handleModalClose={handleModalClose}
          />
        </form>
      </FormProvider>
    </>
  );
};

export default OfferForm;
