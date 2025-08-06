import React from "react";

import { onGetCatalogueList } from "@/actions/catalogue.actions";
import { auth } from "@/auth";
import ContainerWrapper from "@/components/global/container-wrapper";
import { Button } from "@/components/ui/button";

import Catalogue from "./_components/catalogue";

const CatalogList = async () => {
  const session = await auth();
  const bizid = session?.user?.bizid;
  if (!bizid) throw new Error("BizId is required");

  const { success, data } = await onGetCatalogueList({ bizid });
  if (!success || !data) return null;

  return (
    <>
      <ContainerWrapper
        title="Store"
        headerOption={<Button className="btn-primary">Add Store</Button>}
      >
        <Catalogue data={data.catalogues} />
      </ContainerWrapper>
    </>
  );
};

export default CatalogList;
