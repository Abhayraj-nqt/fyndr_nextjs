"use client";

import { deleteCategory } from "@/actions/catalogue.actions";
import { StoreCategory } from "@/types/api-response/catalogue.response";

import List from "../../../_components/list";
import ListItem from "../../_components/listItem";

type Props = {
  categories: StoreCategory[];
  bizid: number;
};

const CategoriesList = ({ categories, bizid }: Props) => {
  const handleDelete = async (
    objid: number,
    name: string,
    description: string
  ) => {
    await deleteCategory({ objid, bizid, name, description });
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
          />
        )}
      />
    </>
  );
};

export default CategoriesList;
