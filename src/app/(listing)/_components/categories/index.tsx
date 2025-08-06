import { onGetCategories } from "@/actions/category.action";

import CategoryList from "./category-list";

type Props = {
  filterType: "radio" | "checkbox";
};

const Categories = async ({ filterType }: Props) => {
  const { success, data: categories } = await onGetCategories();

  if (!success || !categories) return null;

  return (
    <section>
      <h4 className="body-1-medium mb-4 text-black-heading">Category</h4>
      <CategoryList categories={categories} filterType={filterType} />
    </section>
  );
};

export default Categories;
