import React from "react";

import ContainerWrapper from "@/components/global/container-wrapper";

import InvoiceForm from "../_components/invoice-form/invoice-form";

const CreateInvoice = () => {
  return (
    <ContainerWrapper title="Create Invoice" headerOption={<div>go back</div>}>
      <InvoiceForm edit={false} />
    </ContainerWrapper>
  );
};

export default CreateInvoice;
