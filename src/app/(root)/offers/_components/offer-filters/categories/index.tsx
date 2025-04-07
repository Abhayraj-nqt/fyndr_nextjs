import { onGetCategories } from "@/lib/actions/category.action";

import CategoryList from "./category-list";

const Categories = async () => {
  const { success, data: categories } = await onGetCategories();

  if (!success || !categories) return null;

  return (
    <section>
      <h4 className="paragraph-semibold mb-4 text-primary-900">Category</h4>
      <CategoryList categories={categories} />
    </section>
  );
};

export default Categories;
