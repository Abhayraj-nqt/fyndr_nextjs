"use client";
import { deleteItem } from "@/actions/catalogue.actions";
import { StoreItem } from "@/types/api-response/catalogue.response";

import List from "../../../_components/list";
import ListItem from "../../_components/listItem";

type Props = {
  items: StoreItem[];
  bizid: number;
};

const ItemList = ({ items, bizid }: Props) => {
  const handleDelete = async (objid: number) => {
    await deleteItem({ objid, bizid });
  };
  return (
    <List
      dataSource={items}
      renderItem={(item, index) => (
        <ListItem
          key={index}
          item={item}
          deletePress={() => handleDelete(item.objid)}
        />
      )}
    />
  );
};

export default ItemList;
