import { fetchStoreItem } from "@/actions/catalogue.actions";
import { auth } from "@/auth";
import ContainerWrapper from "@/components/global/ContainerWrapper";
import { Button } from "@/components/ui/button";

import ItemList from "./_components/itemList";

const CatalogItems = async () => {
  const session = await auth();
  const bizid = session?.user?.bizid;
  if (!bizid) throw new Error("BizId is required");

  const { success, data } = await fetchStoreItem({ bizid });
  if (!success || !data) return null;

  return (
    <>
      <ContainerWrapper
        title="Items"
        headerOption={<Button className="btn-primary">Add Item</Button>}
      >
        <ItemList items={data.items} bizid={bizid} />
      </ContainerWrapper>
    </>
  );
};

export default CatalogItems;
