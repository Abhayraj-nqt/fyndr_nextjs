"use client";
import { deleteItem } from "@/actions/catalogue.actions";
import { StoreItem } from "@/types/api-response/catalogue.response";

import List from "../../../_components/list";
import ListItem from "../../_components/listItem";
import toast from "@/components/global/toast";
import { useRouter } from "next/navigation";
import { useItemStore } from "@/zustand/stores/storeItem.store";
import { useEffect } from "react";

type Props = {
  items: StoreItem[];
  bizid: number;
};

const ItemList = ({ items, bizid }: Props) => {
  const router = useRouter();
  const setItems = useItemStore((state) => state.setItems);
  useEffect(() => {
    setItems(items);
  }, [items, setItems]);

  const handleEdit = (id: number) => {
    router.push(`/business/catalogue/items/edit/${id}`);
  };

  const handleDelete = async (objid: number) => {
    await deleteItem({ objid, bizid });
    toast.success({
      message: "Item deleted Successfully",
    });
  };
  return (
    <List
      dataSource={items}
      renderItem={(item, index) => (
        <ListItem
          key={index}
          item={item}
          deletePress={() => handleDelete(item.objid)}
          onClick={() => handleEdit(item.objid)}
        />
      )}
    />
  );
};

export default ItemList;
