import { fetchStoreCategory } from "@/actions/catalogue.actions";
import { auth } from "@/auth";
import ContainerWrapper from "@/components/global/ContainerWrapper";

import AddCategory from "./_components/addCategoryButton";
import CategoriesList from "./_components/categoriesList";

const Categories = async () => {
  const session = await auth();
  const bizid = session?.user?.bizid;
  if (!bizid) throw new Error("BizId is required");

  const { success, data } = await fetchStoreCategory({ bizid });
  if (!success || !data) return null;

  return (
    <ContainerWrapper title="Categories" headerOption={<AddCategory />}>
      <CategoriesList categories={data?.categories} bizid={bizid} />
    </ContainerWrapper>
  );
};

export default Categories;
