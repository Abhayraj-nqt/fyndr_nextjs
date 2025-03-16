import React from "react";

import { getCategories } from "@/lib/actions/category.action";

import Categories from "../categories";

const CategoriesSection = async () => {
  const { success, data } = await getCategories();

  if (!success || !data) return null;

  return <Categories categories={data} />;
};

export default CategoriesSection;
