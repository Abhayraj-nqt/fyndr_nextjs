import { auth } from "@/auth";
import ItemAddForm from "@/components/forms/business/store/item-form";
import ContainerWrapper from "@/components/global/ContainerWrapper";
import React from "react";

const AddItem = async () => {
  const session = await auth();
  const bizid = session?.user?.bizid;
  if (!bizid) throw new Error("BizId is required");
  return (
    <ContainerWrapper title="Add Item">
      <ItemAddForm bizid={bizid} />
    </ContainerWrapper>
  );
};

export default AddItem;
