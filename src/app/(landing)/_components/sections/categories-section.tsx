import React from "react";

import { onGetCategories } from "@/actions/category.action";

import Categories from "../categories";

const CategoriesSection = async () => {
  const { success, data } = await onGetCategories();

  if (!success || !data) return null;

  return <Categories categories={data} />;
};

export default CategoriesSection;
