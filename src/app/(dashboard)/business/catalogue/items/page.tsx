import { onGetStoreItem } from "@/actions/catalogue.actions";
import { auth } from "@/auth";
import ContainerWrapper from "@/components/global/container-wrapper";

import AddItem from "./_components/add-item-button";
import ItemList from "./_components/item-list";

const CatalogItems = async () => {
  const session = await auth();
  const bizid = session?.user?.bizid;
  if (!bizid) throw new Error("BizId is required");

  const { success, data } = await onGetStoreItem({ bizid });
  if (!success || !data) return null;

  return (
    <>
      <ContainerWrapper title="Items" headerOption={<AddItem />}>
        <ItemList items={data.items} bizid={bizid} />
      </ContainerWrapper>
    </>
  );
};

export default CatalogItems;
