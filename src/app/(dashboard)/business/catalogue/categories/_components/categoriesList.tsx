"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { deleteCategory } from "@/actions/catalogue.actions";
import toast from "@/components/global/toast";
import { StoreCategory } from "@/types/api-response/catalogue.response";
import { useCategoryStore } from "@/zustand/stores/storeCategory.store";

import List from "../../../_components/list";
import ListItem from "../../_components/listItem";

type Props = {
  categories: StoreCategory[];
  bizid: number;
};

const CategoriesList = ({ categories, bizid }: Props) => {
  const router = useRouter();
  const setCategories = useCategoryStore((state) => state.setCategories);
  useEffect(() => {
    setCategories(categories);
  }, [categories, setCategories]);

  const handleEdit = (id: number) => {
    router.push(`/business/catalogue/categories/edit/${id}`);
  };

  const handleDelete = async (
    objid: number,
    name: string,
    description: string
  ) => {
    await deleteCategory({ objid, bizid, name, description });
    toast.success({
      message: "Category deleted Successfully",
    });
  };
  return (
    <>
      <List
        dataSource={categories}
        renderItem={(item, index) => (
          <ListItem
            key={index}
            item={item}
            deletePress={() =>
              handleDelete(item.objid, item.name, item.description)
            }
            onClick={() => handleEdit(item.objid)}
          />
        )}
      />
    </>
  );
};

export default CategoriesList;
