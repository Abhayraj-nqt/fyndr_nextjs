import { fetchStoreItem } from "@/actions/catalogue.actions";
import { auth } from "@/auth";
import ContainerWrapper from "@/components/global/ContainerWrapper";
import { Button } from "@/components/ui/button";

import ItemList from "./_components/itemList";
import AddItem from "./_components/addItemButton";

const CatalogItems = async () => {
  const session = await auth();
  const bizid = session?.user?.bizid;
  if (!bizid) throw new Error("BizId is required");

  const { success, data } = await fetchStoreItem({ bizid });
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
