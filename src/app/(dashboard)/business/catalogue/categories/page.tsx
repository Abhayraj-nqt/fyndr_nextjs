import { onGetStoreCategory } from "@/actions/catalogue.actions";
import { auth } from "@/auth";
import ContainerWrapper from "@/components/global/container-wrapper";

import AddCategory from "./_components/add-category-button";
import CategoriesList from "./_components/categories-list";

const Categories = async () => {
  const session = await auth();
  const bizid = session?.user?.bizid;
  if (!bizid) throw new Error("BizId is required");

  const { success, data } = await onGetStoreCategory({ bizid });
  if (!success || !data) return null;

  return (
    <ContainerWrapper title="Categories" headerOption={<AddCategory />}>
      <CategoriesList categories={data?.categories} bizid={bizid} />
    </ContainerWrapper>
  );
};

export default Categories;
