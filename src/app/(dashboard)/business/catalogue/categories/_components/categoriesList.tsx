"use client";

import { StoreCategory } from "@/types/api-response/catalogue.response";

import List from "../../../_components/list";
import ListItem from "../../_components/listItem";

type Props = {
  categories: StoreCategory[];
};

const CategoriesList = ({ categories }: Props) => {
  return (
    <>
      <List
        dataSource={categories}
        renderItem={(item, index) => <ListItem key={index} item={item} />}
      />
    </>
  );
};

export default CategoriesList;
