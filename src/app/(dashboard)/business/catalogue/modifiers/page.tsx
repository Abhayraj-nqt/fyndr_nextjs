import { fetchStoreModifier } from "@/actions/catalogue.actions";
import { auth } from "@/auth";
import ContainerWrapper from "@/components/global/ContainerWrapper";
import { Button } from "@/components/ui/button";

import ModifierList from "./_components/modifierList";

const CatalogModifiers = async () => {
  const session = await auth();
  const bizid = session?.user?.bizid;
  if (!bizid) throw new Error("BizId is required");

  const { success, data } = await fetchStoreModifier({ bizid });
  if (!success || !data) return null;

  return (
    <ContainerWrapper
      title="Modifiers"
      headerOption={<Button className="btn-primary">Add Modifiers</Button>}
    >
      <ModifierList modifiers={data.modifiers} bizid={bizid} />
    </ContainerWrapper>
  );
};

export default CatalogModifiers;
