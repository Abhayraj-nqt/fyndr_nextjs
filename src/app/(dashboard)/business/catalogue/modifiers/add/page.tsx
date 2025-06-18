import { auth } from "@/auth";
import ModifierAddForm from "@/components/forms/business/store/modifier-form";
import ContainerWrapper from "@/components/global/container-wrapper";

const AddCategoryPage = async () => {
  const session = await auth();
  const bizid = session?.user?.bizid;
  if (!bizid) throw new Error("BizId is required");
  return (
    <ContainerWrapper title="Add Category">
      <ModifierAddForm bizid={bizid} />
    </ContainerWrapper>
  );
};

export default AddCategoryPage;
