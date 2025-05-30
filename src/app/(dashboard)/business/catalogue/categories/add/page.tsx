import React from "react";

import ContainerWrapper from "@/components/global/ContainerWrapper";
import CategoryAddForm from "@/components/forms/business/store/category-form";
import { auth } from "@/auth";

const AddCategoryPage = async () => {
  const session = await auth();
  const bizid = session?.user?.bizid;
  if (!bizid) throw new Error("BizId is required");
  return (
    <ContainerWrapper title="Add Category">
      <CategoryAddForm bizid={bizid} />
    </ContainerWrapper>
  );
};

export default AddCategoryPage;
